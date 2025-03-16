
import React from 'react';
import Layout from '@/components/Layout';
import AuthForm from '@/components/AuthForm';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        <AuthForm type="login" />
      </div>
    </Layout>
  );
};

export default Login;
