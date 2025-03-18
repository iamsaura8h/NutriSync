
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeMessage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const fullName = user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 bg-primary/10 rounded-lg p-4 text-center"
    >
      <h2 className="text-xl font-medium">
        Welcome back, <span className="text-primary font-bold">{fullName}</span>!
      </h2>
      <p className="text-muted-foreground mt-1">
        Let's continue your nutrition journey today
      </p>
    </motion.div>
  );
};

export default WelcomeMessage;
