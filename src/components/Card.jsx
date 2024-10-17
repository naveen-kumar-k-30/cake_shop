import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "./Loader"; // Make sure the path to Loader is correct

const Card = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("https://cake-shop-backend-1.onrender.com/cards");
        const data = response.data;
        setCards(data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error in fetching cards", error);
        setLoading(false); // Set loading to false even if there’s an error
        // test
      }
    };
    fetchCards();
  }, []);

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="2xl:container mx-auto">
      <div className="w-[90%] mx-auto flex flex-col justify-center items-center gap-4 p-5">
        <div className="w-[90%] mx-auto grid grid-cols-1">
          <h1 className="playfair-display text-3xl text-center">
            Shop our popular Cake categories
          </h1>
        </div>
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map((card) => (
            <Link
              key={card.id}
              to={`/details/${card.id}`}
              state={{
                img: card.image,
                title: card.title,
                paragraph: card.para,
                items: card.items,
              }}
              className="block"
            >
              <div className="bg-white flex flex-col justify-center items-center shadow-lg p-4 gap-2 rounded-lg">
                <LazyLoadImage
                  alt={card.title}
                  effect="opacity"
                  src={card.image}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <p className="playfair-display text-center mt-2">
                  {card.title}
                </p>
                <p className="text-[#FFD700] playfair-display flex justify-center items-center">
                  View More
                  <ChevronRight className="w-5 ml-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
