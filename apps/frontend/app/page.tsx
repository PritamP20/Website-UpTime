"use client"
import React, { useState, useEffect } from 'react';
import { Monitor, Menu, X, ArrowRight, Bell, Globe, Zap, BarChart3, Clock, Shield, Check, Star, ChevronDown, ChevronUp, Twitter, Linkedin, Github, Mail } from 'lucide-react';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Bell className="h-10 w-10 text-blue-500" />,
      title: 'Instant Alerts',
      description: 'Get notified via email, SMS, Slack, or Discord the moment your services experience any issues.'
    },
    {
      icon: <Globe className="h-10 w-10 text-indigo-500" />,
      title: 'Global Monitoring',
      description: 'Check your services from multiple locations worldwide to ensure true global availability.'
    },
    {
      icon: <Zap className="h-10 w-10 text-cyan-500" />,
      title: 'Real-time Metrics',
      description: 'View response times, uptime percentages, and performance metrics in real-time.'
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-emerald-500" />,
      title: 'Detailed Analytics',
      description: 'Gain insights with comprehensive reports and analytics to prevent future outages.'
    },
    {
      icon: <Clock className="h-10 w-10 text-amber-500" />,
      title: 'Downtime Tracking',
      description: 'Track historical downtime with precise timestamps and duration measurements.'
    },
    {
      icon: <Shield className="h-10 w-10 text-rose-500" />,
      title: 'SSL Monitoring',
      description: 'Receive alerts before your SSL certificates expire to maintain secure connections.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'For small websites and personal projects',
      price: 29,
      features: [
        'Up to 10 monitors',
        '1-minute check intervals',
        'Email notifications',
        'SMS notifications (100/month)',
        '5 team members',
        '7-day data retention'
      ]
    },
    {
      name: 'Professional',
      description: 'For growing businesses and critical services',
      price: 79,
      popular: true,
      features: [
        'Up to 50 monitors',
        '30-second check intervals',
        'Email & SMS notifications',
        'Slack & Discord integration',
        'Anomaly detection',
        'API access',
        'Unlimited team members',
        '30-day data retention'
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      price: 199,
      features: [
        'Unlimited monitors',
        '10-second check intervals',
        'All notification channels',
        'Custom integrations',
        'Advanced anomaly detection',
        'SLA guarantees',
        'Dedicated support',
        '1-year data retention'
      ]
    }
  ];

  const testimonials = [
    {
      quote: "BetterUptime has transformed how we monitor our services. We catch issues before our customers even notice them.",
      name: "Sarah Johnson",
      role: "CTO at TechFlow",
      avatar: "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stars: 5
    },
    {
      quote: "The anomaly detection feature saved us from a major outage that would have affected thousands of users. Worth every penny.",
      name: "Michael Chen",
      role: "DevOps Lead at CloudScale",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stars: 5
    }
  ];

  const faqs = [
    {
      question: "How does BetterUptime monitor my services?",
      answer: "BetterUptime pings your servers, APIs, and websites from multiple global locations at your chosen interval. It checks for expected HTTP status codes, response time thresholds, and can even verify that specific content appears on your page."
    },
    {
      question: "What notification channels are supported?",
      answer: "We support email, SMS, phone calls, Slack, Discord, Microsoft Teams, PagerDuty, OpsGenie, and webhooks. You can create escalation policies to ensure the right person is notified at the right time."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Monitor className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-xl font-bold tracking-tight">BetterUptime</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-slate-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors">FAQ</a>
              <button className="bg-transparent hover:bg-slate-800 text-slate-200 px-4 h-10 rounded-md transition-colors">Login</button>
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 h-10 rounded-md transition-colors">Get Started</button>
            </nav>

            <button
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block px-2 py-1 text-slate-300 hover:text-white">Features</a>
              <a href="#pricing" className="block px-2 py-1 text-slate-300 hover:text-white">Pricing</a>
              <a href="#testimonials" className="block px-2 py-1 text-slate-300 hover:text-white">Testimonials</a>
              <a href="#faq" className="block px-2 py-1 text-slate-300 hover:text-white">FAQ</a>
              <div className="pt-2 border-t border-slate-800">
                <button className="w-full mb-2 bg-transparent hover:bg-slate-800 text-slate-200 px-4 h-10 rounded-md transition-colors">Login</button>
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 h-10 rounded-md transition-colors">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-28 pb-20 md:pt-36 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
          <div className="absolute top-[-10%] left-[-10%] right-[-10%] bottom-[-10%] bg-[length:100%_100%] opacity-30 blur-3xl"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5), transparent 60%)',
              animation: 'pulse 8s ease-in-out infinite alternate'
            }}
          ></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-blue-950/50 border border-blue-900/50 text-blue-400 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                99.9% Uptime Guaranteed
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Never Miss a Beat with <span className="text-blue-500">Better</span> Uptime Monitoring
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
                Get instant notifications when your websites, APIs, or services go down.
                Monitor from multiple locations and fix issues before your customers notice.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <button className="inline-flex items-center justify-center px-6 h-12 text-lg font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Start Monitoring <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex items-center justify-center px-6 h-12 text-lg font-medium border border-slate-700 text-slate-200 rounded-md hover:bg-slate-800 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Everything You Need for <span className="text-blue-500">Complete</span> Monitoring
              </h2>
              <p className="text-slate-300">
                Our platform offers comprehensive monitoring solutions designed to keep your services running smoothly 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="rounded-xl bg-slate-900 border border-slate-800 p-6 hover:shadow-lg hover:shadow-blue-900/10 hover:border-slate-700 transition-all duration-200">
                  <div className="p-3 rounded-lg inline-flex bg-slate-800/50 mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-slate-300 mb-8">
                Choose the plan that fits your monitoring needs. All plans include a 14-day free trial.
              </p>

              <div className="flex items-center justify-center mb-12">
                <div className="bg-slate-900 p-1 rounded-full">
                  <div className="flex">
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        !annual ? 'bg-blue-600 text-white' : 'text-slate-300'
                      }`}
                      onClick={() => setAnnual(false)}
                    >
                      Monthly
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        annual ? 'bg-blue-600 text-white' : 'text-slate-300'
                      }`}
                      onClick={() => setAnnual(true)}
                    >
                      Annual <span className="text-xs opacity-90">(-20%)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-xl bg-slate-900 border ${
                    plan.popular ? 'border-blue-600 shadow-lg shadow-blue-900/20' : 'border-slate-800'
                  } p-6 relative`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${annual ? plan.price * 0.8 : plan.price}</span>
                    <span className="text-slate-400 ml-2">/ month</span>
                    {annual && (
                      <div className="text-sm text-blue-500 mt-1">
                        Billed annually (${plan.price * 0.8 * 12}/year)
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <Check className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full h-10 rounded-md transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-slate-700 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    Start {plan.name} Trial
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trusted by Leading Companies
              </h2>
              <p className="text-slate-300">
                See what our customers have to say about their experience with our uptime monitoring platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-xl bg-slate-900 border border-slate-800 p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-slate-200 mb-6">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-medium text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-300">
                Get answers to common questions about our uptime monitoring platform.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="divide-y divide-slate-800 rounded-xl overflow-hidden border border-slate-800">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-slate-900">
                    <button
                      className="flex justify-between items-center w-full px-6 py-4 text-left"
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </button>

                    {openFaqIndex === index && (
                      <div className="px-6 pb-4 text-slate-300 text-sm">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              animation: 'pulse 4s ease-in-out infinite alternate'
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start Monitoring Your Services <span className="text-blue-400">Today</span>
              </h2>

              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Join thousands of companies that trust BetterUptime to keep their services running smoothly 24/7.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <button className="inline-flex items-center justify-center px-6 h-12 text-lg font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex items-center justify-center px-6 h-12 text-lg font-medium border border-slate-700 text-slate-200 rounded-md hover:bg-slate-800 transition-colors">
                  Schedule a Demo
                </button>
              </div>

              <div className="text-center text-slate-400 text-sm">
                No credit card required. 14-day free trial. Cancel anytime.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center text-white mb-4">
                <Monitor className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-lg font-bold">BetterUptime</span>
              </div>

              <p className="text-slate-400 mb-6 max-w-md">
                Robust uptime monitoring for modern applications. Get instant alerts when your services go down.
              </p>

              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Status Page', 'Integrations', 'API', 'Security'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                {['About', 'Customers', 'Blog', 'Careers', 'Contact', 'Partners'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'Support', 'Knowledge Base', 'Status', 'Changelog', 'Community'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} BetterUptime. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;