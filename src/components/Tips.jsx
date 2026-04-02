import React, { useState, useRef } from "react";
import {
  FaTooth,
  FaShieldAlt,
  FaSmile,
  FaTeeth
} from "react-icons/fa";

const Tips = () => {

const detailsRef = useRef(null);

const tips = [
{
title: "Proper Brushing Technique",
description:
"Brush your teeth twice a day using a soft toothbrush. Clean gently in circular motion.",
icon: <FaTeeth />
},
{
title: "Cavity Prevention",
description:
"Avoid sugary food and brush regularly to prevent cavities.",
icon: <FaTooth />
},
{
title: "Gum Care",
description:
"Floss daily and use mouthwash to keep your gums healthy.",
icon: <FaShieldAlt />
},
{
title: "Tooth Protection",
description:
"Use mouth guards and avoid biting hard objects.",
icon: <FaTeeth />
},
{
title: "Regular Checkups",
description:
"Visit your dentist every 6 months for healthy teeth.",
icon: <FaSmile />
}
];

const [active, setActive] = useState(0);

const handleClick = (index) => {
setActive(index);

setTimeout(() => {
detailsRef.current.scrollIntoView({
behavior: "smooth"
});
}, 100);
};

return (

<section id="tips" className="py-16 bg-gray-100">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-4">
Dental Care Tips
</h2>

<p className="text-center text-gray-600 mb-10">
Simple tips to keep your teeth healthy
</p>

<div className="grid md:grid-cols-5 gap-4 mb-8">

{tips.map((tip, index) => (

<div
key={index}
onClick={() => handleClick(index)}
className={`cursor-pointer p-4 rounded-xl text-center shadow 
${active === index ? "bg-blue-100 border-2 border-blue-500" : "bg-white"}
`}
>

<div className="text-3xl mb-2 text-blue-500">
{tip.icon}
</div>

<h3 className="font-semibold">
{tip.title}
</h3>

</div>

))}

</div>


<div
ref={detailsRef}
className="bg-blue-100 p-8 rounded-2xl shadow"
>

<h3 className="text-2xl font-bold mb-3">
{tips[active].title}
</h3>

<p className="text-gray-700">
{tips[active].description}
</p>

</div>

</div>

</section>

);
};

export default Tips;