"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2070&auto=format&fit=crop"
          alt="Blood donation"
          className="object-cover h-screen w-full object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20 mt-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-semibold text-white mb-6"
          >
            Donate Blood, Keep the World Beating
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Your donation can save up to three lives. Join our community of
            donors and make a difference today. Every drop counts in our mission
            to ensure blood supply for those in need.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center mb-20"
          >
            <Link to={"/about-us"}>
              <Button
                size="lg"
                className="bg-red-600 hover:text-red-600 text-white hover:bg-transparent border border-red-600"
              >
                Learn More
              </Button>
            </Link>
            <Link to={"/donate-blood"}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:text-white hover:bg-white/10"
              >
                Donate Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
