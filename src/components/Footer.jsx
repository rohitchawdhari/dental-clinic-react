import { 
FaInstagram, 
FaPhone, 
FaTelegram, 
FaWhatsapp,
FaTooth,
FaRegClock,
FaMapMarkedAlt
} from "react-icons/fa";

import { MdOutlineEmail } from "react-icons/md";

const socialLinks = [
{
icon: <FaInstagram className="text-2xl" />,
href: "#"
},
{
icon: <FaWhatsapp className="text-2xl" />,
href: "#"
},
{
icon: <FaTelegram className="text-2xl" />,
href: "#"
}
];

const clinicHours = [
{ day: "Sunday - Thursday", time: "9 AM - 5 PM" },
{ day: "Friday", time: "4 AM - 9 PM" },
{ day: "Saturday", time: "Closed" }
];

const contactInfo = [
{
icon: <FaPhone className="mr-4 text-white/70" />,
text: (
<a href="#" className="hover:text-sky-300 transition-colors">
+1 (234) 567-89
</a>
)
},

{
icon: <MdOutlineEmail className="mr-4 text-white/70" />,
text: (
<a href="#" className="hover:text-sky-300 transition-colors">
info@brightsmile.com
</a>
)
},

{
icon: <FaMapMarkedAlt className="mr-4 text-white/70" />,
text: (
<span>
123 Dental Avenue, Health District, City
</span>
)
}
];

const Footer = () => {
return (

<footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white pt-16 pb-12 relative overflow-hidden">

<div className="container mx-auto px-6 relative z-10">

{/* Logo Section */}

<div className="flex flex-col items-center mb-14">

<div className="flex items-center mb-6">

<div className="bg-white/20 p-3 rounded-full mr-4">
<FaTooth className="text-2xl text-sky-300" />
</div>

<h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-blue-200">
BrightSmile
</h2>

</div>

{/* Social Links */}

<div className="flex space-x-6 mb-8">

{socialLinks.map((link, index) => (

<a
key={index}
href={link.href}
className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:-translate-y-1"
>
{link.icon}
</a>

))}

</div>

</div>

{/* Grid */}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

{/* Clinic Hours */}

<div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-sky-300 transition-colors">

<h3 className="text-xl font-semibold mb-5 flex items-center">
<FaRegClock className="mr-3 text-sky-300" />
Clinic Hours
</h3>

<ul className="space-y-3">

{clinicHours.map((item, index) => (

<li
key={index}
className="flex justify-between text-white/70"
>
<span>{item.day}</span>
<span>{item.time}</span>
</li>

))}

<li className="pt-3 mt-3 border-t border-white/10">
Emergency services available 24/7
</li>

</ul>

</div>

{/* Contact */}

<div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-sky-300 transition-colors">

<h3 className="text-xl font-semibold mb-5 flex items-center">
<FaPhone className="mr-3 text-sky-300" />
Contact Us
</h3>

<ul className="space-y-4">

{contactInfo.map((item, index) => (

<li key={index} className="flex items-start">
{item.icon}
{item.text}
</li>

))}

</ul>

</div>

{/* Newsletter */}

<div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-sky-300 transition-colors">

<h3 className="text-xl font-semibold mb-5">
Dental Tips Newsletter
</h3>

<p className="text-white/70 mb-5">
Subscribe to receive oral health tips and special offers
</p>

<div className="flex">

<input
type="email"
placeholder="Your email address"
className="bg-white/10 border border-white/20 text-white px-5 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sky-300 w-full placeholder-white/50"
/>

<button className="bg-sky-500 hover:bg-sky-400 text-blue-900 font-medium px-5 py-3 rounded-r-lg transition-colors">
Subscribe
</button>

</div>

</div>

</div>

{/* Bottom */}

<div className="pt-8 flex flex-col md:flex-row justify-between items-center">

<p className="text-white/50 text-sm mb-3 md:mb-0">
© {new Date().getFullYear()} BrightSmile Dental Clinic. All rights reserved
</p>

<div className="flex space-x-6">

<a
href="#"
className="text-white/50 hover:text-sky-300 text-sm transition-colors"
>
Terms of Service
</a>

<a
href="#"
className="text-white/50 hover:text-sky-300 text-sm transition-colors"
>
Privacy Policy
</a>

</div>

</div>

</div>

</footer>

);
};

export default Footer;