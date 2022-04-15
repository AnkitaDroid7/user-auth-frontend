import axios from './axios';
import React , { useState} from 'react';
import MainScreen from './MainScreen';
import { Form, Button} from "react-bootstrap";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
//import ReactPhoneInput from "react-phone-input-2";
//import Modal from './Modal';

function RegisterUser() {

    //const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [servicetype, setServicetype] = useState("");
    const [location, setLocation] = useState("");
    const [error,setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [picMessage, setPicMessage] = useState(null);
    const [pic, setPic] = useState(
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            );


     // const [answer, setAnswer] = useState(false);
        

    const submitHandler = async (e) => {

                e.preventDefault();

               const answer = window.confirm("Please confirm the details are true press ok for confirm and cancel for no?");
              if (answer) {
                // Save it!
                try{
                  setLoading(true);
                    const {data} = await axios.post(

                        "/api/users",
                        {name,email,phonenumber,servicetype,location,pic}
                    );

                    setLoading(false);
                    localStorage.setItem("userInfo", JSON.stringify(data));

                } catch (error) {
                    setError(error.response.data.message);
                }
      console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }

                
                
            };
/////////////////////////////////////////

  const postDetails = (pics) => {
                if (!pics) {
                return setPicMessage("Please Select an Image");
                }
                setPicMessage(null)
                if (pics.type === "image/jpeg" || pics.type === "image/png") {
                  console.log("Successful")
                  const data = new FormData();
                 data.append("file", pics);
                 data.append("upload_preset", "user_authentication");
                 fetch('https://api.cloudinary.com/v1_1/droid7-technolabs/image/upload', {
                                method: 'POST',
                                body: data
                              }).then((res) => res.json())
                    .then((data) => {
                    setPic(data.url.toString());
                    })
                    .catch((err) => {
                    console.log(err);
                    });

                }else {
                return setPicMessage("Please Select an Image");
                }
            };

  return (
      <MainScreen title="SUBMIT">
    <div className='loginContainer'>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
     <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
             value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
             value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
            value={phonenumber}
              placeholder="Phone Number"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            {/* <ReactPhoneInput
          // inputExtraProps={{
          //   name: "phone",
          //   required: true,
          //   autoFocus: true
          // }}
          defaultCountry={"sg"}
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        /> */}
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Service Type</Form.Label>
             <Form.Control as="select"
             type="select"
                value={servicetype}
             onChange={e => {
            console.log("e.target.value", e.target.value);
            setServicetype(e.target.value);
          }}
             >
              <option>Career Consulting</option>
                <option>Mock Interview</option>
                <option>Devops Consulting</option>
            </Form.Control>
          </Form.Group>
        <Form.Group controlId="formBasicText">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                    type="text"
                    value={location}
                    placeholder="Enter your location"
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>
          {/* {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )} */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Payment Screenshot</Form.Label>
             {/* <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
            />  */}
                <Form.Control type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                  label="Upload Payment Screenshot"
                />
          </Form.Group>
        <Button variant="primary" type="submit">
                    SUBMIT
                </Button>
              {/* {modalOpen && <Modal setOpenModal={setModalOpen} setAnswer={setAnswer} />} */}
            </Form>
    </div>
    </MainScreen>
  )
}

export default RegisterUser;