// -----------------------------
// Footer Year
// -----------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// -----------------------------
// Theme Toggle with Emoji
// -----------------------------
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.textContent = "🌓"; // Sun/Moon Emoji toggle
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});

// Load saved theme on page load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "🌓";
});

// -----------------------------
// Navigation
// -----------------------------
const navButtons = document.querySelectorAll(".nav-btn");
const panels = document.querySelectorAll(".panel");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    navButtons.forEach(b => b.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// -----------------------------
// Personalized Greeting
// -----------------------------
const saveBtn = document.getElementById("save-name");
const nameInput = document.getElementById("name-input");

saveBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem("username", name);
    document.querySelector(".hero-inner p").textContent = `Welcome back, ${name}! Explore my projects and experiments.`;
    displayConditionalMessage(name);
  }
});

window.addEventListener("load", () => {
  const storedName = localStorage.getItem("username");
  if (storedName) {
    document.querySelector(".hero-inner p").textContent = `Welcome back, ${storedName}! Explore my projects and experiments.`;
    displayConditionalMessage(storedName);
  }
});

// -----------------------------
// Projects Data
// -----------------------------
const projects = [
  { title:"Portfolio Website", img:"https://picsum.photos/id/1015/400/300", desc:"Responsive portfolio website with animations and dark mode.", category:"web", date:"2023-06-10" },
  { title:"UI Design System", img:"https://picsum.photos/id/1027/400/300", desc:"Reusable UI components with accessible color themes.", category:"design", date:"2023-03-15" },
  { title:"E-Commerce App", img:"https://picsum.photos/id/1038/400/300", desc:"Full-stack e-commerce platform with React and Firebase.", category:"web", date:"2023-05-22" },
  { title:"Data Dashboard", img:"https://picsum.photos/id/1043/400/300", desc:"Real-time dashboard using Chart.js and API integration.", category:"data", date:"2023-04-05" }
];

const projectsList = document.getElementById("projects-list");
const emptyState = document.getElementById("projects-empty");
const searchInput = document.getElementById("project-search");
const filterSelect = document.getElementById("project-filter");
const sortSelect = document.getElementById("project-sort");

// Render Projects
function renderProjects(list){
  projectsList.innerHTML = "";
  if(list.length === 0){
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <button class="details-btn">Details</button>
      <div class="project-details">${p.desc}</div>
    `;
    const btn = card.querySelector(".details-btn");
    const details = card.querySelector(".project-details");
    btn.addEventListener("click", () => {
      details.classList.toggle("open");
      btn.textContent = details.classList.contains("open") ? "Hide Details" : "Details";
    });
    projectsList.appendChild(card);
  });
}

// Initial render
renderProjects(projects);

// Filtering & Sorting
function updateProjects(){
  let filtered = [...projects];
  const category = filterSelect.value;
  if(category !== "all") filtered = filtered.filter(p => p.category === category);
  const query = searchInput.value.toLowerCase();
  if(query) filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
  const sort = sortSelect.value;
  if(sort === "title-asc") filtered.sort((a,b) => a.title.localeCompare(b.title));
  if(sort === "title-desc") filtered.sort((a,b) => b.title.localeCompare(a.title));
  renderProjects(filtered);
}

searchInput.addEventListener("input", updateProjects);
filterSelect.addEventListener("change", updateProjects);
sortSelect.addEventListener("change", updateProjects);

// -----------------------------
// Assignment 3 Enhancements
// -----------------------------

// VISITOR COUNTER
let visits = localStorage.getItem("visits");
if(!visits) visits = 1;
else visits = parseInt(visits) + 1;
localStorage.setItem("visits", visits);
document.getElementById("visitCount").textContent = visits;

// TIMER
let seconds = 0;
setInterval(() => {
  seconds++;
  document.getElementById("timer").textContent = seconds;
}, 1000);

// RANDOM JOKE API
const jokeBtn = document.getElementById("jokeBtn");
const jokeEl = document.getElementById("joke");

jokeBtn.addEventListener("click", async () => {
  jokeEl.textContent = "Loading joke...";
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if(!response.ok) throw new Error("Network response not ok");
    const data = await response.json();
    jokeEl.textContent = `${data.setup} 🤣 ${data.punchline}`;
  } catch (error) {
    jokeEl.textContent = "Failed to load joke. Try again later.";
    console.error(error);
  }
});

// CONDITIONAL MESSAGE
function displayConditionalMessage(name){
  const msgEl = document.getElementById("conditionalMessage");
  if(name){
    msgEl.innerHTML = `<strong>Welcome back, ${name}!</strong> Hope you enjoy your visit. 👋`;
  } else {
    msgEl.textContent = "Welcome to my portfolio! Enter your name above for a personalized greeting.";
  }
}
displayConditionalMessage(localStorage.getItem("username") || "");
