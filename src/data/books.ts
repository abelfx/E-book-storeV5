import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?auto=format&fit=crop&w=400&h=600',
    category: 'Non-Fiction',
    description: 'Transform your life with tiny changes that yield remarkable results. James Clear reveals practical strategies that teach you how to form good habits, break bad ones, and master the tiny behaviors that lead to extraordinary results.',
    inStock: true
  },
  {
    id: '2',
    title: 'The Mountain Is You',
    author: 'Brianna Wiest',
    price: 380.00,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&h=600',
    category: 'Non-Fiction',
    description: 'This is a book about self-sabotage. Why we do it, when we do it, and how to stop doing it—for good. Brianna Wiest explains the philosophy of why we need to understand our own self-sabotage before we can overcome it.',
    inStock: true
  },
  {
    id: '3',
    title: 'Think Like a Monk',
    author: 'Jay Shetty',
    price: 420.00,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&h=600',
    category: 'Non-Fiction',
    description: 'Jay Shetty draws on his time as a monk to show us how we can clear the roadblocks to our potential and power. Combining ancient wisdom and his own rich experiences in the ashram.',
    inStock: true
  },
  {
    id: '4',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: 400.00,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=400&h=600',
    category: 'Non-Fiction',
    description: 'A generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be "positive" all the time so that we can truly become better, happier people.',
    inStock: true
  },
  {
    id: '5',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 350.00,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&h=600',
    category: 'Fiction',
    description: 'A special 25th anniversary edition of the extraordinary international bestseller, including a new Foreword by Paulo Coelho. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy.',
    inStock: true
  },
  {
    id: '6',
    title: 'Deep Work',
    author: 'Cal Newport',
    price: 390.00,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&h=600',
    category: 'Non-Fiction',
    description: 'Deep work is the ability to focus without distraction on a cognitively demanding task. It is a skill that allows you to quickly master complicated information and produce better results in less time.',
    inStock: false
  },
  {
    id: '7',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 450.00,
    image: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?auto=format&fit=crop&w=400&h=600',
    category: 'Fiction',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    inStock: true
  },
  {
    id: '8',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 420.00,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=400&h=600',
    category: 'Fiction',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. The only problem is, he does not remember that.',
    inStock: true
  }
];