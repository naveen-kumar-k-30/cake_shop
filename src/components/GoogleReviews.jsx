import  { useEffect, useState } from 'react';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  
  const placeId = 'ChIJS1wnHX9nUjoReK_zX8pz68I'; // Your Place ID
  const apiKey = 'AIzaSyBXLlLDyFd3r4vv9R3sxs8DYDvtkCTTK2k'; // Replace with your API key

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.result && data.result.reviews) {
          setReviews(data.result.reviews);
        } else {
          setError('No reviews found.');
        }
      } catch (error) {
        setError('Error fetching reviews: ' + error.message);
      }
    };

    fetchReviews();
  }, [placeId, apiKey]);

  return (
    <div>
      <h2>Google Reviews</h2>
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.time} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <p><strong>{review.author_name}</strong> - Rating: {review.rating}</p>
            <p>{review.text}</p>
            <p><small>{new Date(review.time * 1000).toLocaleDateString()}</small></p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default GoogleReviews;
