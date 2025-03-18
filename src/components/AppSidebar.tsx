
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Calculator, 
  ChartLine, 
  Apple, 
  Camera, 
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AppSidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigationItems = [
    { title: 'Home', path: '/', icon: Home },
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Calculator', path: '/calculator', icon: Calculator },
    { title: 'Results', path: '/results', icon: ChartLine },
  ];
  
  const toolsItems = [
    { title: 'AI NutriScan', path: '/aiScan', icon: Camera },
  ];
  
  // Get first letter of username for avatar
  const userInitial = user?.user_metadata?.name 
    ? user.user_metadata.name.charAt(0).toUpperCase() 
    : user?.email?.charAt(0).toUpperCase() || '?';
  
  return (
    <Sidebar variant="inset" className="md:w-[260px]">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">NutriScan</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              {user?.user_metadata?.name || user?.email}
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          size="sm" 
          onClick={signOut}
        >
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
