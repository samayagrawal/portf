import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Stub smoother object so initialFX.ts doesn't break
export const smoother = {
  paused: (_v: boolean) => { },
  scrollTop: (_v: number) => { },
  scrollTo: (_target: string | Element | null, _smooth?: boolean, _position?: string) => { },
};

const Navbar = () => {
  useEffect(() => {
    // Native smooth-scroll for nav links
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let el = e.currentTarget as HTMLAnchorElement;
        let section = el.getAttribute("data-href");
        if (section) {
          document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Scene Maker
        </a>
        <a
          href="mailto:samayagrawal.dev@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          samayagrawal.dev@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
