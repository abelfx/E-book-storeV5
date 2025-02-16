import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { PaymentMethod, PaymentDetails, DeliveryArea } from '../types';

interface PaymentFormProps {
  total: number;
  onClose: () => void;
  onSubmit: (details: PaymentDetails) => void;
}

const BANK_ACCOUNTS = {
  CBE: '1000123456789',
  Awash: '0123456789',
  Abyssinia: '9876543210',
  TeleBirr: '*127#'
};

const DELIVERY_AREAS: DeliveryArea[] = ['Betel', 'Thohiloch', 'Zenebework', 'Mexico'];
const SHIPPING_COST = 230;

export const PaymentForm: React.FC<PaymentFormProps> = ({
  total,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [details, setDetails] = useState<Partial<PaymentDetails>>({
    city: 'Addis Ababa',
    deliveryMethod: 'delivery'
  });

  const finalTotal = details.deliveryMethod === 'delivery' ? total + SHIPPING_COST : total;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(details as PaymentDetails);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="absolute right-4 top-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={details.fullName || ''}
                      onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={details.phone || ''}
                      onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={details.email || ''}
                      onChange={(e) => setDetails({ ...details, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <select
                      value={details.city}
                      onChange={(e) => setDetails({ ...details, city: e.target.value as PaymentDetails['city'] })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="Addis Ababa">Addis Ababa</option>
                      <option value="Hawassa">Hawassa</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="delivery"
                          checked={details.deliveryMethod === 'delivery'}
                          onChange={(e) => setDetails({ ...details, deliveryMethod: e.target.value as 'delivery' | 'pickup' })}
                          className="text-blue-600"
                        />
                        <span>Home Delivery (+{SHIPPING_COST} ETB)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="pickup"
                          checked={details.deliveryMethod === 'pickup'}
                          onChange={(e) => setDetails({ ...details, deliveryMethod: e.target.value as 'delivery' | 'pickup' })}
                          className="text-blue-600"
                        />
                        <span>Pick up in Store</span>
                      </label>
                    </div>
                  </div>

                  {details.deliveryMethod === 'delivery' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Delivery Area
                        </label>
                        <select
                          required
                          value={details.deliveryArea || ''}
                          onChange={(e) => setDetails({ ...details, deliveryArea: e.target.value as DeliveryArea })}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        >
                          <option value="">Select area</option>
                          {DELIVERY_AREAS.map((area) => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <textarea
                          required
                          value={details.streetAddress || ''}
                          onChange={(e) => setDetails({ ...details, streetAddress: e.target.value })}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                          rows={3}
                          placeholder="Please provide detailed address..."
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                  
                  <div className="text-2xl font-bold text-center mb-6">
                    Total: {finalTotal.toFixed(2)} ETB
                    {details.deliveryMethod === 'delivery' && (
                      <div className="text-sm font-normal text-gray-600 mt-1">
                        (Includes {SHIPPING_COST} ETB shipping)
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Select Bank
                      </label>
                      <select
                        required
                        value={details.bank || ''}
                        onChange={(e) => setDetails({ ...details, bank: e.target.value as PaymentMethod })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">Select a bank</option>
                        {Object.keys(BANK_ACCOUNTS).map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>

                    {details.bank && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Account Number:</p>
                        <p className="text-lg font-mono font-semibold">
                          {BANK_ACCOUNTS[details.bank as PaymentMethod]}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>{step === 1 ? 'Next' : 'Pay'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};