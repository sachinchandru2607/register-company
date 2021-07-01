import { useState } from "react";

const Popup = (props) => {
    const [popupVisbility, setPopupVisibility] = useState(true);
    const displayStyle = {
        display: popupVisbility ? "block" : "None"
    };

    const hidePopup = () => {
        setPopupVisibility(false);
        props.onClosePopup();
    };

    return (
        <div style={displayStyle} className="popup">
            <div className="popup-content">
                <div className="popup-header">
                    <span onClick={hidePopup} className="close">&times;</span>
                    <h5>{props.header}</h5>
                </div>
                <div className="separator"> </div>
                <div className="popup-info">
                    <p>{props.info}</p>
                </div>
            </div>

        </div>
    );
};


export default Popup;