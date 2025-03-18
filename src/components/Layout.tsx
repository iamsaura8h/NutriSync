
import React from 'react';
import Navbar from './Navbar';
import AppSidebar from './AppSidebar';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        
        <div className="flex-grow flex">
          {user && <AppSidebar />}
          
          <SidebarInset>
            {user && <SidebarRail />}
            <motion.main
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full py-6 px-4"
            >
              {children}
            </motion.main>
          </SidebarInset>
        </div>
        
        <footer className="py-4 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} NutriScan. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
