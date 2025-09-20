"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PesaDashLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Power Your Business",
      subtitle: "Transform your business operations with intelligent POS solutions",
      description: "Whether you want more sales, more customers or more efficiency, we've got the tools to power your business.",
      image: "/hero-image-1.png" // Modern POS system interface
    },
    {
      title: "Smart POS to Grow Your Business",
      subtitle: "All-in-one point of sale system for modern businesses",
      description: "Streamline operations, boost sales, and delight customers with our comprehensive POS platform.",
      image: "/hero-image-2.png" // Business growth visualization
    },
    {
      title: "Salesforce Empowerment",
      subtitle: "Empower your team with cutting-edge sales technology",
      description: "Give your sales team the tools they need to succeed with advanced analytics and automation.",
      image: "/hero-image-3.png" // African business success
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const smoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CounterAnimation = ({ value, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersAnimated) return;
      
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
      let start = 0;
      const increment = numericValue / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}{suffix}</span>;
  };

  const StatsObserver = ({ children }) => {
    const ref = React.useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !countersAnimated) {
            setCountersAnimated(true);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return <div ref={ref}>{children}</div>;
  };

  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 group">
      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white text-2xl group-hover:rotate-12 transition-transform duration-500 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl' 
          : 'bg-white/90 backdrop-blur-md'
      } border-b border-gray-200/50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
             <div className="bg-slate-900 p-2 rounded-lg">
              <Image
                height={60}
                width={60}
                alt="Pesa-Dash Logo"
                src="/pesadash-logo.png"
                className="h-12 w-auto"
              />
            </div>
              <span className="text-2xl font-bold">
                <span className="text-gray-900">PESA</span>
                <span className="text-blue-600">DASH</span>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => smoothScroll('features')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => smoothScroll('contact')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium px-4 py-2">
                Login
              </button>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_3px_3px,rgba(34,211,238,0.1)_2px,transparent_0)] bg-[length:40px_40px] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 transform rotate-45 opacity-20 animate-spin"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="overflow-hidden">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight animate-fade-in">
                  {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                    <span key={index} className={`inline-block ${index === heroSlides[currentSlide].title.split(' ').length - 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400' : ''}`}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
              </div>
              <p className="text-lg md:text-xl text-cyan-100 mb-4 font-medium">
                {heroSlides[currentSlide].subtitle}
              </p>
              <p className="text-base md:text-lg text-white/90 mb-12 max-w-2xl leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
              
              {/* Slide indicators */}
              <div className="flex justify-center lg:justify-start space-x-3 mb-8">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl">
                  Get Started Free
                </button>
                <button className="border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
                  Watch Demo
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-96 w-full">
                <Image
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  fill
                  className="object-cover transition-all duration-1000 ease-in-out"
                  priority
                />
                {/* Image overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Floating elements on image */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-lg rounded-xl p-3 animate-bounce">
                  <div className="text-2xl">💳</div>
                </div>
                <div className="absolute bottom-4 left-4 bg-cyan-500/20 backdrop-blur-lg rounded-xl p-3 animate-pulse">
                  <div className="text-2xl">📊</div>
                </div>
                
                {/* Navigation arrows */}
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Image carousel indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsObserver>
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-transparent to-blue-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <CounterAnimation value="2000" suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Businesses Powered</div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <CounterAnimation value="300" suffix="%" />
                </div>
                <div className="text-gray-600 font-medium">Sales Growth Average</div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-gray-600 font-medium">Customer Support</div>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <CounterAnimation value="99" suffix=".9%" />
                </div>
                <div className="text-gray-600 font-medium">System Uptime</div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </section>
      </StatsObserver>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
                Grow Your Business
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive POS platform provides all the tools modern businesses need to streamline operations, boost sales, and create exceptional customer experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="💳"
              title="Smart Payments"
              description="Track transactions seamlessly with multiple payment options, real-time processing, and detailed payment analytics to understand your revenue streams better."
            />
            <FeatureCard 
              icon="📦"
              title="Inventory Management"
              description="Simplify your inventory management across multiple locations. Access real-time stock insights, automated reorder points, and low-stock alerts to never run out of products."
            />
            <FeatureCard 
              icon="📊"
              title="Sales Analytics"
              description="Track every sale to get actionable insights on product performance, customer behavior, peak hours, and growth opportunities with advanced reporting dashboards."
            />
            <FeatureCard 
              icon="🤝"
              title="Customer Engagement"
              description="Build stronger connections with your customers through personalized experiences, loyalty programs, targeted promotions, and customer relationship management tools."
            />
            <FeatureCard 
              icon="🌐"
              title="Online & Offline Sales"
              description="Diversify your revenue streams by seamlessly managing both online and physical sales from one unified platform with synchronized inventory and reporting."
            />
            <FeatureCard 
              icon="📱"
              title="Mobile POS"
              description="Take your business anywhere with our mobile-first design. Process sales, manage inventory, and access analytics from any device, anywhere, anytime."
            />
          </div>

          <div className="mt-20 text-center">
            <button className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
              Explore All Features
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:60px_60px] opacity-40"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-black text-white mb-8 leading-tight">
            Ready to Power Your Business?
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of businesses that have transformed their operations with Pesa-Dash. Start your journey to smarter sales, better customer relationships, and exponential growth today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-purple-600 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl">
              Start Free Trial
            </button>
            <button className="border-3 border-white text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-purple-600 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <Image
                    height={60}
                    width={60}
                    alt="Pesa-Dash Logo"
                    src="/pesadash-logo.png"
                    className="h-12 w-auto"
                  />
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-gray-100">PESA</span>
                  <span className="text-blue-600">DASH</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                Empowering businesses across Africa with intelligent POS solutions that drive growth, efficiency, and customer satisfaction.
              </p>
              <div className="flex space-x-4">
                {["🌐", "📧", "📱"].map((icon, index) => (
                  <div key={index} className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Mobile App", "API Documentation"]
              },
              {
                title: "Company", 
                links: ["About Us", "Careers", "Blog", "Press Kit", "Partners"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Sales", "Customer Success", "Privacy Policy", "Terms of Service"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold mb-6 text-xl text-white">{section.title}</h3>
                <ul className="space-y-4 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="hover:text-white transition-all duration-300 text-left hover:translate-x-2 text-lg">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">&copy; 2025 Pesa-Dash. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social, index) => (
                <button key={index} className="text-gray-400 hover:text-white transition-all duration-300 text-lg hover:scale-110">
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PesaDashLanding;