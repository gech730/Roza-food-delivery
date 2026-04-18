import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Upload, Plus } from 'lucide-react';
import './Add.css';
import { assets } from '../../assets/assets';

const CATEGORIES = ['Salad','Rolls','Deserts','Sandwich','Cake','Pure Veg','Pasta','Noodles','Biryani','Drinks'];

const Add = ({ url, token }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: '', description: '', price: '', category: 'Salad' });

  const onChange = e => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Please upload a product image');
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(data).forEach(([k, v]) => form.append(k, k === 'price' ? Number(v) : v));
      form.append('image', image);
      const res = await axios.post(`${url}/api/food/add`, form, { headers: { token } });
      if (res.data.success) {
        toast.success('Product added successfully!');
        setData({ name: '', description: '', price: '', category: 'Salad' });
        setImage(null);
      } else toast.error(res.data.message);
    } catch { toast.error('Failed to add product'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ animation: 'fadeIn .4s' }}>
      <div className="a-page-header">
        <div><h1>Add Product</h1><p>Add a new item to the menu</p></div>
      </div>

      <div className="a-card add-form-card">
        <form onSubmit={onSubmit} className="add-form">
          {/* Image upload */}
          <div className="add-image-section">
            <label htmlFor="img-upload" className="add-image-label">
              {image
                ? <img src={URL.createObjectURL(image)} alt="Preview" className="add-image-preview" />
                : (
                  <div className="add-image-placeholder">
                    <Upload size={32} style={{ color: 'var(--muted)', marginBottom: 8 }} />
                    <p>Click to upload image</p>
                    <small>PNG, JPG up to 5MB</small>
                  </div>
                )
              }
            </label>
            <input id="img-upload" type="file" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
          </div>

          <div className="add-fields">
            <div className="add-field-group">
              <label>Product Name *</label>
              <input name="name" value={data.name} onChange={onChange} placeholder="e.g. Injera with Tibs" required />
            </div>

            <div className="add-field-group">
              <label>Description</label>
              <textarea name="description" value={data.description} onChange={onChange} rows={3} placeholder="Describe the dish…" />
            </div>

            <div className="add-row">
              <div className="add-field-group">
                <label>Category *</label>
                <select name="category" value={data.category} onChange={onChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="add-field-group">
                <label>Price (ETB) *</label>
                <input name="price" type="number" value={data.price} onChange={onChange} placeholder="e.g. 150" required min="1" />
              </div>
            </div>

            <button type="submit" className="a-btn a-btn-primary add-submit-btn" disabled={loading} style={{ width: 'auto', padding: '12px 24px' }}>
              {loading ? 'Adding…' : <><Plus size={18} style={{ marginRight: 6 }} /> Add Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
