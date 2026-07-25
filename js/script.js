import {
  animate,
  createTimeline,
  splitText,
  stagger,
} from "https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm";

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let backgroundEffect = null;

function initializeBackground() {
  if (reducedMotionQuery.matches) {
    return;
  }

  const backgroundElement =
    document.querySelector("#hero-background");

  if (!backgroundElement || !window.VANTA?.FOG) {
    console.warn("Vanta Fog could not be initialized.");
    return;
  }

  backgroundEffect = window.VANTA.FOG({
    el: backgroundElement,

    mouseControls: true,
    touchControls: true,
    gyroControls: false,

    minHeight: 200,
    minWidth: 200,

    highlightColor: 0x10b981,
    midtoneColor: 0x064e3b,
    lowlightColor: 0x0f172a,
    baseColor: 0x020617,

    blurFactor: 0.72,
    speed: 0.55,
    zoom: 0.9,
  });
}

function initializeEntranceAnimation() {
  if (reducedMotionQuery.matches) {
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
        opacity: {
          from: 0,
        },
        y: {
          from: -18,
        },
        duration: 800,
      },
      0
    )
    .add(
      ".eyebrow",
      {
        opacity: {
          from: 0,
        },
        x: {
          from: -28,
        },
        duration: 700,
      },
      180
    )
    .add(
      heading.words,
      {
        opacity: {
          from: 0,
        },
        y: {
          from: "120%",
        },
        duration: 1100,
        delay: stagger(80),
      },
      280
    )
    .add(
      ".intro",
      {
        opacity: {
          from: 0,
        },
        y: {
          from: 28,
        },
        duration: 900,
      },
      760
    )
    .add(
      ".launch",
      {
        opacity: {
          from: 0,
        },
        y: {
          from: 28,
        },
        duration: 900,
      },
      900
    )
    .add(
      "footer",
      {
        opacity: {
          from: 0,
        },
        y: {
          from: 16,
        },
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

    initializeBackground();
    initializeEntranceAnimation();
  } catch (error) {
    console.error("Dultic hero initialization failed:", error);
  }
}

window.addEventListener(
  "pagehide",
  () => {
    if (backgroundEffect) {
      backgroundEffect.destroy();
      backgroundEffect = null;
    }
  },
  { once: true }
);

initializePage();