import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {

const [show, setShow] = useState(false);

useEffect(() => {

const handleScroll = () => {
if (window.scrollY > 300) {
setShow(true);
} else {
setShow(false);
}
};

window.addEventListener("scroll", handleScroll);

return () => window.removeEventListener("scroll", handleScroll);

}, []);

const scrollTop = () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
};

return (
<>
{show && (
<button
onClick={scrollTop}
className="fixed bottom-20 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
>
<FaArrowUp />
</button>
)}
</>
);
};

export default BackToTop;