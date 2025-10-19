# YouTube API Setup Guide

This guide will help you connect your website to the YouTube Data API v3 to automatically display your latest videos and channel statistics.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Name your project (e.g., "Personal Website YouTube Integration")
5. Click "Create"

## Step 2: Enable YouTube Data API v3

1. In your project, go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

## Step 3: Create API Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key that's generated
4. Click "Restrict Key" for security

## Step 4: Restrict Your API Key

**Important for security and cost control:**

1. In "API restrictions":
   - Select "Restrict key"
   - Check "YouTube Data API v3"

2. In "Application restrictions" (recommended):
   - Select "HTTP referrers (web sites)"
   - Add your domains:
     - `localhost:8080/*` (for development)
     - `your-domain.com/*` (for production)
     - `*.github.io/*` (if using GitHub Pages)

3. Click "Save"

## Step 5: Configure Your Website

1. Open `js/script.js` in your code editor
2. Find line 352 where it says:
   ```javascript
   this.apiKey = 'YOUR_YOUTUBE_API_KEY_HERE';
   ```
3. Replace `YOUR_YOUTUBE_API_KEY_HERE` with your actual API key:
   ```javascript
   this.apiKey = 'AIzaSyC-your-actual-api-key-here';
   ```

## Step 6: Test Your Integration

1. Save the file and refresh your website
2. Check the browser console (F12 → Console) for any errors
3. Your latest videos should now load automatically!

## API Quotas and Limits

- **Free tier**: 10,000 units per day
- **Channel statistics**: 1 unit per request
- **Video search**: 100 units per request
- **Video details**: 1 unit per request

Your website uses approximately **102 units** per page load (when loading 3 videos), allowing for about **98 page loads per day** on the free tier.

## Troubleshooting

### Common Issues:

**1. "API key not valid" error:**
- Check that your API key is correct
- Ensure YouTube Data API v3 is enabled
- Verify API key restrictions allow your domain

**2. "Access blocked" error:**
- Add your domain to HTTP referrer restrictions
- Check if you're testing on the correct domain/port

**3. "Quota exceeded" error:**
- You've hit the daily limit
- Consider implementing caching or reducing API calls

**4. Videos not loading:**
- Check browser console for errors
- Verify your channel handle `@anushajournal` is correct
- Ensure your channel has public videos

### Testing Your Setup:

Open browser developer tools (F12) and look for:
- ✅ "YouTube API configured successfully" 
- ❌ "YouTube API key not configured. Using sample data."

## Security Best Practices

1. **Never commit API keys to Git:**
   - Use environment variables in production
   - Keep API keys in separate config files

2. **Restrict your API key:**
   - Limit to specific APIs
   - Limit to specific domains
   - Monitor usage in Google Cloud Console

3. **Consider rate limiting:**
   - Cache API responses
   - Implement exponential backoff for retries

## Production Deployment

For production websites, consider:

1. **Environment Variables:**
   ```javascript
   this.apiKey = process.env.YOUTUBE_API_KEY || 'fallback-key';
   ```

2. **Server-side proxy:** To hide API key from client-side code

3. **Caching:** Store API responses to reduce quota usage

## Support

If you encounter issues:
1. Check the [YouTube Data API documentation](https://developers.google.com/youtube/v3)
2. Review the [Google Cloud Console](https://console.cloud.google.com/) for quota usage
3. Test API calls directly using the [API Explorer](https://developers.google.com/youtube/v3/docs/)

---

Your website will automatically fallback to sample data if the API is not configured or encounters errors, ensuring your site always works!