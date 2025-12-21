import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/lender/pages/Navbar";
import { 
  BookOpen, 
  IndianRupee, 
  TrendingUp,
  Upload,
  Eye,
  Clock,
  ArrowUpRight,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 1900 },
  { month: 'May', revenue: 2800 },
  { month: 'Jun', revenue: 3200 },
];

const categoryData = [
  { name: 'Fiction', value: 35, color: '#6366f1' },
  { name: 'Non-Fiction', value: 25, color: '#8b5cf6' },
  { name: 'Self-Help', value: 20, color: '#f59e0b' },
  { name: 'Academic', value: 15, color: '#10b981' },
  { name: 'Other', value: 5, color: '#94a3b8' },
];

const recentRentals = [
  { id: '1', book: 'Atomic Habits', renter: 'Amit Kumar', days: 2, status: 'active' },
  { id: '2', book: 'Deep Work', renter: 'Priya Sharma', days: 5, status: 'active' },
  { id: '3', book: 'The Alchemist', renter: 'Rahul Verma', days: 12, status: 'returning' },
  { id: '4', book: 'The Alchemist', renter: 'Rahul Verma', days: 12, status: 'returning' },
];

export default function LenderDashboard() {
  const stats = [
    { 
      title: 'Total Books Lent', 
      value: '24', 
      icon: BookOpen, 
      change: '+3 this month',
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    { 
      title: 'Active Rentals', 
      value: '8', 
      icon: Eye, 
      change: '2 due soon',
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    { 
      title: 'Revenue Earned', 
      value: '₹12,450', 
      icon: IndianRupee, 
      change: '+₹2,800 this month',
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Avg. Rental Duration', 
      value: '12 days', 
      icon: Clock, 
      change: 'Per book',
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <Navbar />
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-30 gap-4 mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-black to-green-700 bg-clip-text text-transparent">Lender Dashboard</h1>
            <p className="text-slate-500">Track your book rentals and earnings</p>
          </div>
          <Link to={createPageUrl('LenderUpload')}>
            <Button className="bg-gradient-to-r from-yellow-400 to-green-700 text-black
                  transition-all duration-300 ease-out
                  hover:scale-110 hover:shadow-2xl
                  active:scale-95 ">
              <Upload className="w-4 h-4 mr-2" />
              Upload New Book
            </Button>
          </Link>
        </div>
        
        {/* Stats Grid */}
        <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: {},
            visible: {
            transition: { staggerChildren: 0.15 }
            }
        }}
        className="
            grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10
            p-4 md:p-6
            rounded-2xl
        "
        >
        {stats.map((stat) => (
            <motion.div
            key={stat.title}
            variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.9, ease: 'easeOut' }
                }
            }}
            >
            <Card
                className="
                bg-gradient-to-br from-green-200 to-yellow-100
                backdrop-blur-lg
                border border-white/30
                rounded-3xl
                shadow-lg
                hover:shadow-2xl hover:scale-[1.05]
                transition-all duration-300
                "
            >
                <CardContent className="p-5 md:p-7">
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                    <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                    <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                    </div>
                    <ArrowUpRight className="w-7 h-7 text-black/80" />
                </div>

                {/* Value */}
                <div className="
                    text-4xl font-extrabold
                    bg-gradient-to-r from-black to-gray-500
                    bg-clip-text text-transparent
                    mb-1
                ">
                    {stat.value}
                </div>

                {/* Title */}
                <div className="text-sm font-medium text-slate-700">
                    {stat.title}
                </div>

                {/* Change */}
                <div className="text-xs font-semibold text-amber-800 mt-2">
                    {stat.change}
                </div>
                </CardContent>
            </Card>
            </motion.div>
        ))}
        </motion.div>

        
        {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }} // slower
                className="lg:col-span-2"
            >
                <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-yellow-50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-700" />
                    Monthly Revenue
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#475569", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#475569", fontSize: 12 }}
                        />

                        <Tooltip
                            contentStyle={{
                            background: "rgba(255,255,255,0.9)",
                            border: "none",
                            borderRadius: "10px",
                            boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.15)",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#16a34a"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            strokeWidth={3}
                            animationDuration={1600} // slower chart animation
                        />
                        </AreaChart>
                    </ResponsiveContainer>
                    </div>
                </CardContent>
                </Card>
            </motion.div>

            {/* Category Pie Chart */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }} // slower + stagger
            >
                <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-yellow-50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-700" />
                    Books by Category
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={82}
                            paddingAngle={3}
                            dataKey="value"
                            animationDuration={1400} // slower pie animation
                        >
                            {categoryData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="rgba(255,255,255,0.6)"
                            />
                            ))}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4 justify-center">
                    {categoryData.map((cat) => (
                        <div
                        key={cat.name}
                        className="flex items-center gap-1.5 text-xs text-slate-600"
                        >
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: cat.color }}
                        />
                        <span>{cat.name}</span>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            </div>

        
        {/* Recent Rentals */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-yellow-50">
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle className="text-lg font-semibold text-slate-800">
      Recent Rentals
    </CardTitle>
    <Link to={createPageUrl("LenderBooks")}>
      <Button
        variant="ghost"
        size="sm"
        className="text-green-700 hover:text-green-800"
      >
        View All
      </Button>
    </Link>
  </CardHeader>

  <CardContent>
    {/* Amazon-style grid */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } }
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {recentRentals.map((rental) => (
        <motion.div
          key={rental.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
          className="
            flex justify-between items-center
            p-4
            bg-white/80
            backdrop-blur-sm
            rounded-2xl
            border border-white/50
            shadow-sm
            hover:shadow-md hover:scale-[1.02]
            transition-all duration-300
          "
        >
          {/* Left info */}
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 truncate">
              {rental.book}
            </p>
            <p className="text-sm text-slate-500 truncate">
              Rented by {rental.renter}
            </p>
          </div>

          {/* Right info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-600">
                {rental.days} days
              </p>
            </div>

            <Badge
              className={
                rental.status === "active"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
              }
            >
              {rental.status === "active"
                ? "Active"
                : "Returning Soon"}
            </Badge>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </CardContent>
</Card>

      </div>
    </div>
  );
}