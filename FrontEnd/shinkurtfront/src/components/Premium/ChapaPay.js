import React, { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
    
  let eml=null
  let emlnoQout=null

  const bank = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/signin', { replace: true });
    } else {
       eml = localStorage.getItem('email');
       emlnoQout = eml.replace(/^['"](.+(?=['"]$))['"]$/, '$1');
      setAmount(birr);
       
      try {
        const response = await axios.get('https://localhost:44372/api/Chapa/GetChapaListBank');
        if (response) {
            serBanks(response.data)
            await chapaPage();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
 
const chapaPage=async()=>{
      try{ 
    const resURL= await axios.post("https://localhost:44372/api/Chapa/ChapaPay", {
      id:(Math.random() + 1).toString(36).substring(7),
      eamil: emlnoQout,
      fName: firstName.toString(),
      lName: lastName.toString(),
      amount: amount,
      isPaid: true
      });
       if(resURL){
        setIsLoading(false);
        window.location.href = resURL.data;
       }
}catch(err){
  console.log(err)
}
}
//
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
