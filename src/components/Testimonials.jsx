import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {

const [reviews, setReviews] = useState([]);
const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
name:"",
rating:5,
message:""
});


// Fetch Reviews

const fetchReviews = async () => {
const res = await fetch("https://smile-dental-backend.onrender.com/api/reviews");
const data = await res.json();
setReviews(data);
};

useEffect(()=>{
fetchReviews();
},[]);


// Handle Submit

const handleSubmit = async (e) => {
e.preventDefault();

if(!formData.name || !formData.message){
alert("Please fill all fields");
return;
}

await fetch("https://smile-dental-backend.onrender.com/api/reviews",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(formData)
});

setShowForm(false);
setFormData({
name:"",
rating:5,
message:""
});

fetchReviews();
};

return (

<section id="testimonials" className="py-16 bg-sky-100">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-4">
Patient Testimonials
</h2>

<p className="text-center text-gray-600 mb-10">
See what our happy patients say about our dental services
</p>


{/* Reviews */}

<div className="grid md:grid-cols-2 gap-6">

{reviews.map((review)=>(
<div key={review._id} className="bg-white p-6 rounded-xl shadow">

<h3 className="font-semibold text-lg">
{review.name}
</h3>

<div className="flex text-yellow-400 my-2">

{[...Array(review.rating)].map((_,i)=>(
<FaStar key={i}/>
))}

</div>

<p className="text-gray-600">
{review.message}
</p>

</div>
))}

</div>


{/* Share Button */}

<div className="text-center mt-8">

<button
onClick={()=>setShowForm(true)}
className="bg-blue-600 text-white px-6 py-3 rounded-full"
>
Share Your Experience
</button>

</div>


{/* Form */}

{showForm && (

<div className="mt-10 bg-white p-8 rounded-xl shadow">

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Your Name"
className="w-full p-3 border mb-4"
value={formData.name}
onChange={(e)=>setFormData({...formData,name:e.target.value})}
/>


<select
className="w-full p-3 border mb-4"
value={formData.rating}
onChange={(e)=>setFormData({...formData,rating:Number(e.target.value)})}
>

<option value="5">⭐⭐⭐⭐⭐</option>
<option value="4">⭐⭐⭐⭐</option>
<option value="3">⭐⭐⭐</option>
<option value="2">⭐⭐</option>
<option value="1">⭐</option>

</select>


<textarea
placeholder="Write your review..."
className="w-full p-3 border mb-4"
rows="4"
value={formData.message}
onChange={(e)=>setFormData({...formData,message:e.target.value})}
/>

<button
className="bg-blue-600 text-white px-6 py-3 rounded"
>
Submit Review
</button>

</form>

</div>

)}

</div>

</section>

);
};

export default Testimonials;