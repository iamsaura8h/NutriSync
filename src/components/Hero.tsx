
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
                Your personal nutrition assistant
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Understand your body,{' '}
              <span className="text-primary">optimize your health</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0"
            >
              NutriScan analyzes your body metrics to provide personalized nutrition
              insights, caloric recommendations, and meal suggestions tailored to your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start"
            >
              <Link to="/calculator">
                <Button size="lg" className="rounded-full px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Sign In
                </Button>
              </Link>
              <Link to="/aiScan">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  NutriScan
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mx-auto max-w-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl transform -rotate-6 scale-105" />
              <div className="relative glass-card rounded-3xl overflow-hidden shadow-xl">
                <video
                  src="/nutriScan-demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
