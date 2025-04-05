import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-gray-1000 to-gray-900 p-12 relative">
      <div className="max-w-md text-center">
        {/* Floating chat bubbles - dark theme */}
        <div className="relative mb-12 mx-auto w-64 h-64 flex items-center justify-center">
          
          {/* Main bubble (user) */}
          <div className="absolute z-10 w-24 h-24 bg-gray-800 rounded-2xl rounded-br-none shadow-lg flex items-center justify-center animate-float">
            <div className="w-16 h-16 bg-indigo-600 rounded-full animate-pulse"></div>
          </div>
          
          {/* Secondary bubbles (replies) */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-indigo-800 rounded-2xl rounded-bl-none shadow-md animate-float-delay-1"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gray-700 rounded-2xl rounded-tr-none shadow-md animate-float-delay-2"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-indigo-900/20 blur-xl animate-pulse"></div>
        </div>

        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-gray-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-300/80">{subtitle}</p>
        
        {/* Footer positioned absolutely at the bottom */}
        <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm">
        Crafted by @Kushagra
        </footer>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-float-delay-1 { animation: float 3s ease-in-out infinite 0.5s; }
          .animate-float-delay-2 { animation: float 3s ease-in-out infinite 1s; }
        `}</style>
      </div>
    </div>
  );
};

export default AuthImagePattern;