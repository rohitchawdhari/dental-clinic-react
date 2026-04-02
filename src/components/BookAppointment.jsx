import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { FaUser } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const BookAppointment = () => {

const API_URL = "https://smile-dental-backend.onrender.com";

const [activeStep, setActiveStep] = useState(1);
const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
name: "",
phone: "",
email: "",
date: "",
time: "",
service: "General Checkup"
});

const [bookedTimes, setBookedTimes] = useState([]);

const services = [
"General Checkup",
"Teeth Cleaning",
"Dental Filling",
"Root Canal",
"Teeth Whitening",
"Orthodontic Consultation"
];

const availableTimes = [
"09:00 AM",
"10:00 AM",
"11:00 AM",
"12:00 PM",
"02:00 PM",
"03:00 PM",
"04:00 PM"
];

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({
...prev,
[name]: value
}));
};

const nextStep = () => setActiveStep(prev => prev + 1);
const prevStep = () => setActiveStep(prev => prev - 1);


// Fetch Booked Times

useEffect(() => {

const fetchBookedTimes = async () => {

if (!formData.date) return;

try {

const res = await axios.get(
`${API_URL}/api/appointments`
);

const filtered = res.data
.filter(
(item) =>
item.date === formData.date &&
item.status !== "Rejected"
)
.map((item) => item.time);

setBookedTimes(filtered);

} catch (error) {
console.log(error);
}

};

fetchBookedTimes();

}, [formData.date]);


// Submit Function

const handleSubmit = async () => {

try {

if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
Swal.fire("Error", "Please fill all fields", "error");
return;
}

if (bookedTimes.includes(formData.time)) {
Swal.fire({
icon: "error",
title: "Time Not Available",
text: "This time slot is already booked"
});
return;
}

setLoading(true);

await axios.post(
`${API_URL}/api/appointments`,
formData
);


// Success Message

Swal.fire(
"Appointment Sent",
"Clinic will confirm shortly",
"success"
);


// WhatsApp Message

const message = `🦷 New Appointment

Patient: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Date: ${formData.date}
Time: ${formData.time}
Service: ${formData.service}

Please confirm appointment`;


setTimeout(() => {

window.open(
`https://wa.me/918467093427?text=${encodeURIComponent(message)}`,
"_blank"
);

}, 500);


setFormData({
name: "",
phone: "",
email: "",
date: "",
time: "",
service: "General Checkup"
});

setActiveStep(1);

} catch (error) {

console.error(error);

Swal.fire({
icon: "error",
title: "Error",
text: "Something went wrong"
});

} finally {

setLoading(false);

}

};

return (

<div
id="book"
className="scroll-mt-20 min-h-screen bg-gradient-to-br from-sky-50 to-sky-50 py-12 px-4"
>

<div className="max-w-4xl mx-auto">

<div className="text-center mb-12">

<h1 className="text-4xl font-bold text-gray-800 mb-3">
Book Your Perfect Smile
</h1>

<p className="text-lg text-gray-600">
Book your appointment with our expert dentists
</p>

</div>


<div className="bg-white rounded-3xl shadow-xl overflow-hidden">


{/* Step 1 */}

{activeStep === 1 && (

<div className="p-8">

<h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">

<FaUser className="mr-3 text-sky-500" />

Personal Information

</h2>

<div className="space-y-6">

<input
type="text"
name="name"
value={formData.name}
onChange={handleInputChange}
placeholder="Full Name"
className="w-full p-4 border-2 border-gray-200 rounded-xl"
/>

<input
type="tel"
name="phone"
value={formData.phone}
onChange={handleInputChange}
placeholder="Phone Number"
className="w-full p-4 border-2 border-gray-200 rounded-xl"
/>

<input
type="email"
name="email"
value={formData.email}
onChange={handleInputChange}
placeholder="Email Address"
className="w-full p-4 border-2 border-gray-200 rounded-xl"
/>

</div>

</div>

)}


{/* Step 2 */}

{activeStep === 2 && (

<div className="p-8">

<h2 className="text-2xl font-bold text-gray-800 mb-6">
Appointment Details
</h2>

<div className="space-y-4">

<input
type="date"
name="date"
min={new Date().toISOString().split("T")[0]}
value={formData.date}
onChange={handleInputChange}
className="w-full p-4 border-2 border-gray-200 rounded-xl"
/>

<select
name="time"
value={formData.time}
onChange={handleInputChange}
className="w-full p-4 border-2 border-gray-200 rounded-xl"
>

<option value="">Select Time</option>

{availableTimes.map(time => (
<option
key={time}
value={time}
disabled={bookedTimes.includes(time)}
>
{time} {bookedTimes.includes(time) ? "(Booked)" : ""}
</option>
))}

</select>

<select
name="service"
value={formData.service}
onChange={handleInputChange}
className="w-full p-4 border-2 border-gray-200 rounded-xl"
>

{services.map(service => (
<option key={service} value={service}>
{service}
</option>
))}

</select>

</div>

</div>

)}


{/* Step 3 */}

{activeStep === 3 && (

<div className="p-8">

<h2 className="text-2xl font-bold mb-6">
Confirm Appointment
</h2>

<div className="space-y-4">

<div>Name: {formData.name}</div>
<div>Phone: {formData.phone}</div>
<div>Email: {formData.email}</div>
<div>Date: {formData.date}</div>
<div>Time: {formData.time}</div>
<div>Service: {formData.service}</div>

</div>

<button
onClick={handleSubmit}
disabled={loading}
className="mt-6 w-full bg-sky-500 text-white py-4 rounded-xl font-bold"
>

{loading ? "Booking..." : "Confirm & Book"}

</button>

</div>

)}


{/* Navigation */}

<div className="px-8 pb-8 flex justify-between">

{activeStep > 1 && (
<button
onClick={prevStep}
className="px-6 py-3 text-gray-600"
>
Back
</button>
)}

{activeStep < 3 && (
<button
onClick={nextStep}
className="ml-auto px-6 py-3 bg-sky-500 text-white rounded-lg flex items-center"
>
Next
<FaChevronRight className="ml-2"/>
</button>
)}

</div>

</div>

</div>

</div>

);
};

export default BookAppointment;