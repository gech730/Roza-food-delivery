import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search, Users as UsersIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import './Users.css';

const Users = ({ url, token }) => {
  const [users, setUsers]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const LIMIT = 20;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (search) params.append('search', search);
      const res = await axios.get(`${url}/api/user/admin/list?${params}`, { headers: { token } });
      if (res.data.success) { setUsers(res.data.data); setTotal(res.data.total); }
    } catch { toast.error('Failed to fetch users'); }
    finally { setLoading(false); }
  }, [page, search, url, token]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleBlock = async (userId, blocked) => {
    try {
      const res = await axios.post(`${url}/api/user/admin/block`, { userId, blocked }, { headers: { token } });
      if (res.data.success) { toast.success(res.data.message); fetchUsers(); }
      else toast.error(res.data.message);
    } catch { toast.error('Failed to update user'); }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      const res = await axios.post(`${url}/api/user/admin/delete`, { userId }, { headers: { token } });
      if (res.data.success) { toast.success(res.data.message); fetchUsers(); }
      else toast.error(res.data.message);
    } catch { toast.error('Failed to delete user'); }
  };

  const pages = Math.ceil(total / LIMIT);

  return (
    <div style={{ animation: 'fadeIn .4s' }}>
      <div className="a-page-header">
        <div><h1>Users</h1><p>{total} registered users</p></div>
      </div>

      <div className="a-card users-toolbar">
        <div className="a-search">
          <Search size={18} />
          <input placeholder="Search by name or email…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
      </div>

      <div className="a-card">
        {loading ? (
          <div className="a-spinner-wrap"><div className="a-spinner" /></div>
        ) : users.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UsersIcon size={48} style={{ marginBottom: 12 }} />
            <div>No users found.</div>
          </div>
        ) : (
          <table className="a-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Email</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td style={{ color: 'var(--muted)', fontSize: 12 }}>{(page - 1) * LIMIT + i + 1}</td>
                  <td>
                    <div className="user-name-cell">
                      <div className="user-avatar">{user.name?.[0]?.toUpperCase() || '?'}</div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text2)' }}>{user.email}</td>
                  <td>
                    <span className="a-badge" style={{ background: user.isBlocked ? '#fef2f2' : '#dcfce7', color: user.isBlocked ? '#ef4444' : '#16a34a' }}>
                      {user.isBlocked ? '🚫 Blocked' : '✓ Active'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: 12 }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="user-actions">
                      <button
                        className={`a-btn a-btn-sm ${user.isBlocked ? 'a-btn-ghost' : 'a-btn-danger'}`}
                        onClick={() => handleBlock(user._id, !user.isBlocked)}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button className="a-btn a-btn-sm a-btn-danger" onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pages > 1 && (
        <div className="a-pagination">
          <div className="a-pagination-info">Page {page} of {pages}</div>
          <div className="a-pagination-controls">
            <button className="a-btn a-btn-outline a-btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
             <ChevronLeft size={16} /> Prev
            </button>
            <button className="a-btn a-btn-outline a-btn-sm" disabled={page === pages} onClick={() => setPage(p => p + 1)}>
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
