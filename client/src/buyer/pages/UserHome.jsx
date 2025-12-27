import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Navbar from './Navbar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from '@/components/common/EmptyState';
import { BookCardSkeleton } from '@/components/common/LoadingSkeleton';
import axios from 'axios';
import { toast } from 'sonner'; // Recommended for feedback without changing UI

import { 
  Search, MapPin, Gavel, ShoppingCart, SlidersHorizontal, BookOpen, ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BuyerHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('buying');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [saleBooks, setSaleBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSaleBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3000/api/books/for-sale');
        if (response.data.success) {
          setSaleBooks(response.data.books);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (activeTab === 'buying') fetchSaleBooks();
  }, [activeTab]);

  // ✅ New Buy Now Logic
  const handleBuyNow = async (bookId) => {
    try {
      const token = localStorage.getItem("buyerAccessToken");
      if (!token) return navigate('/login');

      const response = await axios.post(
        'http://localhost:3000/api/orders/buy',
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Order placed! Notification sent to seller.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  const filteredBooks = saleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-2">
      <Navbar />
      <div className="bg-slate-50 pt-14 pb-8 md:pt-30 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-[75%] max-w-5xl px-10 py-16 rounded-[2.5rem] bg-gradient-to-br from-yellow-300 to-green-200 text-black shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Find Your Next Read</h1>
            <div className="bg-white/95 rounded-2xl p-4 shadow-xl flex items-center gap-1">
              <Search className="w-5 h-5 text-slate-500 ml-2" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container justify-center mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-3">
          <TabsList className="flex w-full max-w-lg mx-auto rounded-full bg-white h-14">
            <TabsTrigger value="buying" className="flex-1 rounded-full data-[state=active]:text-white relative">
              {activeTab === 'buying' && <motion.div layoutId="activeTab" className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-green-400" />}
              <span className="relative z-10 flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Buy</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <motion.div className="flex flex-wrap justify-center gap-6">
          {isLoading ? <BookCardSkeleton /> : filteredBooks.map((book) => (
            <motion.div key={book._id} className="bg-white rounded-2xl shadow-lg p-4 w-64 flex flex-col items-center">
              <img src={book.coverImage} className="w-32 h-44 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-slate-500 mb-1">{book.author}</p>
              <p className="text-sm font-bold text-green-600">₹{book.price}</p>
              <Button 
                onClick={() => handleBuyNow(book._id)}
                className="bg-green-400 hover:bg-yellow-400 text-black w-full mt-2 rounded-lg"
              >
                Buy Now
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}