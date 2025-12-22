import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BookOpen, ShoppingCart, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BookCard({ book, showDistance = true }) {
  const conditionColors = {
    new: 'bg-green-100 text-green-700',
    'like-new': 'bg-emerald-100 text-emerald-700',
    good: 'bg-blue-100 text-blue-700',
    fair: 'bg-amber-100 text-amber-700',
    poor: 'bg-red-100 text-red-700'
  };

  return (
    <Link to={createPageUrl('BookDetail') + `?id=${book.id}`}>
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          <img 
            src={book.cover_image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop'} 
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Distance Badge */}
          {showDistance && book.distance && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
              <MapPin className="w-3 h-3 text-indigo-600" />
              {book.distance} km
            </div>
          )}
          
          {/* Listing Type Badge */}
          <div className="absolute top-3 right-3">
            {book.listing_type === 'lend' && (
              <Badge className="bg-indigo-500 hover:bg-indigo-500 text-white">
                <BookOpen className="w-3 h-3 mr-1" />
                Rent
              </Badge>
            )}
            {book.listing_type === 'sell' && (
              <Badge className="bg-purple-500 hover:bg-purple-500 text-white">
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy
              </Badge>
            )}
            {book.listing_type === 'both' && (
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                Both
              </Badge>
            )}
          </div>
          
          {/* Audio Badge */}
          {book.audio_description_url && (
            <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Volume2 className="w-4 h-4 text-indigo-600" />
            </button>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-slate-500 mb-3">{book.author}</p>
          
          <div className="flex items-center justify-between">
            <div>
              {book.rent_price_per_week && (
                <div className="text-indigo-600 font-semibold">
                  ₹{book.rent_price_per_week}<span className="text-xs text-slate-400 font-normal">/week</span>
                </div>
              )}
              {book.sell_price && (
                <div className="text-purple-600 font-semibold">
                  ₹{book.sell_price}
                </div>
              )}
            </div>
            
            {book.condition && (
              <Badge variant="secondary" className={conditionColors[book.condition]}>
                {book.condition}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}