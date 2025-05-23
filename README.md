# News Headline API

This is the backend API for the News Headline application. It provides endpoints for fetching news headlines that can be displayed with images as backgrounds.

## Features

- RESTful API endpoints for news headlines
- Random headline endpoint
- CRUD operations for headlines
- API documentation

## Deployment to Vercel

This API is configured for easy deployment to Vercel's free tier:

1. Push this repository to GitHub
2. Connect to Vercel
3. Import your GitHub repository
4. Vercel will automatically detect the configuration and deploy

## API Endpoints

- `GET /api/news` - Get all headlines
- `GET /api/news/random` - Get a random headline
- `GET /api/news/:id` - Get a specific headline by ID
- `POST /api/news` - Create a new headline
- `PUT /api/news/:id` - Update a headline
- `DELETE /api/news/:id` - Delete a headline

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. The API will be available at `http://localhost:3001`
