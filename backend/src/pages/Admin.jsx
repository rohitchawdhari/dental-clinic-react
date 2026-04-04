import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Admin = () => {

const API_URL = "https://smile-dental-backend.onrender.com";

const [appointments, setAppointments] = useState([]);
const [selectedDate, setSelectedDate] = useState(new Date());
const [loading, setLoading] = useState(true);

const audioRef = useRef(null);
const lastIdRef = useRef(null);

const navigate = useNavigate();


// Format Date

const formatDate = (date) => {
const d = new Date(date);
return d.getFullYear() + "-" +
String(d.getMonth() + 1).padStart(2, "0") + "-" +
String(d.getDate()).padStart(2, "0");
};


// Fetch Appointments

const fetchAppointments = async () => {

try {

const res = await fetch(`${API_URL}/api/appointments`);
const data = await res.json();

if (data.length > 0) {

const latestId = data[0]._id;

if (lastIdRef.current && lastIdRef.current !== latestId) {

audioRef.current.play();

Swal.fire({
title: "New Appointment 🔔",
text: "New booking received",
icon: "info"
});

}

lastIdRef.current = latestId;

}

setAppointments(data);
setLoading(false);

} catch (error) {

console.error(error);
setLoading(false);

}

};


// Admin Protection

useEffect(() => {

const admin = localStorage.getItem("admin");

if (!admin) {
navigate("/login");
}

fetchAppointments();

const interval = setInterval(() => {
fetchAppointments();
}, 10000);

return () => clearInterval(interval);

}, []);


// Delete Appointment

const deleteAppointment = async (id) => {

const confirm = window.confirm(
"Are you sure you want to delete?"
);

if (!confirm) return;

await fetch(`${API_URL}/api/appointments/${id}`, {
method: "DELETE",
});

fetchAppointments();

};


// Update Status

const updateStatus = async (item, status) => {

await fetch(`${API_URL}/api/appointments/${item._id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ status }),
});

if (status === "Completed") {

Swal.fire(
"Approved",
"Confirmation email sent to patient",
"success"
);

}

if (status === "Rejected") {

Swal.fire(
"Rejected",
"Appointment rejected",
"warning"
);

}

fetchAppointments();

};


// Filter by Date

const filteredAppointments = appointments.filter(
(item) => item.date === formatDate(selectedDate)
);


// Dashboard Counts

const total = filteredAppointments.length;

const pending = filteredAppointments.filter(
(item) => item.status === "Pending"
).length;

const completed = filteredAppointments.filter(
(item) => item.status === "Completed"
).length;


return (

<div className="min-h-screen bg-gray-100 p-6">

<audio ref={audioRef} src="/notification.mp3" preload="auto" />


<div className="flex justify-between items-center mb-6">

<h1 className="text-3xl font-bold">
Admin Dashboard
</h1>

<button
onClick={() => {
localStorage.removeItem("admin");
navigate("/login");
}}
className="bg-red-500 text-white px-4 py-2 rounded"
>
Logout
</button>

</div>


<div className="bg-white p-6 rounded-lg shadow mb-6">

<h2 className="text-xl font-bold mb-4">
Appointment Calendar
</h2>

<Calendar
onChange={setSelectedDate}
value={selectedDate}
/>

</div>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

<div className="bg-blue-500 text-white p-6 rounded-lg shadow">
<h2 className="text-xl font-bold">Total</h2>
<p className="text-2xl">{total}</p>
</div>

<div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
<h2 className="text-xl font-bold">Pending</h2>
<p className="text-2xl">{pending}</p>
</div>

<div className="bg-green-500 text-white p-6 rounded-lg shadow">
<h2 className="text-xl font-bold">Completed</h2>
<p className="text-2xl">{completed}</p>
</div>

</div>


<div className="overflow-x-auto">

<table className="min-w-full bg-white shadow-lg rounded-lg">

<thead>

<tr className="bg-blue-600 text-white">
<th className="py-3 px-4">Name</th>
<th className="py-3 px-4">Phone</th>
<th className="py-3 px-4">Date</th>
<th className="py-3 px-4">Time</th>
<th className="py-3 px-4">Service</th>
<th className="py-3 px-4">Status</th>
<th className="py-3 px-4">Action</th>
</tr>

</thead>

<tbody>

{filteredAppointments.map((item) => (

<tr key={item._id} className="border-b">

<td className="py-3 px-4">{item.name}</td>
<td className="py-3 px-4">{item.phone}</td>
<td className="py-3 px-4">{item.date}</td>
<td className="py-3 px-4">{item.time}</td>
<td className="py-3 px-4">{item.service}</td>

<td className="py-3 px-4">
<span
className={`px-3 py-1 rounded-full text-white text-sm ${
item.status === "Completed"
? "bg-green-500"
: item.status === "Rejected"
? "bg-red-500"
: "bg-yellow-500"
}`}
>
{item.status}
</span>
</td>

<td className="py-3 px-4 space-x-2">

{item.status === "Pending" && (

<>
<button
onClick={() =>
updateStatus(item, "Completed")
}
className="bg-green-500 text-white px-3 py-1 rounded"
>
Approve
</button>

<button
onClick={() =>
updateStatus(item, "Rejected")
}
className="bg-yellow-500 text-white px-3 py-1 rounded"
>
Reject
</button>
</>

)}

<button
onClick={() =>
deleteAppointment(item._id)
}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

};

export default Admin;