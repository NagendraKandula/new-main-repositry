import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import {subDays,startOfMonth,endOfMonth} from 'date-fns';

@Injectable()
export class YoutubeAnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getChannelAnalytics(userId: number,range: string,year?:number,month?:number) {
    // 1. Get the user's YouTube account from the database
    const socialAccount = await this.prisma.socialAccount.findFirst({
      where: {
        userId,
        provider: 'youtube',
      },
    });

    if (!socialAccount) {
      throw new Error('YouTube account not connected for this user.');
    }

    const accessToken = socialAccount.accessToken;
    const analyticsApiUrl = 'https://youtubeanalytics.googleapis.com/v2/reports';
 
      let startDate: string;
      let endDate: string = new Date().toISOString().split('T')[0];
     switch (range) {
        case '7d':
            startDate = subDays(new Date(),7).toISOString().split('T')[0];
            break;
        case '28d':

            startDate = subDays(new Date(), 28).toISOString().split('T')[0];
            break;
        case '90d':
            startDate = subDays(new Date(), 90).toISOString().split('T')[0];
            break;
      case '365d':
            startDate = subDays(new Date(), 365).toISOString().split('T')[0];
            break;
        case 'month':
        if (!year || !month) throw new Error('Year and month required for monthly analytics');
        const firstDay = startOfMonth(new Date(year, month - 1));
        const lastDay = endOfMonth(firstDay);
        startDate = firstDay.toISOString().split('T')[0];
        endDate = lastDay.toISOString().split('T')[0];
        break;
      case 'lifetime':
        startDate = '2005-02-14'; // YouTube launch date (or earliest video upload)
        break;
      default:
        throw new Error('Invalid analytics range');
        }
      try {
      // 2. Make a request to the YouTube Analytics API
      const response = await axios.get(analyticsApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          ids: 'channel==MINE', // 'MINE' gets data for the authenticated user's channel
          startDate, // Example start date
          endDate, // Today's date
          metrics: 'views,likes,comments,subscribersGained',
          dimensions: 'day',
          sort: 'day',
        },
      });

      return response.data;
    } catch (error) {
        // NOTE: A 401 error here often means the accessToken has expired.
        // You would need to add logic here to use the refreshToken to get a new
        // accessToken from Google, save it, and then retry this request.
        console.error('Error fetching YouTube analytics:', error.response.data);
        throw new InternalServerErrorException('Failed to fetch YouTube analytics');
    }
  }
}