import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Package, MessageCircle } from 'lucide-react';

const illustrations = {
  books: BookOpen,
  search: Search,
  orders: Package,
  messages: MessageCircle
};

export default function EmptyState({ 
  type = 'books',
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  actionLabel,
  onAction
}) {
  const Icon = illustrations[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-indigo-600 hover:bg-indigo-700">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}