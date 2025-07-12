import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DefenseNews.css';

function DefenseNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get a relevant emoji based on the article title or description
  const getRelevantEmoji = (title, description) => {
    const text = (title + ' ' + description).toLowerCase();
    
    if (text.includes('security') || text.includes('defense') || text.includes('protection')) {
      return '🛡️'; // Shield
    } else if (text.includes('military') || text.includes('army') || text.includes('navy') || text.includes('air force')) {
      return '🇺🇸'; // Flag or other country flag based on context
    } else if (text.includes('technology') || text.includes('innovation') || text.includes('development')) {
      return '📡'; // Satellite
    } else if (text.includes('cooperation') || text.includes('alliance') || text.includes('treaty')) {
      return '🤝'; // Handshake
    } else if (text.includes('training') || text.includes('exercise') || text.includes('drill')) {
      return '🎥'; // Target
    } else if (text.includes('peace') || text.includes('agreement')) {
      return '🌿'; // Peace symbol
    } else {
      return '📰'; // Newspaper
    }
  };

  // Function to format the published date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        // Using NewsAPI to fetch defense and security related news
        const API_KEY = 'a7860a8ea4aa46abb3d9b6ca4d9bb65e';
        
        // Fetch specific military news data from NewsAPI
        const response = await axios.get(`https://newsapi.org/v2/everything?q=military+defense+forces&apiKey=${API_KEY}&pageSize=10&language=en`);
        
        // Process the news articles from the real API response
        const processedNews = response.data.articles.map((article, index) => ({
          id: index + 1,
          title: article.title,
          content: article.description || article.content,
          category: article.source.name,
          date: formatDate(article.publishedAt),
          image: getRelevantEmoji(article.title, article.description),
          url: article.url
        }));
        
        setNews(processedNews);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch defense news. Please try again later.');
        
        // Fallback to static data if API fails
        setNews([
          {
            id: 1,
            title: "Border Security Enhancement",
            content: "New measures implemented to strengthen national security at key border points.",
            category: "Security",
            date: "2 hours ago",
            image: "🛡️"
          },
          {
            id: 2,
            title: "Military Training Program",
            content: "Advanced combat training program launched for special forces units.",
            category: "Training",
            date: "1 day ago",
            image: "🎥"
          },
          {
            id: 3,
            title: "Defense Technology Update",
            content: "New surveillance systems deployed in strategic locations.",
            category: "Technology",
            date: "3 days ago",
            image: "📡"
          },
          {
            id: 4,
            title: "International Cooperation",
            content: "Joint military exercises conducted with allied nations.",
            category: "Cooperation",
            date: "1 week ago",
            image: "🤝"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  return (
    <section className="defense-section">
      <h2 className="section-title">Defense News</h2>
      <p className="section-subtitle">Latest updates from our defense forces and security initiatives</p>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading latest defense news...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map(item => (
            <div key={item.id} className="news-card">
              <div className="news-image">{item.image}</div>
              <div className="news-content">
                <span className="news-category">{item.category}</span>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-text">{item.content}</p>
                <div className="news-meta">
                  <span className="news-date">🕒 {item.date}</span>
                  <div className="news-reactions">
                    <span className="reaction">👍 245</span>
                    <span className="reaction">💬 45</span>
                    <span className="reaction">🔄 12</span>
                  </div>
                </div>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
                    Read full story →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default DefenseNews; 