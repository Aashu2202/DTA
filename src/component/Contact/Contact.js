import React from "react";
import { IoLocation } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import contact from "../../assets/images/illustator/Contact-us-unscreen.gif";
import "./contact.css";
function Contact() {
  return (
    <>
      <div className="col-12 contact_us" id="contact">
        <div className="container">
          <div className="col-12">
            <div className="row  justify-content-between align-items-center">
              <div className="col-12 contact-us-head">
                <h2 className="text-center">Contact Us</h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-1 order-md-1 order-2">
                <div className="contact_form p-lg-5 p-2">
                  <div className="">
                    <h5 className="text-center our-social">Our Social</h5>
                    <ul className="social-links p-0 m-0">
                      <li className="links-upper my-3">
                        <i class="bx bx-envelope social_media_icon"></i>
                        <a target="blank"
                            href="mailto:rahulyadav@dtableanalytics.com"
                          className="alinks">
                        <span className="social-address email mx-1">
                        rahulyadav@dtableanalytics.com
                        </span>
                        </a>
                      </li>
                      <li className="links-upper my-3">
                        <i class="bx bxl-whatsapp  social_media_icon"></i>
                        <span className="social-address mx-1">
                          +91 87702 40025
                        </span>
                      </li>
                      <li className="links-upper my-3">
                        <i class="bx bxl-linkedin  social_media_icon"></i>
                        <a
                          href="https://www.linkedin.com/in/d-table-analytics-b523001a0/"
                          target="blank"
                          className="alinks"
                        >
                          <span className="social-address mx-1">
                            d-table-analytics
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                  <h5 className="text-center our-social">Location and contact</h5>
                  <div className="address_sec">
                  
                    <ul className="social-links d-flex p-0 m-0">
                        <li><IoLocation className="location_icon"/></li>
                        <li><span className="Location mx-3">
                            Indore | Bhopal | Delhi
                        </span></li>
                    </ul>
                    <ul className="social-links d-flex p-0 m-0">
                        <li><IoIosCall className="location_icon"/></li>
                        <li><span className="Location mx-3">
                            +91 87702 40025
                        </span></li>
                    </ul>
                  
                  </div>
                </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-2 order-md-2 order-1 text-center">
                <img src={contact} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
