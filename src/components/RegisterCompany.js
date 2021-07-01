import { useState } from "react";
import axios from "axios";

const RegisterCompany = () => {
    const [message, setMessage] = useState("");
    const messageStyle = {
        display: message !== "" ? "block" : "none"
    };
    /*
    registerCompany - Gets the payload and make a post call to store in db.json
    */
    const registerCompany = async (payload) => { 
        const response = await axios.post("http://localhost:3002/company/", payload);
        let msgDIV = document.getElementById("statusMessage");
        if (response.status === 201) {
            setMessage("You have successfully registered your company!!!");
            msgDIV.classList.add("alert-success");
        } else {
            setMessage("Sorry, We could not process your request now. Please try again later...");
            msgDIV.classList.add("alert-danger");
        }

    };

    /*
    handleRegister - Gets the form data and prepare payload to make api call
    */
    const handleRegister = (e) => {
        e.preventDefault();
        let payload = {};
        payload = {
            "idType": e.target.elements.identificationType.value,
            "idNumber": e.target.elements.identificationNumber.value,
            "companyName": e.target.elements.companyName.value ? e.target.elements.companyName.value : "",
            "firstName": e.target.elements.firstName.value ? e.target.elements.firstName.value : "",
            "lastName": e.target.elements.lastName.value ? e.target.elements.lastName.value : "",
            "email": e.target.elements.email.value,
            "phoneNumber": e.target.elements.phoneNumber.value,
            "address": e.target.elements.address.value
        }
        registerCompany(payload);
    };

    /*
    setInputFieldsVisibility - Set the visibility for the fields based on identification type
    */
    const setInputFieldsVisibility = (e) => {
        let companyNameDIV = document.getElementById("companyNameContainer");
        let personNameDIV = document.getElementById("personNameContainer");
        let companyName = document.getElementById("companyName");
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName")
        if (e.target.value === "NIT" || e.target.value === "FOREIGN") {
            companyNameDIV.style.display = "block";
            companyName.required = true;
            personNameDIV.style.display = "none";
            firstName.required = false;
            lastName.required = false;
        } else {
            companyNameDIV.style.display = "none";
            companyName.required = false;
            personNameDIV.style.display = "block";
            firstName.required = true;
            lastName.required = true;
        }
    };

    return (
        <div className="register-container">
            <div id="statusMessage" className="alert" style={messageStyle}>
                {message}
            </div>
            <div className="container">
                <form onSubmit={handleRegister}>
                    <div className="form-group col-md-8">
                        <label htmlFor="identificationType">Choose type :</label>
                        <select id="identificationType" name="identificationType" onChange={setInputFieldsVisibility} required>
                            <option value="">Please select the type</option>
                            <option value="NIT">NIT</option>
                            <option value="FOREIGN">FOREIGN</option>
                            <option value="OTHERS">OTHERS</option>
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="identificationNumber">Identification Number:</label>
                        <input type="number" className="form-control" id="identificationNumber" placeholder="Enter Identification Number" name="identificationNumber" required />
                    </div>
                    <div id="companyNameContainer" className="form-group col-md-12">
                        <label htmlFor="companyName">Company Name:</label>
                        <input type="text" className="form-control" id="companyName" placeholder="Enter Company Name" name="companyName" required />
                    </div>
                    <div id="personNameContainer">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" name="firstName" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" name="lastName" required />
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="tel" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" name="phoneNumber" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="address">Address : </label>
                        <textarea className="form-control" id="address" rows="3" required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-center">Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default RegisterCompany;