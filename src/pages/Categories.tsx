import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import { BookOpen, Sparkles, Brain, Baby, Clock } from 'lucide-react';

interface CategoriesProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
}

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: Book['category'];
}

export const Categories: React.FC<CategoriesProps> = ({ books, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Book['category'] | null>(null);

  const categories: CategoryCard[] = [
    {
      id: 'all',
      title: 'All Books',
      description: 'Browse our complete collection of carefully curated books.',
      icon: <BookOpen className="w-8 h-8" />,
      category: 'Fiction'
    },
    {
      id: 'fiction',
      title: 'Fiction',
      description: 'Immerse yourself in captivating stories and imaginative worlds.',
      icon: <Sparkles className="w-8 h-8" />,
      category: 'Fiction'
    },
    {
      id: 'non-fiction',
      title: 'Non-Fiction',
      description: 'Expand your knowledge with insightful and educational reads.',
      icon: <Brain className="w-8 h-8" />,
      category: 'Non-Fiction'
    },
    {
      id: 'children',
      title: 'Children',
      description: 'Delightful books that inspire young minds and spark imagination.',
      icon: <Baby className="w-8 h-8" />,
      category: 'Children'
    },
    {
      id: 'new-releases',
      title: 'New Releases',
      description: 'Discover our latest additions hot off the press.',
      icon: <Clock className="w-8 h-8" />,
      category: 'New Releases'
    }
  ];

  const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory)
    : books;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">Explore Our Categories</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover your next favorite book from our diverse collection spanning multiple genres and categories.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id === 'all' ? null : category.category)}
              className={`p-6 rounded-xl text-left transition-all ${
                (selectedCategory === category.category || (!selectedCategory && category.id === 'all'))
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-blue-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`${
                (selectedCategory === category.category || (!selectedCategory && category.id === 'all'))
                ? 'text-white'
                : 'text-blue-600'
              }`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4">{category.title}</h3>
              <p className={`mt-2 text-sm ${
                (selectedCategory === category.category || (!selectedCategory && category.id === 'all'))
                ? 'text-blue-100'
                : 'text-gray-600'
              }`}>
                {category.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BookCard book={book} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};