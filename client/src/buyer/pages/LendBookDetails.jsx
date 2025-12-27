import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  BookOpen,
  Volume2,
  VolumeX,
  MessageCircle,
  Star,
  User,
  Check,
  Heart,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

export default function LendBookDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the lendBook data passed from UserHome.jsx
  const { book } = location.state || {}; 

  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback if no book data is passed via navigation state
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Book details not found. <Button variant="link" onClick={() => navigate(-1)}>Go Back</Button></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <Navbar />
      <div className='pt-22' />
      <div className="flex justify-center">
        <div className="w-[75%] space-y-8">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="grid grid-cols-[300px_1fr] gap-8">
                  {/* LEFT COLUMN: COVER IMAGE */}
                  <div className="space-y-4">
                    <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={book.cover_image} // Matches LendBook model schema
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
                        />
                      </button>

                      <div className="absolute bottom-4 right-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="backdrop-blur-md bg-white/80"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <VolumeX className="w-4 h-4 mr-1" /> : <Volume2 className="w-4 h-4 mr-1" />}
                          Listen Description
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: BOOK INFORMATION */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex gap-2 mb-2">
                        {/* Condition badge from LendBook enum */}
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 uppercase">
                          {book.condition}
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-0 uppercase">
                          {book.category}
                        </Badge>
                      </div>
                      <h2 className="text-4xl font-extrabold text-slate-900">{book.title}</h2>
                      <p className="text-xl text-slate-500 mt-1 italic">by {book.author}</p>
                    </div>

                    {/* Ratings Placeholder */}
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="font-bold text-slate-700">4.5</span>
                    </div>

                    {/* Description Area */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-800">About this book</h3>
                      <p className="text-slate-600 leading-relaxed bg-slate-100/50 p-4 rounded-xl border border-slate-100">
                        {book.description || "The lender has not provided a description for this copy."}
                      </p>
                    </div>

                    {/* LENDER INFORMATION */}
                    <Card className="border-slate-100 shadow-sm">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-yellow-300 rounded-full flex items-center justify-center shadow-inner">
                          <User className="text-white w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          {/* Populate lender info from backend populate */}
                          <p className="font-bold text-slate-900">
                            {book.lenderId?.name || "Verified Lender"}
                          </p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-green-500" /> {book.lenderId?.address || "Location available on request"}
                          </p>
                        </div>
                        <Button variant="outline" className='border-green-200 text-green-700 hover:bg-green-50'>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat with Lender
                        </Button>
                      </CardContent>
                    </Card>

                    {/* RENTAL ACTION CARD */}
                    <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-0 shadow-lg overflow-hidden">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-slate-600 font-medium">Rental Price</span>
                            <span className="text-xs text-slate-400 italic">Billed weekly</span>
                          </div>
                          <span className="text-3xl font-black text-slate-900">
                            ₹{book.rent_price_per_week}<span className="text-sm font-normal text-slate-500"> /week</span>
                          </span>
                        </div>

                        <div className="flex gap-4">
                          <Button className="flex-1 h-14 text-lg bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                            <Calendar className="w-5 h-5 mr-2" /> Rent Now
                          </Button>
                        </div>

                        <div className="flex justify-center text-xs text-slate-500 font-medium gap-4 pt-2">
                          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Secure Deposit</span>
                          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Pickup Pickup</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}