"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { cn } from "../../lib/utils";

const ThreeDImageRing = ({
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  ease = "easeOut",
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
}) => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(
    () => 360 / images.length,
    [images.length]
  );

  const getBgPos = (index, rotation, scale) => {
    const scaledDistance = imageDistance * scale;
    const effectiveRotation = rotation - 180 - index * angle;
    const offset =
      ((effectiveRotation % 360) + 360) % 360 / 360;
    return `${-(offset * (scaledDistance / 1.5))}px 0px`;
  };

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latest) => {
      currentRotationY.current = latest;
      if (!ringRef.current) return;

      Array.from(ringRef.current.children).forEach((el, i) => {
        el.style.backgroundPosition = getBgPos(
          i,
          latest,
          currentScale
        );
      });
    });
    return () => unsubscribe();
  }, [rotationY, angle, imageDistance, currentScale]);

  useEffect(() => {
    const onResize = () => {
      setCurrentScale(
        window.innerWidth <= mobileBreakpoint
          ? mobileScaleFactor
          : 1
      );
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  const handleDragStart = (e) => {
    if (!draggable) return;

    isDragging.current = true;
    const x =
      "touches" in e ? e.touches[0].clientX : e.clientX;

    startX.current = x;
    velocity.current = 0;
    rotationY.stop();

    if (ringRef.current) {
      ringRef.current.style.cursor = "grabbing";
    }

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (e) => {
    if (!draggable || !isDragging.current) return;

    const x =
      "touches" in e ? e.touches[0].clientX : e.clientX;

    const delta = x - startX.current;
    velocity.current = -delta * 0.5;

    rotationY.set(
      currentRotationY.current + velocity.current
    );

    startX.current = x;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    currentRotationY.current = rotationY.get();

    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
    }

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const boost = velocity.current * inertiaVelocityMultiplier;

    animate(initial, initial + boost, {
      type: "inertia",
      velocity: boost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (t) => Math.round(t / angle) * angle,
      onUpdate: (v) => rotationY.set(v),
    });

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden relative select-none",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width,
          height: width * 1.33,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn("absolute w-full h-full", ringClassName)}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
        >
          <AnimatePresence>
            {showImages &&
              images.map((src, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute w-full h-full",
                    imageClassName
                  )}
                  style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backfaceVisibility: "hidden",
                    rotateY: i * -angle,
                    z: -imageDistance * currentScale,
                    transformOrigin: `50% 50% ${
                      imageDistance * currentScale
                    }px`,
                    backgroundPosition: getBgPos(
                      i,
                      currentRotationY.current,
                      currentScale
                    ),
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={imageVariants}
                  transition={{
                    delay: i * staggerDelay,
                    duration: animationDuration,
                    ease,
                  }}
                  whileHover={{ opacity: 1 }}
                  onHoverStart={() => {
                    if (isDragging.current) return;
                    Array.from(ringRef.current.children).forEach(
                      (el, idx) => {
                        if (idx !== i) {
                          el.style.opacity = hoverOpacity;
                        }
                      }
                    );
                  }}
                  onHoverEnd={() => {
                    if (isDragging.current) return;
                    Array.from(ringRef.current.children).forEach(
                      (el) => (el.style.opacity = 1)
                    );
                  }}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeDImageRing;