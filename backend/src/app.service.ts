import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): object {
    return {
      message: 'Welcome to the Guest Book API',
      version: '1.0.0',
      endpoints: {
        health: 'GET /health',
        comments: 'GET /comments',
        createComment: 'POST /comments',
      },
    };
  }
}
