import React from 'react';
import '../ProductStyles.css'; 

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message Sent! (Form submission is simulated for this project.)");
        e.target.reset(); 
    };

    return (
        <div className="home-container">
            <div className="dashboard-header" style={{ borderBottom: 'none' }}>
                <h1>Contact Us</h1>
            </div>

            <div className="contact-grid">
                
                <div className="contact-details-card">
                    <h2>Get In Touch</h2>
                    
                    <div className="detail-item">
                        <p className="detail-label">Contact Name:</p>
                        <p className="detail-value">Yuvanesh C B</p>
                    </div>

                    <div className="detail-item">
                        <p className="detail-label">Email ID:</p>
                        <p className="detail-value">yuvaneshcbc@gmail.com</p>
                    </div>

                    <p className="contact-motto">
                        We're here to help with your ECOM Dashboard needs.
                    </p>
                </div>

                <div className="contact-form-container">
                    <h2>Send a Message</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        
                        <button type="submit" className="contact-submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;