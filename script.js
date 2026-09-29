const sections = [...document.querySelectorAll(".section")];
const railDots = [...document.querySelectorAll(".rail-dot")];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    railDots.forEach((dot) => dot.classList.toggle("is-active", dot.getAttribute("href") === `#${visible.target.id}`));
  },
  { threshold: [0.25, 0.55, 0.8] }
);
sections.forEach((section) => sectionObserver.observe(section));

const canvas = document.querySelector(".sound-field");
const context = canvas.getContext("2d");
const hero = document.querySelector(".hero");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let pointer = { x: -1000, y: -1000, active: false };
let pulses = [];
let dots = [];
let frame = 0;

function resizeField() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  const rect = hero.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  dots = [];
  const gap = innerWidth < 600 ? 34 : 42;
  for (let y = gap; y < rect.height; y += gap) {
    for (let x = gap; x < rect.width; x += gap) dots.push({ x, y, phase: (x + y) * 0.018 });
  }
}

window.addEventListener("resize", resizeField);
resizeField();

function drawField() {
  if (reducedMotion) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);
  frame += 0.018;

  dots.forEach((dot) => {
    const dx = dot.x - pointer.x;
    const dy = dot.y - pointer.y;
    const distance = Math.hypot(dx, dy);
    const influence = pointer.active ? Math.max(0, 1 - distance / 190) : 0;
    const wave = Math.sin(frame * 2.2 + dot.phase) * 2;
    const push = influence * 27;
    const x = dot.x + (distance ? (dx / distance) * push : 0);
    const y = dot.y + wave * (0.3 + influence * 1.8) + (distance ? (dy / distance) * push : 0);
    context.beginPath();
    context.arc(x, y, 1.1 + influence * 3.2, 0, Math.PI * 2);
    context.fillStyle = influence > 0.2 ? `rgba(52,77,57,${0.24 + influence * 0.5})` : "rgba(93,119,98,.18)";
    context.fill();
  });

  pulses = pulses.filter((pulse) => pulse.alpha > 0.015);
  pulses.forEach((pulse) => {
    pulse.radius += 3.2;
    pulse.alpha *= 0.97;
    context.beginPath();
    context.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
    context.strokeStyle = `rgba(93,119,98,${pulse.alpha})`;
    context.lineWidth = 1;
    context.stroke();
  });
  requestAnimationFrame(drawField);
}
drawField();

const heroPhoto = document.querySelector(".hero-photo");
const supportsPhotoHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

if (heroPhoto && supportsPhotoHover && !reducedMotion) {
  heroPhoto.addEventListener("pointermove", (event) => {
    const bounds = heroPhoto.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    heroPhoto.style.setProperty("--photo-x", `${x * 100}%`);
    heroPhoto.style.setProperty("--photo-y", `${y * 100}%`);
    heroPhoto.style.setProperty("--photo-tilt-x", `${(0.5 - y) * 6}deg`);
    heroPhoto.style.setProperty("--photo-tilt-y", `${(x - 0.5) * 6}deg`);
    heroPhoto.classList.add("is-interacting");
  });

  heroPhoto.addEventListener("pointerleave", () => {
    heroPhoto.classList.remove("is-interacting");
    heroPhoto.style.setProperty("--photo-tilt-x", "0deg");
    heroPhoto.style.setProperty("--photo-tilt-y", "0deg");
  });
}

const phoneStage = document.querySelector(".phone-stage");
if (phoneStage) {
  const phones = [...phoneStage.querySelectorAll(".phone")];
  const previousButton = phoneStage.querySelector(".phone-nav-prev");
  const nextButton = phoneStage.querySelector(".phone-nav-next");
  let activePhone = 0;
  let swipeStartX = null;

  function updatePhoneCarousel() {
    phones.forEach((phone, index) => {
      const offset = (index - activePhone + phones.length) % phones.length;
      phone.classList.toggle("is-active", offset === 0);
      phone.classList.toggle("is-next", offset === 1);
      phone.classList.toggle("is-prev", offset === phones.length - 1);
      phone.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
    });
    phoneStage.setAttribute("aria-label", `BOOKUS 앱 화면 슬라이드 ${activePhone + 1}/${phones.length}`);
  }

  function movePhoneCarousel(direction) {
    activePhone = (activePhone + direction + phones.length) % phones.length;
    updatePhoneCarousel();
  }

  previousButton.addEventListener("click", () => movePhoneCarousel(-1));
  nextButton.addEventListener("click", () => movePhoneCarousel(1));
  phoneStage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") movePhoneCarousel(-1);
    if (event.key === "ArrowRight") movePhoneCarousel(1);
  });
  phoneStage.addEventListener("pointerdown", (event) => { swipeStartX = event.clientX; });
  phoneStage.addEventListener("pointerup", (event) => {
    if (swipeStartX === null) return;
    const distance = event.clientX - swipeStartX;
    if (Math.abs(distance) > 45) movePhoneCarousel(distance < 0 ? 1 : -1);
    swipeStartX = null;
  });
  phoneStage.addEventListener("pointercancel", () => { swipeStartX = null; });

  updatePhoneCarousel();
}

const careerStage = document.querySelector(".career-gallery");
if (careerStage) {
  const screens = [...careerStage.querySelectorAll(".browser-shot")];
  const captions = [...careerStage.querySelectorAll(".career-captions p")];
  const previousButton = careerStage.querySelector(".career-nav-prev");
  const nextButton = careerStage.querySelector(".career-nav-next");
  let activeScreen = 0;
  let swipeStartX = null;

  function updateCareerCarousel() {
    screens.forEach((screen, index) => {
      const offset = (index - activeScreen + screens.length) % screens.length;
      screen.classList.toggle("is-active", offset === 0);
      screen.classList.toggle("is-next", offset === 1);
      screen.classList.toggle("is-prev", offset === screens.length - 1);
      screen.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
    });
    captions.forEach((caption, index) => caption.classList.toggle("is-active", index === activeScreen));
    careerStage.setAttribute("aria-label", `Career Balance 웹 화면 슬라이드 ${activeScreen + 1}/${screens.length}`);
  }

  function moveCareerCarousel(direction) {
    activeScreen = (activeScreen + direction + screens.length) % screens.length;
    updateCareerCarousel();
  }

  previousButton.addEventListener("click", () => moveCareerCarousel(-1));
  nextButton.addEventListener("click", () => moveCareerCarousel(1));
  careerStage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveCareerCarousel(-1);
    if (event.key === "ArrowRight") moveCareerCarousel(1);
  });
  careerStage.addEventListener("pointerdown", (event) => { swipeStartX = event.clientX; });
  careerStage.addEventListener("pointerup", (event) => {
    if (swipeStartX === null) return;
    const distance = event.clientX - swipeStartX;
    if (Math.abs(distance) > 45) moveCareerCarousel(distance < 0 ? 1 : -1);
    swipeStartX = null;
  });
  careerStage.addEventListener("pointercancel", () => { swipeStartX = null; });

  updateCareerCarousel();
}

const lightbox = document.querySelector(".image-lightbox");
if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const projectImages = document.querySelectorAll(".phone img, .browser-shot img, .timeline-media img");

  projectImages.forEach((projectImage) => {
    projectImage.addEventListener("click", () => {
      lightboxImage.src = projectImage.currentSrc || projectImage.src;
      lightboxImage.alt = projectImage.alt;
      lightbox.showModal();
    });
  });

  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === lightbox.querySelector(".lightbox-inner")) lightbox.close();
  });
}

const timelineToggles = [...document.querySelectorAll(".timeline-toggle")];
timelineToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const gallery = document.getElementById(toggle.getAttribute("aria-controls"));
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";

    toggle.setAttribute("aria-expanded", String(willOpen));
    gallery.hidden = !willOpen;
  });
});
