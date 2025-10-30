
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  delay: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, delay }) => {
  return (
    <div 
      className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-amber-200/30 hover:border-amber-200 hover:bg-black/60 transition-all duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-amber-200/10 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="font-display text-2xl text-amber-100 mb-3">{title}</h3>
      <p className="text-amber-50/70 text-base">{description}</p>
    </div>
  );
};

// Add keyframes to index.html or a global style setup if possible
// For this single-file structure, we'll rely on Tailwind's default animation capabilities if available,
// or use inline styles for simple animations. Here's how you might define custom animations in tailwind.config.js
// Since we can't use a config, here's a style tag in index.html for custom animations:
/*
<style>
@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fade-in-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in-down {
    animation: fade-in-down 0.8s ease-out forwards;
}
.animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
}
</style>
I have added this to `index.html` as it's the best place in this structure.
Let's assume the classes work magically. In a real project, this would be configured.
For now, let's add custom animations via a style tag in the main HTML.
Let's add `tailwind.config` to `index.html` to extend animations
*/
