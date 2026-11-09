/*
  HABTEWOLDE BIZUAYHU — PORTFOLIO WEBSITE
  Edit SITE_CONFIG and PROJECTS below to add your real contact details and work.
*/

// 1) Add your real contact/social details here before publishing.
const SITE_CONFIG = {
  telegram: "https://t.me/p_r_u_d_e_n_t_i_a_l"
};

// 2) Showcase each project video from the assets folder.
// Supported video links: YouTube, Vimeo, or a direct .mp4 file in this project.
const PROJECTS = [
  { title: "Amy Hair Salon", type: "Brand edit · Beauty story", description: "", videoUrl: "assets/Amy hair salon re edited.mp4" },
  { title: "Aqua UNO", type: "Amharic social reel", description: "", videoUrl: "assets/Aqua UNO Amharic.mp4" },
  { title: "Dr Mustefa", type: "Re-edited feature clip", description: "", videoUrl: "assets/Dr mustefa re edited.mp4" },
  { title: "Dunamis 1", type: "Brand showcase", description: "", videoUrl: "assets/dunamis 1.mp4" },
  { title: "Dunamis Oro", type: "Promotional edit", description: "", videoUrl: "assets/Dunamis oro.mp4" },
  { title: "Gebeta 3", type: "4K campaign video", description: "", videoUrl: "assets/Gebeta 3 4k.mp4" },
  { title: "Gebeta Re-edit", type: "Creative refinement", description: "", videoUrl: "assets/Gebeta reee edited.mp4" },
  { title: "Lebustar", type: "Short-form social cut", description: "", videoUrl: "assets/Lebustar 1 Re-edited.mp4" },
  { title: "RAW Bryan", type: "Raw footage edit", description: "", videoUrl: "assets/RAW BRYAN.mp4" },
  { title: "Sebriya", type: "Social media highlight", description: "", videoUrl: "assets/Sebriya 1.mp4" }
];

const byId = (id) => document.getElementById(id);

const contactHeadline = document.querySelector(".contact-headline");
if (contactHeadline) {
  const lines = ["LET'S CREATE", "SOMETHING", "GOOD."];
  const lineNodes = lines.map((line) => {
    const lineWrap = document.createElement("span");
    lineWrap.className = "word-line";

    Array.from(line).forEach((char) => {
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = char === " " ? "\u00A0" : char;
      letter.style.setProperty("--tx", `${(Math.random() - 0.5) * 220}px`);
      letter.style.setProperty("--ty", `${(Math.random() - 0.5) * 190 - 28}px`);
      letter.style.setProperty("--rot", `${(Math.random() - 0.5) * 72}deg`);
      letter.style.setProperty("--skew", `${(Math.random() - 0.5) * 18}deg`);
      lineWrap.appendChild(letter);
    });

    return lineWrap;
  });

  contactHeadline.textContent = "";
  lineNodes.forEach((line) => contactHeadline.appendChild(line));

  let resetTimer = null;
  contactHeadline.addEventListener("click", () => {
    contactHeadline.classList.remove("is-broken");
    void contactHeadline.offsetWidth;
    contactHeadline.classList.add("is-broken");

    if (resetTimer) window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      contactHeadline.classList.remove("is-broken");
    }, 900);
  });
}

const themeToggle = byId("themeToggle");
if (themeToggle) {
  const applyTheme = (isDark) => {
    document.body.classList.toggle("theme-dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to bright mode" : "Switch to dark mode");

    const label = themeToggle.querySelector(".theme-toggle__label");
    if (label) label.textContent = isDark ? "☀" : "☾";
  };

  const isDark = document.body.classList.contains("theme-dark");
  applyTheme(isDark);

  themeToggle.addEventListener("click", () => {
    const nextState = !document.body.classList.contains("theme-dark");
    applyTheme(nextState);
  });
}

// Footer year.
const yearElement = byId("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Contact links: set the Telegram profile link.
const telegramLink = byId("telegramLink");
if (telegramLink) {
  const url = SITE_CONFIG.telegram.trim();
  if (url) {
    telegramLink.href = url;
    telegramLink.target = "_blank";
    telegramLink.rel = "noopener noreferrer";
  }
}

// Navigation: keep standard anchor scrolling without page transition effects.
// Mobile navigation.
const menuToggle = byId("menuToggle");
const navLinks = byId("navLinks");

function triggerMorphTransition(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  if (window.history && window.history.pushState) {
    const existingHash = window.location.hash;
    if (existingHash !== targetSelector) {
      window.history.pushState(null, "", targetSelector);
    }
  }
}

function setMenuOpen(isOpen) {
  if (!menuToggle || !navLinks) return;
  navLinks.classList.toggle("show", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        event.preventDefault();
        setMenuOpen(false);
        triggerMorphTransition(href);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") return;
    event.preventDefault();
    triggerMorphTransition(href);
  });
});

// Change-photo control. The selected photo is previewed locally in the current browser;
// to make it permanent for everyone, replace assets/habtewolde-bizuayhu.jpg in the folder.
const photoInput = byId("photoInput");
const uploadPhotoButton = byId("uploadPhoto");
const portraitBox = byId("portraitBox");
let currentPhotoObjectUrl = null;

if (photoInput && uploadPhotoButton && portraitBox) {
  uploadPhotoButton.addEventListener("click", () => photoInput.click());

  photoInput.addEventListener("change", () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please choose an image file.");
      photoInput.value = "";
      return;
    }

    if (currentPhotoObjectUrl) URL.revokeObjectURL(currentPhotoObjectUrl);
    currentPhotoObjectUrl = URL.createObjectURL(file);

    let image = portraitBox.querySelector("img");
    if (!image) {
      image = document.createElement("img");
      image.alt = "Portrait of Habtewolde Bizuayhu";
      portraitBox.appendChild(image);
    }
    image.src = currentPhotoObjectUrl;
  });
}

// Convert common YouTube and Vimeo share links to embeddable player URLs.
function getEmbeddableVideoUrl(rawUrl) {
  const url = new URL(rawUrl, window.location.href);
  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : rawUrl;
  }

  if (host.endsWith("youtube.com")) {
    const videoId = url.searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;

    const shortsMatch = url.pathname.match(/^\/shorts\/([^/]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${encodeURIComponent(shortsMatch[1])}`;

    const embedMatch = url.pathname.match(/^\/embed\/([^/]+)/);
    if (embedMatch) return `https://www.youtube.com/embed/${encodeURIComponent(embedMatch[1])}`;
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean).pop();
    if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
  }

  return rawUrl;
}

// Project preview modal.
const modal = byId("projectModal");
const modalMedia = byId("modalMedia");
const modalClose = byId("modalClose");
let lastFocusedElement = null;

function openProject(projectIndex, triggerElement) {
  if (!modal || !modalMedia) return;
  const project = PROJECTS[projectIndex];
  if (!project) return;

  lastFocusedElement = triggerElement || document.activeElement;
  byId("modalEyebrow").textContent = `Selected work / 0${projectIndex + 1} — ${project.type}`;
  byId("modalTitle").textContent = project.title;
  byId("modalDescription").textContent = project.description;
  modalMedia.replaceChildren();

  const videoUrl = project.videoUrl.trim();
  if (videoUrl) {
    if (/\.mp4(?:$|\?)/i.test(videoUrl)) {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      modalMedia.appendChild(video);
    } else {
      try {
        const iframe = document.createElement("iframe");
        iframe.src = getEmbeddableVideoUrl(videoUrl);
        iframe.title = `${project.title} video preview`;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        modalMedia.appendChild(iframe);
      } catch (error) {
        showProjectPlaceholder("Please add a valid YouTube, Vimeo or MP4 video URL in js/script.js.");
      }
    }
  } else {
    showProjectPlaceholder("No preview has been added yet. Add a video URL in js/script.js.");
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  if (modalClose) modalClose.focus();
}

function showProjectPlaceholder(message) {
  const wrapper = document.createElement("div");
  const heading = document.createElement("strong");
  const description = document.createElement("span");
  heading.textContent = "PROJECT PREVIEW";
  description.textContent = message;
  wrapper.append(heading, description);
  modalMedia.appendChild(wrapper);
}

function openImagePreview(imageElement) {
  if (!modal || !modalMedia || !imageElement) return;

  lastFocusedElement = imageElement;
  byId("modalEyebrow").textContent = "Image preview";
  byId("modalTitle").textContent = imageElement.alt || "Preview";
  byId("modalDescription").textContent = "Click outside this panel or press Esc to close the preview.";
  modalMedia.replaceChildren();

  const previewImage = document.createElement("img");
  previewImage.src = imageElement.src;
  previewImage.alt = imageElement.alt || "Preview image";
  previewImage.loading = "eager";
  modalMedia.appendChild(previewImage);

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  if (modalClose) modalClose.focus();
}

function closeProjectModal() {
  if (!modal || !modalMedia) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
  modalMedia.replaceChildren();
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function renderProjectCards() {
  const workGrid = byId("workGrid");
  if (!workGrid) return;

  workGrid.innerHTML = "";

  PROJECTS.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project reveal";
    card.dataset.project = String(index);
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Open ${project.title} project preview`);

    const visualClasses = [
      "visual-brand",
      "visual-reel",
      "visual-motion",
      "visual-design",
      "visual-brand",
      "visual-reel",
      "visual-motion",
      "visual-design",
      "visual-brand",
      "visual-reel"
    ];

    const visualClass = visualClasses[index % visualClasses.length];
    const shortLabel = project.title.toUpperCase().replace(/[^A-Z0-9 ]/g, "").trim();

    card.innerHTML = `
      <div class="project-visual ${visualClass}">
        <div class="visual-type">${shortLabel.split(" ").slice(0, 2).join("<br>")}<em>${project.type}</em></div>
        <span class="visual-index">${project.videoUrl.split("/").pop()}</span>
      </div>
      <div class="project-info">
        <div>
          <h3>${project.title}</h3>
          <p>${project.type}</p>
        </div>
        <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
      </div>
    `;

    card.addEventListener("click", () => openProject(index, card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(index, card);
      }
    });

    workGrid.appendChild(card);
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }
}

renderProjectCards();

if (modalClose) modalClose.addEventListener("click", closeProjectModal);
if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeProjectModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("open")) {
    closeProjectModal();
  }
});

document.querySelectorAll(".gallery-image").forEach((image) => {
  image.addEventListener("click", () => openImagePreview(image));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openImagePreview(image);
    }
  });
  image.setAttribute("tabindex", "0");
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Preview ${image.alt || "image"}`);
});

// Custom cursor tracking.
const customCursorRing = document.querySelector(".custom-cursor.ring");
const customCursorDot = document.querySelector(".custom-cursor.dot");
if (window.matchMedia("(pointer: fine)").matches && customCursorRing && customCursorDot) {
  document.body.classList.add("cursor-ready");

  const cursorPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const moveCursor = (x, y) => {
    cursorPosition.x = x;
    cursorPosition.y = y;
    customCursorRing.style.left = `${x}px`;
    customCursorRing.style.top = `${y}px`;
    customCursorDot.style.left = `${x}px`;
    customCursorDot.style.top = `${y}px`;
  };

  window.addEventListener("pointermove", (event) => {
    moveCursor(event.clientX, event.clientY);
  });

  document.querySelectorAll("a, button, .project, .contact-button, .nav-links a, .skill").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  moveCursor(cursorPosition.x, cursorPosition.y);
}

// Reveal content as it enters the viewport, with a fallback for older browsers.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
