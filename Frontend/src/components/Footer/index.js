/*
  Footer with multi-column layout, quick links, and social icons.
  Dark background with hover effects to match premium aesthetic.
*/
import { useLocation, Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaCheckCircle } from 'react-icons/fa';

export default function Footer() {
  const location = useLocation();
  const pathname = location.pathname;

  // Function to get dynamic contact details based on the current route
  const getFooterContactDetails = (path) => {
    // Services Pages (including details)
    if (path.startsWith('/services')) {
      return {
        sections: [
          {
            label: 'Phone',
            group: [
              {
                isRow: true,
                items: [
                  { label: 'Business Contact', value: '+91 87702 40025' },
                  { label: 'BDM No', value: '+91 82697 50025' }
                ]
              },
              { label: 'HR Contact', value: '+91 8269660025' }
            ]
          },
          { label: 'Email Us', value: 'info@dtableanalytics.com', isEmail: true },
          { label: 'For more queries', value: 'bd@dtableanalytics.com', isEmail: true }
        ]
      };
    }

    // Career Page (handling both /career and /careers)
    if (path.startsWith('/career')) {
      return {
        sections: [
          { label: 'Email', value: 'hr@dtableanalytics.com', isEmail: true },
          { label: 'HR Contact', value: '+91 8269660025' }
        ]
      };
    }

    // Home Page (Default)
    return {
      sections: [
        {
          label: 'Email',
          group: [
            { label: 'Business Support', value: 'rahulyadav@dtableanalytics.com' },
            { label: 'General inquiries', value: 'madhavijoshi@dtableanalytics.com' },
            { label: 'Careers', value: 'hr@dtableanalytics.com' }
          ],
          isEmail: true
        },
        {
          label: 'Phone',
          group: [
            {
              isRow: true,
              items: [
                { label: 'Business Contact', value: '+91 87702 40025' },
                { label: 'BDM No', value: '+91 82697 50025' }
              ]
            },
            { label: 'HR Contact', value: '+91 8269660025' }
          ]
        },
        { label: 'Website', value: 'https://www.dtableanalytics.com', isExternal: true }
      ]
    };
  };

  const contactData = getFooterContactDetails(pathname);

  return (
    <footer className="bg-gray-900 text-gray-400 relative">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide text-lg">D-Table Analytics</h4>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering businesses with AI-driven data intelligence and workflow
            automation.
          </p>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            📍 1st Floor, Kolar Castle, 101,<br />
            Chuna Bhatti Square,<br />
            Bhopal, Madhya Pradesh 462039
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-6 tracking-wide">Privacy & Trust</h5>
          <ul className="space-y-1">
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Your data is safe</span>
            </li>
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">We respect your privacy</span>
            </li>
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Your inquiries are handled confidentially</span>
            </li>
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Secure and professional communication</span>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-6 tracking-wide">Quick Links</h5>
          <ul className="space-y-4 text-sm mt-2">
            <li>
              <Link to="/#why-us" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">Why Us</Link>
            </li>
            <li>
              <Link to="/#faq" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">FAQ</Link>
            </li>
            <li>
              <Link to="/#contact" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-6 tracking-wide">Contact</h5>
          <div className="space-y-4 text-sm text-gray-400 mt-2">
            {contactData.sections.map((section, idx) => (
              <div key={idx}>
                <span className="text-gray-500 block text-xs uppercase tracking-wider font-semibold mb-1 opacity-80">
                  {section.label}:
                </span>
                {section.group ? (
                  <div className="space-y-4 ml-0">
                    {section.group.map((item, i) => (
                      item.isRow ? (
                        <div key={i} className="flex flex-wrap gap-x-8 gap-y-4">
                          {item.items.map((subItem, j) => (
                            <p key={j} className="flex flex-col">
                              <span className="text-gray-400/60 text-[11px] leading-tight mb-0.5">{subItem.label}</span>
                              <span className="text-gray-300">{subItem.value}</span>
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p key={i} className="flex flex-col">
                          <span className="text-gray-400/60 text-[11px] leading-tight mb-0.5">{item.label}</span>
                          {section.isEmail ? (
                            <a href={`mailto:${item.value}`} className="text-gray-300 hover:text-white transition-colors">{item.value}</a>
                          ) : (
                            <span className="text-gray-300">{item.value}</span>
                          )}
                        </p>
                      )
                    ))}
                  </div>
                ) : (
                  <p>
                    {section.isEmail ? (
                      <a href={`mailto:${section.value}`} className="text-gray-300 hover:text-white transition-colors">{section.value}</a>
                    ) : section.isExternal ? (
                      <a href={section.value} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors break-all">
                        {section.value}
                      </a>
                    ) : (
                      <span className="text-gray-300">{section.value}</span>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 mt-8">
            <a 
              href="https://www.linkedin.com/in/d-table-analytics-b523001a0/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit our LinkedIn page" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-gray-400 transition-all duration-500 hover:bg-[#0077b5] hover:text-white hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#0077b5]/30 group"
            >
              <FaLinkedin className="text-xl group-hover:scale-110 transition-transform duration-500" />
            </a>
            <a 
              href="https://www.instagram.com/dtanalytics/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit our Instagram page" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-gray-400 transition-all duration-500 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:-translate-y-1.5 hover:shadow-lg hover:shadow-pink-500/30 group"
            >
              <FaInstagram className="text-xl group-hover:scale-110 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="pt-8 border-t border-gray-800/60 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} D-Table Analytics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
