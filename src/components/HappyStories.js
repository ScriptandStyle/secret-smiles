import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HappyStories.css';

const API_URL = 'http://localhost:5000/api';

function HappyStories() {
  const [kindnessActs, setKindnessActs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAct, setSelectedAct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    image: '😊',
    author: {
      name: 'Anonymous',
      avatar: '👤',
      role: 'Community Member'
    }
  });

  useEffect(() => {
    fetchKindnessActs();
  }, []);

  const fetchKindnessActs = async () => {
    try {
      setLoading(true);
      // Fetch kindness acts
      const response = await axios.get(`${API_URL}/acts?type=kindness`);
      if (response.data.length === 0) {
        // If no kindness acts with type specified, fetch all acts (for backward compatibility)
        const allActsResponse = await axios.get(`${API_URL}/acts`);
        setKindnessActs(allActsResponse.data);
      } else {
        setKindnessActs(response.data);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch kindness acts. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/acts/happy-story`, {
        ...newStory,
        sourceActId: selectedAct._id
      });
      
      // Reset form
      setNewStory({
        title: '',
        content: '',
        image: '😊',
        author: {
          name: 'Anonymous',
          avatar: '👤',
          role: 'Community Member'
        }
      });
      setShowForm(false);
      
      // Refresh data
      fetchKindnessActs();
      
      alert('Your happy story has been shared successfully!');
    } catch (error) {
      console.error('Error submitting happy story:', error);
      alert('Failed to submit happy story. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="happy-stories-container">
      <h2 className="section-title">Recent Secret Smiles</h2>
      <p className="subtitle">These anonymous acts of kindness are spreading joy everywhere</p>

      {kindnessActs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">😢</div>
          <h3>No Acts of Kindness Yet</h3>
          <p>Be the first to share an act of kindness with our community!</p>
          <button 
            className="share-button"
            onClick={() => window.location.href = '/share'}
          >
            Share Kindness Now
          </button>
        </div>
      ) : (
        <div className="stories-grid">
          {kindnessActs.map((act) => (
            <div key={act._id} className="story-card">
              <div className="card-icon">🐝</div>
              <h3>{act.title}</h3>
              <p>{act.content}</p>
              <div className="story-meta">
                <span>📍 {act.location}</span>
                <span>📅 {new Date(act.date).toLocaleDateString()}</span>
              </div>
              <div className="story-actions">
                <button 
                  className="share-story-btn"
                  onClick={() => {
                    setSelectedAct(act);
                    setShowForm(true);
                  }}
                >
                  Share Your Story About This
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && selectedAct && (
        <div className="share-story-form">
          <div>
            <h3>Share Your Happy Story</h3>
            <p>Based on: {selectedAct.title}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Give your story a meaningful title"
                  value={newStory.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Story:</label>
                <textarea
                  name="content"
                  placeholder="Share how this act of kindness affected you or others..."
                  value={newStory.content}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="share-button">Share Story</button>
                <button type="button" onClick={() => setShowForm(false)} className="cancel-button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default HappyStories;
