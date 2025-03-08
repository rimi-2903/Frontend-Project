const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const NEWS_API_KEY = '3e748cfd6aa14d8d83a9ae603337412d'; 

app.get('/news', async (req, res) => {
  const category = req.query.category || 'general';
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category,
        apiKey: NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
