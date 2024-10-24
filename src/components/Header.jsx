import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PiSealQuestionFill,
  PiSignInDuotone,
  PiSignOutDuotone,
} from "react-icons/pi";
import { IoIosHome } from "react-icons/io";
import { FaGrinStars, FaShoppingCart } from "react-icons/fa";
import { LuCakeSlice } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { backendURL } from "../utils/urls";

const dummyData = [
  { title: "Anniversary gifts" },
  { title: "Gifts for him" },
  { title: "Gifts for her" },
  { title: "Wedding gifts" },
  { title: "Personalised gift ideas" },
  { title: "Housewarming gifts" },
  { title: "Friendship gifts" },
  { title: "Family gifts" },
  { title: "Professional gifts" },
  { title: "Long Distance gifts" },
];

function Header() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(dummyData);
  const [filterData, setFilterData] = useState(dummyData);
  const [searchdata, setSearchData] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  ); // State for storing user email
  const [loading, setLoading] = useState(true);
  const toggle = () => setShow(!show);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [hoveredItem, setHoveredItem] = useState(null);
  const handleSearch = () => {
    const searchedText = data.filter(
      (e) => e.title.toString().toLowerCase() === searchdata
    );
    setFilterData(searchedText);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (token) {
        try {
          const response = await axios.get(
            `${backendURL}/user`,
            {
              headers: { Authorization: `Bearer ${token}` }, // Use token for authorization
            }
          );
          setUserName(response.data.user.userName); // Adjust based on your response structure
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data. Please try again.");
          setUserName(""); // Reset username if fetch fails
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      } else {
        setUserName(""); // Reset username if no token
        setLoading(false); // Ensure loading is stopped when there’s no token
      }
    };

    fetchUserData();
  }, [userEmail]);

  // Update userEmail state on changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newUserEmail = localStorage.getItem("userEmail") || "";
      const newUserName = localStorage.getItem("userName") || "";
      setUserEmail(newUserEmail);
      setUserName(newUserName);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <header>
      <div className="2xl:container mx-auto bg-[#FFD0D0]">
        <div className="w-[90%] mx-auto grid grid-cols-2 lg:grid-cols-3 items-center justify-center py-4 border-b gap-4">
          <div className="flex items-center space-x-4">
            {/* Logo Image */}
            <img
              src="https://ik.imagekit.io/a2gpaui9b/cake%20shop/logo2.jpeg?updatedAt=1729010333451"
              alt="logo"
              className="w-10 lg:w-16 rounded-full"
            />
            {/* Text that only appears on large screens */}
            <p className="text-2xl lg:text-3xl great-vibes font-bold text-[#DE8816] hidden md:block lg:block ">
              The Milady&apos;s Pastries
            </p>
          </div>

          <div className="relative col-span-2 lg:col-span-1 order-3 lg:order-2">
            <div className="bg-white border rounded-full p-1 flex items-center">
              <input
                type="text"
                placeholder="Search for anything"
                className="flex-grow px-4 py-2 text-gray-700 rounded-l-full focus:outline-none"
                onClick={toggle}
                onChange={(e) => {
                  const typedValue = e.target.value.toString().toLowerCase();
                  const filteredData = data.filter((e1) =>
                    e1.title.toString().toLowerCase().includes(typedValue)
                  );
                  setFilterData(filteredData);
                  setSearchData(typedValue);
                }}
              />
              <button
                onClick={handleSearch}
                className="bg-[#DE8816] hover:bg-yellow-500 rounded-full p-2 flex justify-center items-center"
              >
                <Search className="text-white" />
              </button>
            </div>
            <div className={show ? "block" : "hidden"}>
              <div className="absolute bg-white w-full mt-1 shadow-lg rounded-lg z-10">
                {filterData.length > 0 ? (
                  filterData.map((e, index) => (
                    <p
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200"
                      onClick={toggle}
                    >
                      {e.title}
                    </p>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu and Hamburger Icon */}
          <div className="order-2 lg:order-3 flex justify-end ">
            {/* Hamburger Icon */}
            {menuOpen ? (
              <button
                onClick={toggleMenu}
                className="lg:hidden ml-5 focus:outline-none text-red-500"
              >
                <MdOutlineRemoveCircle className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={toggleMenu}
                className="lg:hidden ml-5 focus:outline-none text-white"
              >
                <GiHamburgerMenu className="w-6 h-6" />
              </button>
            )}

            {/* Navigation Links */}
            <ul
              className={`${
                menuOpen ? "block" : "hidden"
              } lg:flex lg:space-x-4 space-y-4 lg:space-y-0 absolute lg:relative z-50 lg:flex-row flex flex-col lg:items-center bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg shadow-lg lg:shadow-none mt-8 lg:mt-0 w-[90%] mx-auto`}
            >
              <li>
                <Link to="/home">
                  <button
                    onClick={toggleMenu}
                    onMouseEnter={() => setHoveredItem("home")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                  >
                    {hoveredItem === "home" && (
                      <IoIosHome className="w-5 h-5" />
                    )}
                    <span>Home</span>
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <button
                    onClick={toggleMenu}
                    onMouseEnter={() => setHoveredItem("about")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                  >
                    {hoveredItem === "about" && (
                      <PiSealQuestionFill className="w-5 h-5" />
                    )}
                    <span>About</span>
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/review">
                  <button
                    onClick={toggleMenu}
                    onMouseEnter={() => setHoveredItem("review")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                  >
                    {hoveredItem === "review" && (
                      <FaGrinStars className="w-5 h-5" />
                    )}
                    <span>Reviews</span>
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/orders">
                  <button
                    onClick={toggleMenu}
                    onMouseEnter={() => setHoveredItem("orders")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                  >
                    {hoveredItem === "orders" && (
                      <LuCakeSlice className="w-5 h-5" />
                    )}
                    <span>Orders</span>
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <button
                    onClick={toggleMenu}
                    onMouseEnter={() => setHoveredItem("cart")}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                  >
                    {hoveredItem === "cart" && (
                      <FaShoppingCart className="w-5 h-5" />
                    )}
                    <span>Cart</span>
                  </button>
                </Link>
              </li>
              {userEmail ? (
                <>
                  <li>
                    <Link to="/logout">
                      <button
                        onClick={toggleMenu}
                        onMouseEnter={() => setHoveredItem("logout")}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                      >
                        {hoveredItem === "logout" && (
                          <PiSignOutDuotone className="w-5 h-5" />
                        )}
                        <span>Logout</span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onMouseEnter={() => setHoveredItem("avatar")}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700 relative"
                    >
                     
                      <span className="ml-2 w-8 h-8 bg-[#DE8816] text-white rounded-full flex items-center justify-center text-sm font-medium relative">
                        {userName.charAt(0).toUpperCase()}
                      </span>

                      {/* Tooltip for Full Username */}
                      {hoveredItem === "avatar" && (
                        <div className="absolute -top-10 left-0 bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-md mt-20">
                          Welcome {userName}
                        </div>
                      )}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup">
                      <button
                        onClick={toggleMenu}
                        onMouseEnter={() => setHoveredItem("Signup")}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                      >
                        {hoveredItem === "Signup" && (
                          <CgProfile className="w-5 h-5" />
                        )}
                        <span>Signup</span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <button
                        onClick={toggleMenu}
                        onMouseEnter={() => setHoveredItem("Login")}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="flex items-center space-x-2 transition-colors duration-300 hover:text-[#DE8816] text-gray-700"
                      >
                        {hoveredItem === "Login" && (
                          <PiSignInDuotone className="w-5 h-5" />
                        )}
                        <span>Login</span>
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
