import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Navbar from './Navbar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BookCard from '@/components/common/BookCard';
import EmptyState from '@/components/common/EmptyState';
import { BookCardSkeleton } from '@/components/common/LoadingSkeleton';


import { 
  Search, 
  MapPin, 
  Gavel, 
  ShoppingCart, 
  SlidersHorizontal,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sample data for demo
const sampleBooks = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    listing_type: 'lend',
    rent_price_per_week: 50,
    condition: 'like-new',
    distance: 2.3,
    category: 'self-help'
  },
  {
    id: '2',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    listing_type: 'both',
    rent_price_per_week: 40,
    sell_price: 350,
    condition: 'good',
    distance: 1.5,
    category: 'non-fiction'
  },
  {
    id: '3',
    title: 'Deep Work',
    author: 'Cal Newport',
    cover_image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    listing_type: 'sell',
    sell_price: 299,
    condition: 'new',
    distance: 3.8,
    category: 'self-help'
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover_image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
    listing_type: 'lend',
    rent_price_per_week: 60,
    condition: 'good',
    distance: 4.2,
    category: 'non-fiction'
  },
  {
    id: '5',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    cover_image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=400&fit=crop',
    listing_type: 'both',
    rent_price_per_week: 35,
    sell_price: 250,
    condition: 'fair',
    distance: 0.8,
    category: 'fiction'
  },
  {
    id: '6',
    title: '1984',
    author: 'George Orwell',
    cover_image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop',
    listing_type: 'sell',
    sell_price: 199,
    condition: 'like-new',
    distance: 2.1,
    category: 'fiction'
  }
];

const categories = [
  'All', 'Fiction', 'Non-Fiction', 'Self-Help', 'Academic', 'Biography', 'Science', 'Technology'
];

export default function BuyerHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('lending');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ✅ Direct dummy data usage
  const books = sampleBooks;
  const isLoading = false;

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();

    if (activeTab === 'lending') {
      return matchesSearch && matchesCategory &&
        (book.listing_type === 'lend' || book.listing_type === 'both');
    }

    if (activeTab === 'buying') {
      return matchesSearch && matchesCategory &&
        (book.listing_type === 'sell' || book.listing_type === 'both');
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-2">
      {/* Hero Section */}
      <Navbar />
      <div className="bg-slate-50 pt-14 pb-8 md:pt-30 md:pb-10">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="
      mx-auto
      w-[75%]                /* 🔥 covers 75% width */
      max-w-5xl
      px-10 md:px-16
      py-16 md:py-15
      rounded-[2.5rem]
      bg-gradient-to-br 
      from-yellow-300
      to-green-200
      text-black
      shadow-2xl
      relative
      overflow-hidden
    "
  >
    {/* subtle grain / glow */}
    <div className="absolute inset-0 bg-white/5 pointer-events-none" />

    {/* Content */}
    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
        Find Your Next Read
      </h1>

      <p className="text-black text-lg mb-10">
        Discover books from lenders and sellers within 5 km — curated for readers
      </p>

      {/* Search Card */}
      <div className="
        bg-white/95
        backdrop-blur
        rounded-2xl
        p-1 md:p-4
        shadow-xl
        flex items-center gap-1
      ">
        <Search className="w-5 h-5 text-slate-500 ml-2" />

        <Input
          type="text"
          placeholder="Search books by title, author or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            flex-1
            border-0
            bg-transparent
            text-slate-900
            placeholder:text-slate-500
            focus-visible:ring-0
            focus-visible:ring-offset-0
            text-base
          "
        />

        <Button
          className="
            bg-green-300
            hover:bg-yellow-300
            text-black
            rounded-xl
            px-5
          "
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Location */}
      <div className="flex items-center justify-center gap-2 mt-8 text-black">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">
          Showing books within 5 km of your location
        </span>
      </div>
    </div>
  </motion.div>
</div>




      <div className="container justify-center mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-3">
        <TabsList
            className="
            flex
            w-full
            max-w-lg
            mx-auto
            rounded-full
            bg-white
            p-1
            shadow-md
            h-14
            "
        >
            {[
            { value: "lending", label: "Rent", icon: BookOpen },
            { value: "buying", label: "Buy", icon: ShoppingCart },
            { value: "bidding", label: "Bid", icon: Gavel },
            ].map(({ value, label, icon: Icon }) => (
            <TabsTrigger
                key={value}
                value={value}
                className="
                relative
                flex-1
                rounded-full
                text-sm
                font-semibold
                text-slate-700
                transition-colors
                data-[state=active]:text-white
                "
            >
                {/* Animated active background */}
                {activeTab === value && (
                <motion.div
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="
                    absolute
                    inset-0
                    rounded-full
                    bg-gradient-to-r
                    from-yellow-300
                    to-green-400
                    text-black
                    "
                />
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
                </span>
            </TabsTrigger>
            ))}
        </TabsList>
        </Tabs>




        {/* Categories */}

        {/* Categories — only show in lending/buying tabs */}
        {activeTab !== "bidding" && (
        <div className="flex justify-center mb-6">
            <div
            className="
                relative
                flex
                gap-2
                overflow-x-auto
                scrollbar-hide
                bg-white
                p-1
                rounded-full
                shadow-sm
                max-w-full
            "
            >
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="
                    relative
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-medium
                    whitespace-nowrap
                    text-slate-700
                    transition-colors
                "
                >
                {/* Active animated background */}
                {selectedCategory === category && (
                    <motion.div
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="
                        absolute
                        inset-0
                        rounded-full
                        bg-green-400
                    "
                    />
                )}

                {/* Label */}
                <span
                    className={`relative z-10 ${
                    selectedCategory === category ? "text-white" : "text-slate-700"
                    }`}
                >
                    {category}
                </span>
                </button>
            ))}
            </div>
        </div>
        )}



        {/* Content */}
        {activeTab === 'bidding' ? (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[300px] min-w-[75%] bg-gradient-to-br from-green-100 to-yellow-200 rounded-2xl text-center mx-auto max-w-xl p-8"
        >
        <Gavel className="w-12 h-12 text-green-400 mb-4" />
        <h2 className="text-4xl font-bold mb-2">Reverse Bidding</h2>
        <p className="text-slate-600 mb-6">
            Post a request and let sellers compete for the best price.
        </p>
        <Link to={createPageUrl('ReverseBidding')}>
            <Button className="bg-green-500 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg">
            Request a Book
            <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </Link>
        </motion.div>

        ) : (
        <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
            visible: {
                transition: { staggerChildren: 0.1 },
            },
            }}
        >
            {isLoading
            ? Array(8)
                .fill(0)
                .map((_, i) => <BookCardSkeleton key={i} />)
            : filteredBooks.length > 0
            ? filteredBooks.map((book) => {
                // Only show rent info in lending tab, buy info in buying tab
                const showRent = activeTab === "lending" && (book.listing_type === "lend" || book.listing_type === "both");
                const showBuy = activeTab === "buying" && (book.listing_type === "sell" || book.listing_type === "both");

                return (
                    <motion.div
                    key={book.id}
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    >
                    <div className="bg-white rounded-2xl shadow-lg p-4 w-64 flex flex-col items-center text-center hover:scale-105 transition-transform">
                        {/* Book Cover */}
                        <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-32 h-44 object-cover rounded-lg mb-4"
                        />

                        {/* Book Info */}
                        <h3 className="text-lg font-semibold">{book.title}</h3>
                        <p className="text-sm text-slate-500 mb-1">{book.author}</p>
                        <p className="text-xs text-slate-400 mb-2">Shop: BookBazaar</p>

                        {/* Price / Rent Info */}
                        {showRent && (
                        <p className="text-sm font-medium mb-2">
                            Rent: ₹{book.rent_price_per_week}/week
                        </p>
                        )}
                        {showBuy && (
                        <p className="text-sm font-medium mb-2">
                            Buy: ₹{book.sell_price}
                        </p>
                        )}

                        {/* Buy / Rent Button */}
                        {(showRent || showBuy) && (
                        <Button className="bg-green-400 hover:bg-yellow-400 text-black w-full mt-2 rounded-lg">
                            {showRent ? "Rent Now" : "Buy Now"}
                        </Button>
                        )}
                    </div>
                    </motion.div>
                );
                })
            : (
                <EmptyState
                type="search"
                title="No books found"
                description="Try adjusting your search or filters."
                />
            )}
        </motion.div>
        )}


      </div>
    </div>
  );
}
