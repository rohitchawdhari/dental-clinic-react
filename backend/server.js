import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

import Appointment from "./models/Appointment.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);


// MongoDB

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
res.send("Dental Backend Running");
});


// ================= CREATE APPOINTMENT =================

app.post("/api/appointments", async (req, res) => {

try {

const { name, phone, email, date, time, service } = req.body;

const appointment = new Appointment({
name,
phone,
email,
date,
time,
service,
status: "Pending"
});

await appointment.save();


// Clinic Mail

await resend.emails.send({

from: "Smile Dental <onboarding@resend.dev>",

to: process.env.EMAIL_USER,

subject: `New Appointment - ${name}`,

html: `
<div style="font-family:Arial;background:#f5f7fb;padding:30px">
<div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

<h2 style="color:#2a6edb">New Appointment Received</h2>

<p><b>Patient Name:</b> ${name}</p>
<p><b>Phone Number:</b> ${phone}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Appointment Date:</b> ${date}</p>
<p><b>Appointment Time:</b> ${time}</p>
<p><b>Service:</b> ${service}</p>

<hr/>

<p>Please contact the patient for confirmation.</p>

</div>
</div>
`

});

res.json({ success: true });

} catch (error) {

console.log("Booking Mail Error:", error);

res.status(500).json({
message: "Error"
});

}

});


// ================= UPDATE STATUS =================

app.put("/api/appointments/:id", async (req, res) => {

try {

const status = req.body.status;

const appointment = await Appointment.findByIdAndUpdate(
req.params.id,
{ status },
{ new: true }
);


// ================= APPROVE =================

if (status === "Completed") {

await resend.emails.send({

from: "Smile Dental <onboarding@resend.dev>",

to: appointment.email,

subject: "Appointment Confirmed - Smile Dental Clinic",

html: `
<div style="font-family:Arial;background:#f5f7fb;padding:30px">

<div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

<h2 style="color:#2a9bd8">Smile Dental Clinic</h2>

<p>Hello <b>${appointment.name}</b>,</p>

<p>Your appointment has been successfully booked. Here are your details:</p>

<div style="background:#f1f3f6;padding:15px;border-radius:6px">

<p><b>Date:</b> ${appointment.date}</p>
<p><b>Time:</b> ${appointment.time}</p>
<p><b>Service:</b> ${appointment.service}</p>

</div>

</div>

</div>
`

});

console.log("Approve mail sent");

}


// ================= REJECT =================

if (status === "Rejected") {

await resend.emails.send({

from: "Smile Dental <onboarding@resend.dev>",

to: appointment.email,

subject: "Appointment Rejected - Smile Dental Clinic",

html: `
<div style="font-family:Arial;background:#f5f7fb;padding:30px">

<div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

<h2 style="color:#ff4d4d">Smile Dental Clinic</h2>

<p>Hello <b>${appointment.name}</b>,</p>

<p>Unfortunately your appointment has been rejected.</p>

<div style="background:#f1f3f6;padding:15px;border-radius:6px">

<p><b>Date:</b> ${appointment.date}</p>
<p><b>Time:</b> ${appointment.time}</p>
<p><b>Service:</b> ${appointment.service}</p>

</div>

</div>

</div>
`

});

console.log("Reject mail sent");

}

res.json(appointment);

} catch (error) {

console.log("Update Error:", error);

res.status(500).json({
message: "Error"
});

}

});


// ================= GET =================

app.get("/api/appointments", async (req, res) => {

const data = await Appointment.find().sort({
createdAt: -1
});

res.json(data);

});


// ================= DELETE =================

app.delete("/api/appointments/:id", async (req, res) => {

await Appointment.findByIdAndDelete(req.params.id);

res.json({ message: "Deleted" });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});