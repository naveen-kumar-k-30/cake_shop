import React, { useState, useEffect } from "react";
import axios from 'axios';
import { backendURL } from "../utils/urls";
import toast from "react-hot-toast";
const CheckoutForm = ({ isOpen, onClose, cartItems, totalAmount }) => {
  if (!isOpen) return null;
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(
    cartItems.map((item) => ({
      name: "",
      eventName: "",
      address: "",
      decorationName: "",
      deliveryDate: "",
      deliveryTime: "",
      quantity: item.quantity, // Store quantity for each cake item
    }))
  );

  const [sameDetailsForAll, setSameDetailsForAll] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data.user;
        setUserId(userData.userId);
        console.log(userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to authenticate user. Please log in again.");
      }
    };

    fetchUser();
  }, [token, userId]);

  const handleChange = (index, e) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [e.target.name]: e.target.value,
    };

    if (sameDetailsForAll) {
      // If checkbox is selected, apply the same details for all cakes
      setFormData(
        updatedFormData.map((data) => ({
          ...data,
          [e.target.name]: e.target.value,
        }))
      );
    } else {
      setFormData(updatedFormData);
    }
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;  // Prevent multiple submissions
    setIsSubmitting(true);
    // Ensure cartItems, totalAmount, and userId are available in the state
    const checkoutData = {
      items: cartItems.map((item, index) => ({
        quantity: item.quantity,
        cardItemId: item.cardItem.id,
        ...formData[index], // Assuming formData contains extra form fields for each item
      })),
      totalAmount,        // Total amount for the order
      authId: userId,     // Assuming you have userId available from auth context or state
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    // Validate checkout data before proceeding
    if (!userId || !cartItems.length || totalAmount <= 0) {
      toast.error("Invalid checkout data! Please check your cart and try again.");
      return;
    }
  
    console.log("Checkout Data:", checkoutData);
  
    try {
      // Make POST request to your backend using Axios
      const response = await axios.post(`${backendURL}/checkout`, checkoutData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token-based authentication
        },
      });
  
      console.log("Checkout success:", response.data);
      toast.success("Checkout successful!");
      onClose(); // Assuming onClose is a function that closes the checkout form/modal
    } catch (err) {
      console.error('Checkout error:', err.stack || err.message);
      toast.error("Checkout failed! Please try again.");
    }
    setIsSubmitting(false);
  };
  

  const handleSameDetailsCheckbox = (e) => {
    setSameDetailsForAll(e.target.checked);

    if (e.target.checked) {
      // Apply the details of the first cake to all cakes
      const firstCakeDetails = formData[0];
      setFormData(formData.map(() => ({ ...firstCakeDetails })));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center   ">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg mt-20 max-h-[80vh] overflow-y-auto overflow-hidden scrollbar-hide">
        <h2 className="text-2xl mb-4">Checkout Form</h2>

        {/* Display cart items */}
        <div className="mb-6">
          <h3 className="text-xl mb-2">Items in your cart:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="border-b py-2">
                <p className="font-semibold">
                  {item.cardItem.title} (x{item.quantity})
                </p>
                <p>Price: ₹{item.cardItem.rate}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Checkbox for same details */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={sameDetailsForAll}
              onChange={handleSameDetailsCheckbox}
            />
            <span className="ml-2">Use the same details for all cakes</span>
          </label>
        </div>

        {/* Dynamic form fields for each cake */}
        <form onSubmit={handleSubmit}>
          {cartItems.map((item, index) => (
            <div key={item.id} className="mb-8">
              <h4 className="text-lg font-semibold mb-2">
                {item.cardItem.title}
              </h4>

              {/* Repeat input fields based on quantity */}
              {[...Array(item.quantity)].map((_, qIndex) => (
                <div key={qIndex} className="mb-6">
                  <h5 className="font-medium">Cake {qIndex + 1}:</h5>
                  <div className="mb-4">
                    <label className="block text-lg mb-2">Your Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData[index].name}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg mb-2">
                      Cake Decoration Name:
                    </label>
                    <input
                      type="text"
                      name="decorationName"
                      value={formData[index].decorationName}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg mb-2">Event Name:</label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData[index].eventName}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg mb-2">Address:</label>
                    <textarea
                      name="address"
                      value={formData[index].address}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg mb-2">Delivery Date:</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData[index].deliveryDate}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-lg mb-2">Delivery Time:</label>
                    <input
                      type="time"
                      name="deliveryTime"
                      value={formData[index].deliveryTime}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
          <p className=" text-red-500 px-4 py-2 rounded-lg font-semibold">
            Total amount : <span className="text-[#DE8816] font-bold">{totalAmount}</span>
          </p>
          <div className="flex justify-end gap-4">
            {/* <button
              type="button"
              className="bg-gray-400 text-red-500 px-4 py-2 rounded-lg"
            >
              Pay {totalAmount}
            </button> */}
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
