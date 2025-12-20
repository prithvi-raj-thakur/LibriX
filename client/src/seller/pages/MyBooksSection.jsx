import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, IndianRupee, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyBooksSection({ books, isLoading }) {
  if (isLoading) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-yellow-50 h-fit sticky top-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            My Books
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-3 p-3 bg-white/60 rounded-xl">
              <div className="w-16 h-20 bg-slate-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-yellow-50 h-fit sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          My Books
          <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">
            {books.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {books.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No books listed yet</p>
          </div>
        ) : (
          books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={book.cover_image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop'}
                alt={book.title}
                className="w-16 h-20 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm truncate">
                  {book.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <User className="w-3 h-3" />
                  <span className="truncate">{book.author}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>{book.publishing_year || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-green-500 text-white text-xs px-2 py-0.5">
                    <IndianRupee className="w-3 h-3 mr-0.5" />
                    {book.sell_price}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${
                      book.status === 'sold' 
                        ? 'border-red-200 text-red-600 bg-red-50' 
                        : 'border-green-200 text-green-600 bg-green-50'
                    }`}
                  >
                    {book.status || 'available'}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}