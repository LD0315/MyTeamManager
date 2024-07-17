import React, { useState } from 'react';
import '../custom.css'; 

const MyTeam = () => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidMobile = (mobile) => {
    return /^[0-9]{10,}$/.test(mobile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email) {
      setError('First Name, Last Name, and Email are mandatory');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (mobile && !isValidMobile(mobile)) {
      setError('Mobile number must be numeric and at least 10 characters');
      return;
    }

    if (editIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { firstName, lastName, email, mobile };
      setUsers(updatedUsers);
      setEditIndex(-1);
    } else {
      if (users.some(user => user.firstName === firstName)) {
        setError('Duplicate user detected');
        return;
      }
      setUsers([...users, { firstName, lastName, email, mobile }]);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
    setError('');
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      const updatedUsers = users.filter((user, i) => i !== index);
      setUsers(updatedUsers);
    }
  };

  const handleEdit = (index) => {
    const { firstName, lastName, email, mobile } = users[index];
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setMobile(mobile || '');
    setEditIndex(index);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <div>
      <h2>My Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input type="tel" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">{editIndex !== -1 ? 'Save' : 'Add User'}</button>
      </form>

      <div className="add-space"></div>
      <h3>Team Members</h3>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal" style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="close" onClick={toggleModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this user?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
              <button type="button" className="btn btn-success" onClick={handleDelete}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
