import React, { useState, useRef } from 'react';
import { MdOutlineMail } from "react-icons/md";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { FaWhatsapp } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

function Contact() {
  const form = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorField, setErrorField] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorField("name");
      setErrorMessage("Please Enter Name");
      return;
    }
    if (!email.trim()) {
      setErrorField("email");
      setErrorMessage("Please Enter Email");
      return;
    }
    if (!message.trim()) {
      setErrorField("message");
      setErrorMessage("Please Enter Message");
      return;
    }

    emailjs.sendForm(
      'service_did1k1n',
      'template_2fkbfdg',
      form.current,
      { publicKey: 'qJnZ3fUbQWYord8MK' }
    ).then(
      () => {
        toast.success("Message sent successfully!");
        setName('');
        setEmail('');
        setMessage('');
      },
      (error) => {
        console.log('FAILED...', error.text);
        toast.error("Failed to send message. Please try again.");
      }
    );
  };

  return (
    <section className="py-16 px-6 md:px-20 text-black bg-gray-300">
      
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">📞 Contact Us</h2>
          <div className="mx-auto w-36 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <div className="md:w-1/2 text-lg space-y-6">
            <h3 className="text-3xl font-semibold mb-4"></h3>
            <p className="text-black leading-relaxed">
             Trusred doctors providing compassionate care with expertise. We believe in a patient-first approach, ensuring healthier lives and better well-being for every individual
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md shadow-md hover:scale-105 transition duration-300">
                <span><MdOutlineMail className="text-amber-400 text-2xl" /></span>

                <a href="#" className=" hover:text-amber-300 transition">
                 test@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md shadow-md hover:scale-105 transition duration-300">
                <FaPhone className="text-amber-400 text-2xl" />
                <a href="#" className=" hover:text-amber-300 transition">
                  +91 123456789
                </a>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md shadow-md hover:scale-105 transition duration-300">
                <MdLocationPin className="text-amber-400 text-2xl" />

                123 Main St, Anytown, USA

              </div>

             
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2">
            <form ref={form} onSubmit={sendEmail} className="p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg space-y-5">

              {/* Name */}
              <div>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setErrorField(null);
                      setErrorMessage("");
                    }
                  }}
                  className={`w-full p-3 bg-gray-900/70 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 
                  ${errorField === "name" ? "border-2 border-red-500 animate-pulse" : "border-gray-600"}`}
                />
                {errorField === "name" && <p className="text-[#FF7276] text-sm mt-1">{errorMessage}</p>}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setErrorField(null);
                      setErrorMessage("");
                    }
                  }}
                  className={`w-full p-3 bg-gray-900/70 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 
                  ${errorField === "email" ? "border-2 border-red-500 animate-pulse" : "border-gray-600"}`}
                />
                {errorField === "email" && <p className="text-[#FF7276] text-sm mt-1">{errorMessage}</p>}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setErrorField(null);
                      setErrorMessage("");
                    }
                  }}
                  className={`w-full p-3 h-32 bg-gray-900/70 border rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 
                  ${errorField === "message" ? "border-2 border-red-500 animate-pulse" : "border-gray-600"}`}
                ></textarea>
                {errorField === "message" && <p className="text-[#FF7276] text-sm mt-1">{errorMessage}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-400 text-black px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 border-gray-700 rounded-full" />


    </section>
  );
}

export default Contact;
