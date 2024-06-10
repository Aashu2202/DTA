import React from "react";
import { ReactTyped } from "react-typed";
import img1 from '../../assets/images/illustator/output-onlinegiftools.gif'
import './hero_section.css'
function Hero_Section() {
  return (
    <>
      <div className="col-12 hero_section">
        <div className="container-lg">
          <div className="col-12">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="Heading">
                <h1>UNLOCKING THE POWER OF DATA</h1>
                  <h5>
                    
                    <ReactTyped
                      strings={[
                        "Data Management",
                        "Data Analytics",
                        "Software Development",
                        "Web Development",
                        "Reporting",
                        "MIS",
                        "Sales Analysis",
                      ]}
                      typeSpeed={40}
                      backSpeed={50}
                      loop
                    />
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 gif_section">
                      <img src={img1} className="img-fluid gif_img"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Hero_Section;
