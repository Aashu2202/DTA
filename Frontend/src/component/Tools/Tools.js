import React from "react";
import { SiGooglesheets } from "react-icons/si";
import { FaGoogleDrive } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";

import './tools.css';

const HoverDevCards = () => {
  return (
    <div className="container-lg py-4" id="tools">
      <h2 className="text-center tools_head mb-3">Tools and Technologies</h2>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            title="Google Drive"
            subtitle={`Secure and accessible cloud storage for your data.`}
            href="#"
            Icon={FaGoogleDrive}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card title="Google Sheet" 
          subtitle="Advanced spreadsheet solutions for data analysis and management."
           href="#" Icon={SiGooglesheets} />
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card title="App Script"
           subtitle=" Custom scripting to automate and extend the functionality of Google Workspace."
            href="#" Icon={FaCode} />
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <Card
            title="Google Forms"
            subtitle="Efficient data collection and survey tools."
            href="#"
            Icon={SiGoogleforms}
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <span className="card h-100 text-decoration-none">
      <div className="card-body position-relative overflow-hidden">
        <div className="card-hover-bg" />
        <Icon className="card-icon-bg" />
        <Icon className="card-icon mb-2" />
        <h5 className="card-title">{title}</h5>
        <p className="card-subtitle">{subtitle}</p>
      </div>
    </span>
  );
};

export default HoverDevCards;
