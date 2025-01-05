import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-8 px-4 md:px-8 bg-gray-100 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo/Brand */}
          <Link href="/">
            <div className="text-2xl font-bold text-gray-900">
              MayHite Market
            </div>
          </Link>

          {/* Contact Info - Now in a row for better space utilization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
            {/* Address */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <address className="not-italic text-gray-600 text-sm text-left">
                3252 Winding Way<br />
                Willowbrook, CA 90210
              </address>
            </div>

            {/* Email */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-600 text-sm">hello@lama.dev</span>
            </div>

            {/* Phone */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-gray-600 text-sm">+1 234 567 890</span>
            </div>
          </div>

          {/* Social Media - More compact with smaller icons */}
          <div className="flex justify-center gap-4">
            {['facebook', 'instagram', 'youtube', 'pinterest', 'x'].map((platform) => (
              <Link key={platform} href="#" className="group">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow transition-all transform group-hover:-translate-y-1">
                  <Image 
                    src={`/${platform}.png`} 
                    alt={platform} 
                    width={16} 
                    height={16} 
                    className="opacity-80 group-hover:opacity-100" 
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Payment Methods - Streamlined layout */}
          <div className="flex flex-wrap justify-center gap-2">
            {['discover', 'skrill', 'paypal', 'mastercard', 'visa'].map((payment) => (
              <div key={payment} className="bg-white p-2 rounded-lg shadow-sm hover:shadow transition-shadow">
                <Image 
                  src={`/${payment}.png`} 
                  alt={payment} 
                  width={32} 
                  height={16} 
                  className="opacity-80 hover:opacity-100" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-200 mt-6 pt-6">
          © 2025 MayHite Market. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;