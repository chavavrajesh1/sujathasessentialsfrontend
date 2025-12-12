import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      {/* Main Section */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Sujatha’s Essentials
          </h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Pickles, home & bathroom essentials, pooja items and curated travel experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-800">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>
              <Link to="/shop" className="hover:text-orange-600 transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/tours" className="hover:text-orange-600 transition-colors">
                Tours
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-600 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="font-semibold text-gray-800">Contact</h4>
          <p className="text-sm text-gray-700 mt-2">📧 info@sujathasessentials.com</p>
          <p className="text-sm text-gray-700">📞 +91-7989124249</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Sujatha’s Essentials. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
