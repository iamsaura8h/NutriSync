
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WelcomeMessage from '@/components/WelcomeMessage';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      {user && <WelcomeMessage />}
      <Hero />
      <Features />
    </Layout>
  );
};

export default Index;
