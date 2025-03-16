
import React from 'react';
import Layout from '@/components/Layout';
import UserForm from '@/components/UserForm';
import { motion } from 'framer-motion';

const Calculator: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Metrics</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter your personal details below to calculate your BMI, BMR, and get personalized
            nutrition recommendations.
          </p>
        </motion.div>

        <UserForm />
      </div>
    </Layout>
  );
};

export default Calculator;
