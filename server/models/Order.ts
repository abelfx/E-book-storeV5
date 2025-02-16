import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: String,
    city: {
      type: String,
      enum: ['Addis Ababa', 'Hawassa'],
      required: true,
    },
  },
  items: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingFee: {
    type: Number,
    default: 230,
  },
  deliveryMethod: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true,
  },
  deliveryArea: {
    type: String,
    enum: ['Betel', 'Thohiloch', 'Zenebework', 'Mexico'],
  },
  streetAddress: String,
  paymentMethod: {
    type: String,
    enum: ['CBE', 'Awash', 'Abyssinia', 'TeleBirr'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Order = mongoose.model('Order', orderSchema);