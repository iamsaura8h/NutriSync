
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Salad, Calculator, BarChart4 } from 'lucide-react';

const features = [
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: 'BMI Analysis',
    description: 'Calculate your Body Mass Index and understand where you stand on the health spectrum.',
  },
  {
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: 'BMR Calculation',
    description: 'Determine your Basal Metabolic Rate to understand your body\'s energy requirements at rest.',
  },
  {
    icon: <BarChart4 className="h-8 w-8 text-primary" />,
    title: 'Caloric Needs',
    description: 'Get personalized daily calorie recommendations based on your activity level and goals.',
  },
  {
    icon: <Salad className="h-8 w-8 text-primary" />,
    title: 'Meal Suggestions',
    description: 'Receive meal recommendations tailored to your nutritional requirements and preferences.',
  },
];

const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Science Behind Your Health
          </h2>
          <p className="text-muted-foreground text-lg">
            NutriScan uses established scientific formulas and methodologies to provide you with accurate
            health insights and nutrition recommendations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card rounded-xl p-6 h-full flex flex-col"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
