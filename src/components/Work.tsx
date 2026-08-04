import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  const projects = [
    {
      num: "01",
      name: "Riva Farms",
      category: "Real Estate Ecosystem",
      tools: "React, GSAP, WebGL, Leaflet",
      image: "/images/riva_farms.png",
      link: "https://riva-farms.vercel.app/",
    },
    {
      num: "02",
      name: "Riva Residency",
      category: "Luxury Residential Complex",
      tools: "React, GSAP, CSS Animations, WebGL",
      image: "/images/riva_residency.png",
      link: "https://rr-residency.vercel.app/",
    },
    {
      num: "03",
      name: "Riva Prime",
      category: "Premium Commercial Spaces",
      tools: "React, GSAP, Tailwind, Three.js",
      image: "/images/riva_prime.png",
      link: "https://rr-prime.vercel.app/",
    },
    {
      num: "04",
      name: "3D Walk-Through",
      category: "Architectural Visualization",
      tools: "Three.js, React Three Fiber, WebGL",
      image: "/images/walkthrough.png",
      link: "https://walk-through.vercel.app/",
    },
    {
      num: "05",
      name: "The Ad Effect",
      category: "Creative Advertising Agency",
      tools: "React, GSAP, Framer Motion, Spline",
      image: "/images/theadefffect.png",
      link: "https://www.theadefffect.com/",
    },
    {
      num: "06",
      name: "Capsule",
      category: "Future Living Concept",
      tools: "Three.js, GSAP, React",
      image: "/images/capsule.jpg",
      link: "https://capsule-delta-nine.vercel.app/",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
