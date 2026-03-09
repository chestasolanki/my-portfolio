// ===== Lenis Smooth Scrolling =====
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Smooth scroll for anchor links using Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target);
      }
    });
  });
}

// ===== Dynamic year in footer =====
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

// ===== Certificates data =====
// Tip: put your certificate images in a folder like "images/certificates"
// and update the `image` paths below to match the actual file names.
const certificates = [
  {
    title: "Palo Alto Networks Authorized Cybersecurity Academy Instructor",
    issuer: "Palo Alto Networks Cybersecurity Academy",
    date: "March 2026",
    level: "Advanced",
    description:
      "Successfully completed all requirements to become an authorized instructor for Palo Alto Networks Cybersecurity Academy. Completed the Cybersecurity Academy Orientation program.",
    skills: [
      "Instructor Certification",
      "Cybersecurity Education",
      "Academy Orientation",
      "Teaching & Training",
    ],
    image: "certificate4.png",
  },
  {
    title: "Cybersecurity Foundation",
    issuer: "Palo Alto Networks Cybersecurity Academy",
    date: "March 2026",
    level: "Foundational",
    description:
      "Comprehensive foundation course covering core cybersecurity principles, threat landscape, and security fundamentals essential for modern cybersecurity practice.",
    skills: [
      "Security Fundamentals",
      "Threat Landscape",
      "Risk Management",
      "Security Basics",
    ],
    image: "certificate2.png",
  },
  {
    title: "Network Security Fundamentals",
    issuer: "Palo Alto Networks Cybersecurity Academy",
    date: "March 2026",
    level: "Intermediate",
    description:
      "In-depth training on network security concepts, protocols, firewall technologies, and network defense strategies to protect organizational infrastructure.",
    skills: [
      "Network Security",
      "Firewall Technologies",
      "Network Defense",
      "Security Protocols",
    ],
    image: "certificate3.png",
  },
  {
    title: "Cloud Security Fundamentals",
    issuer: "Palo Alto Networks Cybersecurity Academy",
    date: "March 2026",
    level: "Intermediate",
    description:
      "Specialized certification focusing on cloud security architecture, cloud threat detection, and securing cloud-based infrastructure and applications.",
    skills: [
      "Cloud Security",
      "Cloud Architecture",
      "Threat Detection",
      "Cloud Infrastructure",
    ],
    image: "certificate1.png",
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    date: "August 2025",
    level: "Foundational",
    description:
      "Completed through G.L. Bajaj Institute of Technology and Management. Covers essential cybersecurity concepts, network security, and defense mechanisms.",
    skills: [
      "Network Security",
      "Security Essentials",
      "Defense Mechanisms",
      "Cisco Technologies",
    ],
    image: "certificate6.png",
  },
  {
    title: "Exploring Networking with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "August 2025",
    level: "Foundational",
    description:
      "Completed through G.L. Bajaj Institute of Technology and Management. Hands-on experience with network design, configuration, and troubleshooting using Cisco Packet Tracer.",
    skills: [
      "Network Design",
      "Cisco Packet Tracer",
      "Network Configuration",
      "Troubleshooting",
    ],
    image: "certificate5.png",
  },
];

// ===== Projects data =====
const projects = [
  {
    title: "PrepAI",
    link: "https://github.com/chestasolanki/PrepAI",
    description: "Designed and developed PrepAI, a scalable full-stack AI interview preparation platform supporting company-wise preparation tracking, intelligent question management, and AI-powered mock interviews. Implemented REST APIs, secure authentication, and analytics dashboards to provide personalized interview readiness insights.",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Django", "SQLite", "LLM APIs"],
  },
  {
    title: "Sound Minds",
    link: "https://github.com/chestasolanki/Sound-Minds",
    description: "Developed a full-stack mental health care website that offers stress-relieving games, guided meditation, sleep tracking, and mood tracking features to promote emotional well-being and mental wellness.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
  },
  {
    title: "Blog",
    link: "https://github.com/chestasolanki/blog",
    description: "Developed a full-stack blog application using Django that enables creating, managing, and displaying blog posts with image uploads, database integration, and dynamic rendering through Django templates.",
    skills: ["Django (MVC)", "Python", "Django ORM", "SQLite", "HTML/CSS"],
  }
];

// ===== Slider logic =====
// Generic Slider Logic Generator
function createSlider(config) {
  const { data, trackId, dotsId, prevId, nextId, createSlideFn } = config;

  let track = document.getElementById(trackId);
  let dotsContainer = document.getElementById(dotsId);
  let prevBtn = document.getElementById(prevId);
  let nextBtn = document.getElementById(nextId);

  let currentIndex = 0;
  let autoPlayTimer = null;

  function renderSlides() {
    if (!track || !dotsContainer) return;

    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    data.forEach((item, index) => {
      const slide = createSlideFn(item);
      track.appendChild(slide);

      const dot = document.createElement("button");
      dot.className = "slider__dot" + (index === 0 ? " slider__dot--active" : "");
      dot.type = "button";
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSliderPosition() {
    if (!track) return;
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    const dots = Array.from(dotsContainer ? dotsContainer.children : []);
    dots.forEach((dot, index) => {
      dot.classList.toggle("slider__dot--active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (!data.length) return;
    currentIndex = (index + data.length) % data.length;
    updateSliderPosition();
    restartAutoPlay();
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  function startAutoPlay() {
    if (autoPlayTimer || !data.length) return;
    autoPlayTimer = setInterval(nextSlide, 3500); // Slower for reading projects
  }

  function stopAutoPlay() {
    if (!autoPlayTimer) return;
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  function init() {
    if (track && dotsContainer) {
      renderSlides();
      updateSliderPosition();
      startAutoPlay();

      if (nextBtn) nextBtn.addEventListener("click", nextSlide);
      if (prevBtn) prevBtn.addEventListener("click", prevSlide);

      const slider = track.closest(".slider");
      if (slider) {
        slider.addEventListener("mouseenter", stopAutoPlay);
        slider.addEventListener("mouseleave", startAutoPlay);
      }
    }
  }

  return { init };
}

// Slide creators
function createCertSlide(cert) {
  const slide = document.createElement("article");
  slide.className = "slide";
  slide.innerHTML = `
    <div>
      <div class="slide__header">
        <h3 class="slide__title">${cert.title}</h3>
        <div class="slide__issuer">${cert.issuer}</div>
      </div>
      <div class="slide__meta-row">
        <span class="slide__pill">Issued: ${cert.date}</span>
        <span class="slide__pill">Level: ${cert.level}</span>
      </div>
      <div class="slide__body">
        <p>${cert.description}</p>
        <div class="slide__skills">
          ${cert.skills.map((skill) => `<span>${skill}</span>`).join("")}
        </div>
      </div>
    </div>
    <div class="slide__visual">
      ${cert.image ? `<img src="${cert.image}" alt="${cert.title} certificate" class="slide__image" />` : `<div class="slide__placeholder">Certificate image</div>`}
    </div>
  `;
  return slide;
}

function createProjectSlide(project) {
  const slide = document.createElement("article");
  slide.className = "slide";
  slide.style.gridTemplateColumns = "1fr"; // Full width for projects

  // Format link for display (remove https://)
  const displayLink = project.link.replace(/^https?:\/\//, '');

  slide.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
      <div class="slide__header" style="margin-bottom: 16px;">
        <h3 class="section__title" style="font-size: 1.8rem; color: var(--accent);">${project.title}</h3>
      </div>
      <div class="slide__body" style="margin-bottom: 24px;">
        <p style="font-size: 1.05rem; line-height: 1.8;">${project.description}</p>
      </div>
      <div>
        <h4 style="color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Tech Stack</h4>
        <div class="slide__skills">
          ${project.skills.map((skill) => `<span>${skill}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
  return slide;
}

// Initialize all sliders and other dynamic effects
function initAllSliders() {
  const certSlider = createSlider({
    data: certificates,
    trackId: "cert-track",
    dotsId: "cert-dots",
    prevId: "prev-cert",
    nextId: "next-cert",
    createSlideFn: createCertSlide
  });

  const projectSlider = createSlider({
    data: projects,
    trackId: "project-track",
    dotsId: "project-dots",
    prevId: "prev-project",
    nextId: "next-project",
    createSlideFn: createProjectSlide
  });

  certSlider.init();
  projectSlider.init();
}

// ===== Scroll Reveal & Typing Effect =====
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // If this is the about section, trigger typing
        if (entry.target.id === 'about' && !entry.target.classList.contains('typed')) {
          entry.target.classList.add('typed');
          startTypingEffect();
        }
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
}

function startTypingEffect() {
  const sourceEl = document.getElementById('about-text-source');
  const targetEl = document.getElementById('typed-text');

  if (!sourceEl || !targetEl) return;

  const textHTML = sourceEl.innerHTML;
  targetEl.innerHTML = '';
  let i = 0;

  // Convert HTML to a string keeping tags intact
  // A simple typer that types text but inserts tags immediately
  let isTag = false;
  let text = textHTML.trim();

  function type() {
    if (i < text.length) {
      if (text.charAt(i) === '<') {
        isTag = true;
      }

      targetEl.innerHTML += text.charAt(i);

      if (text.charAt(i) === '>') {
        isTag = false;
      }

      i++;

      if (isTag) {
        type(); // Type tags instantly
      } else {
        setTimeout(type, 15); // Speed of typing
      }
    }
  }

  type();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initAllSliders();
    initScrollReveals();
    initScrollProgress();
  });
} else {
  initAllSliders();
  initScrollReveals();
  initScrollProgress();
}

function initScrollProgress() {
  window.addEventListener("scroll", () => {
    const scrollProgress = document.getElementById("scroll-progress");
    if (!scrollProgress) return;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
  });
}
