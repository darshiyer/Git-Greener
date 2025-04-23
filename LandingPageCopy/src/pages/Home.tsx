import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, BarChart2, Shield, Zap, TrendingUp, Sparkles, Target, Rocket, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Feature } from '../types';
import MouseGradient from '../components/MouseGradient';
import RainEffect from '../components/RainEffect';
import LandingNavbar from '../components/LandingNavbar';

const features: Feature[] = [
  {
    title: 'Smart Analytics',
    description: 'AI-powered insights to optimize your business performance',
    icon: BarChart2,
  },
  {
    title: 'Secure Platform',
    description: 'Enterprise-grade security for your financial data',
    icon: Shield,
  },
  {
    title: 'Quick Setup',
    description: 'Get started in minutes with our streamlined onboarding',
    icon: Zap,
  },
  {
    title: 'Growth Tools',
    description: 'Comprehensive suite of tools to scale your business',
    icon: TrendingUp,
  },
];

const floatingIcons = [
  { icon: Sparkles, delay: 0, duration: 20 },
  { icon: Target, delay: 2, duration: 25 },
  { icon: Rocket, delay: 4, duration: 22 },
  { icon: Star, delay: 6, duration: 28 },
];

const Home: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <div className="pt-4">
        <MouseGradient />
        <RainEffect />
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Floating Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0.1,
                  scale: 0.5
                }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight
                  ],
                  opacity: [0.1, 0.2, 0.1],
                  scale: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: item.delay
                }}
              >
                <item.icon className="w-8 h-8 text-emerald-500/20" />
              </motion.div>
            ))}

            <div className="text-center mt-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">
                  Next-Gen Financial Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Transform Your Business
                <span className="block bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-transparent bg-clip-text">
                  <TypeAnimation
                    sequence={[
                      'Financial Future',
                      2000,
                      'Business Growth',
                      2000,
                      'Digital Success',
                      2000,
                      'Smart Solutions',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="inline-block"
                  />
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              >
                Empower your MSME with AI-driven financial tools, seamless management,
                and growth opportunities all in one platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-emerald-600 font-medium hover:bg-emerald-50 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>

            {/* Dashboard Preview with Scroll Animation */}
            <motion.div
              style={{ scale, opacity }}
              className="mt-32 relative max-w-6xl mx-auto"
            >
              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-20 left-1/2 transform -translate-x-1/2"
              >
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl" />
                <img
                  src="/dashboard-preview.png"
                  alt="Dashboard Preview"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
          </div>
        </section>

        {/* Features Section */}
        <section ref={ref} className="py-24 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose TBD?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the future of MSME financial management with our comprehensive suite of tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;