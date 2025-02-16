import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Book } from '../types';
import { BookCard } from './BookCard';

interface BookCarouselProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
  onBookClick: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  favorites: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({
  books,
  onAddToCart,
  onBookClick,
  onToggleFavorite,
  favorites
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Responsive books per page
  const getBooksPerPage = () => {
    if (window.innerWidth < 640) return 1; // Mobile
    if (window.innerWidth < 1024) return 2; // Tablet
    return 4; // Desktop
  };
  
  const [booksPerPage, setBooksPerPage] = useState(getBooksPerPage());

  // Update booksPerPage on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setBooksPerPage(getBooksPerPage());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + booksPerPage >= books.length ? 0 : prev + booksPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - booksPerPage < 0 ? Math.max(0, books.length - booksPerPage) : prev - booksPerPage
    );
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + booksPerPage);

  return (
    <div className="py-12">
      {/* Featured Books Header */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Featured Books</h2>
        </div>
      </div>

      <div className="relative px-4 md:px-8">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors -translate-x-1/2 md:translate-x-0"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <div className="overflow-hidden px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={false}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              {visibleBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <BookCard
                    book={book}
                    onAddToCart={onAddToCart}
                    onBookClick={onBookClick}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={!!favorites.find(f => f.id === book.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors translate-x-1/2 md:translate-x-0"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};