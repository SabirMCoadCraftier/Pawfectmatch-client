import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Eye, Trash2, Calendar, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiFetch } = useAuth();

  const fetchRequests = async () => {
    try {
      const data = await apiFetch('/adoption-requests/my');
      setRequests(data);
    } catch (err) {
      toast.error('Failed to fetch your adoption requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancelRequest = async (requestId, petName) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel your adoption request for ${petName}? This will permanently remove your application.`);
    if (!confirmCancel) return;

    try {
      await apiFetch(`/adoption-requests/${requestId}`, { method: 'DELETE' });
      toast.success(`Adoption request for ${petName} cancelled successfully.`);
      fetchRequests();
    } catch (err) {
      toast.error(err.message || 'Failed to cancel request');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="glass-panel" style={{ padding: '2rem 1.5rem' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>My Adoption Applications</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Track the status of your adoption requests and coordinate with pet shelters.
        </p>
      </div>

      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <span style={{ fontSize: '3rem' }}>💌</span>
          <h4 style={{ fontWeight: 700, margin: '1rem 0 0.5rem 0' }}>No Requests Filed</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            You haven't submitted any adoption applications yet. Find a pet you love and send a request!
          </p>
          <Link to="/all-pets" className="btn btn-primary">
            Explore Pets Available For Adoption
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {requests.map(req => {
            const reqDate = new Date(req.createdAt).toLocaleDateString();
            const pickupDate = new Date(req.pickupDate).toLocaleDateString();
            
            const petImage = req.petImage || `https://ui-avatars.com/api/?name=${req.petName}&background=f9a8d4&color=fff&size=100`;
            const petBreed = req.petId?.breed || 'Unknown';
            const petAge = req.petId?.age || 'N/A';

            return (
              <div
                key={req._id}
                className="glass-panel grid-requests-row"
                style={{
                  padding: '1.25rem',
                  border: '1px solid var(--border-glass)',
                  display: 'grid',
                  gridTemplateColumns: '100px 2fr 1.5fr',
                  gap: '1.5rem',
                  alignItems: 'center',
                  background: 'var(--bg-glass)'
                }}
              >
                <img
                  src={petImage}
                  alt={req.petName}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    border: '1px solid var(--border-glass)'
                  }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{req.petName}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Breed: {petBreed} • Age: {petAge} {petAge === 1 ? 'Year' : 'Years'}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FileText size={14} style={{ color: 'var(--primary)' }} />
                      Filed: {reqDate}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={14} style={{ color: 'var(--primary)' }} />
                      Pickup: <strong style={{ color: 'var(--text-primary)' }}>{pickupDate}</strong>
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '1rem',
                  justifyContent: 'center'
                }} className="requests-actions-col">
                  <div>
                    {req.status === 'pending' ? (
                      <span className="badge badge-warning" style={{ gap: '0.3rem' }}>
                        <Clock size={12} /> Pending Review
                      </span>
                    ) : req.status === 'approved' ? (
                      <span className="badge badge-success" style={{ gap: '0.3rem' }}>
                        <CheckCircle size={12} /> Approved
                      </span>
                    ) : (
                      <span className="badge badge-danger" style={{ gap: '0.3rem' }}>
                        <XCircle size={12} /> Rejected / Closed
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                      to={`/pets/${req.petId?._id || req.petId}`}
                      className="btn btn-secondary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', gap: '0.35rem' }}
                    >
                      <Eye size={14} />
                      View Details
                    </Link>

                    {req.status === 'pending' && (
                      <button
                        onClick={() => handleCancelRequest(req._id, req.petName)}
                        className="btn btn-secondary"
                        style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.8rem',
                          color: 'var(--danger)',
                          border: '1px solid var(--danger-soft)',
                          background: 'var(--danger-soft)',
                          gap: '0.35rem'
                        }}
                      >
                        <Trash2 size={14} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .grid-requests-row {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
            gap: 1rem !important;
          }
          .grid-requests-row div {
            align-items: center !important;
          }
          .requests-actions-col {
            align-items: center !important;
          }
        }
      `}</style>

    </div>
  );
};

export default MyRequests;