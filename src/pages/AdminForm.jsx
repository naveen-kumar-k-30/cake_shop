// CardForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { Trash2 } from "lucide-react";

const CardForm = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // You can customize the animation duration
    });
  }, []);
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [image, setImage] = useState("");
  const [items, setItems] = useState([{ name: "", price: "", image: "" }]);

  // Function to handle adding a new item
  const handleAddItem = () => {
    setItems([...items, { name: "", price: "", image: "" }]);
  };

  // Function to handle updating an item
  const handleItemChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index][event.target.name] = event.target.value;
    setItems(updatedItems);
  };

  // Function to handle deleting an item
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/cards", {
        title,
        para,
        image,
        items,
      });

      if (response.status === 201) {
        toast.success("Card created successfully");
        // Reset the form fields after successful submission
        setTitle("");
        setPara("");
        setImage("");
        setItems([{ name: "", price: "", image: "" }]);
      }
    } catch (error) {
      console.error("Error creating card:", error.message);
      toast.error("Failed to create card");
    }
  };

  return (
    <div className="2xl:container mx-auto">
      <div className="w-[90%] mx-auto shadow-lg rounded-3xl p-5 "data-aos="fade-right">
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4 underline">
            Create a New Card
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            
          >
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={para}
                  onChange={(e) => setPara(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <h3 className="font-semibold text-xl">Item</h3>
            <div>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-6">
                  <div >
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      className="w-full p-1 border rounded-lg"
                      onChange={(e) => handleItemChange(index, e)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={item.price}
                      className="w-full p-1 border rounded-lg"
                      onChange={(e) => handleItemChange(index, e)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">
                      Image URL:
                      <input
                        type="text"
                        name="image"
                        value={item.image}
                        className="w-full p-1 border rounded-lg"
                        onChange={(e) => handleItemChange(index, e)}
                        required
                      />
                    </label>
                  </div>

                  <button type="button" onClick={() => handleDeleteItem(index)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </div>
              ))}

            </div>
              <button
                type="button"
                className="w-full bg-[#FFD0D0] text-black py-2 rounded-lg hover:bg-[#DE8816] transition-colors"
                onClick={handleAddItem}
              >
                Add Item
              </button>

            <button
              type="submit"
              className="w-full bg-[#FFD0D0] text-black py-2 rounded-lg hover:bg-[#DE8816] transition-colors"
            >
              Create Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
