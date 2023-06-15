import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    medicalRecordNo: '',
    dokterId: '',
    date: '',
    time: '',
    obatId: '',
    pasienId: '',
  });
  const [newData, setNewData] = useState({
    medicalRecordNo: '',
    dokterId: '',
    date: '',
    time: '',
    obatId: '',
    pasienId: '',
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/pemeriksaans');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditData({
      id: item._id,
      medicalRecordNo: item.medicalRecordNo,
      dokterId: item.dokterId,
      date: item.date,
      time: item.time,
      obatId: item.obatId,
      pasienId: item.pasienId,
    });
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    try {
      const response = await fetch(`http://localhost:5001/api/pemeriksaans/${item._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting data: ' + response.statusText);
      }

      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await fetch(`http://localhost:5001/api/pemeriksaans/${editData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData),
        });

        if (!response.ok) {
          throw new Error('Error updating data: ' + response.statusText);
        }
      } else {
        const response = await fetch('http://localhost:5001/api/pemeriksaans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        if (!response.ok) {
          throw new Error('Error posting data: ' + response.statusText);
        }
      }

      setShowModal(false);
      setEditMode(false);
      setEditData({
        id: '',
        medicalRecordNo: '',
        dokterId: '',
        date: '',
        time: '',
        obatId: '',
        pasienId: '',
      });
      setNewData({
        medicalRecordNo: '',
        dokterId: '',
        date: '',
        time: '',
        obatId: '',
        pasienId: '',
      });
      fetchData();
    } catch (error) {
      console.error('Error posting/updating data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditData({
      id: '',
      medicalRecordNo: '',
      dokterId: '',
      date: '',
      time: '',
      obatId: '',
      pasienId: '',
    });
    setNewData({
      medicalRecordNo: '',
      dokterId: '',
      date: '',
      time: '',
      obatId: '',
      pasienId: '',
    });
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial', padding: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Data Pemeriksaan</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Data
      </Button>

      {data.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Medical Record No</th>
              <th>Dokter ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Obat ID</th>
              <th>Pasien ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.medicalRecordNo}</td>
                <td>{item.dokterId}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.obatId}</td>
                <td>{item.pasienId}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading data...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Data' : 'Add Data'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMedicalRecordNo">
              <Form.Label>Medical Record No</Form.Label>
              <Form.Control
                type="text"
                name="medicalRecordNo"
                value={editMode ? editData.medicalRecordNo : newData.medicalRecordNo}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDokterId">
              <Form.Label>Dokter ID</Form.Label>
              <Form.Control
                type="text"
                name="dokterId"
                value={editMode ? editData.dokterId : newData.dokterId}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={editMode ? editData.date : newData.date}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={editMode ? editData.time : newData.time}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formObatId">
              <Form.Label>Obat ID</Form.Label>
              <Form.Control
                type="text"
                name="obatId"
                value={editMode ? editData.obatId : newData.obatId}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPasienId">
              <Form.Label>Pasien ID</Form.Label>
              <Form.Control
                type="text"
                name="pasienId"
                value={editMode ? editData.pasienId : newData.pasienId}
                onChange={editMode ? handleEditInputChange : handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyComponent;
