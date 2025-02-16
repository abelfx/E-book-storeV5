import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Book, CartItem, PaymentDetails } from './types';
import { books as initialBooks } from './data/books';
import { Navbar } from './components/Navbar';
import { BookCarousel } from './components/BookCarousel';
import { Cart } from './components/Cart';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Categories } from './pages/Categories';
import { BookDetails } from './components/BookDetails';
import { Notification } from './components/Notification';
import { Favorites } from './pages/Favorites';
import { Admin } from './pages/Admin';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const location = useLocation();

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (book: Book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
    setShowNotification(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      quantity === 0
        ? prevItems.filter((item) => item.id !== id)
        : prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = (details: PaymentDetails) => {
    console.log('Processing payment:', details);
    alert(`Order placed successfully!\nPayment Method: ${details.bank}\nDelivery Method: ${details.deliveryMethod}`);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const toggleFavorite = (book: Book) => {
    setFavorites((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const handleAddBook = (book: Book) => {
    setBooks((prev) => [...prev, book]);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleDeleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
      />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BookCarousel
                books={filteredBooks}
                onAddToCart={handleAddToCart}
                onBookClick={setSelectedBook}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            </main>
          </>
        } />
        <Route 
          path="/categories" 
          element={
            <Categories 
              books={books}
              onAddToCart={handleAddToCart}
              onBookClick={setSelectedBook}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          } 
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onAddToCart={handleAddToCart}
              onBookClick={setSelectedBook}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              books={books}
              onAddBook={handleAddBook}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
            />
          }
        />
      </Routes>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          onAddToCart={handleAddToCart}
          onToggleFavorite={toggleFavorite}
          isFavorite={!!favorites.find(b => b.id === selectedBook.id)}
        />
      )}

      <Notification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        onViewCart={() => setIsCartOpen(true)}
      />

      {location.pathname !== '/categories' && 
       location.pathname !== '/favorites' && 
       location.pathname !== '/admin' && <Footer />}
    </div>
  );
}

export default App;