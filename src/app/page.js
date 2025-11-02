"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TypewriterHeadlines from './components/typewriter';
import { 
  CreditCard, 
  BarChart3, 
  Users, 
  Globe, 
  Smartphone,
  Mail,
  Phone,
  ExternalLink,
  Linkedin,
  Facebook,
  Instagram
} from 'lucide-react';

const PesaDashLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div className="w-16 h-16 bg-gradient-to-br from-[#3ab7fc] to-[#010b2a] rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform duration-500 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#3ab7fc] transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-1 bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#010b2a]/95 backdrop-blur-xl shadow-2xl' 
          : 'bg-[#010b2a]/90 backdrop-blur-md'
      } border-b border-[#3ab7fc]/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg">
                <Image
                  height={60}
                  width={60}
                  alt="Pesa-Dash Logo"
                  src="/pesadash-logo.png"
                  className="h-12 w-auto"
                />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-white">PESA</span>
                <span className="text-[#3ab7fc]">DASH</span>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => smoothScroll('features')}
                className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3ab7fc] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => smoothScroll('contact')}
                className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3ab7fc] transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button className="text-white/90 hover:text-white transition-all duration-300 font-medium px-4 py-2">
                Login
              </button>
              <button className="bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-[#3ab7fc]/30">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#010b2a] via-[#010b2a] to-[#020f3a] pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3ab7fc]/10 via-[#010b2a]/50 to-[#010b2a]/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#3ab7fc] to-[#010b2a] rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-[#010b2a] to-[#3ab7fc] transform rotate-45 opacity-20 animate-spin"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-[#3ab7fc] to-[#010b2a] rounded-full opacity-20 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-4 h-14 flex items-center justify-center">
            <TypewriterHeadlines />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ab7fc] via-[#3ab7fc] to-[#010b2a]">Business</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Whether you want more sales, more customers, or efficiency.{" We've"} got the tools to power your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-[#010b2a] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl">
              Try PesaDash
            </button>
            <button className="border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#010b2a] transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
              Request Demo
            </button>
          </div>
          
          <div className="mt-16">
            <p className="text-3xl md:text-4xl font-bold text-white bg-clip-text animate-pulse">
              {"Let's Grow"}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsObserver>
        <section className="py-14 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-blue-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <CounterAnimation value="2000" suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Businesses Powered</div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <CounterAnimation value="300" suffix="%" />
                </div>
                <div className="text-gray-600 font-medium">Sales Growth Average</div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-gray-600 font-medium">Customer Support</div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-4 group">
                <div className="text-5xl font-black bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  <CounterAnimation value="99" suffix=".9%" />
                </div>
                <div className="text-gray-600 font-medium">System Uptime</div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#3ab7fc] to-[#010b2a] rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </section>
      </StatsObserver>

      {/* Features Section */}
      <section id="features" className="py-14 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(58,183,252,0.1)_1px,transparent_0)] bg-[length:50px_50px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3ab7fc] to-[#010b2a]">
                Grow Your Business
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive POS platform provides all the tools modern businesses need to streamline operations, boost sales, and create exceptional customer experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<CreditCard className="w-8 h-8" />}
              title="Digital Payments"
              description="Track transactions seamlessly with multiple payment options, real-time processing, and detailed payment analytics to understand your revenue streams better."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8" />}
              title="Inventory Management"
              description="Simplify your inventory management across multiple locations. Access real-time stock insights, automated reorder points, and low-stock alerts to never run out of products."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Sales Analytics"
              description="Track every sale to get actionable insights on product performance, customer behavior, peak hours, and growth opportunities with advanced reporting dashboards."
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8" />}
              title="Customer Engagement"
              description="Build stronger connections with your customers through personalised experiences, loyalty programs, targeted promotions, and customer relationship management tools."
            />
            <FeatureCard 
              icon={<Smartphone className="w-8 h-8" />}
              title="Online & Offline Sales"
              description="Diversify your revenue streams by seamlessly managing both online and physical sales from one unified platform with synchronized inventory and reporting."
            />
            <FeatureCard 
              icon={<ExternalLink className="w-8 h-8" />}
              title="Mobile POS"
              description="Take your business anywhere with our mobile-first design. Process sales, manage inventory, and access analytics from any device, anywhere, anytime."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-gradient-to-br from-[#010b2a] via-[#010b2a] to-[#020f3a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:60px_60px] opacity-40"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#3ab7fc]/20 to-[#010b2a]/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-[#3ab7fc]/20 to-[#010b2a]/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-black text-white mb-8 leading-tight">
            Ready to Power Your Business?
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of businesses that have transformed their operations with Pesa-Dash. Start your journey to smarter sales, better customer relationships, and exponential growth today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#010b2a] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#010b2a] to-black"></div>
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
                  <span className="text-[#3ab7fc]">DASH</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                Empowering Businesses with Smart POS that drive Growth, Efficiency and Customer Satisfaction.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#3ab7fc]/20 to-[#010b2a]/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#3ab7fc]/20 to-[#010b2a]/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#3ab7fc]/20 to-[#010b2a]/20 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features"]
              },
              {
                title: "Contact",
                links: ["Email: sales@pesadach.com", "Phone: +254 758 669820"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold mb-6 text-xl text-white">{section.title}</h3>
                <ul className="space-y-4 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="hover:text-white transition-all duration-300 text-left hover:translate-x-2 text-lg" onClick={() => smoothScroll(link.toLowerCase())}>
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
              <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Image
                  height={20}
                  width={20}
                  alt='X'
                  src='/x.svg'
                  className="w-5 h-5 opacity-60 hover:opacity-100 transition-all duration-300"
                />
              </button>
              <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PesaDashLanding;