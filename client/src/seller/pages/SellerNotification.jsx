import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Package, IndianRupee, Gavel, X, Check } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

import sellerAxios from "@/api/axiosSeller";
import { getSocket } from "@/socket";

import Navbar from "./Navbar";
import EmptyState from "@/components/common/EmptyState";
import { NotificationSkeleton } from "@/components/common/LoadingSkeleton";
import { toast } from "sonner";

export default function SellerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔒 LOCAL LOCK FOR HANDLED NOTIFICATIONS
  const handledRef = useRef(
  new Set(JSON.parse(localStorage.getItem("handledOrders") || "[]"))
);


  // ---------------- FETCH ----------------
  const fetchNotifications = async () => {
    const token = localStorage.getItem("sellerAccessToken");
    if (!token) return;

    try {
      const res = await sellerAxios.get("/orders/seller/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🚫 DO NOT RE-OPEN HANDLED NOTIFICATIONS
      const filtered = res.data.map(n =>
        handledRef.current.has(n._id)
          ? { ...n, orderStatus: "handled" }
          : n
      );

      setNotifications(filtered);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    const i = setInterval(() => {
      if (localStorage.getItem("sellerAccessToken")) {
        fetchNotifications();
        clearInterval(i);
      }
    }, 300);
    return () => clearInterval(i);
  }, []);

  // ---------------- SOCKET ----------------
  useEffect(() => {
    const socket = getSocket("seller");
    if (!socket) return;

    const onNotify = () => {
      fetchNotifications();
    };

    socket.on("new_notification", onNotify);
    return () => socket.off("new_notification", onNotify);
  }, []);

  // ---------------- ACCEPT / DECLINE ----------------
  const handleAction = async (notification, action) => {
    const token = localStorage.getItem("sellerAccessToken");
    if (!token) return toast.error("Not authenticated");

    try {
      await sellerAxios.post(
        "/orders/seller-action",
        { orderId: notification.orderId, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Order ${action}ed`);
      handledRef.current.add(notification._id);

localStorage.setItem(
  "handledOrders",
  JSON.stringify(Array.from(handledRef.current))
);


    

      // 🔥 FORCE UI UPDATE
      setNotifications(prev =>
        prev.map(n =>
          n._id === notification._id
            ? { ...n, orderStatus: "handled" }
            : n
        )
      );
    } catch (err) {
      toast.error("Action failed");
    }
  };

  // ---------------- ICON ----------------
  const getIcon = type => {
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
          <NotificationSkeleton />
        ) : notifications.length ? (
          <div className="space-y-3">
            {notifications.map(n => {
              const Icon = getIcon(n.type);
              const showButtons =
                n.type === "order_request" &&
                n.orderStatus === "pending" &&
                !handledRef.current.has(n._id);

              return (
                <motion.div key={n._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="border bg-green-50/40 border-green-200">
                    <CardContent className="p-5 flex gap-4">
                      <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-xl">{n.title}</h3>
                          <span className="text-xs text-slate-400">
                            {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                          </span>
                        </div>

                        <p className="text-slate-600 mt-1">{n.message}</p>

                        {!showButtons && (
                          <p className="mt-3 text-sm font-medium text-green-600">
                            Order handled
                          </p>
                        )}

                        {showButtons && (
                          <div className="mt-4 flex gap-3">
                            <Button
                              size="sm"
                              onClick={() => handleAction(n, "accept")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-1" /> Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(n, "decline")}
                              className="text-red-600 border-red-200"
                            >
                              <X className="w-4 h-4 mr-1" /> Cancel
                            </Button>
                          </div>
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
