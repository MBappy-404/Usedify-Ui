import { BiEnvelope, BiPhoneIncoming } from "react-icons/bi";
import { SlSocialInstagram } from "react-icons/sl";

// pages/contact.js
export default function Contact() {
    return (
      <div className="min-h-screen bg-gray-50">
        
        
        {/* Interactive Map Section */}
        <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="absolute inset-0 bg-[url('/map-pattern.svg')] opacity-20" />
          <div className="relative h-full flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white text-center">Get in Touch</h2>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none"
                    placeholder="hello@example.com"
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none"
                    placeholder="Your message..."
                  />
                </div>
  
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
  
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-6 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
                <p className="text-gray-600">123 Green Street<br/>Eco City, EC1 1AA</p>
              </div>
  
              <div className="p-6 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <BiPhoneIncoming className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">+44 020 1234 5678</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <BiEnvelope className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">contact@usedify.com</span>
                  </li>
                </ul>
              </div>
  
              <div className="p-6 bg-white rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Social Media</h3>
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                    <a 
                      key={platform}
                      href="#" 
                      className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <span className="sr-only">{platform}</span>
                      <SlSocialInstagram  className="w-6 h-6 text-gray-600" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }