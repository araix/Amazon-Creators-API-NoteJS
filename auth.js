const axios = require('axios');
const crypto = require('crypto');

async function getAccessToken(credentials) {
  const { credentialId, credentialSecret, region } = credentials;
  
  const authUrl = `https://creatorsapi.auth.${region}.amazoncognito.com/oauth2/token`;
  const basicAuth = Buffer.from(`${credentialId}:${credentialSecret}`).toString('base64');
  
  try {
    const response = await axios.post(
      authUrl,
      'grant_type=client_credentials&scope=creatorsapi/default',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAccessToken };