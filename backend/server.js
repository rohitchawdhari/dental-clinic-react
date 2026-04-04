import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import Appointment from "./models/Appointment.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// EMAIL SETUP

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
tls: {
rejectUnauthorized: false
}
});


// MONGODB

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// REVIEW ROUTE

app.use("/api/reviews", reviewRoutes);


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


// CLINIC MAIL

await transporter.sendMail({

from: `"Smile Dental Clinic" <${process.env.EMAIL_USER}>`,
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

console.log("Booking mail sent");

return res.json({ success: true });

} catch (error) {

console.log("Booking Mail Error:", error);

return res.status(500).json({
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


// APPROVE

if (status === "Completed") {

await transporter.sendMail({

from: `"Smile Dental Clinic" <${process.env.EMAIL_USER}>`,
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

<p>
<b>Smile Dental Clinic</b><br/>
📞 +91 8467093427 <br/>
✉ smiledentalofficial0@gmail.com
</p>

</div>

</div>
`

});

console.log("Approve mail sent");

}


// REJECT

if (status === "Rejected") {

await transporter.sendMail({

from: `"Smile Dental Clinic" <${process.env.EMAIL_USER}>`,
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

<p>
<b>Smile Dental Clinic</b><br/>
📞 +91 8467093427 <br/>
✉ smiledentalofficial0@gmail.com
</p>

</div>

</div>
`

});

console.log("Reject mail sent");

}

return res.json(appointment);

} catch (error) {

console.log("Update Error:", error);

return res.status(500).json({
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