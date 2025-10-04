// src/auth/auth.controller.ts
import { Body, Controller, Post, UseGuards, Get, Request, Res, Req, Scope, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config'; 
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private configService: ConfigService,
  ) {}

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
  2
  @UseGuards(JwtRefreshGuard) 
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Request() req, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.id;
    const refreshToken = req
    .get('Authorization')
    .replace('Bearer', '')
    .trim();
    const {accessToken } = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie('access_token', accessToken, {
      httpOnly: true, 
      secure: this.configService.get('NODE_ENV') !== 'development', 
      sameSite:'none',
    });
    return res.send({accessToken});
  }
  @UseGuards(JwtAuthGuard)
@Post('logout')
@HttpCode(HttpStatus.OK)
async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
  const userId = req.user.id;
  return this.authService.logout(userId, res);
}

  @Get('youtube')
  @UseGuards(JwtAuthGuard,AuthGuard('youtube'))
  async youtubeAuth(@Req() req) {
    // This route is never hit directly because the guard redirects to YouTube
  }

  @Get('youtube/callback')
  @UseGuards(AuthGuard('youtube'))
  youtubeAuthRedirect(@Req() req, @Res() res: Response) {
    // The 'user' object is attached by the YoutubeStrategy's validate function
    return this.authService.youtubeLogin(req,res); // Or any other page
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
