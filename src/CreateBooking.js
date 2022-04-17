import axios from './service';
import React, { useEffect, useState } from 'react';
import MainScreen from './MainScreen';
import { Form, Button, Modal, Row, Col, Card, Alert } from "react-bootstrap";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { BookIcon } from './svgs';
import { CONTACT_EMAIL, PAYMENT_NUMBER } from './config';

function CreateBooking() {

  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    email: '',
    phonenumber: '',
    location: '',
    servicetype: 'Career Consulting (1h) - ₹ 50'
  })
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState([null, null]);
  const [showModal, setShowModal] = useState(false)

  const [showSuccess, setShowSuccess] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    setShowModal(true)
  };

  const createBooking = async () => {
    setShowModal(false)
    setLoading(true);
    let formData = new FormData()
    const { name, email, phonenumber, location, servicetype } = bookingInfo
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phonenumber', phonenumber)
    formData.append('servicetype', servicetype)
    formData.append('location', location)
    let ip = ''
    await axios.get('https://ipapi.co/json/')
      .then((data) => {
        ip = data.data.ip
      })
    formData.append('ip', ip)
    formData.append('image', pic[0])
    axios.post("/api/bookings", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        setLoading(false);
        setShowSuccess(true)
        setBookingInfo({
          name: '',
          email: '',
          phonenumber: '',
          location: '',
          servicetype: ''
        })
        setPic([null, null])
        setTimeout(() => {
          setShowSuccess(false)
        }, 10000);
      }).catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      })
  }

  const getLocation = () => {
    axios.get('http://ip-api.com/json')
      .then((data) => {
        setBookingInfo({ ...bookingInfo, location: data.data.city + ', ' + data.data.regionName + ', ' + data.data.countryCode })
      });
  }

  const postDetails = (pics) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setPic([pics, reader.result])
    }
    reader.readAsDataURL(pics)
  };

  useEffect(() => {
    getLocation()
  }, [])


  return (
    <MainScreen title="Book Your Slot">
      <Row className='justify-content-center px-2'>
        <Col md={8} xs={12} className="position-relative">
          {

            showSuccess && <Alert variant="success">
              <Alert.Heading><BookIcon className="mx-2" style={{ width: 15 }} />Booked..</Alert.Heading>
              <p>
                Your booking is confirmed. Somebody from the team contact you soon.
              </p>
            </Alert>
          }
          <Card className='shadow p-4'>
            <Card.Body>
              <div className='loginContainer'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form className='row' onSubmit={submitHandler}>
                  <Form.Group className='mb-2 col-9' controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      required={true}
                      value={bookingInfo.name}
                      placeholder="Enter name"
                      onChange={(e) => setBookingInfo({ ...bookingInfo, name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className='mb-2 col-6' controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required={true}
                      value={bookingInfo.email}
                      placeholder="Enter email"
                      onChange={(e) => setBookingInfo({ ...bookingInfo, email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className='mb-2 col-6' controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      defaultCountry='US'
                      className='px-2 form-control'
                      numberInputProps={{ className: 'border-0' }}
                      placeholder="Enter phone number"
                      value={bookingInfo.phonenumber}
                      onChange={(val) => setBookingInfo({ ...bookingInfo, phonenumber: val })} />
                  </Form.Group>

                  <Form.Group className='mb-2 col-6' controlId="service">
                    <Form.Label>Service Type</Form.Label>
                    <Form.Control as="select"
                      type="select"
                      required={true}
                      value={bookingInfo.servicetype}
                      onChange={e => {
                        setBookingInfo({ ...bookingInfo, servicetype: e.target.value });
                      }}
                    >
                      <option>Career Consulting</option>
                      <option>Mock Interview</option>
                      <option>Devops Consulting</option>
                      <option disabled>Job support will not ne entertained</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Payment can be done via Phonepe, G-Pay to {PAYMENT_NUMBER}.<br />
                      Through PayPal send it to Deekshithsn
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className='col-6'>
                    <Form.Label>Cost</Form.Label>
                    <Card>
                      <Card.Body className='bg-light'>
                        <div>Career Consulting ( 1hour ) - ₹ 500</div>
                        <div>Mock Interview ( 1hour ) - ₹ 500</div>
                        <div>Devops Consulting ( 1hour ) - ₹ 500</div>
                      </Card.Body>
                    </Card>
                  </Form.Group>
                  <Form.Group className='mb-2 col-9' controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      disabled={true}
                      type="text"
                      value={bookingInfo.location}
                      placeholder="Enter your location"
                    />
                  </Form.Group>
                  <Form.Group className='mb-2 col-9' controlId="formFile">
                    <Form.Label>Upload Payment Screenshot</Form.Label>
                    <Form.Control accept='image/png,image/jpeg' required={true} type="file"
                      onChange={(e) => postDetails(e.target.files[0])}
                      label="Upload Payment Screenshot"
                    />
                  </Form.Group>
                  <div className='d-flex align-items-center justify-content-end mt-2'>
                    {loading && <Loading className="mt-1 px-2" size={20} />}
                    <Button variant="primary" type="submit" className='w-50'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>

        </Col>
      </Row>
      <div className='text-center py-2'>
        For any further queries contact <a style={{ textDecoration: 'none' }} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
      <Modal show={showModal} onHide={setShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              <div className="py-2 text-right text-secondary">Name: </div>
              <div className="py-2 text-right text-secondary">Email: </div>
              <div className="py-2 text-right text-secondary">Phone: </div>
              <div className="py-2 text-right text-secondary">Service: </div>
              <div className="py-2 text-right text-secondary">Location: </div>
              <div className="py-2 text-right text-secondary">Payment Screenshot: </div>
            </Col>
            <Col md={7}>
              <div className="py-2">{bookingInfo.name}</div>
              <div className="py-2">{bookingInfo.email}</div>
              <div className="py-2">{bookingInfo.phonenumber}</div>
              <div className="py-2">{bookingInfo.servicetype}</div>
              <div className="py-2">{bookingInfo.location}</div>
              <div className="py-2"><img src={pic[1]} alt='Payment Screenshot' width={250} /></div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className='px-4' variant="secondary" onClick={() => setShowModal(false)}>
            Edit
          </Button>
          <Button className='px-4' variant="primary" onClick={() => createBooking()}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </MainScreen>
  )
}

export default CreateBooking;