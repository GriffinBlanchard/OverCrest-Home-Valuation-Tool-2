import React, { useState } from 'react';
import { Home, DollarSign, TrendingUp, Calculator } from 'lucide-react';

export default function HomeValuationTool() {
  const [address, setAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  
  const [showLeadForm, setShowLeadForm] = useState(true);
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLeadFormSubmit = (e) => {
    e.preventDefault();
    
    if (!leadInfo.name || !leadInfo.phone || !leadInfo.email) {
      alert('Please fill out all fields');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadInfo.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    console.log('Lead captured:', leadInfo);
    setShowLeadForm(false);
  };

  const fetchAddressSuggestions = async (input) => {
    if (input.length < 2) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const streetTypes = ['Street', 'Avenue', 'Drive', 'Lane', 'Way', 'Court', 'Place', 'Road', 'Boulevard'];
    const cities = [
      { name: 'San Diego', zip: '92101' },
      { name: 'Del Mar', zip: '92014' },
      { name: 'La Jolla', zip: '92037' },
      { name: 'Encinitas', zip: '92024' },
      { name: 'Carlsbad', zip: '92008' },
      { name: 'Solana Beach', zip: '92075' }
    ];
    
    const mockSuggestions = [];
    const numberMatch = input.match(/^(\d+)/);
    
    if (numberMatch) {
      const baseNumber = numberMatch[1];
      const restOfInput = input.substring(baseNumber.length).trim();
      
      if (restOfInput.length > 0) {
        streetTypes.forEach(type => {
          cities.slice(0, 3).forEach(city => {
            mockSuggestions.push(`${baseNumber} ${restOfInput.charAt(0).toUpperCase() + restOfInput.slice(1)} ${type}, ${city.name}, CA ${city.zip}`);
          });
        });
      } else {
        streetTypes.slice(0, 3).forEach((type, idx) => {
          const city = cities[idx % cities.length];
          mockSuggestions.push(`${baseNumber} Main ${type}, ${city.name}, CA ${city.zip}`);
          mockSuggestions.push(`${baseNumber} Oak ${type}, ${city.name}, CA ${city.zip}`);
        });
      }
    } else {
      streetTypes.forEach((type, idx) => {
        const city = cities[idx % cities.length];
        const streetName = input.charAt(0).toUpperCase() + input.slice(1);
        mockSuggestions.push(`123 ${streetName} ${type}, ${city.name}, CA ${city.zip}`);
        mockSuggestions.push(`456 ${streetName} ${type}, ${city.name}, CA ${city.zip}`);
      });
    }
    
    setAddressSuggestions(mockSuggestions.slice(0, 6));
    setShowSuggestions(true);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const timeout = setTimeout(() => {
      fetchAddressSuggestions(value);
    }, 300);
    
    setTypingTimeout(timeout);
  };

  const selectAddress = (selectedAddress) => {
    setAddress(selectedAddress);
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  const handleSubmitRequest = () => {
    if (!address) {
      alert('Please enter your property address');
      return;
    }

    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      console.log('Valuation request submitted:', { leadInfo, address });
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-light tracking-widest text-lime-400 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              OVERCREST REALTY
            </h3>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent mx-auto"></div>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Home className="w-8 h-8 sm:w-12 sm:h-12 text-lime-400" strokeWidth={1.5} />
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight">Home Valuation</h1>
          </div>
          <p className="text-emerald-200 text-base sm:text-lg font-light px-4">
            Get a professional market analysis of your property
          </p>
        </div>

        {showLeadForm ? (
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-light mb-2 sm:mb-3 text-center">Get Your Free Home Valuation</h2>
              <p className="text-emerald-200 text-center mb-6 sm:mb-8 font-light text-sm sm:text-base">
                Enter your information to request a detailed market analysis
              </p>
              
              <form onSubmit={handleLeadFormSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-emerald-200 mb-2 text-sm font-light">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({...leadInfo, name: e.target.value})}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-emerald-950/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400/50 text-white placeholder-emerald-300/50 font-light text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-200 mb-2 text-sm font-light">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="(619) 555-0123"
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({...leadInfo, phone: e.target.value})}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-emerald-950/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400/50 text-white placeholder-emerald-300/50 font-light text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-200 mb-2 text-sm font-light">Email Address *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({...leadInfo, email: e.target.value})}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-emerald-950/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400/50 text-white placeholder-emerald-300/50 font-light text-base"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-lime-400 to-lime-500 text-emerald-900 rounded-xl text-base sm:text-lg font-semibold hover:from-lime-300 hover:to-lime-400 transition-all shadow-lg hover:shadow-lime-400/25"
                >
                  Continue to Valuation Request
                </button>
                
                <p className="text-emerald-200/70 text-xs text-center font-light px-2">
                  By continuing, you agree to receive communications from Overcrest Realty about your property valuation and related services.
                </p>
              </form>
            </div>
          </div>
        ) : !submitted ? (
          <>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-white/20 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 text-sm">1</span>
                <span className="text-base sm:text-2xl">Property Address</span>
              </h2>
              <div className="relative">
                <div className="flex flex-col gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Enter your property address..."
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      onFocus={() => address.length >= 2 && fetchAddressSuggestions(address)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-emerald-950/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400/50 text-white placeholder-emerald-300/50 font-light text-sm sm:text-base"
                    />
                    
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-3 space-y-2 z-50 max-h-96 overflow-y-auto px-1">
                        {addressSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => selectAddress(suggestion)}
                            className="w-full text-left p-3 bg-white text-emerald-900 hover:bg-lime-400 transition-all rounded-xl shadow-lg border border-white/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center flex-shrink-0">
                                <Home className="w-4 h-4 text-emerald-900" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm break-words leading-snug">{suggestion}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleSubmitRequest}
                    disabled={loading || !address}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-lime-400 to-lime-500 text-emerald-900 rounded-xl font-semibold hover:from-lime-300 hover:to-lime-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-lime-400/25 text-sm sm:text-base"
                  >
                    {loading ? 'Processing...' : 'Request My Valuation'}
                  </button>
                </div>
              </div>
              <p className="text-emerald-200/70 text-xs sm:text-sm mt-3 font-light">
                We'll prepare a comprehensive market analysis for your property
              </p>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-lime-400/20 via-lime-500/10 to-emerald-500/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border-2 border-lime-400/30 shadow-2xl text-center">
              <div className="mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-lime-400 mx-auto flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-light mb-4 text-white">Request Received!</h2>
                <p className="text-emerald-100 text-lg sm:text-xl font-light mb-8 leading-relaxed max-w-2xl mx-auto">
                  Thank you {leadInfo.name}! We're preparing a comprehensive market analysis for:
                </p>
                <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
                  <p className="text-lime-400 text-xl font-medium break-words">{address}</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 text-left max-w-xl mx-auto">
                  <div className="w-8 h-8 rounded-full bg-lime-400/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lime-400 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Professional Analysis</h3>
                    <p className="text-emerald-200 text-sm font-light">Our team will review recent comparable sales and current market conditions in your area</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left max-w-xl mx-auto">
                  <div className="w-8 h-8 rounded-full bg-lime-400/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lime-400 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Detailed Report</h3>
                    <p className="text-emerald-200 text-sm font-light">You'll receive a comprehensive valuation with comparable properties and market insights</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left max-w-xl mx-auto">
                  <div className="w-8 h-8 rounded-full bg-lime-400/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lime-400 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Expert Consultation</h3>
                    <p className="text-emerald-200 text-sm font-light">We'll reach out within 24 hours to discuss your valuation and answer questions</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/50 rounded-2xl p-6 mb-8 border border-white/10">
                <p className="text-lime-400 text-2xl sm:text-3xl font-light mb-2">Within 24 Hours</p>
                <p className="text-emerald-200 text-sm font-light">Expect your detailed home valuation report</p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+16192889363"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-lime-400 to-lime-500 text-emerald-900 rounded-xl text-lg font-semibold hover:from-lime-300 hover:to-lime-400 transition-all shadow-lg hover:shadow-lime-400/25"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Questions? Call Us Now
                </a>
                <p className="text-emerald-200/70 text-sm font-light">(619) 288-9363</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
