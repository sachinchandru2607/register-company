import { useRef, useState } from "react";
import Popup from "./Popup";
import { useHistory } from "react-router-dom";
import axios from "axios";

/*
VerifyCompany - Gets the user input and verify company ID.
*/

const VerifyCompany = () => {
    const [errMessage, setErrorMessage] = useState("");
    const companyId = useRef("");
    const [popupVisbility, setPopupVisibility] = useState(false);
    let history = useHistory();

    /*
        verifyCompany - Gets the company ID and fetch the details of company ID
    */
    const verifyCompany = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3002/company/${id}`);
            if (response.status === 200) {
                processResponse(response.data);
            } else {
                setErrorMessage(response.statusText);
                setPopupVisibility(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    /*
        closePopup - set the state of popvisibility to false when pop visiblity is turned off in pop component
    */
    const closePopup = () => {
        setErrorMessage("");
        setPopupVisibility(false);
    };
    /*
        processResponse - Get the response and check whether user inputted company ID can register or not
    */
    const processResponse = (data) => {
        if (!data.canRegister) {
            setPopupVisibility(true);
            setErrorMessage(data.info);
        } else {
            setErrorMessage("");
            setPopupVisibility(false);
            history.push("/register");
        }
    };
    /*
        handleSubmit - Invoked on click of submit button and responsible to fetch details of company ID
    */
    const handleSubmit = (e) => {
        e.preventDefault();
        let id = companyId.current.value;
        id = id.trim();
        if (id !== undefined && id.length !== 0) {
            verifyCompany(id);
        }
    };


    return (
        <div className="content-container">
            <form onSubmit={handleSubmit} className = "form-container">
                <div className="info-header-div">
                    <label className="info-text">Please enter the company ID to register</label>
                </div>
                <div className="input-div">
                    <input className = "company-input-fld" ref={companyId} type="text" placeholder="Enter Company ID" name="companyid" required />
                </div>
                <div className="btn-div">
                    <button className= "btn btn-primary btn-continue" type="submit">Continue</button>
                </div>
            </form>
            { popupVisbility ? <Popup info={errMessage} header="Unable to Register" onClosePopup={closePopup} /> : ""}
        </div>

    );
};

export default VerifyCompany;