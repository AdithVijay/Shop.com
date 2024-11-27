import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'sonner'
// import { toast } from "@/components/ui/use-toast"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    })
    setFormData({ name: '', email: '', message: '' })
  }

  function btn(){
    toast.success("message send")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-muted-foreground">
            We'd love to hear from you. Please fill out this form or use our contact information below.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="min-h-[150px]"
            />
            <Button onclick={btn} type="submit" className="w-full">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <div className="space-y-4">
            <p className="flex items-center text-muted-foreground">
              <MapPin className="mr-2 h-5 w-5" />
              123 Main St, Anytown, ST 12345
            </p>
            <p className="flex items-center text-muted-foreground">
              <Phone className="mr-2 h-5 w-5" />
              (123) 456-7890
            </p>
            <p className="flex items-center text-muted-foreground">
              <Mail className="mr-2 h-5 w-5" />
              contact@example.com
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Our Location</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841902907894!2d-73.98651418405315!3d40.75889084358839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1560412335400!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}