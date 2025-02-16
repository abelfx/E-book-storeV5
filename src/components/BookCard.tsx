import React from 'react';
import { Book } from '../types';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onBookClick: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  isFavorite: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onAddToCart, 
  onBookClick,
  onToggleFavorite,
  isFavorite
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(book);
  };

  return (
    <motion.div
      onClick={() => onBookClick(book)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
          } backdrop-blur-sm hover:scale-110 transition-all duration-200`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-0 right-0 p-2 bg-white/80 backdrop-blur-sm rounded-tl-lg">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">{book.price.toFixed(2)} ETB</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};