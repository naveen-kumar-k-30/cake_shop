import { useState, useEffect } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ReceiptIndianRupee,Trash2 } from "lucide-react";
import toast from 'react-hot-toast';
import PaymentButton from "../components/PaymentButton";
import {loadStripe} from '@stripe/stripe-js';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`https://cake-shop-backend-44w4.onrender.com/cart-items`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(response.data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cake-shop-backend-44w4.onrender.com/cart-item`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id } // Send the ID in the request body
      });
      setCartItems(cartItems.filter(item => item.id !== id));
      toast.success("Item removed from cart successfully.");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart. Please try again.");
    }
  };

  // Step 2: Calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => acc + item.cardItem.rate * item.quantity, 0);

  if (loading) return <p>Loading...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-center text-4xl playfair-display mt-4 mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg p-4 rounded-lg flex flex-col justify-center items-center relative">
            <LazyLoadImage alt={item.cardItem.title} effect="opacity" src={item.cardItem.image} className="w-full h-48 object-cover rounded-t-lg" />
            <p className="playfair-display text-center mt-2">{item.cardItem.title}</p>
            <div className="flex gap-2 items-center justify-center">
              <ReceiptIndianRupee className="text-[#FFD700] w-5" />
              <p className="playfair-display text-center mt-1">{item.cardItem.rate}</p>
            </div>
            <p className="playfair-display text-center mt-2">Quantity: {item.quantity}</p>
            <PaymentButton totalAmount={totalAmount} /> {/* Pass totalAmount here */}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 text-white p-2 rounded-full"
            >
             <Trash2 className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
      <div className="text-center">

        <h2 className="text-2xl mt-4">Total Amount: ₹{totalAmount}</h2>
        <div className="text-black"
          dangerouslySetInnerHTML={{
            __html: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_P6pnUcQ9F4DN2R" async></script></form>`
          }}
        />
      </div>
    </div>
  );
};

export default Cart;
