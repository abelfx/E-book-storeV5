import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, Check, Heart } from 'lucide-react';
import { Book } from '../types';

interface BookDetailsProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
  isFavorite: boolean;
}

export const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl pointer-events-auto">
            <div className="relative">
              <div className="absolute right-4 top-4 flex space-x-2">
                <button
                  onClick={() => onToggleFavorite(book)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite ? 'bg-red-500 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">{book.title}</h2>
                  <p className="text-gray-600 mt-1">{book.author}</p>
                  
                  <div className="mt-4 flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      book.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.inStock ? (
                        <span className="flex items-center">
                          <Check className="w-4 h-4 mr-1" />
                          In Stock
                        </span>
                      ) : 'Out of Stock'}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900">Description</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-2xl font-bold">{book.price.toFixed(2)} ETB</span>
                    <button
                      onClick={() => {
                        onAddToCart(book);
                        onClose();
                      }}
                      disabled={!book.inStock}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${
                        book.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      } transition-colors`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};