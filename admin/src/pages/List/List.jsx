import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search, Package, Edit2, Trash2 } from 'lucide-react';
import './List.css';

const List = ({ url, token }) => {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', category: '' });
  const [search, setSearch]     = useState('');

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/food/get`);
      if (res.data.success) setList(res.data.data);
      else toast.error(res.data.message);
    } catch { toast.error('Failed to fetch products'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchList(); }, []);

  const removeFood = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await axios.delete(`${url}/api/food/remove`, { data: { id }, headers: { token } });
      if (res.data.success) { toast.success(res.data.message); fetchList(); }
      else toast.error(res.data.message);
    } catch { toast.error('Failed to delete product'); }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({ name: item.name, description: item.description, price: item.price, category: item.category });
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.post(`${url}/api/food/update`, { id, ...editForm }, { headers: { token } });
      if (res.data.success) { toast.success(res.data.message); setEditingId(null); fetchList(); }
      else toast.error(res.data.message);
    } catch { toast.error('Failed to update product'); }
  };

  const filtered = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ animation: 'fadeIn .4s' }}>
      <div className="a-page-header">
        <div><h1>Products</h1><p>{list.length} items on menu</p></div>
      </div>

      <div className="a-card list-toolbar">
        <div className="a-search">
          <Search size={18} />
          <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="a-card">
        {loading ? (
          <div className="a-spinner-wrap"><div className="a-spinner" /></div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Package size={48} style={{ marginBottom: 12 }} />
            <div>No products found.</div>
          </div>
        ) : (
          <table className="a-table">
            <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item._id}>
                  <td><img src={`${url}/images/${item.image}`} alt={item.name} className="list-item-img" onError={e => { e.target.style.display = 'none'; }} /></td>
                  <td>
                    {editingId === item._id
                      ? <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                      : <strong style={{ fontSize: 14 }}>{item.name}</strong>
                    }
                  </td>
                  <td>
                    {editingId === item._id
                      ? <input value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} />
                      : <span className="a-badge" style={{ background: 'var(--surface2)', color: 'var(--text2)' }}>{item.category}</span>
                    }
                  </td>
                  <td>
                    {editingId === item._id
                      ? <input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} style={{ width: 90 }} />
                      : <span style={{ fontWeight: 700, color: 'var(--brand)' }}>${item.price}</span>
                    }
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {editingId === item._id ? (
                        <>
                          <button className="a-btn a-btn-primary a-btn-sm" onClick={() => saveEdit(item._id)}>Save</button>
                          <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => startEdit(item)}>
                            <Edit2 size={14} style={{ marginRight: 4 }} /> Edit
                          </button>
                          <button className="a-btn a-btn-danger a-btn-sm" onClick={() => removeFood(item._id)}>
                            <Trash2 size={14} style={{ marginRight: 4 }} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default List;
