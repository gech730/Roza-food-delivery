import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Search, 
  Users as UsersIcon, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  UserX,
  Trash2,
  Shield,
  ShieldOff
} from 'lucide-react';
import './Users.css';

const Users = ({ url, token }) => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const LIMIT = 20;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT });
      if (search) params.append('search', search);
      const res = await axios.get(`${url}/api/user/admin/list?${params}`, { headers: { token } });
      if (res.data.success) {
        setUsers(res.data.data);
        setTotal(res.data.total);
      }
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [page, search, url, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBlock = async (userId, blocked) => {
    try {
      const res = await axios.post(`${url}/api/user/admin/block`, { userId, blocked }, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchUsers();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      const res = await axios.post(`${url}/api/user/admin/delete`, { userId }, { headers: { token } });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchUsers();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const pages = Math.ceil(total / LIMIT);

  return (
    <div className="users-page">
      {/* Header */}
      <div className="a-page-header">
        <div>
          <h1>Users</h1>
          <p>{total} registered users</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="a-card users-toolbar">
        <div className="a-search">
          <Search size={16} className="a-search-icon" />
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="a-card">
        {loading ? (
          <div className="a-spinner-wrap">
            <div className="a-spinner" />
          </div>
        ) : users.length === 0 ? (
          <div className="a-empty">
            <UsersIcon size={48} strokeWidth={1.5} className="a-empty-icon" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="users-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id}>
                    <td>
                      <span className="user-index">{(page - 1) * LIMIT + i + 1}</span>
                    </td>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <span className="user-name">{user.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="user-email">{user.email}</span>
                    </td>
                    <td>
                      <span
                        className="a-badge"
                        style={{
                          background: user.isBlocked ? 'var(--danger-bg)' : 'var(--success-bg)',
                          color: user.isBlocked ? 'var(--danger)' : 'var(--success)'
                        }}
                      >
                        {user.isBlocked ? (
                          <>
                            <ShieldOff size={12} />
                            Blocked
                          </>
                        ) : (
                          <>
                            <UserCheck size={12} />
                            Active
                          </>
                        )}
                      </span>
                    </td>
                    <td>
                      <span className="user-date">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td>
                      <div className="user-actions">
                        <button
                          className={`a-btn a-btn-sm ${user.isBlocked ? 'a-btn-success' : 'a-btn-ghost'}`}
                          onClick={() => handleBlock(user._id, !user.isBlocked)}
                          title={user.isBlocked ? 'Unblock user' : 'Block user'}
                        >
                          {user.isBlocked ? (
                            <>
                              <Shield size={14} />
                              Unblock
                            </>
                          ) : (
                            <>
                              <UserX size={14} />
                              Block
                            </>
                          )}
                        </button>
                        <button
                          className="a-btn a-btn-sm a-btn-danger"
                          onClick={() => handleDelete(user._id)}
                          title="Delete user"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="a-pagination">
          <button
            className="a-btn a-btn-ghost a-btn-sm"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span>Page {page} of {pages}</span>
          <button
            className="a-btn a-btn-ghost a-btn-sm"
            disabled={page === pages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
