import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5); // Default to 5 stars
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    // Fetch reviews data and rating distribution from backend
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get("/api/reviews");
        const distributionResponse = await axios.get("/api/reviews/rating-distribution");

        setReviewsData(reviewsResponse.data);
        setRatingDistribution(distributionResponse.data);
      } catch (error) {
        console.error("Error fetching reviews data:", error);
        setFeedbackMessage("Failed to load reviews. Please try again later.");
      }
    };

    fetchReviews();
  }, []);

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText) {
      setFeedbackMessage("Please write a review before submitting.");
      return;
    }

    try {
      const response = await axios.post("/api/reviews", {
        name: "Anonymous", // Change as needed
        rating,
        comment: reviewText,
      });

      // Clear the textarea and reset feedback
      setReviewText("");
      setFeedbackMessage("Thank you for your review!");

      // Optionally, you can fetch the updated reviews after submitting
      // fetchReviews();
    } catch (error) {
      setFeedbackMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <h4 className="text-lg mb-6">Based on {reviewsData.length} reviews</h4>

          <div className="grid grid-rows-5 gap-4 mb-6">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center">
                <span className="text-yellow-500">
                  {"⭐".repeat(item.stars)}
                </span>
                <div className="w-full bg-gray-300 rounded-full h-2 mx-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-gray-600">{item.percentage}%</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-2xl font-bold mb-4">Share your thoughts</p>
            {feedbackMessage && <p className="text-red-500 mb-2">{feedbackMessage}</p>}
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            <textarea
              className="w-full p-2 border rounded-lg shadow-sm"
              placeholder="Write a review..."
              rows="4"
              value={reviewText}
              onChange={handleReviewChange}
            />
            <div className="my-4">
              <span className="text-lg font-semibold">Rating:</span>
              <div className="flex mt-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-yellow-500 ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="mt-2 px-4 py-2 bg-[#FFD0D0] text-black rounded-lg hover:bg-[#DE8816]">
              Submit
            </button>
          </form>
        </div>
        <div>
          <div className="space-y-4">
            {reviewsData.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex flex-col items-start mb-2">
                  <h5 className="text-xl font-semibold">{review.name}</h5>
                  <span className="text-yellow-500 ml-2">
                    {Array(review.rating).fill("⭐")}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
