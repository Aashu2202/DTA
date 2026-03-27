/*
  Careers page with professional UI matching the existing design system.
  Includes hero, why work with us, open positions, hiring process, and apply sections.
*/
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineArrowRight,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineClock,
  HiOutlineCalendar,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';
import ApplicationModal from '../components/Career/ApplicationModal';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 5;
  const positionsRef = useRef(null);

  const whyWorkCards = [
    {
      icon: '🚀',
      title: 'Work on AI & Data Projects',
      description: 'Build cutting-edge solutions that transform how businesses use data.',
    },
    {
      icon: '📚',
      title: 'Learning & Growth Opportunities',
      description: 'Continuous learning programs and mentorship from industry experts.',
    },
    {
      icon: '⚡',
      title: 'Flexible Work Environment',
      description: 'Remote-first culture with flexible working hours and time off.',
    },
    {
      icon: '💰',
      title: 'Competitive Compensation',
      description: 'Attractive salary, equity, and comprehensive benefits package.',
    },
  ];

  const [positions, setPositions] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [errorJobs, setErrorJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/v1/jobs');
        if (!response.ok) throw new Error('Failed to fetch positions');
        const data = await response.json();
        
        // Map backend data to frontend model
        const mappedJobs = data.map(job => {
          // Calculate relative time or format date
          const date = new Date(job.created_at);
          const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
          
          return {
            id: job.id,
            title: job.title,
            description: job.description,
            location: job.location,
            employmentType: job.employment_type,
            experience: job.experience,
            postedDate: formattedDate,
            tags: [job.department, ...(job.requirements || [])].filter(Boolean),
            applyLinkOrEmail: job.apply_link_or_email
          };
        });
        
        setPositions(mappedJobs);
      } catch (err) {
        setErrorJobs(err.message);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const hiringSteps = [
    {
      step: '01',
      title: 'Application Review',
      description:
        'Our HR team reviews your application and resume to assess fit.',
    },
    {
      step: '02',
      title: 'Technical Assessment',
      description:
        'Complete a technical assessment tailored to the role requirements.',
    },
    {
      step: '03',
      title: 'Interview',
      description:
        'Meet with our team for discussions about your experience and goals.',
    },
    {
      step: '04',
      title: 'Offer',
      description:
        'Receive a competitive offer and join our awesome team!',
    },
  ];

  return (
    <div className="antialiased">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[80vh] bg-gradient-to-br from-primary to-indigo-400 overflow-hidden">
        {/* Animated shapes */}
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
          animate={{ x: [-100, 100, -100], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
          animate={{ x: [100, -100, 100], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold text-white z-10 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join Our Team at D-Table Analytics
        </motion.h1>
        <motion.p
          className="mt-4 text-lg sm:text-2xl text-white max-w-2xl z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Build the future of AI-powered data solutions with us.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 z-10 items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="#positions"
            className="w-full sm:w-auto text-center px-6 py-3 bg-white text-primary font-semibold rounded-2xl shadow-lg hover:bg-gray-100 transition"
          >
            View Open Positions
          </a>
        </motion.div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Why Work With Us
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join a team that values innovation, growth, and impact.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {whyWorkCards.map((card, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft dark:shadow-soft-dark hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" ref={positionsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Open Positions
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're actively hiring talented individuals. Apply today and become part of our innovative team.
            </p>
          </motion.div>

          <motion.div
            key={currentPage}
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {loadingJobs ? (
              <div className="text-center text-gray-500 py-10">Loading open positions...</div>
            ) : errorJobs ? (
              <div className="text-center text-red-500 py-10">{errorJobs}</div>
            ) : positions.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No open positions at the moment. Please check back later.</div>
            ) : (
              <>
                {positions
                  .slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE)
                  .map((job, idx) => (
                  <motion.div
                    key={job.id || idx}
                    className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    variants={itemVariants}
                  >
                    {/* Left Section: Title & Description */}
                    <div className="flex-1 lg:w-[45%] lg:flex-none lg:pr-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base line-clamp-2 lg:line-clamp-none">
                        {job.description}
                      </p>
                    </div>

                    {/* Middle Section: Metadata & Tags */}
                    <div className="flex-1 w-full lg:w-auto flex flex-col gap-3">
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-5 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <HiOutlineLocationMarker className="text-primary flex-shrink-0" size={18} />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineBriefcase className="text-primary flex-shrink-0" size={18} />
                          <span className="truncate">{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineClock className="text-primary flex-shrink-0" size={18} />
                          <span className="truncate">{job.employmentType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiOutlineCalendar className="text-primary flex-shrink-0" size={18} />
                          <span className="truncate">{job.postedDate}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-primary/10 text-primary dark:bg-primary/20 text-xs font-medium rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Section: Action Button */}
                    <div className="w-full lg:w-auto flex justify-end shrink-0">
                      <button
                        onClick={() => setSelectedJob(job.title)}
                        className="w-full lg:w-auto py-2.5 px-8 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-600 shadow-sm hover:shadow transition-all flex items-center justify-center whitespace-nowrap">
                        Apply Now
                        <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Pagination Controls */}
                {positions.length > JOBS_PER_PAGE && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        const newPage = Math.max(1, currentPage - 1);
                        setCurrentPage(newPage);
                        positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 transition-all ${
                        currentPage === 1
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-primary/5 hover:border-primary/30 text-gray-600 dark:text-gray-400'
                      }`}
                      aria-label="Previous page"
                    >
                      <HiChevronLeft size={20} />
                    </button>

                    {Array.from({ length: Math.ceil(positions.length / JOBS_PER_PAGE) }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => {
                          setCurrentPage(i + 1);
                          positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === i + 1
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        const totalPages = Math.ceil(positions.length / JOBS_PER_PAGE);
                        const newPage = Math.min(totalPages, currentPage + 1);
                        setCurrentPage(newPage);
                        positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      disabled={currentPage === Math.ceil(positions.length / JOBS_PER_PAGE)}
                      className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 transition-all ${
                        currentPage === Math.ceil(positions.length / JOBS_PER_PAGE)
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-primary/5 hover:border-primary/30 text-gray-600 dark:text-gray-400'
                      }`}
                      aria-label="Next page"
                    >
                      <HiChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Our Hiring Process
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A transparent and fair recruitment process designed to find the best talent.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {hiringSteps.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative"
                variants={itemVariants}
              >
                {/* Connecting line for larger screens */}
                {idx < hiringSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft dark:shadow-soft-dark text-center">
                  <div className="inline-block w-16 h-16 bg-gradient-to-br from-primary to-indigo-400 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Send your resume to the email below and our HR team will review your application.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-10 mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Email</p>
              <a
                href="mailto:hr@dtableanalytics.com"
                className="text-lg sm:text-2xl md:text-3xl font-bold text-primary hover:underline break-all"
              >
                hr@dtableanalytics.com
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hr@dtableanalytics.com"
                className="px-8 py-3 bg-primary text-white font-semibold rounded-2xl hover:bg-indigo-600 transition-colors"
              >
                Send Your Resume
              </a>
              <a
                href="/"
                className="px-8 py-3 border border-primary text-primary font-semibold rounded-2xl hover:bg-primary hover:text-white transition-colors"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={selectedJob !== null}
        jobTitle={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}
