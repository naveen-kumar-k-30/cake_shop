import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

 
const Label = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // You can customize the animation duration
    });
  }, []);
  return (
    <div className="flex justify-center items-center h-full w-full "data-aos="zoom-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 border-2 border-[#DE8816] rounded-lg h-[75%] w-[75%] lg:w-[60%]">
        {/* Image is ordered below the text on smaller screens */}
        <img 
          src="https://ik.imagekit.io/a2gpaui9b/cake%20shop/cartoon.jpg?updatedAt=1728209115459" 
          alt="master img" 
          className="sm:order-2 md:order-2 lg:order-2 sm:h-72 md:h-80 lg:h-80 "
          data-aos="fade-right" 
        />
        <p data-aos="fade-left"
         className="p-5 sm:order-1 md:order-1 lg:order-1">
          At The Milady&apos;s Pastries, we bring a touch of elegance to every bite. Located in Virugambakkam, Chennai, our bakery specializes in crafting a wide variety of delightful cakes and pastries, each made with premium ingredients and a passion for perfection. Whether you&apos;re celebrating a special occasion or simply indulging, our team is dedicated to delivering the finest baked goods with exceptional taste and personalized service. Visit us for a sweet experience that&apos;s made to impress!
        </p>
      </div>
    </div>
  );
};

export default Label;
