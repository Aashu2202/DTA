import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineCheckCircle, HiOutlineUpload, HiOutlineRefresh } from 'react-icons/hi';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const VALID_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  experience: '',
  currentRole: '',
  skills: '',
  linkedin: '',
  portfolio: '',
  coverLetter: '',
  resume: null,
};

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function ApplicationModal({ isOpen, jobTitle, onClose }) {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /* ─── Validation ─────────────────────────────────────────── */
  const validateForm = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = 'First name is required';
    if (!formData.lastName.trim()) e.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      e.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!formData.experience) e.experience = 'Years of experience is required';
    if (!formData.resume) e.resume = 'Resume is required';
    return e;
  };

  /* ─── Handlers ───────────────────────────────────────────── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!VALID_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, resume: 'Only PDF, DOC, and DOCX files are allowed' }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, resume: 'File size must not exceed 10MB' }));
      return;
    }

    setFormData((prev) => ({ ...prev, resume: file }));
    setErrors((prev) => ({ ...prev, resume: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append('job_title', jobTitle || '');
      payload.append('first_name', formData.firstName);
      payload.append('last_name', formData.lastName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('experience', formData.experience);
      payload.append('current_role', formData.currentRole || '');
      payload.append('skills', formData.skills || '');
      payload.append('linkedin_url', formData.linkedin || '');
      payload.append('portfolio_url', formData.portfolio || '');
      payload.append('cover_letter', formData.coverLetter || '');
      if (formData.resume) {
        payload.append('resume', formData.resume);
      }

      const response = await fetch(`${API_BASE}/api/v1/careers/apply`, {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => handleClose(), 3000);
      } else {
        // Extract a human-readable message from the API error
        const apiMessage =
          data?.detail?.message ||
          data?.message ||
          'Something went wrong. Please try again later.';
        setSubmitError(apiMessage);
      }
    } catch (err) {
      setSubmitError('Cannot connect to the server. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(emptyForm);
    setSubmitted(false);
    setErrors({});
    setSubmitError(null);
    setIsLoading(false);
    onClose();
  };

  /* ─── Shared input class helper ──────────────────────────── */
  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none
    dark:bg-gray-800 dark:text-white
    ${
      errors[field]
        ? 'border-red-400 focus:ring-2 focus:ring-red-400'
        : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary'
    }`;

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {isOpen && (
        /*
         * OUTER WRAPPER
         * fixed inset-0 + overflow-y-auto allows the page to scroll
         * if the modal is taller than the viewport (esp. on mobile).
         */
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/*
           * CENTERING CONTAINER
           * items-start on mobile so tall forms start from top;
           * items-center on sm+ to vertically centre shorter forms.
           */}
          <div className="min-h-full flex items-start sm:items-center justify-center p-4 sm:p-6 relative">

            {/*
             * BACKDROP OVERLAY — sibling of modal, not a parent.
             * backdrop-blur-sm blurs only what is behind THIS element.
             * Because the modal is a sibling with z-10, it is NOT blurred.
             */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/*
             * MODAL CONTAINER
             * relative z-10 lifts it above the blur overlay.
             * max-h-[90vh] + overflow-y-auto = inner scroll for very long forms.
             * stopPropagation prevents backdrop click firing when clicking inside.
             */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Apply for ${jobTitle}`}
              className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl
                         w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── STICKY HEADER ── */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between
                           px-4 sm:px-6 py-5 border-b border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-900 rounded-t-2xl"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    Submit Your Application
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Applying for:{' '}
                    <span className="font-semibold text-primary">{jobTitle}</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="flex items-center justify-center w-9 h-9 rounded-full
                             text-gray-500 hover:text-gray-900 hover:bg-gray-100
                             dark:hover:bg-gray-700 dark:text-gray-400
                             transition-colors flex-shrink-0"
                >
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              {/* ── BODY ── */}
              <div className="p-4 sm:p-6">

                {/* SUCCESS STATE */}
                {submitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-14 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.5, repeat: 1 }}
                    >
                      <HiOutlineCheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Application Submitted!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
                      Thank you! Your application has been submitted. Our HR team will
                      review your profile and get back to you soon.
                    </p>
                  </motion.div>

                ) : (

                  /* FORM */
                  <form onSubmit={handleSubmit} noValidate className="space-y-8">

                    {/* ── Section 1: Personal Information ── */}
                    <section>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Personal Information
                      </h3>

                      {/* Row 1: First Name | Last Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className={inputClass('firstName')}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            className={inputClass('lastName')}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Email | Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className={inputClass('email')}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <div className="relative flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
                              +91
                            </span>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setFormData((prev) => ({ ...prev, phone: val }));
                                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                              }}
                              placeholder="9876543210"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={10}
                              className={inputClass('phone').replace('rounded-lg', 'rounded-r-lg')}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* ── Section 2: Professional Information ── */}
                    <section>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Professional Information
                      </h3>

                      {/* Row 3: Experience | Current Role */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Years of Experience <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className={inputClass('experience')}
                          >
                            <option value="">Select experience</option>
                            <option value="0-1">0–1 year (Fresher)</option>
                            <option value="1-3">1–3 years</option>
                            <option value="3-5">3–5 years</option>
                            <option value="5-10">5–10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                          {errors.experience && (
                            <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Current Role
                            <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(optional)</span>
                          </label>
                          <input
                            type="text"
                            name="currentRole"
                            value={formData.currentRole}
                            onChange={handleInputChange}
                            placeholder="e.g. Senior Developer"
                            className={inputClass('currentRole')}
                          />
                        </div>
                      </div>

                      {/* Full-width: Key Skills */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Key Skills
                          <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(optional)</span>
                        </label>
                        <textarea
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="e.g. Python, React, Data Analysis, SQL..."
                          className={`${inputClass('skills')} resize-none`}
                        />
                      </div>
                    </section>

                    {/* ── Section 3: Additional Information ── */}
                    <section>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Additional Information
                      </h3>

                      {/* Row 4: LinkedIn | Portfolio */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            LinkedIn Profile
                            <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(optional)</span>
                          </label>
                          <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className={inputClass('linkedin')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Portfolio / GitHub
                            <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(optional)</span>
                          </label>
                          <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            placeholder="https://github.com/yourprofile"
                            className={inputClass('portfolio')}
                          />
                        </div>
                      </div>

                      {/* Full-width: Cover Letter */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Cover Letter
                          <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(optional)</span>
                        </label>
                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                          className={`${inputClass('coverLetter')} resize-none`}
                        />
                      </div>
                    </section>

                    {/* ── Section 4: Resume Upload ── */}
                    <section>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                        Resume Upload
                        <span className="text-red-500 ml-1">*</span>
                      </h3>

                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="resume-upload"
                        className={`flex flex-col items-center justify-center gap-2 cursor-pointer
                          rounded-xl border-2 border-dashed p-8 text-center
                          transition-colors duration-200
                          ${
                            errors.resume
                              ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
                              : formData.resume
                              ? 'border-green-400 bg-green-50 dark:bg-green-900/10'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5'
                          }`}
                      >
                        <HiOutlineUpload
                          className={`w-8 h-8 ${
                            formData.resume ? 'text-green-500' : 'text-gray-400'
                          }`}
                        />
                        {formData.resume ? (
                          <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                            ✓ {formData.resume.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Click to upload your resume
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              PDF, DOC, or DOCX — max 10MB
                            </p>
                          </>
                        )}
                      </label>
                      {errors.resume && (
                        <p className="text-red-500 text-xs mt-2">{errors.resume}</p>
                      )}
                    </section>

                    {/* ── Error Banner ── */}
                    {submitError && (
                      <div className="flex items-start gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-sm text-red-700 dark:text-red-400">
                        <span className="flex-1">{submitError}</span>
                        <button
                          type="button"
                          onClick={() => setSubmitError(null)}
                          className="flex-shrink-0 hover:opacity-70 transition-opacity"
                          aria-label="Dismiss error"
                        >
                          <HiOutlineX className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* ── Form Actions ── */}
                    {/*
                     * Mobile:   stacked full-width (flex-col-reverse so Submit is on top)
                     * Desktop:  side-by-side, right-aligned (sm:flex-row sm:justify-end)
                     */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold
                                   bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                                   hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold
                                   bg-gradient-to-r from-primary to-indigo-600 text-white
                                   hover:shadow-lg hover:scale-[1.02] active:scale-100
                                   transition-all duration-200
                                   disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
                                   flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <HiOutlineRefresh className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
