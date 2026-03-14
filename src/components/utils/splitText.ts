import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Custom SplitText replacement (free, no GSAP Club needed)
// Splits an element's text into individual <span> elements per word or char.
// ---------------------------------------------------------------------------
interface SplitResult {
  words: HTMLElement[];
  chars: HTMLElement[];
  revert: () => void;
}

function customSplit(
  el: HTMLElement,
  type: "words" | "chars" | "both" = "both"
): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent || "";
  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];

  // Split into word spans, then char spans within each word
  const wordTokens = text.split(/(\s+)/);
  el.innerHTML = "";
  wordTokens.forEach((token) => {
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token));
      return;
    }
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.overflow = "hidden";
    if (type === "words" || type === "both") words.push(wordSpan);
    [...token].forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.style.display = "inline-block";
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
      if (type === "chars" || type === "both") chars.push(charSpan);
    });
    el.appendChild(wordSpan);
  });

  return {
    words,
    chars,
    revert: () => {
      el.innerHTML = original;
    },
  };
}

function splitSelector(
  selector: string | string[],
  type: "words" | "chars" | "both" = "both"
): SplitResult {
  const selectors = Array.isArray(selector) ? selector : [selector];
  const allWords: HTMLElement[] = [];
  const allChars: HTMLElement[] = [];
  const revertFns: (() => void)[] = [];

  selectors.forEach((sel) => {
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      const result = customSplit(el, type);
      allWords.push(...result.words);
      allChars.push(...result.chars);
      revertFns.push(result.revert);
    });
  });

  return { words: allWords, chars: allChars, revert: () => revertFns.forEach((fn) => fn()) };
}

// ---------------------------------------------------------------------------

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitResult;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = customSplit(para, "words");

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = customSplit(title, "chars");
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}

export { splitSelector, customSplit };
export type { SplitResult };
