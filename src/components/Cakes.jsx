import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../utils/urls";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ArrowBigDown,
  ArrowBigUpDash,
  MessageSquareDiff,
  ReceiptIndianRupee,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Cakes = () => {
  const [cakes, setCakes] = useState([]);
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${backendURL}/allcakes`);
        setCakes(response.data);
      } catch (error) {
        console.error("Error fetching cakes:", error);
      }
    };

    fetchCakes();
  }, []);

  const handleAddToCart = async (item) => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 1;

    try {
      const response = await axios.post(
        `${backendURL}/cart`,
        { cardItemId: item.id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.msg) {
        toast.success("Item added to cart successfully");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const updateQuantity = (item, delta) => {
    const newCart = [...cart];
    const cartItemIndex = newCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (cartItemIndex !== -1) {
      const newQuantity = newCart[cartItemIndex].quantity + delta;
      if (newQuantity > 0) {
        newCart[cartItemIndex].quantity = newQuantity;
      } else {
        newCart.splice(cartItemIndex, 1); // Remove item if quantity goes below 1
      }
    } else if (delta > 0) {
      newCart.push({ ...item, quantity: 1 });
    }

    setCart(newCart);
  };
  return (
    <>
        <h1 className="text-center text-3xl playfair-display mt-4 mb-4">
          All Cakes
        </h1>
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6 max-h-[100vh] rounded-xl shadow-2xl p-6 overflow-y-auto overflow-hidden scrollbar-hide">
        {cakes.length > 0 ? (
          cakes.map((cake) => (
            <Link 
            key={cake.id}
            to={`/cakeReviews/${cake.id}`}
            state={{img:cake.image,title:cake.title,Id:cake.id}}
            className="block"
            >
            <div
              key={cake.id}
              className="bg-white flex flex-col justify-center items-center shadow-lg p-4 gap-2 rounded-lg hover:bg-slate-100 transition duration-300 transform hover:scale-105"
            >
              <LazyLoadImage
                alt={cake.title}
                effect="opacity"
                src={cake.image}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <p className="playfair-display text-center mt-2">{cake.title}</p>
              <div className="flex gap-2 items-center justify-center">
                <ReceiptIndianRupee className="text-[#FFD700] w-5" />
                <p className="playfair-display text-center mt-1">{cake.rate}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(cake, -1)}
                  className="bg-[#DE8816] text-white py-1 px-3 rounded-lg hover:bg-orange-500 "
                >
                  <ArrowBigDown className="w-4 h-4" />
                </button>
                <p className="playfair-display text-center text-xl  mt-1">
                  {cart.find((cartItem) => cartItem.id === cake.id)?.quantity ||
                    0}
                </p>
                <button
                  onClick={() => updateQuantity(cake, 1)}
                  className="bg-[#DE8816] text-white py-1 px-3 rounded-lg hover:bg-orange-500"
                >
                  <ArrowBigUpDash className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <button
                    onClick={() => handleAddToCart(cake)}
                    className="mt-2 bg-[#FFD0D0] text-black py-2 px-4 rounded-lg hover:bg-red-400 flex items-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                  </button>
                </div>
                <div>
                  <Link
                    key={cake.id}
                    to={`/cakeReviews/${cake.id}`}
                    state={{ img: cake.image, title: cake.title, Id: cake.id }}
                  >
                    <button className="mt-2 bg-[#FFD0D0] text-black py-2 px-4 rounded-lg hover:bg-red-400 flex items-center gap-2">
                      <MessageSquareDiff className="w-5 h-5" />
                      Review
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center">No cakes available.</p>
        )}
      </div>
    </>
  );
};

export default Cakes;
