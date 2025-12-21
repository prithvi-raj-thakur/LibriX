import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Package, 
  IndianRupee, 
  MessageCircle, 
  Clock,
  CheckCheck,
  Gavel,
  X,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import EmptyState from '@/components/common/EmptyState';
import { NotificationSkeleton } from '@/components/common/LoadingSkeleton';

// ✅ Dummy notifications
const sampleNotifications = [
  {
    id: '1',
    title: 'New Order Received',
    message: '📦 New order for "Clean Code" from Amit Kumar. Amount: ₹450',
    type: 'order',
    is_read: false,
    created_date: new Date().toISOString(),
    order_id: '123'
  },
  {
    id: '2',
    title: 'Bid Request Match',
    message: '🎯 A buyer is looking for "System Design Interview" with budget ₹600. Submit your offer!',
    type: 'bid',
    is_read: false,
    created_date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Payment Received',
    message: '💰 Payment of ₹380 received for "Design Patterns".',
    type: 'subscription',
    is_read: true,
    created_date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'New Message',
    message: '💬 Priya Sharma sent you a message about "The Pragmatic Programmer".',
    type: 'chat',
    is_read: true,
    created_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    title: 'Order Cancelled',
    message: '❌ Order for "JavaScript: The Good Parts" was cancelled by the buyer.',
    type: 'order',
    is_read: true,
    created_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function SellerNotifications() {
  // ✅ Using dummy data directly
  const notifications = sampleNotifications;
  const isLoading = false;

  const getIcon = (type) => {
    const icons = {
      order: Package,
      subscription: IndianRupee,
      chat: MessageCircle,
      bid: Gavel,
      system: Bell
    };
    return icons[type] || Bell;
  };

  const getIconColor = (type) => {
    const colors = {
      order: 'bg-blue-100 text-blue-600',
      subscription: 'bg-green-100 text-green-600',
      chat: 'bg-purple-100 text-purple-600',
      bid: 'bg-amber-100 text-amber-600',
      system: 'bg-slate-100 text-slate-600'
    };
    return colors[type] || colors.system;
  };

  const handleCancelOrder = (orderId) => {
    console.log('Cancelling order:', orderId);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-slate-500">{unreadCount} unread notifications</p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm">
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <NotificationSkeleton key={i} />)}
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`border-0 shadow-sm hover:shadow-md transition-shadow ${
                      !notification.is_read
                        ? 'bg-purple-50/50 border-l-4 border-l-purple-500'
                        : 'bg-white'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${getIconColor(notification.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900">
                              {notification.title}
                            </h3>
                            {!notification.is_read && (
                              <Badge className="bg-purple-100 text-purple-700 text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-600 text-sm">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(
                              new Date(notification.created_date),
                              { addSuffix: true }
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {notification.type === 'order' &&
                          !notification.is_read &&
                          notification.order_id && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() =>
                                  handleCancelOrder(notification.order_id)
                                }
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          )}

                        {notification.type === 'bid' &&
                          !notification.is_read && (
                            <Button
                              size="sm"
                              className="bg-amber-500 hover:bg-amber-600"
                            >
                              <Gavel className="w-4 h-4 mr-1" />
                              View Bid
                            </Button>
                          )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            type="messages"
            title="No notifications"
            description="You're all caught up! New notifications will appear here."
          />
        )}
      </div>
    </div>
  );
}
