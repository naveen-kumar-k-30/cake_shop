import PropTypes from 'prop-types'; 
const PaymentButton = ({ totalAmount }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Create an order on the server
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Amount in smallest currency unit
      });

      const orderData = await response.json();

      // Step 2: Setup Razorpay options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Razorpay Dashboard
        amount: orderData.amount, // Amount is in currency subunits
        currency: "INR",
        name: "Milady's pastries",
        description: "Order Payment",
        image: "https://ik.imagekit.io/os5tqthul/Cakes/Screenshot_2024-09-25_130807-removebg-preview.png?updatedAt=1727250073417", // Optional: Your logo URL
        order_id: orderData.id, // Order ID from the server
        handler: (response) => {
          // Step 3: Handle the payment response
          alert(`Payment successful: ${response.razorpay_payment_id}`);
          // TODO: You can make another API call to verify the payment and update your order status
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Customer address",
        },
        theme: {
          color: "#F37254", // Custom color for Razorpay checkout form
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

  return (
    <button onClick={handlePayment}  className='bg-[#FFD0D0] hover:bg-red-400 px-3 py-1  rounded-lg'>
      Pay Now
    </button>
  );
};



export default PaymentButton;
