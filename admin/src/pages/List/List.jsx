import { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  /**
   * Fetch All Food Items
   * Retrieves list of all food items from the database
   */
  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/get`);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error(res.data.message || "Error fetching list");
      }
    } catch (error) {
      console.error("Fetch list error:", error);
      toast.error("Failed to fetch food list");
    }
  };

  /**
   * Remove Food Item
   * Deletes a food item from the database
   */
  const removeFood = async (foodId) => {
    try {
      const res = await axios.delete(`${url}/api/food/remove`, {
        data: { id: foodId },
        headers: { token }
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Remove food error:", error);
      toast.error("Failed to remove food item");
    }
  };

  /**
   * Enable Edit Mode
   * Sets the editing state and populates form with item data
   */
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category
    });
  };

  /**
   * Cancel Edit
   * Exits edit mode without saving changes
   */
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: '',
      description: '',
      price: '',
      category: ''
    });
  };

  /**
   * Save Food Item
   * Updates the food item with new data
   */
  const saveEdit = async (foodId) => {
    try {
      const res = await axios.post(
        `${url}/api/food/update`,
        {
          id: foodId,
          name: editForm.name,
          description: editForm.description,
          price: editForm.price,
          category: editForm.category
        },
        { headers: { token } }
      );
      
      if (res.data.success) {
        toast.success(res.data.message);
        setEditingId(null);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Update food error:", error);
      toast.error("Failed to update food item");
    }
  };

  // Fetch food list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='add list flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            {/* Image */}
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            
            {/* Name - editable or display */}
            {editingId === item._id ? (
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            ) : (
              <p>{item.name}</p>
            )}
            
            {/* Category - editable or display */}
            {editingId === item._id ? (
              <input
                type="text"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              />
            ) : (
              <p>{item.category}</p>
            )}
            
            {/* Price - editable or display */}
            {editingId === item._id ? (
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              />
            ) : (
              <p>£{item.price}</p>
            )}
            
            {/* Action buttons */}
            <div className="action-buttons">
              {editingId === item._id ? (
                <>
                  <button onClick={() => saveEdit(item._id)} className="save-btn">Save</button>
                  <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(item)} className="edit-btn">Edit</button>
                  <button onClick={() => removeFood(item._id)} className="cursor">X</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
