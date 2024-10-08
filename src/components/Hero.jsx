// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';
const Hero = () => {
    // useEffect(() => {
    //     AOS.init({
    //       duration: 1000, // You can customize the animation duration
    //     });
    //   }, []);
    return (
      <>
        <div 
          className="relative w-full h-96 sm:h-screen md:h-screen lg:h-screen bg-no-repeat bg-center bg-cover" 
          style={{ 
            backgroundImage: 'url(https://ik.imagekit.io/a2gpaui9b/cake%20shop/Screenshot%202024-10-06%20162306.png?updatedAt=1728212092942)',
            backgroundSize: 'contain'  // Ensures the background scales correctly
          }}>
          {/* Content container */}
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] bg-white p-6 rounded-full flex flex-col items-center justify-center gap-4"
          >
            <p className="mt-2 text-center text-black">
              A homegrown bakery offering Custom birthday & wedding Cakes, Cupcakes, Brownies, Holiday Hampers, and much more made fresh to order.
            </p>
            <button className="text-3xl great-vibes font-bold bg-[#DE8816] border-2 border-[#DE8816] text-white rounded-full py-1 px-6">
              Order Now!!
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Hero;
  