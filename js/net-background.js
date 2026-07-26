import {
  animate,
  createTimeline,
  splitText,
  stagger,
} from "https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm";

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let backgroundEffect = null;

function initializeNetBackground() {
  const backgroundElement = document.querySelector(
    "#hero-background"
  );

  if (
    reducedMotion ||
    !backgroundElement ||
    !window.VANTA?.NET
  ) {
    console.warn("Vanta Net could not be initialized.");
    return;
  }

  backgroundEffect = window.VANTA.NET({
    el: backgroundElement,

    mouseControls: true,
    touchControls: true,
    gyroControls: false,

    minHeight: 200,
    minWidth: 200,

    scale: 1,
    scaleMobile: 1,

    color: 0x4b6659,
    backgroundColor: 0x2f1a57,

    points: 8,
    maxDistance: 26,
    showDots: false,
  });
}

function initializeEntranceAnimation() {
  if (reducedMotion) {
    return;
  }

  const headingElement = document.querySelector("h1");

  if (!headingElement) {
    return;
  }

  const heading = splitText(headingElement, {
    words: {
      wrap: "clip",
      class: "hero-word",
    },
    accessible: true,
  });

  const timeline = createTimeline({
    defaults: {
      ease: "outExpo",
    },
  });

  timeline
    .add(
      "header",
      {
        opacity: { from: 0 },
        y: { from: -18 },
        duration: 800,
      },
      0
    )
    .add(
      ".eyebrow",
      {
        opacity: { from: 0 },
        x: { from: -28 },
        duration: 700,
      },
      180
    )
    .add(
      heading.words,
      {
        opacity: { from: 0 },
        y: { from: "120%" },
        duration: 1100,
        delay: stagger(80),
      },
      280
    )
    .add(
      ".intro",
      {
        opacity: { from: 0 },
        y: { from: 28 },
        duration: 900,
      },
      760
    )
    .add(
      ".launch",
      {
        opacity: { from: 0 },
        y: { from: 28 },
        duration: 900,
      },
      900
    )
    .add(
      "footer",
      {
        opacity: { from: 0 },
        y: { from: 16 },
        duration: 750,
      },
      1050
    );

  animate(".status-dot", {
    scale: 1.7,
    opacity: 0.35,
    duration: 950,
    alternate: true,
    loop: true,
    ease: "inOutSine",
  });
}

async function initializePage() {
  try {
    await document.fonts.ready;

    initializeNetBackground();
    initializeEntranceAnimation();
  } catch (error) {
    console.error(
      "Dultic Dots experiment failed:",
      error
    );
  }
}

window.addEventListener(
  "pagehide",
  () => {
    backgroundEffect?.destroy();
    backgroundEffect = null;
  },
  { once: true }
);

initializePage();