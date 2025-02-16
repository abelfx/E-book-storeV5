import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard } from 'lucide-react';
import { CartItem, PaymentMethod, PaymentDetails } from '../types';
import { PaymentForm } from './PaymentForm';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (details: PaymentDetails) => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">{item.price.toFixed(2)} ETB</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{total.toFixed(2)} ETB</span>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Pay Now</span>
                </button>

                <div className="grid grid-cols-4 gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/5/5c/Commercial_Bank_of_Ethiopia_logo.png" alt="CBE" className="h-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Awash_Bank_Logo.png" alt="Awash" className="h-8 object-contain" />
                  <img src="https://www.abyssinia1.com/assets/images/logo.png" alt="Abyssinia" className="h-8 object-contain" />
                  <img src="https://www.ethiotelecom.et/telebirr/assets/images/telebirr.png" alt="TeleBirr" className="h-8 object-contain" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showPayment && (
          <PaymentForm
            total={total}
            onClose={() => setShowPayment(false)}
            onSubmit={(details) => {
              onCheckout(details);
              setShowPayment(false);
              onClose();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};