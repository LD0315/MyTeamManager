import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Example using Reactstrap for UI components
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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name *</Label>
          <Input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name *</Label>
          <Input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email Address *</Label>
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="mobile">Mobile Number</Label>
          <Input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </FormGroup>
        {error && <Alert color="danger">{error}</Alert>}
        <Button type="submit" color="primary">{editIndex !== -1 ? 'Save' : 'Add User'}</Button>
      </Form>

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
                <Button color="warning" onClick={() => handleEdit(index)}>Edit</Button>
                <Button color="danger" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
        <ModalBody>Are you sure you want to delete this user?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>Cancel</Button>
          <Button color="success" onClick={handleDelete}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyTeam;
