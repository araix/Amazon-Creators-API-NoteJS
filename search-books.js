require('dotenv').config();
const axios = require('axios');
const { getAccessToken } = require('./auth');

async function searchBooks() {
  try {
    const apiBase = 'https://creatorsapi.amazon';
    const path = '/catalog/v1/searchItems';
    
    const accessToken = await getAccessToken({
      credentialId: process.env.CREDENTIAL_ID,
      credentialSecret: process.env.CREDENTIAL_SECRET,
      region: process.env.REGION || 'us-west-2'
    });
    
    const payload = {
      keywords: 'Harry Potter',
      partnerTag: process.env.PARTNER_TAG,
      marketplace: process.env.MARKETPLACE,
      searchIndex: 'Books',
      itemCount: 5,
      resources: [
        'images.primary.medium',
        'itemInfo.title',
        'itemInfo.features',
        'offersV2.listings.price'
      ]
    };

    const authHeader = `Bearer ${accessToken}, Version ${process.env.VERSION}`;
    
    const response = await axios.post(`${apiBase}${path}`, payload, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'x-marketplace': process.env.MARKETPLACE
      }
    });
    
    let items = [];
    
    if (response.data.searchResult && response.data.searchResult.items) {
      items = response.data.searchResult.items;
    } else if (response.data.items) {
      items = response.data.items;
    }
    
    if (items.length > 0) {
      console.log(`Found ${items.length} books:\n`);
      
      items.forEach((item, index) => {
        const title = item.itemInfo?.title?.displayValue || item.ItemInfo?.Title?.DisplayValue || 'N/A';
        const asin = item.asin || item.ASIN || 'N/A';
        const price = item.offersV2?.listings?.[0]?.price?.displayAmount || 'N/A';
        const image = item.images?.primary?.medium?.url || 'N/A';
        
        console.log(`Book ${index + 1}:`);
        console.log(`Title: ${title}`);
        console.log(`ASIN: ${asin}`);
        console.log(`Price: ${price}`);
        console.log(`Image: ${image}\n`);
      });
    } else {
      console.log('No items found');
    }

    if (response.data.errors) {
      console.log('Errors:', response.data.errors);
    }
    
    return response.data;
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

searchBooks();