"use client"
import { type Metadata } from 'next'
import { Monitor, Menu, X, ArrowRight, Bell, Globe, Zap, BarChart3, Clock, Shield, Check, Star, ChevronDown, ChevronUp, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export function Appbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 20);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
    return(
        // <div className='flex justify-items-center items-center p-4'>
        //     <div>Dpin uptime</div>
            // <SignedOut>
                // <SignInButton></SignInButton>
                // <SignUpButton></SignUpButton>
            // </SignedOut>
        //     <SignedIn>
        //         <UserButton></UserButton>
        //     </SignedIn>
        // </div>

        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                <div className="flex items-center">
                  <Monitor className="h-8 w-8 text-white mr-2" />
                  <span className="text-xl font-bold tracking-tight">BetterUptime</span>
                </div>
                 
    
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="/#features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
                    <a href="/#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
                    <a href="/#testimonials" className="text-sm text-gray-300 hover:text-white transition-colors">Testimonials</a>
                    <a href="/#faq" className="text-sm text-gray-300 hover:text-white transition-colors">FAQ</a>
                    <a href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">DashBoard</a>

                    <SignedOut>
                        <div className="flex items-center space-x-4">
                            <button className="bg-transparent hover:bg-white/10 text-white px-4 h-10 rounded-md transition-colors border border-white/20">
                            <SignInButton></SignInButton>
                            </button>
                            <button className="bg-white text-black hover:bg-gray-100 px-4 h-10 rounded-md transition-colors">
                                
                            <SignUpButton></SignUpButton>
                            </button>
                        </div>
                    </SignedOut>
                    
                    <SignedIn>
                        {/* Content for signed-in users */}
                        <UserButton />
                    </SignedIn>
                </nav>

                
    
                <button
                  className="md:hidden p-2 text-gray-400 hover:text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
    
            {isMenuOpen && (
              <div className="md:hidden bg-black border-t border-white/10">
                <div className="px-4 py-4 space-y-4">
                  <a href="#features" className="block px-2 py-1 text-gray-300 hover:text-white">Features</a>
                  <a href="#pricing" className="block px-2 py-1 text-gray-300 hover:text-white">Pricing</a>
                  <a href="#testimonials" className="block px-2 py-1 text-gray-300 hover:text-white">Testimonials</a>
                  <a href="#faq" className="block px-2 py-1 text-gray-300 hover:text-white">FAQ</a>
                  <div className="pt-2 border-t border-white/10">
                    <button className="w-full mb-2 bg-transparent hover:bg-white/10 text-white px-4 h-10 rounded-md transition-colors border border-white/20">Login</button>
                    <button className="w-full bg-white text-black hover:bg-gray-100 px-4 h-10 rounded-md transition-colors">Get Started</button>
                  </div>
                </div>
              </div>
            )}
          </header>
    )
}