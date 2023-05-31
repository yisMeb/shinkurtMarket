import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MdOutlineDoubleArrow } from 'react-icons/md';

function ChapaPay() {
  const location = useLocation();
  const birr = location.state?.birr || null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [amount, setAmount] = useState(birr);
  const [banks,serBanks] =useState([])
  const navigate = useNavigate();

  const bank = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/signin', { replace: true });
    } else {
      const eml = localStorage.getItem('email');
      const emlnoQout = eml.replace(/^['"](.+(?=['"]$))['"]$/, '$1');
      setAmount(birr);
       
      try {
        const response = await axios.get('https://localhost:44372/api/Chapa/GetChapaListBank');
        if (response) {
            serBanks(response.data)
            console.log(banks[0].Name)

        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const isButtonDisabled = firstName === '' || lastName === '';

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="content-margin-overlap container">
      <Form>
        <Form.Group className="mb-3 col-lg-6" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="John" value={firstName} onChange={handleFirstNameChange} />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Doe" value={lastName} onChange={handleLastNameChange} />
        </Form.Group>
        <Button
          variant="primary"
          className="col-lg-6"
          style={{ backgroundColor: 'rgb(67, 185, 127)' }}
          onClick={bank}
          disabled={isButtonDisabled}
        >
          Proceed <MdOutlineDoubleArrow />
        </Button>
      </Form>
    </div>
  );
}

export default ChapaPay;
