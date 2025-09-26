import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FacebookService } from './facebook.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  @UseInterceptors(FileInterceptor('media'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body('content') content: string,
    @Req() req: Request,
  ) {
    const accessToken = req.cookies['facebook_access_token'];

    // --- CORRECTED FUNCTION CALL ---
    // 1. Use the correct function name: postToFacebook
    // 2. Pass all three required arguments: accessToken, content, and the uploaded file.
    return this.facebookService.postToFacebook(accessToken, content, file);
  }
}