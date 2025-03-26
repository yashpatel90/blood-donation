"use client"

import { useState } from "react"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const AboutUs=()=> {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!contactForm.name.trim()) errors.name = "Name is required"
    if (!contactForm.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = "Email is invalid"
    }
    if (!contactForm.subject.trim()) errors.subject = "Subject is required"
    if (!contactForm.message.trim()) errors.message = "Message is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Here you would normally send the form data to your backend
      console.log("Form submitted:", contactForm)

      // Show success message
      setFormSubmitted(true)

      // Reset form
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false)
      }, 5000)
    }
  }

  // Team members data
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Medical Director",
      bio: "With over 15 years of experience in hematology, Dr. Johnson founded Hope Drop with a vision to revolutionize blood donation accessibility.",
      image: "https://i.postimg.cc/hj2ZCZ9P/Screenshot-2024-06-09-201858.png",
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      bio: "Michael oversees the day-to-day operations of Hope Drop, ensuring that blood drives run smoothly and donors have a positive experience.",
      image: "https://i.postimg.cc/PqzRD5JD/Screenshot-2024-06-09-201920.png",
    },
    {
      name: "Priya Patel",
      role: "Community Outreach Manager",
      bio: "Priya builds partnerships with local organizations and businesses to host blood drives and raise awareness about the importance of donation.",
      image: "https://i.postimg.cc/tTqmNGnM/Screenshot-2024-06-09-201909.png",
    },
    {
      name: "James Wilson",
      role: "Technology Lead",
      bio: "James leads our digital initiatives, making it easier for donors to schedule appointments and track their donation history.",
      image: "https://i.postimg.cc/ZKC2Qmsk/Screenshot-2024-06-09-202021.png",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      category: "donors",
      items: [
        {
          name: "Emma Rodriguez",
          quote:
            "I've been donating blood for 5 years now, and Hope Drop has made the process so simple. The staff is always friendly, and I love knowing that my donation is helping save lives.",
          image: "https://i.postimg.cc/ZRQFBG83/Screenshot-2024-06-09-203152.png",
        },
        {
          name: "David Kim",
          quote:
            "After my father needed blood transfusions during his cancer treatment, I decided to become a regular donor. Hope Drop's mobile app makes it easy to schedule appointments and track my donation history.",
          image: "https://i.postimg.cc/m2vX6HFM/Screenshot-2024-06-09-201731.png",
        },
        {
          name: "Sophia Williams",
          quote:
            "I was nervous about donating blood for the first time, but the team at Hope Drop was so supportive and made me feel comfortable throughout the entire process. Now I'm a regular donor!",
          image: "https://i.postimg.cc/6pxchxDf/Screenshot-2024-06-09-203222.png",
        },
      ],
    },
    {
      category: "recipients",
      items: [
        {
          name: "Robert Thompson",
          quote:
            "After a serious car accident, I needed multiple blood transfusions. I'm alive today because of generous blood donors. Now I volunteer with Hope Drop to give back to the community that saved my life.",
          image: "https://i.postimg.cc/MKNN2Lgn/Screenshot-2024-06-09-202008.png",
        },
        {
          name: "Maria Gonzalez",
          quote:
            "My daughter was born with a rare blood disorder and requires regular transfusions. We're incredibly grateful for the donors who make her treatment possible and the work Hope Drop does to ensure blood is available.",
          image: "https://i.postimg.cc/hGS0Hb4J/Screenshot-2024-06-09-203341.png",
        },
        {
          name: "Thomas Clark",
          quote:
            "During my heart surgery, I received several units of blood. The doctors told me that without those donations, I might not have survived. Hope Drop is doing vital work in our community.",
          image: "https://i.postimg.cc/90z8sPpP/Screenshot-2024-06-09-201837.png",
        },
      ],
    },
    {
      category: "hosts",
      items: [
        {
          name: "Riverside Community College",
          quote:
            "We've partnered with Hope Drop for our annual campus blood drive for the past 3 years. Their team is professional, organized, and makes the entire process seamless for our students and faculty.",
          image: "https://i.postimg.cc/tTqmNGnM/Screenshot-2024-06-09-201909.png",
        },
        {
          name: "Oakwood Corporation",
          quote:
            "As part of our corporate social responsibility initiatives, we host quarterly blood drives with Hope Drop. Their team handles everything from setup to donor recruitment, making it easy for our employees to participate.",
          image: "https://i.postimg.cc/m2vX6HFM/Screenshot-2024-06-09-201731.png",
        },
        {
          name: "First Baptist Church",
          quote:
            "Our congregation has been hosting blood drives with Hope Drop for over 5 years. It's a meaningful way for our community to come together and help others in need.",
          image: "https://i.postimg.cc/cL3jsmNX/Screenshot-2024-06-09-201818.png",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Hope Drop</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to make blood donation accessible, efficient, and impactful.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div>
            <div className="text-center mb-12">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
              <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  Hope Drop's mission is to ensure that every patient in need has access to safe, sufficient blood
                  products by inspiring a new generation of donors and making the donation process as convenient and
                  rewarding as possible.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We work tirelessly to connect donors with local needs, educate communities about the importance of
                  regular donation, and provide an exceptional experience for everyone involved in the lifesaving
                  process of blood donation.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  We envision a world where no one dies due to a lack of available blood, where donation is a regular
                  part of healthy living, and where communities come together to support this vital resource.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By 2030, we aim to increase the number of first-time donors by 50%, reduce blood shortages by 75%, and
                  establish a diverse donor base that reflects the communities we serve.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-200">
              <h3 className="text-3xl font-semibold text-gray-900 text-center mb-8">Our Core Values</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-red-50 border-red-100 rounded-xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Compassion</h4>
                    <p className="text-sm text-gray-600">We care deeply about donors, recipients, and communities.</p>
                  </CardContent>
                </div>

                <div className="bg-red-50 border-red-100 rounded-xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-red-600"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="m9 15 2 2 4-4"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Integrity</h4>
                    <p className="text-sm text-gray-600">We uphold the highest standards of safety and ethics.</p>
                  </CardContent>
                </div>

                <div className="bg-red-50 border-red-100 rounded-xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-red-600"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" x2="22" y1="12" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Innovation</h4>
                    <p className="text-sm text-gray-600">We continuously improve the donation experience.</p>
                  </CardContent>
                </div>

                <div className="bg-red-50 border-red-100 rounded-xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-red-600"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Community</h4>
                    <p className="text-sm text-gray-600">We build connections that save lives together.</p>
                  </CardContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Since our founding in 2015, Hope Drop has made a significant difference in communities across the country.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">150K+</div>
              <div className="text-gray-600">Donations Collected</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">450K+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">1,200+</div>
              <div className="text-gray-600">Blood Drives Hosted</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">85+</div>
              <div className="text-gray-600">Partner Hospitals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Our dedicated team of professionals is committed to making blood donation accessible and impactful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden transition-transform hover:scale-105 border border-gray-100"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-red-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read inspiring stories from donors, recipients, and blood drive hosts.
            </p>
          </div>

          <Tabs defaultValue="donors">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="donors">Donors</TabsTrigger>
              <TabsTrigger value="recipients">Recipients</TabsTrigger>
              <TabsTrigger value="hosts">Blood Drive Hosts</TabsTrigger>
            </TabsList>

            {testimonials.map((category) => (
              <TabsContent key={category.category} value={category.category} className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="overflow-hidden bg-white md:p-3 rounded-xl">
                      <CardContent className="p-6 flex flex-col justify-between">
                        <div className="flex flex-1 mb-4">
                          <Quote className="h-8 w-8 text-red-200 mr-2 flex-shrink-0" />
                          <p className="text-gray-700 italic">{item.quote}</p>
                        </div>
                        <div className="flex items-center mt-4 pt-4 border-t border-gray-100 ">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or want to learn more about Hope Drop? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-red-600 mr-4 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">info@hopedrop.org</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-red-600 mr-4 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-red-600 mr-4 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-600">
                      123 Lifesaver Avenue
                      <br />
                      Suite 101
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-red-100 p-2 rounded-full text-red-600 hover:bg-red-200 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-red-100 p-2 rounded-full text-red-600 hover:bg-red-200 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-red-100 p-2 rounded-full text-red-600 hover:bg-red-200 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-red-100 p-2 rounded-full text-red-600 hover:bg-red-200 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
                  <p className="font-medium">Thank you for your message!</p>
                  <p className="text-sm">We'll get back to you as soon as possible.</p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-2.5">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className={cn(formErrors.name && "border-red-500")}
                  />
                  {formErrors.name && <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2.5">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className={cn(formErrors.email && "border-red-500")}
                  />
                  {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="subject" className="mb-2.5">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className={cn(formErrors.subject && "border-red-500")}
                  />
                  {formErrors.subject && <p className="text-sm text-red-500 mt-1">{formErrors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2.5">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className={cn(formErrors.message && "border-red-500")}
                  />
                  {formErrors.message && <p className="text-sm text-red-500 mt-1">{formErrors.message}</p>}
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



export default AboutUs;