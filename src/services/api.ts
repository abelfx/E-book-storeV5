const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Books
  getBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books`);
    return response.json();
  },

  createBook: async (book: any) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },

  updateBook: async (id: string, book: any) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return response.json();
  },

  deleteBook: async (id: string) => {
    await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
  },

  // Orders
  createOrder: async (order: any) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return response.json();
  },

  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },

  updateOrderStatus: async (id: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },
};