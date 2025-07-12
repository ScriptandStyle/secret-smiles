import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import DefenseNews from './components/DefenseNews';
import CivilianActs from './components/CivilianActs';
import ShareKindness from './components/ShareKindness';
import HappyStories from './components/HappyStories';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showConfetti, setShowConfetti] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleHelpClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleAuthMode = (mode) => {
    if (mode === null && !authMode) {
      // User clicked login/register button
      setAuthMode('login');
    } else if (mode === null && authMode) {
      // User successfully logged in
      setAuthMode(null);
      setIsAuthenticated(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      // User switched between login/register or closed the modal
      setAuthMode(mode);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('home');
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setActiveTab('home')}>
          <span className="logo-icon">🤫</span>
          <span className="logo-text">Secret Smiles</span>
        </div>
        <ul className="nav-links">
          <li 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            Home
          </li>
          <li 
            className={activeTab === 'share' ? 'active' : ''} 
            onClick={() => setActiveTab('share')}
          >
            Share Kindness
          </li>
          <li 
            className={activeTab === 'stories' ? 'active' : ''} 
            onClick={() => setActiveTab('stories')}
          >
            Happy Stories
          </li>
          <li 
            className={activeTab === 'defense' ? 'active' : ''} 
            onClick={() => setActiveTab('defense')}
          >
            Defense News
          </li>
          <li 
            className={activeTab === 'civilian' ? 'active' : ''} 
            onClick={() => setActiveTab('civilian')}
          >
            Civilian Acts
          </li>
          <li 
            className={activeTab === 'about' ? 'active' : ''} 
            onClick={() => setActiveTab('about')}
          >
            About
          </li>
          {isAuthenticated && (
            <li 
              className={activeTab === 'profile' ? 'active' : ''} 
              onClick={() => setActiveTab('profile')}
            >
              Profile {user?.avatar || '👤'}
            </li>
          )}
          {!isAuthenticated ? (
            <li className="auth-button" onClick={() => handleAuthMode('login')}>
              Sign In
            </li>
          ) : (
            <li className="auth-button logout" onClick={handleLogout}>
              Sign Out
            </li>
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {authMode === 'login' && <Login onLogin={handleAuthMode} />}
        {authMode === 'register' && <Register onLogin={handleAuthMode} />}
        {!authMode && (
          <>
            {activeTab === 'home' && <HomeSection />}
            {activeTab === 'share' && <ShareKindness />}
            {activeTab === 'stories' && <HappyStories />}
            {activeTab === 'defense' && <DefenseNews />}
            {activeTab === 'civilian' && <CivilianActs />}
            {activeTab === 'profile' && isAuthenticated && <Profile />}
            {activeTab === 'about' && <AboutSection />}
          </>
        )}
      </main>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              transform: `rotate(${Math.random() * 360}deg)`
            }} />
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Spread Kindness</h3>
            <p>Small acts, when multiplied by millions of people, can transform the world.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li onClick={() => setActiveTab('home')}>Home</li>
              <li onClick={() => setActiveTab('share')}>Share</li>
              <li onClick={() => setActiveTab('stories')}>Stories</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>help@secretsmiles.org</p>
            <div className="social-icons">
              <span className="social-icon">📱</span>
              <span className="social-icon">📧</span>
              <span className="social-icon">🐦</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Secret Smiles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Home Section Component
function HomeSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Spread Happiness <span className="highlight">Anonymously</span></h1>
        <p className="hero-subtitle">Join our movement of secret helpers making the world a better place, one smile at a time.</p>
        <button className="cta-button pulse">Join Now</button>
      </div>
      <div className="hero-image">
        <div className="floating-smile">😊</div>
        <div className="floating-heart">❤️</div>
        <div className="floating-star">⭐</div>
      </div>
    </section>
  );
}

// Share Section Component
function ShareSection({ onHelpClick }) {
  const [formData, setFormData] = useState({
    act: '',
    location: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onHelpClick();
    setFormData({ act: '', location: '', message: '' });
    // Here you would typically send data to backend
  };

  return (
    <section className="share-section">
      <h2 className="section-title">Share Your Act of Kindness</h2>
      <p className="section-subtitle">Tell us about the good deed you did today (anonymously)</p>
      
      <form className="kindness-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>What did you do?</label>
          <select 
            name="act" 
            value={formData.act} 
            onChange={handleChange}
            required
          >
            <option value="">Select an act</option>
            <option value="helped">Helped someone in need</option>
            <option value="donated">Donated to a cause</option>
            <option value="volunteered">Volunteered time</option>
            <option value="compliment">Gave a genuine compliment</option>
            <option value="other">Other kind act</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Where did this happen?</label>
          <input 
            type="text" 
            name="location" 
            placeholder="City or neighborhood" 
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Your secret message (optional)</label>
          <textarea 
            name="message" 
            placeholder="How did it make you feel?" 
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="submit-button rainbow-hover">
          Share My Secret Smile
        </button>
      </form>
      
      <div className="inspiration-quote">
        <p>"No act of kindness, no matter how small, is ever wasted." - Aesop</p>
      </div>
    </section>
  );
}

// Stories Section Component
function StoriesSection() {
  const stories = [
    {
      id: 1,
      content: "Someone paid for my coffee this morning. It made my whole day!",
      location: "Downtown Cafe",
      date: "Today"
    },
    {
      id: 2,
      content: "Found a anonymous note with encouraging words on my windshield.",
      location: "City Parking Lot",
      date: "2 days ago"
    },
    {
      id: 3,
      content: "A stranger helped carry my groceries to the car in the rain.",
      location: "Grocery Store",
      date: "1 week ago"
    },
    {
      id: 4,
      content: "Received flowers with a note saying 'Just because you're awesome'",
      location: "Office Desk",
      date: "2 weeks ago"
    }
  ];

  return (
    <section className="stories-section">
      <h2 className="section-title">Recent Secret Smiles</h2>
      <p className="section-subtitle">These anonymous acts of kindness are spreading joy everywhere</p>
      
      <div className="stories-grid">
        {stories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-emoji">✨</div>
            <p className="story-content">{story.content}</p>
            <div className="story-meta">
              <span className="location">📍 {story.location}</span>
              <span className="date">📅 {story.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  return (
    <section className="about-section">
      <h2 className="section-title">About Secret Smiles</h2>
      
      <div className="about-content">
        <div className="about-text">
          <p>
            Secret Smiles is a movement dedicated to promoting anonymous acts of kindness. 
            We believe that helping others without expectation of recognition or reward 
            creates pure, selfless joy - both for the giver and receiver.
          </p>
          <p>
            Our platform allows you to share your good deeds anonymously, inspiring others 
            to pay it forward while maintaining your privacy. Together, we're creating a 
            ripple effect of positivity around the world.
          </p>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Acts Shared</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Smiles Created</div>
            </div>
          </div>
        </div>
        <div className="about-image">
          <div className="rotating-globe">🌎</div>
          <div className="bouncing-hearts">
            <span>❤️</span>
            <span>💙</span>
            <span>💚</span>
            <span>💛</span>
            <span>💜</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;