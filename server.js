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
<h2>New Appointment Received</h2>

<p>Name: ${name}</p>
<p>Phone: ${phone}</p>
<p>Email: ${email}</p>
<p>Date: ${date}</p>
<p>Time: ${time}</p>
<p>Service: ${service}</p>
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