import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { YoutubeAnalyticsService } from './youtube-analytics.service';
import { range } from 'rxjs';

@Controller('youtube-analytics')
export class YoutubeAnalyticsController {
  constructor(private readonly analyticsService: YoutubeAnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAnalytics(@Req() req,
  @Query('range') range: string,
  @Query('year') year?: number,
  @Query('month') month?: number,
) {
    // req.user contains the payload from the JWT, including the user's ID
    const userId = req.user.userId;
    return this.analyticsService.getChannelAnalytics(userId,range,year,month);
  }
}