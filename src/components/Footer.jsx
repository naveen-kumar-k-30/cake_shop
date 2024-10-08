import {  Instagram, MessageCircleReply, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer >
      <div className="bg-[#FFD0D0] py-4">
        <div className="grid grid-cols-2 items-center justify-center">
          <div>
            <p className="great-vibes font-bold text-[#DE8816] text-center">
              &copy; Milady&apos;s Pastries
            </p>
          </div>

          <div className="flex justify-center">
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="https://wa.me/8122701989" // Replace with your WhatsApp number
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <button className="text-gray-700 hover:text-gray-900">
                    <MessageCircleReply className="h-6 w-6" />
                  </button>
                </Link>
              </li>
              
              <li>
                <Link
                  to="https://www.instagram.com/themiladyspastries?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  aria-label="Instagram"
                >
                  <button className="text-gray-700 hover:text-gray-900">
                    <Instagram className="h-6 w-6" />
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  to="https://jsdl.in/DT-209QGHN8CBT"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shipping Information"
                >
                  <button className="text-gray-700 hover:text-gray-900">
                    <Truck className="h-6 w-6" />
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
