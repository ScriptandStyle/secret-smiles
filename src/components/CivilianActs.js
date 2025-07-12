import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CivilianActs.css';

const API_URL = 'http://localhost:5000/api';

function CivilianActs() {
  const [activeTab, setActiveTab] = useState('feed');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [acts, setActs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAct, setSelectedAct] = useState(null);
  const [showForm, setShowForm] = useState(false);
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

  const [newComment, setNewComment] = useState('');

  // Fetch acts on component mount
  useEffect(() => {
    fetchActs();
  }, []);

  // Mock data from real-world examples
  const mockActs = [
    {
      _id: 'mock1',
      title: 'Donated Meals to Homeless Shelter',
      content: 'Prepared and delivered 50 hot meals to the downtown homeless shelter during the winter storm. Many people were grateful for a warm meal during the cold weather.',
      location: 'Boston, MA',
      image: '🍲',
      author: {
        name: 'Community Chef',
        avatar: '👨‍🍳',
        role: 'Local Volunteer'
      },
      reactions: {
        likes: 342,
        comments: 28,
        shares: 56
      },
      comments: [],
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: 'mock2',
      title: 'Free Tutoring for Underprivileged Students',
      content: 'Started a weekly online tutoring program for underprivileged students struggling with math and science. We now have 15 volunteer tutors helping over 30 students improve their grades and confidence.',
      location: 'Chicago, IL',
      image: '📚',
      author: {
        name: 'Education Advocate',
        avatar: '👩‍🏫',
        role: 'Teacher'
      },
      reactions: {
        likes: 287,
        comments: 42,
        shares: 38
      },
      comments: [],
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: 'mock3',
      title: 'Community Garden Initiative',
      content: 'Transformed an abandoned lot into a thriving community garden. We\'ve grown over 500 pounds of fresh produce that\'s been distributed to local families in need. The garden has become a gathering place for neighbors to connect and learn about sustainable gardening practices.',
      location: 'Portland, OR',
      image: '🌱',
      author: {
        name: 'Urban Gardener',
        avatar: '🤷',
        role: 'Environmental Activist'
      },
      reactions: {
        likes: 423,
        comments: 51,
        shares: 72
      },
      comments: [],
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: 'mock4',
      title: 'Senior Companion Program',
      content: 'Started visiting elderly residents at the local nursing home who don\'t have regular family visitors. We read books, play games, and simply provide companionship. The smiles on their faces make it all worthwhile. Many seniors have shared incredible life stories and wisdom.',
      location: 'Denver, CO',
      image: '💑',
      author: {
        name: 'Compassionate Friend',
        avatar: '👩‍🦳',
        role: 'Volunteer'
      },
      reactions: {
        likes: 376,
        comments: 47,
        shares: 29
      },
      comments: [],
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: 'mock5',
      title: 'Beach Cleanup Initiative',
      content: 'Organized a community beach cleanup that removed over 500 pounds of plastic and debris. We had 75 volunteers join us, including many families with children learning about environmental stewardship. Local businesses donated supplies and refreshments for volunteers.',
      location: 'San Diego, CA',
      image: '🏖️',
      author: {
        name: 'Ocean Advocate',
        avatar: '🤼',
        role: 'Environmental Volunteer'
      },
      reactions: {
        likes: 512,
        comments: 63,
        shares: 89
      },
      comments: [],
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _id: 'mock6',
      title: 'Free Pet Care Clinic',
      content: 'Partnered with local veterinarians to provide free basic pet care services for low-income pet owners. We were able to help 120 pets with vaccinations, checkups, and minor treatments. Many families expressed how much this helped them keep their beloved pets healthy during financial hardship.',
      location: 'Atlanta, GA',
      image: '🐶',
      author: {
        name: 'Animal Lover',
        avatar: '👩‍🐾',
        role: 'Volunteer Coordinator'
      },
      reactions: {
        likes: 398,
        comments: 57,
        shares: 42
      },
      comments: [],
      date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const fetchActs = async () => {
    try {
      setLoading(true);
      
      // For demonstration purposes, directly use mock data
      // Comment out the API call for now
      // const response = await axios.get(`${API_URL}/acts`);
      
      // Always use mock data for demonstration
      setActs(mockActs);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch acts. Using sample data instead.');
      console.error('Error fetching acts:', err);
      
      // Use mock data as fallback
      setActs(mockActs);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/acts`, newAct);
      setActs(prev => [response.data, ...prev]);
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
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting act:', err);
      setError('Failed to submit act. Please try again.');
    }
  };

  const handleReaction = async (actId, reactionType) => {
    try {
      const response = await axios.patch(`${API_URL}/acts/${actId}/reactions`, {
        reactionType
      });
      setActs(prev => prev.map(act => 
        act._id === actId ? response.data : act
      ));
    } catch (err) {
      console.error('Error updating reaction:', err);
      setError('Failed to update reaction. Please try again.');
    }
  };

  const handleAddComment = async (actId) => {
    if (!newComment.trim()) return;
    
    try {
      const response = await axios.post(`${API_URL}/comments`, {
        actId,
        author: 'Community Member',
        content: newComment
      });
      
      setActs(prev => prev.map(act => {
        if (act._id === actId) {
          return {
            ...act,
            comments: [...act.comments, response.data],
            reactions: {
              ...act.reactions,
              comments: act.reactions.comments + 1
            }
          };
        }
        return act;
      }));
      
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Filter and sort acts based on user selections
  const getFilteredActs = () => {
    let filteredActs = [...acts];
    
    // Apply tab filter
    if (activeTab === 'trending') {
      filteredActs = filteredActs.sort((a, b) => 
        (b.reactions?.likes + b.reactions?.comments + b.reactions?.shares) - 
        (a.reactions?.likes + a.reactions?.comments + a.reactions?.shares)
      );
    } else if (activeTab === 'nearby') {
      // In a real app, this would filter by geolocation proximity
      // For now, we'll just randomize to simulate "nearby" content
      filteredActs = filteredActs.sort(() => Math.random() - 0.5);
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      filteredActs = filteredActs.filter(act => {
        // Map each mock item to its category for reliable filtering
        const mockItemCategories = {
          'mock1': 'food',        // Donated Meals
          'mock2': 'education',   // Free Tutoring
          'mock3': 'environment', // Garden Initiative
          'mock4': 'elderly',     // Senior Companion
          'mock5': 'environment', // Beach Cleanup
          'mock6': 'animals'      // Pet Care Clinic
        };
        
        // First check if this is one of our mock items with a known category
        if (mockItemCategories[act._id]) {
          return mockItemCategories[act._id] === filterCategory;
        }
        
        // Fallback to keyword matching for non-mock items
        const categoryMap = {
          'food': ['meal', 'food', 'hungry', 'eat', 'dinner', 'lunch', 'breakfast', 'cook', 'homeless shelter'],
          'education': ['school', 'student', 'teach', 'tutor', 'learn', 'education', 'class', 'book', 'grades'],
          'environment': ['clean', 'environment', 'garden', 'plant', 'trash', 'recycle', 'beach', 'park', 'debris', 'plastic'],
          'elderly': ['senior', 'elderly', 'old', 'retire', 'nursing home', 'aging', 'companion'],
          'animals': ['pet', 'animal', 'dog', 'cat', 'veterinarian', 'adoption', 'clinic']
        };
        
        const keywords = categoryMap[filterCategory] || [];
        return keywords.some(keyword => 
          act.title.toLowerCase().includes(keyword) || 
          act.content.toLowerCase().includes(keyword)
        );
      });
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredActs = filteredActs.filter(act => 
        act.title.toLowerCase().includes(term) || 
        act.content.toLowerCase().includes(term) ||
        act.location.toLowerCase().includes(term) ||
        act.author.name.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (sortOrder === 'newest') {
      filteredActs = filteredActs.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'oldest') {
      filteredActs = filteredActs.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === 'most-liked') {
      filteredActs = filteredActs.sort((a, b) => (b.reactions?.likes || 0) - (a.reactions?.likes || 0));
    } else if (sortOrder === 'most-commented') {
      filteredActs = filteredActs.sort((a, b) => (b.reactions?.comments || 0) - (a.reactions?.comments || 0));
    }
    
    return filteredActs;
  };
  
  const filteredActs = getFilteredActs();
  return (
    <section className="community-section">
      <div className="community-header">
        <h2 className="section-title">Civilian Acts</h2>
        <p className="section-subtitle">Share and celebrate acts of kindness in your community</p>
        
        <div className="community-tabs">
          <button 
            className={`tab-button ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            <span className="tab-icon">📰</span> Community Feed
          </button>
          <button 
            className={`tab-button ${activeTab === 'trending' ? 'active' : ''}`}
            onClick={() => setActiveTab('trending')}
          >
            <span className="tab-icon">🔥</span> Trending
          </button>
          <button 
            className={`tab-button ${activeTab === 'nearby' ? 'active' : ''}`}
            onClick={() => setActiveTab('nearby')}
          >
            <span className="tab-icon">📍</span> Nearby
          </button>
        </div>
        
        <div className="filter-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search acts of kindness..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button" onClick={() => setSearchTerm(searchTerm)}>
              🔍
            </button>
          </div>
          
          <div className="filter-options">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="food">Food & Meals</option>
                <option value="education">Education</option>
                <option value="environment">Environment</option>
                <option value="elderly">Elderly Care</option>
                <option value="animals">Animal Welfare</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-commented">Most Commented</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button 
        className="share-act-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Share Your Act of Kindness'}
      </button>

      {showForm && (
        <form className="act-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title of Your Act</label>
            <input
              type="text"
              name="title"
              value={newAct.title}
              onChange={handleInputChange}
              placeholder="What did you do?"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Story</label>
            <textarea
              name="content"
              value={newAct.content}
              onChange={handleInputChange}
              placeholder="Tell us about your act of kindness..."
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={newAct.location}
              onChange={handleInputChange}
              placeholder="Where did this happen?"
              required
            />
          </div>

          <div className="form-group">
            <label>Choose an Emoji</label>
            <select
              name="image"
              value={newAct.image}
              onChange={handleInputChange}
            >
              <option value="❤️">❤️ Love</option>
              <option value="🤝">🤝 Helping Hand</option>
              <option value="🌱">🌱 Growth</option>
              <option value="🌟">🌟 Star</option>
              <option value="🌈">🌈 Rainbow</option>
              <option value="🫂">🫂 Support</option>
            </select>
          </div>

          <button type="submit" className="submit-act-button">
            Share Your Story
          </button>
        </form>
      )}
      
      {filteredActs.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No acts found</h3>
          <p>Try adjusting your filters or share your own act of kindness!</p>
        </div>
      ) : (
        <div className="acts-grid">
          {filteredActs.map(act => (
          <div key={act._id} className="act-card">
            <div className="act-header">
              <div className="author-info">
                <span className="author-avatar">{act.author?.avatar || '👤'}</span>
                <div className="author-details">
                  <span className="author-name">{act.author?.name || 'Anonymous'}</span>
                  <span className="author-role">{act.author?.role || 'Community Member'}</span>
                </div>
              </div>
              <span className="act-date">🕒 {new Date(act.date).toLocaleDateString()}</span>
            </div>

            <div className="act-image">{act.image}</div>
            <div className="act-content">
              <h3 className="act-title">{act.title}</h3>
              <p className="act-text">{act.content}</p>
              <div className="act-meta">
                <span className="act-location">📍 {act.location}</span>
              </div>
              <div className="act-reactions">
                <button 
                  className="reaction-button"
                  onClick={() => handleReaction(act._id, 'likes')}
                >
                  <span>👍</span>
                  <span>{act.reactions?.likes || 0}</span>
                </button>
                <button 
                  className="reaction-button"
                  onClick={() => handleReaction(act._id, 'comments')}
                >
                  <span>💬</span>
                  <span>{act.reactions?.comments || 0}</span>
                </button>
                <button 
                  className="reaction-button"
                  onClick={() => handleReaction(act._id, 'shares')}
                >
                  <span>🔄</span>
                  <span>{act.reactions?.shares || 0}</span>
                </button>
              </div>

              <div className="comments-section">
                <div className="comments-list">
                  {(act.comments || []).map(comment => (
                    <div key={comment._id} className="comment">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                  ))}
                </div>
                <div className="add-comment">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="comment-input"
                  />
                  <button 
                    className="comment-button"
                    onClick={() => handleAddComment(act._id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
}

export default CivilianActs;