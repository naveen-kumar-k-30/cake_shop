const reviewsData = [
    {
      id: 1,
      name: "Emily Selman",
      rating: 5,
      comment:
        "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
    },
    {
      id: 2,
      name: "Hector Gibbons",
      rating: 5,
      comment:
        "Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
    },
    {
      id: 3,
      name: "Mark Edwards",
      rating: 4,
      comment:
        "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
    },
  ];
  
  const ratingDistribution = [
    { stars: 5, percentage: 63 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 12 },
    { stars: 1, percentage: 9 },
  ];
  
  const Reviews = () => {
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
            </div>
            <div className="mt-6">
              <textarea
                className="w-full p-2 border rounded-lg shadow-sm"
                placeholder="Write a review..."
                rows="4"
              />
              <button className="mt-2 px-4 py-2 bg-[#FFD0D0] text-black rounded-lg hover:bg-[#DE8816]">
                Submit
              </button>
            </div>
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