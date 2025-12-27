import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bell, Package, IndianRupee, Gavel 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

import buyerAxios from "@/api/axiosBuyer";
import { getSocket } from "@/socket";

import Navbar from './Navbar';
import EmptyState from '@/components/common/EmptyState';
import { NotificationSkeleton } from '@/components/common/LoadingSkeleton';

export default function BuyerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ---------------- FETCH NOTIFICATIONS ----------------
  const fetchNotifications = async () => {
    const token = localStorage.getItem("buyerAccessToken");
    if (!token) {
      console.log("⏳ Buyer token not ready, skipping fetch");
      return;
    }

    try {
      const res = await buyerAxios.get(
        "http://localhost:3000/api/orders/buyer/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching buyer notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- INITIAL LOAD + POLLING ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("buyerAccessToken");
      if (token) {
        fetchNotifications();
        clearInterval(interval); // stop polling once token is ready
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // ---------------- SOCKET.IO REALTIME ----------------
  useEffect(() => {
    const socket = getSocket("buyer");
    if (!socket) return;

    console.log("🟢 Buyer socket connected");

    const handleNewNotification = () => {
      console.log("📢 New buyer notification received!");
      fetchNotifications();
    };

    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, []);

  // ---------------- ICON MAPPER ----------------
  const getIcon = (type) => {
    const icons = {
      order_request: Package,
      payment: IndianRupee,
      order_update: Bell,
      bid: Gavel,
    };
    return icons[type] || Bell;
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <Navbar />
      <div className="pt-30" />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-slate-900 mb-8">
          Notifications
        </h1>

        {isLoading ? (
          <div className="space-y-4">
            <NotificationSkeleton />
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((n) => {
              const Icon = getIcon(n.type);

              return (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card
                    className={`relative border transition-all ${
                      n.isRead
                        ? "bg-white"
                        : "bg-green-50/40 border-green-200"
                    }`}
                  >
                    <CardContent className="p-5 flex gap-4">
                      <div className="mt-1 h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-xl">
                            {n.title}
                          </h3>
                          <span className="text-xs text-slate-400">
                            {formatDistanceToNow(
                              new Date(n.createdAt),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>

                        <p className="text-slate-600 mt-1">
                          {n.message}
                        </p>

                        {n.orderStatus && (
                          <p className="mt-3 text-sm font-medium text-slate-600">
                            Order status:{" "}
                            <span className="capitalize">
                              {n.orderStatus}
                            </span>
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <EmptyState type="messages" title="No notifications yet" />
        )}
      </div>
    </div>
  );
}
