import React from "react";
import { FaUser, FaEnvelope, FaComment, FaPhone } from 'react-icons/fa';
import MapLocation from "./Maplocation";

export default function Contact() {
    const [result, setResult] = React.useState("");
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "af5421fd-7d49-4c07-a975-62afcb99ee0a");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  
    return (
      <div className="bg-cover p-3 bg-center pt-12 font-playwrite" style={{backgroundImage: "url('')"}}>
        <div className="max-w-6xl mx-auto mt-10 p-4  bg-transparent backdrop-filter bg-opacity-10 rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="w-full  p-5 ">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 pl-10"
                  placeholder="Your Name"
                />
                <FaUser className="h-6 w-6 text-gray-400 absolute left-3 top-3" />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 pl-10"
                  placeholder="Your Email"
                />
                <FaEnvelope className="h-6 w-6 text-gray-400 absolute left-3 top-3" />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 pl-10"
                  placeholder="Your Phone"
                />
                <FaPhone className="h-6 w-6 text-gray-400 absolute left-3 top-3" />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 h-40 resize-none pl-10"
                  placeholder="Your Message"
                ></textarea>
                <FaComment className="h-6 w-6 text-gray-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#DE8816] to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-400 hover:to-orange-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Send Message
              </button>
            </form>
            <span className={`block mt-6 text-center text-sm ${result.includes("Successfully") ? "text-green-600" : "text-red-600"} font-semibold`}>{result}</span>
          </div>
          <MapLocation/>
        </div>
      </div>
    );
  }