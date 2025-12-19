import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Gavel,
  MessageCircle,
  Headphones,
  ShieldCheck,
  Zap,
  BookOpen,
  Users,
  Clock
} from "lucide-react"

const initialCards = [
  {
    id: 1,
    col: "md:col-span-2",
    icon: MapPin,
    title: "Book Lending (5 km radius)",
    desc:
      "Find and rent books from lenders within 5 km of your location. Save money and support local book lovers.",
  },
  {
    id: 2,
    col: "md:col-span-2",
    gradient: true,
    title: "Read. Rent. Connect.",
    icon: BookOpen,
  },
  {
    id: 3,
    icon: Gavel,
    title: "Reverse Bidding",
    desc:
      "Can’t find a book? Post a request and let sellers bid to offer you the best price.",
  },
  {
    id: 4,
    icon: MessageCircle,
    title: "Seller Chat",
    desc:
      "Negotiate prices, ask questions, and communicate directly with sellers before buying.",
  },
  {
    id: 5,
    col: "md:col-span-2",
    icon: Headphones,
    title: "Audio Book Descriptions",
    desc:
      "Listen to AI-generated audio descriptions of books for a hands-free browsing experience.",
  },
  {
    id: 6,
    icon: ShieldCheck,
    title: "Verified Sellers",
    desc:
      "All sellers are verified to ensure safe and trustworthy transactions.",
  },
  {
    id: 7,
    icon: Zap,
    title: "Instant Notifications",
    desc:
      "Get real-time updates on orders, bids, and messages via push notifications.",
  },
  {
    id: 8,
    icon: Users,
    title: "Community Driven",
    desc:
      "Built for readers, by readers. A local-first book ecosystem.",
  },
  {
    id: 9,
    icon: Clock,
    title: "Quick Local Pickup",
    desc:
      "No long deliveries. Meet nearby and get books instantly.",
  },
]

export default function AboutSection() {
  const [cards, setCards] = useState(initialCards)

  // 🔁 Shuffle cards every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => [...prev].sort(() => Math.random() - 0.5))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LibriX
            </span>
          </h2>
          <p className="mt-4 text-slate-600">
            A smarter way to discover, share, and access books locally.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-6"
        >
          <AnimatePresence>
            {cards.map((card) => {
              const Icon = card.icon

              return (
                <motion.div
                  key={card.id}
                  layout
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`
                    rounded-2xl p-6 shadow-sm border
                    ${card.col ?? ""}
                    ${card.gradient
                      ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex flex-col items-center justify-center text-center"
                      : "bg-white"}
                  `}
                >
                  <Icon
                    className={`w-8 h-8 mb-4 ${
                      card.gradient ? "text-white" : "text-blue-600"
                    }`}
                  />

                  <h3
                    className={`font-semibold ${
                      card.gradient ? "text-3xl" : "text-lg"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {card.desc && (
                    <p className="mt-2 text-sm text-slate-600">
                      {card.desc}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
