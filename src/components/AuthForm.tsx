
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const isLogin = type === 'login';
  const title = isLogin ? 'Log In' : 'Create an Account';
  const buttonText = isLogin ? 'Sign In' : 'Create Account';
  const toggleText = isLogin 
    ? "Don't have an account? " 
    : "Already have an account? ";
  const toggleLink = isLogin ? '/register' : '/login';
  const toggleLinkText = isLogin ? 'Sign Up' : 'Log In';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`This is a preview. ${title} functionality will be implemented with Supabase.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl p-6 md:p-8 shadow-sm max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">
          {isLogin 
            ? 'Welcome back! Please enter your details.' 
            : 'Enter your information to create an account.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <Input 
                  id="name" 
                  placeholder="Enter your name" 
                  className="pl-10" 
                  required
                />
              </div>
            </div>
          </>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <User className="h-5 w-5" />
            </div>
            <Input 
              id="username" 
              placeholder="Enter your username" 
              className="pl-10" 
              required
            />
          </div>
        </div>
        
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="pl-10" 
                required
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Lock className="h-5 w-5" />
            </div>
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              className="pl-10 pr-10" 
              required
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {isLogin && (
          <div className="flex justify-end">
            <Link 
              to="#" 
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}
        
        <Button type="submit" className="w-full">
          {buttonText}
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          {toggleText}
          <Link to={toggleLink} className="text-primary hover:underline">
            {toggleLinkText}
          </Link>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-xs text-center text-muted-foreground">
          Note: This is a preview UI. Authentication will be implemented with Supabase.
        </p>
      </div>
    </motion.div>
  );
};

export default AuthForm;
