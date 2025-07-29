import React from 'react';
import { Users, Zap, Shield, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: 'Community First',
      description: 'Connect with like-minded hustlers in your area. Build stronger networks, share resources, and grow together.',
      color: '#A855F7',
    },
    {
      icon: Zap,
      title: 'Energy Amplified',
      description: 'Turn your individual hustle into collective power. Coordinate group efforts that make real impact.',
      color: '#F97316',
    },
    {
      icon: Shield,
      title: 'Decentralized Trust',
      description: 'No central authority controlling your moves. Build trust through transparency and community governance.',
      color: '#06B6D4',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect locally, think globally. Access opportunities and resources from the wider Nigerian diaspora.',
      color: '#10B981',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk text-3xl md:text-5xl font-bold text-white mb-6">
            Built for the <span className="text-gradient">hustle</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            OXYGEN understands the Nigerian spirit. We're here to amplify your energy and connect your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                >
                  <feature.icon
                    className="w-6 h-6 md:w-8 md:h-8"
                    style={{ color: feature.color }}
                  />
                </div>
                <div>
                  <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16 md:mt-24">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10">
            <h3 className="font-space-grotesk text-2xl md:text-4xl font-bold text-white mb-4">
              Ready to connect?
            </h3>
            <p className="font-inter text-lg text-muted-foreground mb-6">
              Join the movement of Nigerians building something bigger together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm text-muted-foreground">
                🔥 1,247 active connections • 🌍 23 cities • ⚡ Growing daily
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
