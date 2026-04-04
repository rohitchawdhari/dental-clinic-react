import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTooth, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {

const [menuOpen, setMenuOpen] = useState(false);
const [active, setActive] = useState("home");

useEffect(() => {

const handleScroll = () => {

const sections = ["home","services","about","tips","book","testimonials"];

sections.forEach((id) => {

const section = document.getElementById(id);

if(section){

const top = window.scrollY;
const offset = section.offsetTop - 150;
const height = section.offsetHeight;

if(top >= offset && top < offset + height){
setActive(id);
}

}

});

};

window.addEventListener("scroll", handleScroll);

return () => window.removeEventListener("scroll", handleScroll);

},[]);

return (
<header className="bg-white shadow-md fixed w-full top-0 z-50">

<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

{/* Logo */}

<div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
<FaTooth />
Smile Dental Clinic
</div>


{/* Desktop Menu */}

<nav className="space-x-6 hidden md:flex font-medium">

<a href="#home" className={`${active==="home" ? "text-blue-600" : ""}`}>Home</a>
<a href="#services" className={`${active==="services" ? "text-blue-600" : ""}`}>Services</a>
<a href="#about" className={`${active==="about" ? "text-blue-600" : ""}`}>About</a>
<a href="#tips" className={`${active==="tips" ? "text-blue-600" : ""}`}>Tips</a>
<a href="#book" className={`${active==="book" ? "text-blue-600" : ""}`}>Book</a>
<a href="#testimonials" className={`${active==="testimonials" ? "text-blue-600" : ""}`}>Testimonials</a>

</nav>


{/* Desktop Buttons */}

<div className="hidden md:flex gap-3">

<Link to="/login"
className="bg-gray-800 text-white px-4 py-2 rounded-lg">
Admin Login
</Link>

<a href="#book"
className="bg-blue-600 text-white px-4 py-2 rounded-lg">
Book Appointment
</a>

</div>


{/* Mobile Button */}

<div className="md:hidden text-2xl cursor-pointer">

{menuOpen ? (
<FaTimes onClick={() => setMenuOpen(false)} />
) : (
<FaBars onClick={() => setMenuOpen(true)} />
)}

</div>

</div>


{/* Mobile Menu */}

{menuOpen && (
<div className="md:hidden bg-white shadow-lg p-4 space-y-4">

<a href="#home" onClick={()=>setMenuOpen(false)}>Home</a>
<a href="#services" onClick={()=>setMenuOpen(false)}>Services</a>
<a href="#about" onClick={()=>setMenuOpen(false)}>About</a>
<a href="#tips" onClick={()=>setMenuOpen(false)}>Tips</a>
<a href="#book" onClick={()=>setMenuOpen(false)}>Book</a>
<a href="#testimonials" onClick={()=>setMenuOpen(false)}>Testimonials</a>

<Link
to="/login"
onClick={()=>setMenuOpen(false)}
className="block bg-gray-800 text-white px-4 py-2 rounded-lg"
>
Admin Login
</Link>

</div>
)}

</header>
);
};

export default Header;