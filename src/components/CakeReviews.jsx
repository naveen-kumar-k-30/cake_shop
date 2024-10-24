import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { backendURL } from "../utils/urls";

const CakeReviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { img, title, Id } = location.state || {};

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const token = localStorage.getItem("token");
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const maxRating = 5; // Maximum rating value

  const totalReviews = reviews.length; // Total number of reviews

  // Array to store the count of each rating (1 to 5)
  const ratingCounts = Array(maxRating).fill(0);

  // Count the occurrences of each rating
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1] += 1;
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendURL}/user`);
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch user info");
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${backendURL}/cakeReviews/${Id}`);
        setReviews(response.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to fetch reviews");
      }
    };

    fetchUser();
    fetchReviews();
  }, [Id]);

  const handleAddReview = () => {
    setShowReviewForm(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.rating || !reviewData.comment) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendURL}/cakeReviews/${Id}`,
        { rating: Number(reviewData.rating), comment: reviewData.comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.msg) {
        toast.success("Review added successfully");
        setShowReviewForm(false);
        setReviewData({ rating: 0, comment: "" });
      }
    } catch (error) {
      console.error("Failed to add review:", error);

      if (error.response && error.response.status === 401) {
        toast.error("You need to log in to submit a review.");
      } else if (error.response && error.response.status === 404) {
        toast.error("This cake does not exist.");
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    }
  };

  if (!location.state) {
    toast.error("Missing cake details. Redirecting...");
    navigate(-1); // Navigate back if no state is provided
    return null;
  }

  return (
    <div className="w-[95%] mx-auto flex flex-col items-center mt-10 rounded-xl shadow-2xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
        <div className="flex flex-col items-center p-5  ">
          <p className="text-2xl md:text-3xl lg:text-3xl font-bold playfair-display mt-4 mb-6">
            {title}
          </p>
          <img
            src={img}
            alt={title}
            className="w-[65%] h-[65%] object-cover rounded-lg"
          />
          <button
            onClick={handleAddReview}
            className=" bg-gradient-to-r from-[#DE8816] to-orange-600 text-white font-bold py-3 px-4 mt-6 rounded-lg hover:from-orange-400 hover:to-orange-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Add Review
          </button>
        </div>

        {showReviewForm && (
          <div className=" flex justify-center items-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg  w-[90%] md:h-[60%] lg:h-[60%] mx-auto flex flex-col  gap-4 mb-6">
              <h2 className="text-2xl text-center playfair-display ">
                Write a Review
              </h2>
              <input
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({ ...reviewData, rating: e.target.value })
                }
                className="w-full p-2  border rounded-lg"
              />
              <textarea
                placeholder="Write your comment here..."
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
                className="w-full p-2  border rounded-lg"
              ></textarea>
              <div className="flex gap-4">
                <button
                  onClick={handleReviewSubmit}
                  className=" bg-gradient-to-r from-[#DE8816] to-orange-600 text-white font-bold py-3 px-4  rounded-lg hover:from-orange-400 hover:to-orange-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className=" bg-gradient-to-r from-[#FFD0D0] to-red-400 text-white font-bold py-3 px-4 rounded-lg hover:from-red-400  hover:to-red-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full ">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <h4 className="text-lg mb-6">Based on {totalReviews} reviews</h4>

          <div className="grid grid-rows-5 gap-4 mb-6 w-[90%] mx-auto">
            {ratingCounts.map((count, index) => {
              const rating = index + 1; // Convert index to rating (1-5)
              const percentage = totalReviews
                ? (count / totalReviews) * 100
                : 0; // Calculate percentage

              return (
                <div
                  key={rating}
                  className="flex items-center w-[90%] mx-auto "
                >
                  <span className="text-yellow-500">{"⭐".repeat(rating)}</span>
                  <div className="w-full bg-gray-300 rounded-full h-2 mx-2 flex">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-600  flex">
                    <p>{percentage.toFixed(0)}%</p>
                    <p> ({count})</p>
                    <p>reviews</p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg shadow-sm">
                <div className="flex flex-col items-start mb-2">
                  <h5 className="text-xl font-semibold text-black">
                    {review.auth.name}
                  </h5>
                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeReviews;
