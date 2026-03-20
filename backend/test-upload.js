const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

async function testUpload() {
  try {
    // Create a simple test file if it doesn't exist
    const testFilePath = path.join(__dirname, 'test.txt');
    if (!fs.existsSync(testFilePath)) {
      fs.writeFileSync(testFilePath, 'This is a test resume with JavaScript, React, and Node.js skills');
    }

    const formData = new FormData();
    formData.append('resume', fs.createReadStream(testFilePath));
    formData.append('jd', fs.createReadStream(testFilePath));

    console.log('📤 Sending test files to /api/upload...');

    const response = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log('✅ Upload successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Upload failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testUpload();
