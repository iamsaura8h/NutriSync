
import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  LayoutDashboard, 
  Calculator, 
  ChartLine, 
  Camera,
  Weight,
  BarChart,
  Apple
} from 'lucide-react';

const HowToUse: React.FC = () => {
  const features = [
    {
      icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
      title: "Dashboard",
      description: "Your central hub for tracking progress, checking nutrition goals, and getting meal recommendations."
    },
    {
      icon: <Calculator className="h-8 w-8 text-primary" />,
      title: "Nutrition Calculator",
      description: "Calculate your BMI, daily caloric needs, and macronutrient targets based on your health data."
    },
    {
      icon: <ChartLine className="h-8 w-8 text-primary" />,
      title: "Progress Tracking",
      description: "Visualize your weight changes and nutrition metrics over time to stay motivated."
    },
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "AI NutriScan",
      description: "Scan food items to get instant nutritional information using our AI-powered recognition."
    }
  ];

  const faqItems = [
    {
      question: "How do I track my weight?",
      answer: "Use the Weight Tracker component on your dashboard. You can enter your weight regularly to track changes over time. The system will automatically generate a progress graph for you."
    },
    {
      question: "How are my calorie needs calculated?",
      answer: "We use the Harris-Benedict equation combined with your activity level and goals to determine your daily caloric needs. You can adjust your activity level and goals in your profile settings."
    },
    {
      question: "What is AI NutriScan?",
      answer: "AI NutriScan is our advanced feature that uses image recognition to identify food items and provide nutrition information. Simply upload a photo of your meal, and our AI will analyze the contents."
    },
    {
      question: "How do I set nutrition goals?",
      answer: "Your nutrition goals are automatically calculated based on your profile information. You can manually adjust them in the Nutrition Goals section of your dashboard."
    },
    {
      question: "Can I track specific meals?",
      answer: "Yes, you can log individual meals and food items through the food tracker. This information will be used to calculate your daily nutrition intake."
    }
  ];

  const tools = [
    {
      icon: <Weight className="h-8 w-8 text-primary" />,
      title: "Weight Tracker",
      steps: [
        "Navigate to your Dashboard",
        "Find the Weight Tracker component",
        "Enter your current weight",
        "Click 'Save' to record your entry",
        "View your progress graph to track changes over time"
      ]
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Progress Tracker",
      steps: [
        "Go to the Dashboard",
        "View the Progress Tracker component",
        "See your weight trends and statistics",
        "Use the date filters to view different time periods",
        "Track your streak to stay motivated"
      ]
    },
    {
      icon: <Apple className="h-8 w-8 text-primary" />,
      title: "Nutrition Goals",
      steps: [
        "Access your Dashboard",
        "Check the Nutrition Goals component",
        "View your daily calorie and macronutrient targets",
        "Track your progress towards meeting these goals",
        "Adjust goals if needed in your profile settings"
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">How to Use NutriScan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your complete guide to getting the most out of NutriScan's features and tools for your nutrition and fitness journey.
          </p>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Using Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {tool.icon}
                    <div>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>Step-by-step guide</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      {tool.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm">{step}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default HowToUse;
