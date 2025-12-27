import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from '@/components/common/EmptyState';
import { BookCardSkeleton } from '@/components/common/LoadingSkeleton';
import buyerAxios from '@/api/axiosBuyer';
import { toast } from 'sonner';

import {
  Search,
  MapPin,
  Gavel,
  ShoppingCart,
  SlidersHorizontal,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  'All', 'Fiction', 'Non-Fiction', 'Self-Help', 'Academic', 'Biography', 'Science', 'Technology'
];

export default function BuyerHome() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('buying');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [saleBooks, setSaleBooks] = useState([]);
  const [rentBooks, setRentBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ------------------ FETCH SALE BOOKS (UNCHANGED) ------------------
  useEffect(() => {
    if (activeTab !== 'buying') return;

    const fetchSaleBooks = async () => {
      try {
        setIsLoading(true);
        const response = await buyerAxios.get('http://localhost:3000/api/books/for-sale');
        if (response.data.success) setSaleBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleBooks();
  }, [activeTab]);

  // ------------------ FETCH RENT BOOKS (UPDATED) ------------------
  useEffect(() => {
    if (activeTab !== 'lending') return;

    const fetchRentBooks = async () => {
      try {
        setIsLoading(true);
        // Fixed URL to match server.js mounting point: /api/lend-books
        const response = await buyerAxios.get('http://localhost:3000/api/lend-books');
        if (response.data.success) {
          setRentBooks(response.data.books);
        }
      } catch (error) {
        console.error("Error fetching rent books:", error);
        toast.error("Failed to load rental books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentBooks();
  }, [activeTab]);

  const displayBooks =
    activeTab === "buying" ? saleBooks :
    activeTab === "lending" ? rentBooks : [];

  const filteredBooks = displayBooks.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // ------------------ BUY NOW LOGIC (UNCHANGED) ------------------
  const handleBuyNow = async (bookId) => {
    try {
      const token = localStorage.getItem("buyerAccessToken");
      if (!token) {
        alert("Please log in first to buy a book!");
        return;
      }

      const response = await buyerAxios.post(
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


  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-2">
      <Navbar />

      {/* HERO SECTION */}
      <div className='pt-25'/>
      <div className="bg-slate-50 pt-14 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-[75%] max-w-5xl px-10 py-16 rounded-[2.5rem] bg-gradient-to-br from-yellow-300 to-green-200 shadow-2xl"
        >
          <div className="text-center relative z-10">
            <h1 className="text-4xl font-extrabold mb-4">Find Your Next Read</h1>
            <p className="mb-10">Discover books within 5 km</p>
            <div className="bg-white rounded-2xl p-4 flex gap-2 items-center">
              <Search className="w-5 h-5 text-slate-500 ml-2" />
              <Input
                placeholder={`Search books to ${activeTab === "buying" ? "buy" : "rent"}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 border-0 bg-transparent text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <Button className="bg-green-300 hover:bg-yellow-300 text-black rounded-xl px-5 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-8 text-black">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Showing books within 5 km of your location</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="flex w-full max-w-lg mx-auto rounded-full bg-white p-1 shadow-md h-14">
          <TabsTrigger value="lending" className="relative flex-1 rounded-full text-sm font-semibold text-slate-700 data-[state=active]:text-white">
            {activeTab === "lending" && (
              <motion.div
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-green-400 text-black"
              />
            )}
            <div className="relative z-10 flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" /> Rent
            </div>
          </TabsTrigger>
          <TabsTrigger value="buying" className="relative flex-1 rounded-full text-sm font-semibold text-slate-700 data-[state=active]:text-white">
            {activeTab === "buying" && (
              <motion.div
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-green-400 text-black"
              />
            )}
            <div className="relative z-10 flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Buy
            </div>
          </TabsTrigger>
          <TabsTrigger value="bidding" className="relative flex-1 rounded-full text-sm font-semibold text-slate-700 data-[state=active]:text-white">
            {activeTab === "bidding" && (
              <motion.div
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-green-400 text-black"
              />
            )}
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Gavel className="w-4 h-4" /> Bid
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* CATEGORY FILTER */}
      {activeTab !== "bidding" && (
        <div className="flex justify-center mb-6">
          <div className="relative flex gap-2 overflow-x-auto scrollbar-hide bg-white p-1 rounded-full shadow-sm max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-green-400 text-white"
                    : "text-slate-700"
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-green-400"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BOOK GRID */}
      <motion.div className="flex flex-wrap justify-center gap-6">
        {isLoading
          ? Array(6).fill(0).map((_, i) => <BookCardSkeleton key={i} />)
          : filteredBooks.length > 0
          ? filteredBooks.map(book => {
              const isBuyTab = activeTab === "buying";
              return (
                <motion.div
                  key={book._id || book.id}
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-4 w-64 flex flex-col items-center text-center hover:scale-105 transition-transform">
                    {/* FIXED: Uses cover_image for rental books */}
                    <img
                      src={isBuyTab ? book.coverImage : book.cover_image}
                      alt={book.title}
                      className="w-32 h-44 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-slate-500 mb-1">{book.author}</p>
                    <p className="text-xs text-slate-400 mb-2">
                      {isBuyTab 
                        ? `Shop: ${book.seller?.shopName || "BookBazaar"}`
                        : `Lender: ${book.lenderId?.name || "Private Lender"}`
                      }
                    </p>

                    {isBuyTab ? (
                      <p className="text-sm font-bold mb-2 text-green-600">
                        Buy: ₹{book.price}
                      </p>
                    ) : (
                      // FIXED: Uses rent_price_per_week for rental books
                      <p className="text-sm font-bold mb-2 text-slate-700">
                        Rent: ₹{book.rent_price_per_week}/week
                      </p>
                    )}

                    {isBuyTab && (
                      <Button
                        onClick={() => handleBuyNow(book._id)}
                        className="w-full mt-2 bg-green-400 hover:bg-yellow-400 text-black font-semibold rounded-lg"
                      >
                        Buy Now
                      </Button>
                    )}

                   

                    <Button
                      onClick={() =>
                        navigate(`/buyer/lendBook-details/${book._id || book.id}`, { state: { book, mode: activeTab } })
                      }
                      className="w-full mt-2 bg-green-200 hover:bg-yellow-200 text-black font-semibold rounded-lg"
                    >
                      View More
                    </Button>
                  </div>
                </motion.div>
              );
            })
          : <EmptyState />}
      </motion.div>
    </div>
  );
}