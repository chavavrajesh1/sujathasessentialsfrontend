import { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="pt-24 px-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* LEFT SIDE - CONTACT INFO */}
                <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                    <p className="text-gray-600">
                        We are always here to help you with orders, tours, or inquiries.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-800">📞 Phone</h3>
                            <p className="text-gray-600">+91 7989124249</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800">📧 Email</h3>
                            <p className="text-gray-600">info@sujathasessentials.com</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800">📍 Address</h3>
                            <p className="text-gray-600">
                                Tenali, Guntur Dist, Andhra Pradesh, India
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-xl p-8 space-y-6"
                >
                    <h2 className="text-2xl font-bold">Get in Touch</h2>

                    <div className="space-y-4">
                        
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                autoComplete="name"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                autoComplete="email"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Type your message..."
                                autoComplete="off"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg hover:bg-orange-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* GOOGLE MAP */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-center mb-4">Find Us on Map</h2>

                <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="map"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ border: 0 }}
                        allowFullScreen
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5085284062287!2d78.48208667472496!3d17.38504428350059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb975b39fd0bbf%3A0xde05e1b0cde107bb!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1709555555555"
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
