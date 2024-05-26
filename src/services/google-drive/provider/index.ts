import { google } from 'googleapis';

const googleOAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

googleOAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const googleDriveProvider = google.drive({ version: 'v3', auth: googleOAuth2Client });