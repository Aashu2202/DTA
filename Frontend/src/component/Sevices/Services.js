import React from "react";
import "./services.css";

// Example imports for images (you need to add actual paths)
import dataManagementImg from '../../assets/images/services/datamanage.png';
import dataAnalysisImg from '../../assets/images/services/dataanalysis.png';
import reportingImg from '../../assets/images/services/report.png';
import misImg from '../../assets/images/services/MIS.png';
import salesAnalysisImg from '../../assets/images/services/sales.png';
import whatsappImg from '../../assets/images/services/whatsapp.png';
import emailImg from '../../assets/images/services/email.png';
import smssImg from '../../assets/images/services/SMSS.png';
import pmsImg from '../../assets/images/services/PMS.png';
import flowchartImg from '../../assets/images/services/FMS.png';

// Boxicons imports (add the relevant Boxicons stylesheet in your HTML or JS entry point)
import 'boxicons/css/boxicons.min.css';

const Services = () => {
  return (
    <>
      <div className="col-12 services" id="services">
        <div className="container">
          <div className="col-12">
            <div className="row justify-content-center align-items-center">
                <div className="col-12">
                    <div className="text-center service_head">
                        <h2>Our Services</h2>
                    </div>
                </div>
                <div className="col-12 service-sec">
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${dataManagementImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-data"></i> Data Management</h4>
                  <h6>Our data management services ensure that your data is organized, secure, and easily accessible. We offer solutions tailored to your needs, from data cleaning and storage to integration and migration.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${dataAnalysisImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-analyse"></i> Data Analysis and Management</h4>
                  <h6>Transform raw data into meaningful insights with our data analysis and management services. We use cutting-edge techniques to analyze your data, helping you uncover trends and patterns that drive business growth.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${reportingImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-report"></i> Reporting</h4>
                  <h6>Stay informed with our comprehensive reporting solutions. We provide detailed and customizable reports that give you a clear view of your business performance, enabling you to make data-driven decisions.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${misImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-spreadsheet"></i> MIS (Management Information Systems)</h4>
                  <h6>Our MIS services deliver real-time information to manage your business operations effectively. We design and implement systems that provide critical data at your fingertips.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${salesAnalysisImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-chart"></i> Sales Analysis</h4>
                  <h6>Boost your sales strategy with our sales analysis services. We help you understand your sales data, identify opportunities, and improve your sales performance.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${whatsappImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxl-whatsapp"></i> WhatsApp Integration and Automation</h4>
                  <h6>Enhance your customer communication with our WhatsApp integration and automation solutions. We streamline your messaging processes, ensuring timely and effective engagement with your clients.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${emailImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-envelope"></i> Email Integration and Automation</h4>
                  <h6>Optimize your email marketing campaigns with our email integration and automation services. We help you create, send, and track emails, maximizing your outreach and engagement.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${smssImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-message-dots"></i> SMSS (Short Message Service System)</h4>
                  <h6>Improve your customer outreach with our SMSS solutions. We enable efficient and effective SMS communication for marketing, notifications, and customer support.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${pmsImg})`, backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center` }}>
                  <h4><i className="bx bxs-factory"></i> PMS (Production Management System)</h4>
                  <h6>Our production management system (PMS) services streamline your production processes, enhancing efficiency and productivity. We provide tools for planning, monitoring, and controlling your production activities.</h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 my-2">
                <div className="service-section mx-1" style={{ backgroundImage: `url(${flowchartImg})` , backgroundRepeat: `no-repeat`, backgroundSize:`cover`, backgroundPosition: `center`}}>
                  <h4><i class='bx bxs-pie-chart-alt-2'></i>Flowchart Monitoring System</h4>
                  <h6>Visualize and optimize your processes with our flowchart monitoring system. We help you create, track, and improve workflows, ensuring smooth and efficient operations.</h6>
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

export default Services;
