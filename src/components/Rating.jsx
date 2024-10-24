import { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch reviews data from the backend
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://cake-shop-backend-1.onrender.com/reviews"
        );
        setReviews(response.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to fetch reviews");
      }
    };

    fetchReviews();
  }, []);

  const maxRating = 5; // Maximum possible rating value

  // Calculate total reviews and the distribution of each rating (1 to 5)
  const totalReviews = reviews.length;
  const ratingCounts = Array(maxRating).fill(0); // [0, 0, 0, 0, 0]

  reviews.forEach((review) => {
    ratingCounts[review.rating - 1] += 1; // Increment the corresponding rating count
  });

  return (
    <div className="max-w-[95%] mx-auto rounded-xl shadow-2xl p-6 bg-white  mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className=" flex items-center justify-center">
          <img
            src="https://ik.imagekit.io/a2gpaui9b/cake%20shop/Screenshot%202024-10-06%20162128.png?updatedAt=1728212092683"
            alt="Proud to serve"
            className="w-[65%] h-[85%] md:w-[65%] md:h-[80%]  lg:w-[65%] lg:h-[80%] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full ">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <h4 className="text-lg mb-6">Based on {totalReviews} reviews</h4>

          {/* Display error message if any */}
          {error && <div className="text-red-500">{error}</div>}

          <div className="grid grid-rows-5 gap-4 mb-10 w-[90%] mx-auto">
            {ratingCounts.map((count, index) => {
              const rating = index + 1; // 1-based rating (1, 2, 3, 4, 5)
              const percentage = totalReviews
                ? (count / totalReviews) * 100
                : 0; // Calculate percentage for each rating

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
      </div>
      <div className="overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4  max-h-[80vh] overflow-y-auto md:overflow-x-auto px-4 scrollbar-hide">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 border rounded-xl shadow-xl min-w-full md:min-w-[25%] "
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex flex-col items-start">
                    <h5 className="text-xl font-semibold">
                      {review.auth.name}
                    </h5>
                    <span className="text-yellow-500">
                      {Array(review.rating).fill("⭐").join("")}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
                <div>
                  {review.cardItem.image ? (
                    <img
                      src={review.cardItem.image}
                      alt={`Image for ${review.cardItem.title}`}
                      className="w-32 h-32 rounded"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
