import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/news?category=${selectedCategory}`);
        const data = await res.json();
        setArticles(data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
      setLoading(false);
    };

    fetchNews();
  }, [selectedCategory]);

  
  const shareArticle = (article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.description,
          url: article.url,
        })
        .catch((err) => console.error('Error sharing', err));
    } else {
      console.log(`Error!`);
    }
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="app-header">
        <h1>News Aggregator</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <nav className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'active' : ''}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </nav>

      <main>
        <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News</h2>
        <div className="news-container">
          {loading ? (
            <div className="spinner"></div>
          ) : (
            articles.map((article, i) => (
              <div key={i} className="news-card">
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="buttons">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                    <button onClick={() => shareArticle(article)} className="share-button">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
