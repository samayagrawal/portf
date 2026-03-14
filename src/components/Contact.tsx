import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:samayagrawaldev@gmail.com" data-cursor="disable">
                samayagrawaldev@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+919999999999" data-cursor="disable">
                +91 79909 39157
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Location</h4>
            <p>India, Remote</p>
            <h4>Availability</h4>
            <p>Available for new projects</p>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Samay Agrawal</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
