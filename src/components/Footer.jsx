import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-[#FFD0D0] text-black py-8 mt-10 ">
      <div className="container mx-auto px-4 w-[95%]">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Milady&apos;s Pastries</h3>
            <p className="text-gray-700 font-medium">Sweetening Moments, One Slice at a Time!</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg  font-semibold mb-4">Quick Links</h4>
            <ul className="text-gray-700 font-medium flex flex-col gap-2">
              <li>
                <Link to="/home" className="hover:text-[#DE8816]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#DE8816]">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#DE8816]">
                  Book an Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#DE8816]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="mt-5 space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 text-xl mr-3" />
                <p className="text-gray-700 font-medium">
                  Email:
                  <a
                    href="mailto:themiladyspastries@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-400 transition duration-300"
                  >
                    themiladyspastries@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex items-center">
                <FaWhatsapp className="text-green-600 text-xl mr-3" />
                <p className="text-gray-700 font-medium">
                  WhatsApp:
                  <Link
                    to="https://wa.me/8122701989"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-400 transition duration-300"
                  >
                    8122701989
                  </Link>
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 text-xl mr-3 flex-shrink-0" />
                <p className="text-gray-700 font-medium">
                  Address:
                  <span className="text-red-600 hover:text-red-400 transition duration-300">
                    The Miladys Pastries, Giri nivas, Munuswamy St, Sri
                    Venkatesh Nagar,Virugambakkam, Chennai, Tamil Nadu 600092
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                to="https://wa.me/8122701989"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600"
              >
                <FaWhatsapp className="text-2xl" />
              </Link>
              <Link
                to="https://www.instagram.com/themiladyspastries"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600"
              >
                <FaInstagram className="text-2xl" />
              </Link>
              <Link
                to="https://jsdl.in/DT-209QGHN8CBT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600"
              >
                <TbTruckDelivery className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          <p>&copy; Milady&apos;s Pastries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
