import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Add.css';
import { assets } from '../../assets/assets';

/**
 * Add New Food Item Component
 * Allows admin to add new food items to the menu
 */
const Add = ({ url, token }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "salad"
  });

  /**
   * Handle Input Changes
   * Updates form data state when user types
   */
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  /**
   * Handle Form Submit
   * Sends food item data to backend
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Validate image
    if (!image) {
      return toast.error("Please upload an image");
    }

    // Validate required fields
    if (!data.name || !data.price) {
      return toast.error("Name and price are required");
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const res = await axios.post(`${url}/api/food/add`, formData, {
        headers: { token }
      });

      if (res.data.success) {
        // Reset form on success
        setData({
          name: "",
          description: "",
          price: "",
          category: "salad"
        });
        setImage(false);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Add food error:", error);
      toast.error(error.response?.data?.message || "Failed to add food item");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        {/* Image Upload Section */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              alt="Upload area" 
            />
          </label>
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image' 
            hidden 
            required 
            accept="image/*"
          />
        </div>

        {/* Product Name Section */}
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input 
            onChange={onChangeHandler} 
            value={data.name} 
            type="text" 
            name='name' 
            placeholder='Type product name' 
            required
          />
        </div>

        {/* Product Description Section */}
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea 
            onChange={onChangeHandler} 
            value={data.description} 
            name="description" 
            rows={3} 
            placeholder='Write product description'
          ></textarea>
        </div>

        {/* Category and Price Section */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Biryani">Biryani</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price (£)</p>
            <input 
              onChange={onChangeHandler} 
              value={data.price}  
              type="number" 
              name="price" 
              placeholder='20' 
              required
              min="0"
            />
          </div>
        </div>

        <button type="submit" className='add-btn'>ADD FOOD ITEM</button>
      </form>
    </div>
  );
};

export default Add;
