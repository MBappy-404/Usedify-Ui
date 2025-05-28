"use client";
import { BiEnvelope, BiPhoneIncoming } from "react-icons/bi";
import { SlSocialFacebook, SlSocialInstagram, SlSocialLinkedin, SlSocialTwitter } from "react-icons/sl";
import { useState } from "react";
import { toast } from "sonner";

// pages/contact.js
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: <SlSocialFacebook className="w-5 h-5" />,
      link: "https://facebook.com",
    },
    {
      name: "Twitter",
      icon: <SlSocialTwitter className="w-5 h-5" />,
      link: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: <SlSocialInstagram className="w-5 h-5" />,
      link: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <SlSocialLinkedin className="w-5 h-5" />,
      link: "https://linkedin.com",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center py-36">
      <div className="max-w-5xl w-full mx-auto px-4">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                    placeholder="Your email"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400 resize-none"
                    placeholder="Your message"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white">
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                    <p className="text-blue-100">Fill up the form and our team will get back to you within 24 hours</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <BiPhoneIncoming className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Phone</p>
                        <p className="font-medium">+44 020 1234 5678</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <BiEnvelope className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Email</p>
                        <p className="font-medium">contact@usedify.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {socialLinks.map(({ name, icon, link }) => (
                      <a
                        key={name}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                      >
                        <span className="sr-only">{name}</span>
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
