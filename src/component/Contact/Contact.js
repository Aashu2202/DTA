import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import emailjs from "emailjs-com";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./contact.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const showToastMessage = (type) => {
    const position = "top-right";
    switch (type) {
      case 'success':
        toast.success("Mail sent successfully", {
          position
        });
        break;
      case 'error':
        toast.error("Error sending mail. Please try again.", {
          position
        });
        break;
      case 'warning':
        toast.warning("Please fill valid email address", {
          position
        });
        break;
      default:
        toast.info("Please fill all the required fields", {
          position
        });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
    phone: "",
  });

  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const userID = process.env.REACT_APP_EMAILJS_USER_ID;

  const [loader, setLoader] = useState(false);
  const [btndis, setBtndis] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      showToastMessage('warning');
      setLoader(false);
      return;
    }

    const templateParams = {
      to_name: "D-table-analytics",
      from_name: formData.name,
      message: formData.message,
      reason: formData.reason,
      user_email: formData.email,
      phone: formData.phone,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        console.log("Email sent successfully", response.status, response.text);
        
        showToastMessage('success');
        setLoader(false);
        setBtndis(true);
      },
      (error) => {
        console.error("Failed to send email", error);
        showToastMessage('error');
        setLoader(false);
      }
    );
  };

  return (
    <>
      <div className="col-12 contact_us" id="contact">
        <div className="container">
          <div className="col-12">
            <div className="row justify-content-between align-items-center">
              <div className="col-12 contact-us-head">
                <h2 className="text-center">Contact Us</h2>
              </div>
              <div className="col-12 contact-us-sec">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 px-2">
                  <div className="contact_form p-lg-5 p-2">
                    <div className="">
                      <h5 className="text-center our-social">Our Social</h5>
                      <ul className="social-links p-0 m-0">
                        <li className="links-upper my-3">
                          <i className="bx bx-envelope social_media_icon"></i>
                          <a
                            target="blank"
                            href="mailto:rahulyadav@dtableanalytics.com"
                            className="alinks"
                          >
                            <span className="social-address email mx-1">
                              rahulyadav@dtableanalytics.com
                            </span>
                          </a>
                        </li>
                        <li className="links-upper my-3">
                          <i className="bx bxl-whatsapp social_media_icon"></i>
                          <span className="social-address mx-1">
                            +91 87702 40025
                          </span>
                        </li>
                        <li className="links-upper my-3">
                          <i className="bx bxl-linkedin social_media_icon"></i>
                          <a
                            href="https://www.linkedin.com/in/d-table-analytics-b523001a0/"
                            target="blank"
                            className="alinks"
                          >
                            <span className="social-address linkedin mx-1">
                              d-table-analytics
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-center our-social">
                        Location and contact
                      </h5>
                      <div className="address_sec">
                        <ul className="social-links d-flex p-0 m-0">
                          <li>
                            <IoLocation className="location_icon" />
                          </li>
                          <li>
                            <span className="Location mx-3">
                              Indore | Bhopal | Delhi
                            </span>
                          </li>
                        </ul>
                        <ul className="social-links d-flex p-0 m-0">
                          <li>
                            <IoIosCall className="location_icon" />
                          </li>
                          <li>
                            <span className="Location mx-3">
                              +91 87702 40025
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-md-0 mt-4 px-2">
                  <div className="contact_form p-lg-5 p-2">
                    <h5 className="text-center our-social">Send your query</h5>
                    <div className="card-body p-0">
                      <form role="form" className="row" onSubmit={handleSubmit}>
                        <div className="form-group col-lg-6">
                          <label
                            className="form-control-label"
                            htmlFor="form-group-input"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="form-group-input"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <label
                            className="form-control-label"
                            htmlFor="form-group-input"
                          >
                            Phone Number
                          </label>
                          <PhoneInput
                            country={"in"}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputProps={{
                              name: "phone",
                              required: true,
                              autoFocus: false,
                            }}
                          />
                        </div>
                        <div className="form-group col-lg-12">
                          <label
                            className="form-control-label"
                            htmlFor="form-group-input"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="form-group-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            required
                          />
                        </div>
                        <div className="form-group col-lg-12">
                          <label
                            className="form-control-label"
                            htmlFor="form-group-input"
                          >
                            Reason
                          </label>
                          <select
                            className="form-control"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            <option value="Sales">Sales</option>
                            <option value="Tech Support">Tech Support</option>
                            <option value="General Feedback">
                              General Feedback
                            </option>
                          </select>
                        </div>
                        <div className="form-group col-lg-12">
                          <label
                            className="form-control-label"
                            htmlFor="form-group-input"
                          >
                            Message
                          </label>
                          <textarea
                            className="form-control"
                            id="form-group-input"
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                        <div className="form-group col-lg-12">
                          {loader ? (
                            <button className="btn send-btn float-end mt-2" disabled>
                              <div className="spinner-border spin" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </button>
                          ) : (
                            <button
                              className="btn send-btn float-end mt-2"
                              type="submit"
                              disabled={btndis}
                            >
                              Submit
                            </button>
                          )}
                          <ToastContainer />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
