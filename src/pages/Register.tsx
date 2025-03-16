
import React from 'react';
import Layout from '@/components/Layout';
import AuthForm from '@/components/AuthForm';

const Register: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        <AuthForm type="register" />
      </div>
    </Layout>
  );
};

export default Register;
