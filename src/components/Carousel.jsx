import { useState,useEffect } from "react";


const Carousel = () => {
    const slides = [
        {
            id: 1,
            img: "/images/pickles.webp",
            text: "Premium Homemade Pickles",
        },
        {
            id: 2,
            img: "/images/pooja.webp",
            text: "Temple Essentials & Pooja Items",
        },
        {
            id: 3,
            img: "/images/homeproducts.webp",
            text: "Quality Home & Bathroom Products",
        },
    ];

    const [current, setCurrent] = useState(0);

    //   Auto Slide every 3 seconds

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrent((prev)=>(prev+1)%slides.length);
        },3000);

        return ()=>clearInterval(interval)
    },[slides.length]);

    return (
        <div className='relative w-full h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl shadow-md'>

            {/*  Slides */}
            {slides.map((slide, index) => (
                <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"}`}>
                    <img src={slide.img} alt={slide.text} className='w-full h-full object-cover' />

                    {/* Dark Overlay */}
                    <div className='absolute inset-0 bg-black bg-opacity-40'></div>

                    {/* Text */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <h2 className='text-white text-2xl md:text-4xl font-bold px-4 text-center drop-shadow-lg'>{slide.text}</h2>
                    </div>
                </div>
            ))}

            {/* Dots */}
            <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-gray-400"}`}></button>
                ))}
            </div>
        </div>
    )
}

export default Carousel
