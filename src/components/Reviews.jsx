/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

const Review = ({ cardId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('User is not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/reviews', {
        cardId,
        rating,
        comment,
        authId: user.userId,
      });

      setRating(1);
      setComment('');
      setError('');
      alert(response.data.msg);
      fetchReviews(); // Fetch updated reviews
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add review');
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user');
      setUser(response.data.user);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch user info');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cards/${cardId}/reviews`);
      setReviews(response.data.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to fetch reviews');
    }
  };

  useEffect(() => {
    fetchUser();
    fetchReviews();
  }, [cardId]); // Update dependency array to include cardId

  return (
    <div>
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit Review</button>
      </form>

      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.auth.name}</strong> - {review.rating} stars
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;
