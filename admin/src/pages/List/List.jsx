import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Search, 
  ShoppingBag, 
  Pencil, 
  Trash2, 
  X, 
  Check,
  ImageIcon
} from 'lucide-react';
import './List.css';

const List = ({ url, token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', category: '' });
  const [search, setSearch] = useState('');

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/food/get`);
      if (res.data.success) setList(res.data.data);
      else toast.error(res.data.message);
    } catch {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await axios.delete(`${url}/api/food/remove`, { data: { id }, headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({ 
      name: item.name, 
      description: item.description, 
      price: item.price, 
      category: item.category 
    });
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.post(`${url}/api/food/update`, { id, ...editForm }, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        setEditingId(null);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to update product');
    }
  };

  const filtered = list.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-page">
      {/* Header */}
      <div className="a-page-header">
        <div>
          <h1>Products</h1>
          <p>{list.length} items on menu</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="a-card list-toolbar">
        <div className="a-search">
          <Search size={16} className="a-search-icon" />
          <input
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="a-card">
        {loading ? (
          <div className="a-spinner-wrap">
            <div className="a-spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="a-empty">
            <ShoppingBag size={48} strokeWidth={1.5} className="a-empty-icon" />
            <p>No products found</p>
          </div>
        ) : (
          <div className="list-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div className="product-image-wrap">
                        <img
                          src={`${url}/images/${item.image}`}
                          alt={item.name}
                          className="product-image"
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                        <div className="product-image-fallback">
                          <ImageIcon size={20} />
                        </div>
                      </div>
                    </td>
                    <td>
                      {editingId === item._id ? (
                        <input
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          className="edit-input"
                        />
                      ) : (
                        <span className="product-name">{item.name}</span>
                      )}
                    </td>
                    <td>
                      {editingId === item._id ? (
                        <input
                          value={editForm.category}
                          onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                          className="edit-input"
                        />
                      ) : (
                        <span className="a-badge a-badge-neutral">{item.category}</span>
                      )}
                    </td>
                    <td>
                      {editingId === item._id ? (
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                          className="edit-input edit-input-price"
                        />
                      ) : (
                        <span className="product-price">${item.price}</span>
                      )}
                    </td>
                    <td>
                      <div className="product-actions">
                        {editingId === item._id ? (
                          <>
                            <button
                              className="a-btn a-btn-sm a-btn-primary"
                              onClick={() => saveEdit(item._id)}
                            >
                              <Check size={14} />
                              Save
                            </button>
                            <button
                              className="a-btn a-btn-sm a-btn-ghost"
                              onClick={() => setEditingId(null)}
                            >
                              <X size={14} />
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="a-btn a-btn-sm a-btn-ghost"
                              onClick={() => startEdit(item)}
                            >
                              <Pencil size={14} />
                              Edit
                            </button>
                            <button
                              className="a-btn a-btn-sm a-btn-danger"
                              onClick={() => removeFood(item._id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
