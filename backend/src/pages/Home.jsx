import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Tips from "../components/Tips";
import BookAppointment from "../components/BookAppointment";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import WhatsApp from "../components/WhatsApp";
import Loader from "../components/Loader";
import BackToTop from "../components/BackToTop";
import Map from "../components/Map";
import Timing from "../components/Timing";
import Emergency from "../components/Emergency";

const Home = () => {

const [loading, setLoading] = useState(true);

useEffect(() => {
setTimeout(() => {
setLoading(false);
}, 1200);
}, []);

if (loading) return <Loader />;

return (
<div id="home">
<Header />
<Hero />
<Services />
<About />
<Tips />
<BookAppointment />
<Testimonials />
<Footer />
<WhatsApp />
<BackToTop />
<Map />
<Timing />
<Emergency />
</div>
);
};

export default Home;