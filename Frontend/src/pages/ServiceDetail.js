import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { API_BASE_URL } from '../config';
import {
    FiCheckCircle,
    FiArrowRight,
    FiArrowLeft,
    FiActivity,
    FiTarget,
    FiLayers,
    FiBriefcase,
    FiCheck,
    FiAlertCircle,
    FiTrendingUp,
    FiClock,
    FiTrendingDown,
    FiDatabase,
    FiUserX,
    FiShieldOff,
    FiXCircle,
    FiZap,
    FiSliders,
    FiSearch,
    FiDollarSign,
    FiMessageCircle,
    FiRefreshCw,
    FiLock,
    FiGlobe
} from 'react-icons/fi';

// Map string names → React components for CMS-driven icon rendering
const ICON_MAP = {
    FiAlertCircle, FiClock, FiTrendingDown, FiDatabase, FiUserX, FiShieldOff,
    FiXCircle, FiZap, FiActivity, FiSliders, FiSearch, FiDollarSign,
    FiMessageCircle, FiRefreshCw, FiLock, FiGlobe, FiLayers, FiCheckCircle
};

export default function ServiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fallback to static data immediately so UX isn't blocked
    const [service, setService] = useState(() => servicesData.find(s => s.id === id));

    // Initial scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/services/${id}`);
                if (response.ok) {
                    const dbService = await response.json();
                    setService(dbService);
                }
            } catch (err) {
                console.error("Failed to load service from DB; using static fallback.");
            }
        };
        fetchServiceDetail();
    }, [id]);

    if (!service) {
        return <Navigate to="/" replace />;
    }

    const { detailContent } = service;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Hero / Banner Section */}
            <section className="relative h-64 md:h-96 w-full flex items-center justify-center overflow-hidden">
                {/* Minimal Back Button */}
                <div className="absolute top-6 left-4 sm:left-6 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white shadow-sm transition-all"
                        aria-label="Go back"
                    >
                        <FiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="hidden sm:inline font-medium">Back</span>
                    </button>
                </div>

                <div className="absolute inset-0">
                    <img
                        src={service.banner}
                        alt={service.title}
                        className="w-full h-full object-cover filter brightness-50"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
                            {service.title}
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
                            {service.shortDesc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Main Content Area */}
                    <div className="lg:w-2/3 space-y-16">

                        {/* 1. What This Service Is (Overview) */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                                    <FiActivity className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Service Overview</h2>
                            </div>

                            <div className="space-y-6 border-l-4 border-primary pl-6 py-4 bg-gradient-to-r from-primary/5 to-transparent rounded-r-2xl">
                                {detailContent?.whatIsIt ? (
                                    detailContent.whatIsIt.map((para, idx) => (
                                        <p key={idx} className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                            {para}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {service.fullDesc}
                                    </p>
                                )}
                            </div>
                        </motion.section>

                        {/* 2. The Challenges You Face */}
                        {detailContent?.problems && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 shadow-sm">
                                        <FiAlertCircle className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Challenges You Face</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {detailContent.problems.map((problem, idx) => {
                                        const IconComponent = ICON_MAP[problem.icon_name] || FiAlertCircle;
                                        return (
                                            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
                                                <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{problem.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{problem.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.section>
                        )}

                        {/* 3. How We Solve Them */}
                        {detailContent?.howWeHelp && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shadow-sm">
                                        <FiCheckCircle className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How We Solve Them</h2>
                                </div>

                                <div className="space-y-6">
                                    {detailContent.howWeHelp.map((item, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors">
                                            {/* Problem */}
                                            <div className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 md:text-center flex flex-col justify-center">
                                                <span className="text-xs font-bold uppercase text-orange-500 tracking-wider mb-2 block">Challenge</span>
                                                <p className="font-semibold text-gray-900 dark:text-white">{item.problem}</p>
                                            </div>

                                            {/* Arrow Desktop / Mobile */}
                                            <div className="text-gray-300 dark:text-gray-600 hidden md:flex items-center justify-center">
                                                <FiArrowRight className="w-6 h-6" />
                                            </div>
                                            <div className="text-gray-300 dark:text-gray-600 flex md:hidden items-center justify-center rotate-90 my-1">
                                                <FiArrowRight className="w-5 h-5" />
                                            </div>

                                            {/* Solution */}
                                            <div className="flex-1 bg-primary text-white p-5 rounded-xl shadow-md border border-primary-light md:text-center flex flex-col justify-center">
                                                <span className="text-xs font-bold uppercase text-white/70 tracking-wider mb-2 block">Our Solution</span>
                                                <p className="font-semibold text-lg">{item.solution}</p>
                                            </div>

                                            {/* Arrow Desktop / Mobile */}
                                            <div className="text-gray-300 dark:text-gray-600 hidden md:flex items-center justify-center">
                                                <FiArrowRight className="w-6 h-6" />
                                            </div>
                                            <div className="text-gray-300 dark:text-gray-600 flex md:hidden items-center justify-center rotate-90 my-1">
                                                <FiArrowRight className="w-5 h-5" />
                                            </div>

                                            {/* Outcome */}
                                            <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 p-5 rounded-xl md:text-center flex flex-col justify-center">
                                                <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider mb-2 block">Outcome</span>
                                                <p className="font-semibold text-emerald-900 dark:text-emerald-100">{item.outcome}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* 4. Process Diagram */}
                        {detailContent?.processDiagram && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shadow-sm">
                                        <FiTrendingUp className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Methodology</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative pt-4">
                                    {/* Connecting line for desktop */}
                                    <div className="hidden md:block absolute top-[28px] left-[12.5%] w-[75%] h-0.5 bg-gradient-to-r from-gray-200 via-primary/30 to-gray-200 dark:from-gray-700 dark:via-primary/50 dark:to-gray-700 z-0" />

                                    {detailContent.processDiagram.map((step, idx) => (
                                        <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                                            <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center font-bold text-xl text-primary mb-5 group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300">
                                                {step.step}
                                            </div>
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{step.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* 5. Clean Use Cases */}
                        {detailContent?.useCases && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shadow-sm">
                                        <FiBriefcase className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Proven Use Cases</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {detailContent.useCases.map((useCase, idx) => (
                                        <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 hover:-translate-y-1 transition-all">
                                            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-start gap-2">
                                                <FiTarget className="text-blue-500 mt-1 shrink-0" />
                                                {useCase.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-6">
                                                {useCase.scenario}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Sidebar CTA (Outer Structure - Unchanged) */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-28 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-700 overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 relative z-10">
                                    Elevate your {service.title.toLowerCase()}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 relative z-10 font-medium leading-relaxed">
                                    Our experts are ready to design a custom roadmap tailored specifically for your business growth and operational scale.
                                </p>

                                <div className="flex flex-col gap-4 relative z-10">
                                    <Link
                                        to="/#contact"
                                        className="w-full flex items-center justify-center px-6 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-primary/25 group"
                                    >
                                        Schedule a Demo
                                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/#contact"
                                        className="w-full flex items-center justify-center px-6 py-4 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-2xl hover:bg-primary/5 transition-all"
                                    >
                                        Contact US
                                    </Link>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <FiCheckCircle className="text-emerald-500" />
                                        <span>Expert Support</span>
                                    </div>
                                    <Link to="/services" className="inline-flex items-center hover:text-primary transition-colors">
                                        <FiArrowLeft className="mr-2" />
                                        Explore All Services
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </aside>

                </div>
            </section>
        </div>
    );
}
