import React from "react";
import "./companyVision.css";

function CompanyVision() {
  return (
    <>
      <div className="col-12 py-lg-5" id="CompanyVision">
        <div className="container">
          <div className="col-12">
            <div className="row justify-content-center align-items-center">
              <div className="col-10">
                <div className="vision_head text-center">
                  <h2 className="our_vision">Our Vision</h2>
                  <h6>
                    At D Table Analytics, our vision is to revolutionize the way
                    businesses leverage data to drive success. We aspire to be
                    the leading provider of data management and analytics
                    solutions, empowering organizations of all sizes to make
                    data-driven decisions with confidence.
                  </h6>
                </div>
              </div>

              <div className="col-12 vision-cards">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 my-2  ">
                  <div className="vision-card text-center">
                    <i className="bx bx-data vision_icons"></i>
                    <h5>Seamless Data Accessibility</h5>
                    <p>
                      Every business has seamless access to accurate, timely,
                      and actionable data, eliminating silos and fostering a
                      culture of data-driven decision-making.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 my-2">
                  <div className="vision-card text-center">
                    <i className="bx bx-cog vision_icons"></i>
                    <h5>Efficiency is Maximized</h5>
                    <p>
                      Through automation and integration, businesses operate at
                      peak efficiency, reducing manual processes and enhancing
                      productivity.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 my-2">
                  <div className="vision-card text-center">
                    <i className="bx bx-chart vision_icons"></i>
                    <h5>Insights are Transformative</h5>
                    <p>
                      Deep, actionable insights derived from data analysis
                      transform business strategies, leading to sustainable
                      growth and competitive advantage.
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 my-2">
                  <div className="vision-card text-center ">
                    <i className="bx bx-message-rounded-dots vision_icons"></i>
                    <h5>Communication is Seamless</h5>
                    <p>
                    Integrated platforms like WhatsApp and email automation enable businesses to connect with customers effectively,real-time communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CompanyVision;
