// import React from "react";
// import { motion } from "framer-motion";
// import  VideoText  from "./lightswind/video-text";
// import  TypingText  from "./lightswind/typing-text";
// import ThreeDHoverGallery from "./lightswind/3d-hover-gallery";

// // Asset Import
// import heroImage from "../assets/heroImage.jpg";

// const Hero = () => {
//   // Sample images for the gallery (placeholders as requested)
//   const galleryImages = [
//     "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
//     "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
//     "https://images.unsplash.com/photo-1524578271613-d550eebad100?q=80&w=800",
//     "https://images.unsplash.com/photo-1474367658819-e17559466f21?q=80&w=800",
//     "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800",
//   ];

//   return (
//     <section id="home" className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]">
//       {/* Background Image with Parallax-like feel */}
//       <div
//         className="absolute inset-0 w-full h-full z-0 opacity-40"
//         style={{
//           backgroundImage: `url(${heroImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       ></div>

//       {/* Main Content Container */}
//       <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-32 pb-20 text-center">
        
//         {/* 1. Tagline: Video Text Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="mb-4"
//         >
//           <VideoText
//             src="https://cdn.pixabay.com/video/2021/04/12/70817-537330761_large.mp4" // Placeholder book/ink video
//             fontSize={12} // Adjusting for viewport width
//             fontWeight={900}
//             className="leading-none"
//           >
//             BORROW. READ. REPEAT.
//           </VideoText>
//         </motion.div>

//         {/* 2. Brief Intro with Typing Animation */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//           className="max-w-4xl mb-12"
//         >
//           <h2 className="text-white text-2xl md:text-4xl font-light leading-relaxed">
//             Bringing{" "}
//             <span className="inline-block min-w-[120px] text-blue-400 font-bold">
//               <TypingText duration={1.5} color="text-blue-400">
//                 readers
//               </TypingText>
//             </span>{" "}
//             together & <br />
//             connecting{" "}
//             <span className="inline-block min-w-[120px] text-pink-400 font-bold">
//               <TypingText delay={1} duration={1.5} color="text-pink-400">
//                 hearts
//               </TypingText>
//             </span>{" "}
//             through every page.
//           </h2>
//         </motion.div>

        

//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TypingText from "./lightswind/typing-text";

// Asset Import (video instead of image)
import heroVideo from "../assets/videos/heroVideo.mp4";

const Hero = () => {
  const line1Words = ["readers", "minds", "voices"];
  const line2Words = ["hearts", "stories", "souls"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % line1Words.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* 🔥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay (optional for contrast) */}
      <div className="absolute inset-0 z-0" />

      {/* Centered Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-white leading-tight max-w-4xl"
        >
          {/* Line 1 – Bigger */}
          <div className="text-6xl text-white/70 md:text-8xl lg:text-8xl font-semibold">
            Bringing{" "}
            <span className="inline-block min-w-[150px] text-6xl md:text-8xl lg:text-9xl font-bold font-bold text-yellow-400">
              <TypingText
                key={line1Words[index]}
                duration={1.5}
                color="text-yellow-400"
                fontSize="text-6xl md:text-8xl lg:text-9xl"
                fontWeight="font-bold"
                
              >
                {line1Words[index]}
              </TypingText>
            </span>{" "}
            together
          </div>

          {/* Line 2 – Smaller */}
          <div className="mt-4 text-xl md:text-3xl font-light">
            Connecting{" "}
            <span className="inline-block min-w-[150px] font-bold text-pink-400">
              <TypingText
                key={line2Words[index]}
                delay={0.6}
                duration={1.5}
                color="text-yellow-400"
              >
                {line2Words[index]}
              </TypingText>
            </span>{" "}
            through every page.
          </div>
        </motion.h2>
      </div>
    </section>
  );
};

export default Hero;
