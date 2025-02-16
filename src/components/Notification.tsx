import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCart: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  isOpen,
  onClose,
  onViewCart,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Added to Cart</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Item has been added to your cart
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <button
                onClick={() => {
                  onViewCart();
                  onClose();
                }}
                className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Cart →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};