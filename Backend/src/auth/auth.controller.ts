// src/auth/auth.controller.ts
import { Body, Controller, Post, UseGuards, Get, Request, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(dto, res);
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('resend-otp')
  resendOtp(@Body() dto: ForgotPasswordDto) {
    return this.authService.resendOtp(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.googleLogin(req, res);
  }
  @Post('Logout')
  Logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.Logout(res);
  }
  @Get('youtube')
  @UseGuards(AuthGuard('youtube'))
  async youtubeAuth(@Req() req) {
    // This route is never hit directly because the guard redirects to YouTube
  }

  @Get('youtube/callback')
  @UseGuards(AuthGuard('youtube'))
  youtubeAuthRedirect(@Req() req, @Res() res: Response) {
    // The 'user' object is attached by the YoutubeStrategy's validate function
    const { accessToken, refreshToken } = req.user;

    // Set tokens in HTTP-only cookies
    res.cookie('youtube_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'lax',
    });

    res.cookie('youtube_refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    });

    // Redirect back to the frontend
    res.redirect('http://localhost:3000/home'); // Or any other page
  }
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {
    // Initiates the Facebook OAuth2 login flow
  }
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    // You can create a new service method for this or reuse the googleLogin logic
    return this.authService.facebookLogin(req, res);
  }
}