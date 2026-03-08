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

// ===== Slider logic =====
let track = null;
let dotsContainer = null;
let prevBtn = null;
let nextBtn = null;

let currentIndex = 0;
let autoPlayTimer = null;

function createSlide(cert) {
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
          ${cert.skills
            .map((skill) => `<span>${skill}</span>`)
            .join("")}
        </div>
      </div>
    </div>
    <div class="slide__visual">
      ${
        cert.image
          ? `<img src="${cert.image}" alt="${cert.title} certificate" class="slide__image" />`
          : `<div class="slide__placeholder">Certificate image</div>`
      }
    </div>
  `;

  return slide;
}

function renderSlides() {
  if (!track || !dotsContainer) return;

  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  certificates.forEach((cert, index) => {
    const slide = createSlide(cert);
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

  const dots = Array.from(
    dotsContainer ? dotsContainer.children : []
  );
  dots.forEach((dot, index) => {
    dot.classList.toggle("slider__dot--active", index === currentIndex);
  });
}

function goToSlide(index) {
  if (!certificates.length) return;
  currentIndex = (index + certificates.length) % certificates.length;
  updateSliderPosition();
  restartAutoPlay();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function startAutoPlay() {
  if (autoPlayTimer || !certificates.length) return;
  autoPlayTimer = setInterval(nextSlide, 2000);
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

// Initialize slider when DOM is ready
function initSlider() {
  track = document.getElementById("cert-track");
  dotsContainer = document.getElementById("cert-dots");
  prevBtn = document.getElementById("prev-cert");
  nextBtn = document.getElementById("next-cert");

  if (track && dotsContainer) {
    renderSlides();
    updateSliderPosition();
    startAutoPlay();

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Pause autoplay when hovering over the slider
    const slider = track.closest(".slider");
    if (slider) {
      slider.addEventListener("mouseenter", stopAutoPlay);
      slider.addEventListener("mouseleave", startAutoPlay);
    }
  }
}

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSlider);
} else {
  initSlider();
}

