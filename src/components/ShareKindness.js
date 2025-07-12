import React, { useState } from 'react';
import axios from 'axios';
import './ShareKindness.css';

const API_URL = 'http://localhost:5000/api';

// Heart animation component
const HeartAnimation = () => {
  // Create an array of 15 hearts with random positions and delays
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // Random left position (0 to 100%)
    delay: Math.random() * 0.5,  // Random delay (0 to 0.5s)
    size: 0.5 + Math.random(),  // Random size (0.5 to 1.5)
    duration: 1 + Math.random() * 2 // Random duration (1 to 3s)
  }));

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size * 2}rem`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

function ShareKindness() {
  const [newAct, setNewAct] = useState({
    title: '',
    content: '',
    location: '',
    image: '❤️',
    author: {
      name: 'Anonymous',
      avatar: '👤',
      role: 'Community Member'
    }
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/acts`, {
        ...newAct,
        type: 'kindness'
      });
      
      // Reset form
      setNewAct({
        title: '',
        content: '',
        location: '',
        image: '❤️',
        author: {
          name: 'Anonymous',
          avatar: '👤',
          role: 'Community Member'
        }
      });

      // Show success message and heart animation
      setShowSuccess(true);
      setShowHearts(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
      
      // Hide hearts after 3 seconds
      setTimeout(() => setShowHearts(false), 3000);
    } catch (error) {
      console.error('Error submitting kindness share:', error);
      alert('Failed to submit kindness share. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="share-section">
      <h2 className="section-title">Share Your Act of Kindness</h2>
      <p className="section-subtitle">Tell us about the good deed you did today (anonymously)</p>
      
      {/* Floating hearts animation */}
      {showHearts && <HeartAnimation />}
      
      {showSuccess && (
        <div className="success-message fade-in">
          <div className="success-icon">✅</div>
          <p>Your kindness has been shared! Thank you for making the world a better place.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="kindness-form">
        <div className="form-group">
          <label>What did you do?</label>
          <input
            type="text"
            name="title"
            placeholder="Give your act of kindness a title"
            value={newAct.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tell us more about it</label>
          <textarea
            name="content"
            placeholder="Describe your act of kindness in detail"
            value={newAct.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Where did this happen?</label>
          <input
            type="text"
            name="location"
            placeholder="City, Country or Online"
            value={newAct.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Share Kindness</button>
      </form>
      
      <div className="inspiration-quote">
        "No act of kindness, no matter how small, is ever wasted." — Aesop
      </div>
    </section>
  );
}

export default ShareKindness;
