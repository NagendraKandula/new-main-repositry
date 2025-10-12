import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { YoutubeModule } from './auth/youtube/youtube.module';
import { FacebookModule } from './facebook/facebook.module';
import { YoutubeAnalyticsModule } from './youtube-analytics/youtube-analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Makes config available across all modules without re-importing
    }),
    PrismaModule,
    AuthModule,
    YoutubeModule,
    FacebookModule,
    YoutubeAnalyticsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AppModule {}