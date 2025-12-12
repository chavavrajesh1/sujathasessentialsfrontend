const tours = [
  {
    id: 1,
    title: "Kasi – Ayodhya – Gaya Yatra",
    img: "/images/kashi.png",
    desc: "Premium pilgrimage covering Kasi, Ayodhya, Gaya, Prayagraj & nearby holy places.",
    places: "Kasi, Ayodhya, Gaya, Prayagraj, Chitrakoot & more",
    duration: "15 Days",
    price: "₹ 15,550",
  },
  {
    id: 2,
    title: "Rameswaram – Madurai – Kanyakumari Yatra",
    img: "/images/rameswaram.png",
    desc: "Explore the most sacred temples of South India with comfortable travel & stay.",
    places: "Rameswaram, Kanyakumari, Madurai, Srirangam, Jambukeswaram",
    duration: "10 Days",
    price: "₹ 12,500",
  },
  {
    id: 3,
    title: "Maharashtra Jyotirlinga Yatra",
    img: "/images/maharashtra-jyotirlinga.jpg",
    desc: "Visit the powerful Jyotirlingas of Maharashtra with a safe & comfortable journey.",
    places: "Trayambakeswar, Grushneshwar, Aundha Nagnath, Parli Vaidyanath, Tuljapur",
    duration: "7 Days",
    price: "₹ 10,500",
  },
];

const Tours = () => {
  return (
    <div className="pt-24 pb-12 px-6 bg-gray-50">
      {/* Global Note */}
      <p className="text-center text-sm text-red-600 mb-4 font-medium">
        *Note: Tour prices & durations may change based on season, availability, and travel conditions.
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Our Temple Tours
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <article
            key={tour.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <img
              src={tour.img}
              alt={tour.title}
              className="w-full h-56 object-cover"
              loading="lazy"
            />

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-semibold text-gray-700">{tour.title}</h2>
              <p className="text-gray-600 mt-2 flex-1">{tour.desc}</p>

              <p className="text-sm mt-3 text-gray-500">
                📍 <span className="font-medium">{tour.places}</span>
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">{tour.price}</span>

                {/* WhatsApp Booking Button */}
                <a
                  href={`https://wa.me/917989124249?text=I%20want%20to%20book%20${encodeURIComponent(
                    tour.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Now
                </a>
              </div>

              <p className="text-xs text-red-600 mt-3">
                *Duration & price may vary depending on season.
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Tours;
