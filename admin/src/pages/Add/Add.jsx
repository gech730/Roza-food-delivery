import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
const Add = () => {
  return (
    <div className='add'>
        <form className='flex-col'>
            <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={assets.upload_area} alt="" />
                    </label>
                    <input type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input type="text" name='name' placeholder='type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name="descrption" rows={6} id="" placeholder='write content here'></textarea>
            </div>
            <div className="add-catagory  flex-col">
                <p>Product Ctegory</p>
                <select name="category" id="">
                    <option value="salad">salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure">Pure</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price 
            flex-col">
                <p>Product Price</p>
                <input type="Number" name="price" placeholder='$20' id="" />
            </div>
            <button type="submit" className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add