import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import { Heart } from 'lucide-react';

interface FavoritesProps {
  favorites: Book[];
  onAddToCart: (book: Book) => void;
  onBookClick: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onAddToCart,
  onBookClick,
  onToggleFavorite,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-center">Your Favorites</h1>
          </div>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Your personally curated collection of beloved books
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500">
              Start adding books to your favorites by clicking the heart icon on any book
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard
                  book={book}
                  onAddToCart={onAddToCart}
                  onBookClick={onBookClick}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={true}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};