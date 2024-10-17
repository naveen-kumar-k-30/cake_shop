import { useState, useEffect } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ReceiptIndianRupee,Trash2 } from "lucide-react";
import toast from 'react-hot-toast';
// const{ RAZORPAY_ID_KEY,RAZORPAY_SECRET_KEY} from process.env;
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`https://cake-shop-backend-1.onrender.com/cart-items`, {
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
      await axios.delete(`https://cake-shop-backend-1.onrender.com/cart-item`, {
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

  const handlePayment = async () => {
    try {
      // Step 1: Create an order on the server
      const response = await fetch('https://cake-shop-backend-1.onrender.com/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Amount in smallest currency unit
      });

      const orderData = await response.json();

      // Step 2: Setup Razorpay options
      const options = {
        key: "", // Your Razorpay key ID
        key_secret:"", // Your Razorpay key secret
        amount: orderData.amount * 100, // Amount is in currency subunits
        currency: "INR",
        name: "Milady's pastries",
        description: "Order Payment",
        image: "https://ik.imagekit.io/os5tqthul/Cakes/Screenshot_2024-09-25_130807-removebg-preview.png?updatedAt=1727250073417",
        order_id: orderData.id, // Order ID from the server
        handler: (response) => {
          // Step 3: Handle the payment response
          alert(`Payment successful: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Naveen kumar",
          email: "naveenkarthikeyan3003@gmail.com",
          contact: "8122701989",
        },
        notes: {
          address: "no-11 3rd street,Abirami nagar,nerkundram ,chennai -600107",
        },
        theme: {
          color: "#F37254",
        },
      };

      // Step 4: Open Razorpay payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment. Please try again.");
    }
  };

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
        <button onClick={handlePayment} className='bg-[#FFD0D0] hover:bg-red-400 px-3 py-1 rounded-lg mt-4'>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
