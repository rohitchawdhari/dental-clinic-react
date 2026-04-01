import React from "react";
import {
FaTooth,
FaPhone,
FaEnvelope,
FaMapMarkerAlt,
FaFacebook,
FaInstagram,
FaWhatsapp
} from "react-icons/fa";

const Footer = () => {
return (

<footer className="bg-gray-900 text-white pt-12 pb-6">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

{/* Logo */}

<div>
<h2 className="text-2xl font-bold flex items-center gap-2">
<FaTooth /> Smile Dental
</h2>

<p className="text-gray-400 mt-4">
We provide quality dental care with modern technology and experienced dentists.
</p>
</div>


{/* Quick Links */}

<div>
<h3 className="text-lg font-semibold mb-4">
Quick Links
</h3>

<ul className="space-y-2 text-gray-400">
<li><a href="#home" className="hover:text-white">Home</a></li>
<li><a href="#services" className="hover:text-white">Services</a></li>
<li><a href="#about" className="hover:text-white">About</a></li>
<li><a href="#book" className="hover:text-white">Book Appointment</a></li>
</ul>
</div>


{/* Contact */}

<div>
<h3 className="text-lg font-semibold mb-4">
Contact
</h3>

<ul className="space-y-3 text-gray-400">

<li className="flex items-center gap-2">
<FaPhone />
<a href="tel:+919876543210" className="hover:text-white">
+91 8467093427
</a>
</li>

<li className="flex items-center gap-2">
<FaEnvelope />
<a href="mailto:smiledentalofficial0@gmail.com" className="hover:text-white">
smiledentalofficial0@gmail.com
</a>
</li>

<li className="flex items-center gap-2">
<FaMapMarkerAlt />
<a
href="https://maps.google.com"
target="_blank"
rel="noopener noreferrer"
className="hover:text-white"
>
Your City, India
</a>
</li>

</ul>
</div>


{/* Social */}

<div>
<h3 className="text-lg font-semibold mb-4">
Follow Us
</h3>

<div className="flex gap-4 text-xl">

<a
href="https://facebook.com"
target="_blank"
className="hover:text-blue-500"
>
<FaFacebook />
</a>

<a
href="https://instagram.com"
target="_blank"
className="hover:text-pink-500"
>
<FaInstagram />
</a>

<a
href="https://wa.me/919876543210"
target="_blank"
className="hover:text-green-500"
>
<FaWhatsapp />
</a>

</div>

</div>

</div>


{/* Bottom */}

<div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-6">
© 2025 Smile Dental Clinic. All rights reserved.
</div>

</footer>

);
};

export default Footer;