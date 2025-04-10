"use client"

import { useState } from "react"
import { Droplet, Heart, Phone, Mail, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const Footer=()=> {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [emailError, setEmailError] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()

    // Simple validation
    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email")
      return
    }

    // Here you would normally send the email to your backend
    console.log("Subscribing email:", email)

    // Show success state
    setSubscribed(true)
    setEmailError("")
    setEmail("")

    // Reset after 5 seconds
    setTimeout(() => {
      setSubscribed(false)
    }, 5000)
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Droplet className="h-6 w-6 text-red-500" />
              <span className="font-bold text-xl">Hope Drop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Hope Drop is dedicated to making blood donation accessible, efficient, and impactful. Together, we can
              save lives one donation at a time.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-gray-300 text-sm">info@hopedrop.org</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Home
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> About Us
                </a>
              </li>
              <li>
                <a href="/types-of-blood-donation" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Types of Donation
                </a>
              </li>
              <li>
                <a href="/host" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Host a Blood Drive
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Sign In
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Register
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Donation FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Eligibility Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Find Donation Centers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Blood Types Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>

            {subscribed ? (
              <div className="bg-green-900/30 border border-green-700 text-green-100 p-3 rounded-md mb-4">
                <p className="text-sm">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError("")
                    }}
                    className={cn(
                      "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500",
                      emailError && "border-red-500",
                    )}
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Subscribe
                </Button>
              </form>
            )}

            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-12 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-red-600 p-2 rounded-full mr-4">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Emergency Blood Donation Hotline</h3>
              <p className="text-gray-300 text-sm">For urgent donation needs or emergencies</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold text-white mr-4">(800) 555-BLOOD</span>
            <Button className="bg-red-600 hover:bg-red-700">Call Now</Button>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Hope Drop. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Cookie Policy
            </a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer