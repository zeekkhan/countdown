import React from "react";
import './ContactUs.css';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Header from '../components/Header';

function ContactUsPage() {
  return (
    <>
      <Header />
      <div className="contact-form-section">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Fill out the form below to get in touch with our team.</p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" style={{ backgroundColor: 'green', fontSize:"30px" }}>Send Message</button>

        </form>
      </div>
    </>
  );
}

export default ContactUsPage;
