// components/core/Home/LegacySection.jsx
import React, { useEffect, useRef } from 'react';
import { Instagram, Play, Linkedin } from 'lucide-react';
import { motion } from "motion/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ar404 from '../assets/ar404.png'
import algoccl from '../assets/algo-ccl.png'

gsap.registerPlugin(ScrollTrigger);

const LegacySection = () => {
  const sectionRef = useRef(null);
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const headingRef = useRef(null);

  /* Fixed light-theme styles */
  const themeStyles = {
    background: 'bg-[#F9FAFB]',
    text: 'text-gray-900',
    secondaryText: 'text-gray-800',
    centerCardBg: 'bg-gray-200/80',
    centerCardButton: 'bg-gray-900 text-white hover:bg-gray-800'
  };

  const valuesTags = [
    { text: 'Sustainable', color: 'bg-green-200 text-green-800' },
    { text: 'Ethical', color: 'bg-purple-200 text-purple-800' },
    { text: 'Eco-conscious', color: 'bg-purple-200 text-purple-800' },
    { text: 'Pioneering', color: 'bg-green-200 text-green-800' },
    { text: 'Responsible', color: 'bg-purple-200 text-purple-800' },
    { text: 'Thoughtful', color: 'bg-green-200 text-green-800' },
    { text: 'Progressive', color: 'bg-green-200 text-green-800' },
    { text: 'Forward-looking', color: 'bg-purple-200 text-purple-800' },
    { text: 'Ethical', color: 'bg-purple-200 text-purple-800' },
    { text: 'Eco-conscious', color: 'bg-purple-200 text-purple-800' },
    { text: 'Pioneering', color: 'bg-green-200 text-green-800' },
    { text: 'Responsible', color: 'bg-purple-200 text-purple-800' },
    { text: 'Thoughtful', color: 'bg-green-200 text-green-800' },
    { text: 'Progressive', color: 'bg-green-200 text-green-800' },
  ];

  useEffect(() => {
    const cards = [leftCardRef.current, centerCardRef.current, rightCardRef.current];
    const heading = headingRef.current;

    gsap.set(heading, { y: 50, opacity: 0 });

    cards.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: index === 0 ? -15 : index === 2 ? 15 : 0,
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: '0% 20%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      }
    });

    tl.to(heading, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    cards.forEach((card) => {
      if (card) {
        tl.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }, `-=0.6`);
      }
    });

    const valueTags = centerCardRef.current?.querySelectorAll('[data-value-tag]');
    if (valueTags) {
      gsap.set(valueTags, { scale: 0, opacity: 0 });

      gsap.to(valueTags, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: centerCardRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={`py-20 ${themeStyles.background}  bg-white overflow-hidden`}>
      <div className="max-w-full mx-auto px-8 sm:px-6 lg:px-8">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className={themeStyles.text}>We're not just </span>
            <span className="text-green-400">building</span><br />
            <span className="text-yellow-400">materials</span>
            <span className={themeStyles.text}> – we're building</span><br />
            <span className={themeStyles.text}>a </span>
            <span className="text-green-400">legacy out change</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-4 gap-6 items-center">

          {/* Left */}
          <div ref={leftCardRef} className="col-span-1">
            <div className=" rounded-4xl p-8 h-80 relative overflow-hidden">
              <img
                src={ar404}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                alt=""
              />
              <div className="absolute inset-0 " />

              <div className="relative z-10 h-full flex flex-col justify-center">
                <p className="text-black text-xl font-medium mb-8">
                  Follow us<br />for more:
                </p>

                <div className="flex gap-4">
                  {[Instagram, Play, Linkedin].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-12 h-12 border-2 border-black rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-110 transition"
                    >
                      <Icon className="w-6 h-6 text-black" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center */}
          <div
            ref={centerCardRef}
            className={`${themeStyles.centerCardBg}  col-span-2 h-80 rounded-4xl text-center space-y-8`}
          >
            <div className="space-y-6 mt-6">
              <p className={`text-md font-medium ${themeStyles.secondaryText}`}>
                Join us in sculpting<br />green and sustainable world
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full font-medium ${themeStyles.centerCardButton}`}
              >
                Get Started
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-around gap-2 max-w-[95%] mx-auto">
              {valuesTags.map((tag, i) => (
                <span
                  key={i}
                  data-value-tag
                  className={`px-4 py-2 rounded-full text-sm font-medium ${tag.color}`}
                  style={{ transform: `rotate(${Math.random() * 10 - 5}deg)` }}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={rightCardRef} className="col-span-1">
            <div className="bg-gray-300 rounded-4xl h-80 overflow-hidden relative">
              <img
                src={algoccl}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0">
                <div className="absolute bottom-8 right-8 w-16 h-16 bg-white/80 rounded-full" />
                <div className="absolute bottom-16 right-16 w-8 h-8 bg-white/60 rounded-full" />
                <div className="absolute bottom-20 right-6 w-12 h-12 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LegacySection;
