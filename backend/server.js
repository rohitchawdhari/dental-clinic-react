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


// EMAIL SETUP (FIXED FOR RENDER)

const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false,
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
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


// CREATE APPOINTMENT

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

await transporter.sendMail({

from: `"Smile Dental" <${process.env.EMAIL_USER}>`,
to: "smiledentalofficial0@gmail.com",

subject: `New Appointment - ${name}`,

html: `
<div style="font-family: Arial; padding:20px; background:#f4f4f4">
<div style="background:white; padding:20px; border-radius:8px">

<h2 style="color:#2563eb">New Appointment Received</h2>

<p><b>Patient Name:</b> ${name}</p>
<p><b>Phone Number:</b> ${phone}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Appointment Date:</b> ${date}</p>
<p><b>Appointment Time:</b> ${time}</p>
<p><b>Service:</b> ${service}</p>

<hr/>

<p>Smile Dental Clinic</p>

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


// UPDATE STATUS

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

from: `"Smile Dental" <${process.env.EMAIL_USER}>`,
to: appointment.email,

subject: "Appointment Confirmed - Smile Dental",

html: `
<h2>Appointment Confirmed</h2>

<p>Hello ${appointment.name}</p>

<p>Date: ${appointment.date}</p>
<p>Time: ${appointment.time}</p>
<p>Service: ${appointment.service}</p>

<p>Thank you for choosing Smile Dental</p>
`

});

console.log("Approve mail sent");

}


// REJECT

if (status === "Rejected") {

await transporter.sendMail({

from: `"Smile Dental" <${process.env.EMAIL_USER}>`,
to: appointment.email,

subject: "Appointment Rejected - Smile Dental",

html: `
<h2>Appointment Rejected</h2>

<p>Hello ${appointment.name}</p>

<p>Please book another slot</p>
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


// GET

app.get("/api/appointments", async (req, res) => {

const data = await Appointment.find().sort({
createdAt: -1
});

res.json(data);

});


// DELETE

app.delete("/api/appointments/:id", async (req, res) => {

await Appointment.findByIdAndDelete(req.params.id);

res.json({ message: "Deleted" });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});