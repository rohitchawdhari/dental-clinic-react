import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import Appointment from "./models/Appointment.js";
import Review from "./models/reviewModel.js";

dotenv.config();

const app = express();

app.use(cors({
origin: "*"
}));

app.use(express.json());


// ================= EMAIL TRANSPORTER (FIXED) =================

const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false,
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});


// ================= SAFE MAIL FUNCTION =================

const sendMail = async (mailOptions) => {
try {
await transporter.sendMail(mailOptions);
console.log("Mail Sent");
} catch (error) {
console.log("Mail Error:", error);
}
};


// ================= MONGODB CONNECT =================

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
console.log("MongoDB Connected");
})
.catch((err) => console.log(err));


app.get("/", (req, res) => {
res.send("Dental Backend Running");
});


// ================= ADMIN LOGIN =================

app.post("/api/admin/login", async (req, res) => {

try {

const { username, password } = req.body;

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

if (username === ADMIN_USER && password === ADMIN_PASS) {

return res.json({
success: true,
message: "Login successful"
});

} else {

return res.status(401).json({
success: false,
message: "Invalid credentials"
});

}

} catch (error) {

res.status(500).json({
message: "Server error"
});

}

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


// ================= ADMIN MAIL =================

sendMail({

from: process.env.EMAIL_USER,
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

res.status(201).json({
success: true,
appointment
});

} catch (error) {

console.log(error);

res.status(500).json({
message: "Error saving appointment"
});

}

});


// ================= UPDATE STATUS =================

app.put("/api/appointments/:id", async (req, res) => {

try {

const { status } = req.body;

const appointment = await Appointment.findByIdAndUpdate(
req.params.id,
{ status },
{ new: true }
);


// ================= CONFIRM MAIL =================

if (status === "Completed") {

sendMail({

from: process.env.EMAIL_USER,
to: appointment.email,
subject: "Appointment Confirmed - Smile Dental Clinic",

html: `

<div style="font-family:Arial;background:#f5f7fb;padding:30px">

<div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

<h2 style="color:#2a6edb">Smile Dental Clinic</h2>

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

}


// ================= REJECT MAIL =================

if (status === "Rejected") {

sendMail({

from: process.env.EMAIL_USER,
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

}

res.json(appointment);

} catch (error) {

console.log(error);

res.status(500).json({
message: "Error updating status"
});

}

});


// ================= GET ALL =================

app.get("/api/appointments", async (req, res) => {

const appointments = await Appointment.find().sort({
createdAt: -1
});

res.json(appointments);

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