"use client"
import React, { useState, useEffect } from 'react';

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
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 text-white text-xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-white/90 backdrop-blur-md'
      } border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Pesa-Dash</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => smoothScroll('features')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => smoothScroll('benefits')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Benefits
              </button>
              <button 
                onClick={() => smoothScroll('contact')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Contact
              </button>
            </div>
            
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 animate-pulse">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Empower Your
                <span className="block text-yellow-300 animate-pulse">Sales Force</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Transform your African business with cutting-edge technology that powers your sales team to operate efficiently, innovate, and succeed in {"today's"} competitive market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
            </div>
            
            <div className="animate-bounce">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    <div className="bg-green-500 h-4 rounded-full w-3/4 animate-pulse"></div>
                    <div className="bg-blue-500 h-4 rounded-full w-1/2 animate-pulse delay-100"></div>
                    <div className="bg-yellow-500 h-4 rounded-full w-5/6 animate-pulse delay-200"></div>
                    <div className="bg-purple-500 h-4 rounded-full w-2/3 animate-pulse delay-300"></div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center text-xl animate-spin">
                  📊
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-xl animate-bounce">
                  💰
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsObserver>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <CounterAnimation value="500" suffix="+" />
                </div>
                <div className="text-gray-600">Businesses Empowered</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <CounterAnimation value="150" suffix="%" />
                </div>
                <div className="text-gray-600">Average Sales Growth</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-gray-600">Customer Support</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  <CounterAnimation value="99" suffix=".9%" />
                </div>
                <div className="text-gray-600">System Uptime</div>
              </div>
            </div>
          </div>
        </section>
      </StatsObserver>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Sales Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with excellence and elegant solutions at its core, Pesa-Dash provides everything your sales force needs to thrive
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="📈"
              title="Real-time Analytics"
              description="Track your sales performance with advanced analytics and insights that help you make data-driven decisions."
            />
            <FeatureCard 
              icon="🤝"
              title="Team Collaboration"
              description="Foster collaboration across your sales team with shared dashboards, notes, and communication tools."
            />
            <FeatureCard 
              icon="🎯"
              title="Lead Management"
              description="Efficiently track and manage leads through your sales pipeline with automated workflows."
            />
            <FeatureCard 
              icon="📱"
              title="Mobile First"
              description="Access your sales dashboard anywhere with our responsive mobile-first design and native apps."
            />
            <FeatureCard 
              icon="⚡"
              title="Automation"
              description="Automate repetitive tasks and focus on what matters most - building relationships and closing deals."
            />
            <FeatureCard 
              icon="🔒"
              title="Enterprise Security"
              description="Keep your business data secure with enterprise-grade security and compliance features."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why African Businesses Choose Pesa-Dash
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Boost Sales Performance",
                    description: "Increase your team's productivity and close more deals with intelligent insights and streamlined workflows."
                  },
                  {
                    title: "Reduce Operational Costs",
                    description: "Eliminate inefficiencies and reduce overhead with automated processes and smart resource allocation."
                  },
                  {
                    title: "Scale Your Business",
                    description: "Grow confidently with a platform that scales with your business needs and supports your expansion goals."
                  },
                  {
                    title: "Improve Customer Relationships",
                    description: "Build stronger customer relationships with comprehensive customer data and interaction history."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-20 mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
                    <div className="text-2xl font-bold text-green-600">↗ 85%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
                    <div className="text-2xl font-bold text-blue-600">↗ 120%</div>
                    <div className="text-sm text-gray-600">Revenue Growth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Sales Force?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of African businesses that have already empowered their sales teams with Pesa-Dash. Start your journey to success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PD</span>
                </div>
                <span className="text-xl font-bold">Pesa-Dash</span>
              </div>
              <p className="text-gray-400">
                Empowering African businesses to grow through innovative sales force technology.
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "API"]
              },
              {
                title: "Company", 
                links: ["About Us", "Careers", "Blog", "Press"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="hover:text-white transition-colors text-left">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 Pesa-Dash. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "LinkedIn", "Facebook"].map((social, index) => (
                <button key={index} className="text-gray-400 hover:text-white transition-colors">
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