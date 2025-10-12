import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

// --- Define Interfaces for API response types ---
// This tells TypeScript what the structure of the data will be.
interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
}

interface FacebookPostResponse {
  id: string;
  post_id?: string;
}

@Injectable()
export class FacebookService {
  private readonly FACEBOOK_GRAPH_API_URL = 'https://graph.facebook.com/v19.0';

  async postToFacebook(
    accessToken: string,
    content: string,
    file: Express.Multer.File,
  ) {
    if (!accessToken) {
      throw new BadRequestException('Facebook access token not found.');
    }
    if (!file) {
      throw new BadRequestException('A media file (photo or video) is required.');
    }

    try {
      // Step 1: Get the user's pages
      console.log('Access Token:', accessToken);
      const pagesResponse = await axios.get(
        `${this.FACEBOOK_GRAPH_API_URL}/me/accounts`,
        {
          params: { access_token: accessToken },
        },
      
      );
       console.log('Pages:', pagesResponse.data);
        console.log('Pages Response:', pagesResponse.data);
        

      // FIX: Use type assertion 'as' to tell TypeScript the exact type.
      const pages = (pagesResponse.data as { data: FacebookPage[] }).data;
      if (!pages || pages.length === 0) {
        throw new BadRequestException('No manageable Facebook pages found for this user.');
      }
      
      const page = pages[0];
      const pageAccessToken = page.access_token;
      const pageId = page.id;

      // Step 2: Post the media to the selected page
      if (file.mimetype.startsWith('image/')) {
        return this.postPhoto(pageId, pageAccessToken, content, file);
      } else if (file.mimetype.startsWith('video/')) {
        return this.postVideo(pageId, pageAccessToken, content, file);
      } else {
        throw new BadRequestException('Unsupported file type. Please upload an image or video.');
      }
    } catch (error) {
      console.error('Error posting to Facebook:', error.response?.data || error.message);
      throw new BadRequestException(error.response?.data?.error?.message || 'Failed to post to Facebook.');
    }
  }

  private async postPhoto(
    pageId: string,
    pageAccessToken: string,
    content: string,
    file: Express.Multer.File,
  ) {
    const form = new FormData();
    form.append('caption', content);
    form.append('source', file.buffer, file.originalname);
    form.append('access_token', pageAccessToken);

    const response = await axios.post(
      `${this.FACEBOOK_GRAPH_API_URL}/${pageId}/photos`,
      form,
      { headers: form.getHeaders() },
    );

    // FIX: Assert the type of response.data
    const postData = response.data as FacebookPostResponse;
    return { success: true, postId: postData.post_id, message: "Photo posted successfully." };
  }

  private async postVideo(
    pageId: string,
    pageAccessToken: string,
    content: string,
    file: Express.Multer.File,
  ) {
    const form = new FormData();
    form.append('description', content);
    form.append('source', file.buffer, file.originalname);
    form.append('access_token', pageAccessToken);
    
    const response = await axios.post(
      `https://graph-video.facebook.com/${this.FACEBOOK_GRAPH_API_URL.split('/')[3]}/${pageId}/videos`,
      form,
      { headers: form.getHeaders() },
    );

    // FIX: Assert the type of response.data
    const postData = response.data as FacebookPostResponse;
    return { success: true, postId: postData.id, message: "Video posted successfully." };
  }
}