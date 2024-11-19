'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ShoppingBag, ShoppingCart } from 'lucide-react'

const FloatingItem = ({ delay, children }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-5, 5, -5] }}
    transition={{ repeat: Infinity, duration: 3, delay }}
    className="absolute"
  >
    {children}
  </motion.div>
)

export default function CartEmpty() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] mt-24 text-center">
      <div className="relative w-60 h-36">
        {/* Empty cart illustration */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ShoppingCart className="w-24 h-24 text-primary/20" strokeWidth={1} />
        </motion.div>

        {/* Floating clothing items */}
        {mounted && (
          <>
            <FloatingItem delay={0}>
              <ShoppingBag className="w-6 h-6 text-primary/40 absolute -top-6 left-6" />
            </FloatingItem>
            <FloatingItem delay={0.5}>
              <motion.div
                className="w-8 h-4 bg-primary/30 rounded-full absolute top-6 right-6"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </FloatingItem>
            <FloatingItem delay={1}>
              <motion.div
                className="w-6 h-8 bg-primary/20 rounded absolute bottom-10 left-10"
                animate={{ rotate: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
            </FloatingItem>
            <FloatingItem delay={1.5}>
              <ShoppingBag className="w-6 h-6 text-primary/50 absolute bottom-6 right-10" />
            </FloatingItem>
          </>
        )}
      </div>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold mb-3"
      >
        Your cart is feeling light
      </motion.h3>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link to={"/shop"} passHref>
          <Button className="px-6 py-2 mb-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Discover Styles
          </Button>
        </Link>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-muted-foreground max-w-xs mx-auto"
      >
        Time to fill it with fabulous finds! Explore our collection and start your style journey today.
      </motion.p>
    </div>
  )
}
