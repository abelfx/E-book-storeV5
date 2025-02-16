import React, { useState } from 'react';
import { ShoppingCart, BookOpen, Search, Heart, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemsCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  favoritesCount,
}) => {
  const location = useLocation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-gray-900" />
              <span className="ml-2 text-lg font-bold">BAYA BOOKS</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/categories" 
                className={`text-gray-600 hover:text-gray-900 ${location.pathname === '/categories' ? 'text-blue-600' : ''}`}
              >
                All
              </Link>
              <Link 
                to="/categories?category=fiction" 
                className="text-gray-600 hover:text-gray-900"
              >
                Fiction
              </Link>
              <Link 
                to="/categories?category=non-fiction" 
                className="text-gray-600 hover:text-gray-900"
              >
                Non-Fiction
              </Link>
              <Link 
                to="/favorites" 
                className={`text-gray-600 hover:text-gray-900 ${location.pathname === '/favorites' ? 'text-blue-600' : ''}`}
              >
                Favorites
              </Link>
              <Link 
                to="/categories?category=new" 
                className="text-gray-600 hover:text-gray-900"
              >
                New Releases
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search for books..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white/50"
              />
            </div>

            {/* Mobile Search Icon */}
            <button
              className="md:hidden"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              {showMobileSearch ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>

            <Link to="/favorites" className="relative p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden py-2 px-4 border-t border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search for books..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white/50"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};