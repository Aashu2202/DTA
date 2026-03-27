import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const ServiceBlock = ({ service, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section 
      id={service.id}
      className={`py-20 ${isEven ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <img
                src={service.image}
                alt={service.title}
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover transform group-hover:scale-[1.02] transition-all duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
              Service {index + 1}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {service.title}
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {service.fullDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link
                to={`/services/${service.id}`}
                onClick={() => sessionStorage.setItem('scrollTargetServiceId', service.id)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-600 hover:shadow-primary/25 transition-all duration-300 group"
              >
                Learn More
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServiceBlock;
