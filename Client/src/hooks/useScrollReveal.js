import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal children elements on scroll using GSAP ScrollTrigger.
 *
 * @param {string}  selector   – CSS selector for the child elements to animate (default: "[data-reveal]")
 * @param {object}  options    – GSAP animation options overrides
 * @returns {React.RefObject}  – Ref to attach to the container element
 */
export default function useScrollReveal(selector = "[data-reveal]", options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const defaults = {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
    };

    const merged = { ...defaults, ...options };

    gsap.set(elements, { y: merged.y, opacity: 0 });

    const animation = gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: merged.duration,
      ease: merged.ease,
      stagger: merged.stagger,
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [selector, options]);

  return containerRef;
}
