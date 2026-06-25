// Administration Dashboard Code for Dr. Ramesh Gummadi's Portfolio

// Elements references
const adminModal = document.getElementById("admin-modal");
const adminAuthView = document.getElementById("admin-auth-view");
const adminDashboardView = document.getElementById("admin-dashboard-view");
const adminPasswordInput = document.getElementById("admin-password");
const adminAuthSubmit = document.getElementById("admin-auth-submit");
const authErrorMsg = document.getElementById("auth-error");

const adminToggleBtn = document.getElementById("admin-toggle");
const adminDrawerBtn = document.getElementById("admin-drawer-btn");
const adminModalCloseBtn = document.getElementById("admin-modal-close");
const adminCloseActionBtn = document.getElementById("admin-close-action");

const adminTabLinks = document.querySelectorAll(".admin-tab-link");
const adminPanelContents = document.querySelectorAll(".admin-panel-content");

// Export & Reset buttons
const adminResetBtn = document.getElementById("admin-reset-btn");
const adminExportBtn = document.getElementById("admin-export-btn");
const exportModal = document.getElementById("export-modal");
const exportTextarea = document.getElementById("export-json-textarea");
const copyJsonBtn = document.getElementById("copy-json-btn");
const downloadJsonBtn = document.getElementById("download-json-btn");
const exportCloseBtn = document.getElementById("export-close-btn");
const exportModalCloseBtn = document.getElementById("export-modal-close");

// Forms
const adminProfileForm = document.getElementById("admin-profile-form");
const projectForm = document.getElementById("project-form");
const pubForm = document.getElementById("pub-form");
const certForm = document.getElementById("cert-form");

// List Containers
const adminProjectsList = document.getElementById("admin-projects-list");
const adminPubsList = document.getElementById("admin-pubs-list");
const adminCertsList = document.getElementById("admin-certs-list");
const adminAchievementsContainer = document.getElementById("admin-achievements-container");

let isAuthenticated = false;

// Initialize Admin UI State
function initAdminPanel() {
  // Bind toggles
  const openModal = () => {
    adminModal.classList.add("open");
    document.body.style.overflow = "hidden"; // disable scroll
    if (isAuthenticated) {
      showDashboard();
    } else {
      showAuth();
    }
  };

  const closeModal = () => {
    adminModal.classList.remove("open");
    document.body.style.overflow = ""; // enable scroll
  };

  if (adminToggleBtn) adminToggleBtn.addEventListener("click", openModal);
  if (adminDrawerBtn) {
    adminDrawerBtn.addEventListener("click", () => {
      // Close mobile drawer first
      const drawer = document.getElementById("mobile-drawer");
      const overlay = document.getElementById("drawer-overlay");
      if (drawer) drawer.classList.remove("open");
      if (overlay) overlay.classList.remove("open");
      openModal();
    });
  }
  if (adminModalCloseBtn) adminModalCloseBtn.addEventListener("click", closeModal);
  if (adminCloseActionBtn) adminCloseActionBtn.addEventListener("click", closeModal);

  // Authentication Submission
  if (adminAuthSubmit) {
    adminAuthSubmit.addEventListener("click", handleAuth);
  }
  if (adminPasswordInput) {
    adminPasswordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleAuth();
    });
  }

  // Tabs navigation
  adminTabLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetTab = link.getAttribute("data-admin-tab");
      
      adminTabLinks.forEach(l => l.classList.remove("active"));
      adminPanelContents.forEach(p => p.classList.remove("active"));
      
      link.classList.add("active");
      const targetEl = document.getElementById(targetTab);
      if (targetEl) targetEl.classList.add("active");
    });
  });

  // Profile Form Save
  if (adminProfileForm) {
    adminProfileForm.addEventListener("submit", handleProfileSave);
  }

  // Reset to default settings
  if (adminResetBtn) {
    adminResetBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to discard ALL modifications and reset to default? This will refresh the page.")) {
        resetPortfolioData();
        localStorage.removeItem("ramesh_portfolio_custom_data");
        window.location.reload();
      }
    });
  }

  // Export JSON configs
  if (adminExportBtn) {
    adminExportBtn.addEventListener("click", openExportModal);
  }

  if (exportCloseBtn) exportCloseBtn.addEventListener("click", () => exportModal.classList.remove("open"));
  if (exportModalCloseBtn) exportModalCloseBtn.addEventListener("click", () => exportModal.classList.remove("open"));
  if (copyJsonBtn) copyJsonBtn.addEventListener("click", copyConfigJson);
  if (downloadJsonBtn) downloadJsonBtn.addEventListener("click", downloadConfigJsFile);
}

// Authentication Logic
function handleAuth() {
  const password = adminPasswordInput.value.trim();
  if (password === "admin123") {
    isAuthenticated = true;
    authErrorMsg.style.display = "none";
    adminPasswordInput.value = "";
    showDashboard();
    showToast("Dashboard unlocked successfully!", "success");
  } else {
    authErrorMsg.style.display = "block";
  }
}

function showAuth() {
  adminAuthView.classList.remove("hidden");
  adminDashboardView.classList.add("hidden");
  adminResetBtn.classList.add("hidden");
  adminExportBtn.classList.add("hidden");
}

function showDashboard() {
  adminAuthView.classList.add("hidden");
  adminDashboardView.classList.remove("hidden");
  adminResetBtn.classList.remove("hidden");
  adminExportBtn.classList.remove("hidden");
  
  // Populate dashboard lists
  populateProfileForm();
  populateProjectsList();
  populatePubsList();
  populateCertsList();
  populateAchievementsList();
}

// PROFILE TAB LOGIC
function populateProfileForm() {
  const profile = PORTFOLIO_DATA.profile;
  const form = adminProfileForm;
  if (!form) return;

  form.elements["name"].value = profile.name || "";
  form.elements["subtitle"].value = profile.subtitle || "";
  form.elements["email"].value = profile.email || "";
  form.elements["phone"].value = profile.phone || "";
  form.elements["location"].value = profile.location || "";
  form.elements["resumeLink"].value = profile.resumeLink || "";
  form.elements["shortIntro"].value = profile.shortIntro || "";
  form.elements["careerGoal"].value = profile.careerGoal || "";
  form.elements["aboutBio"].value = profile.aboutBio || "";
  
  form.elements["linkedin"].value = profile.socials.linkedin || "";
  form.elements["github"].value = profile.socials.github || "";
  form.elements["scholar"].value = profile.socials.scholar || "";
  form.elements["youtube"].value = profile.socials.youtube || "";
}

function handleProfileSave(e) {
  e.preventDefault();
  const form = adminProfileForm;
  const profile = PORTFOLIO_DATA.profile;

  profile.name = form.elements["name"].value;
  profile.subtitle = form.elements["subtitle"].value;
  profile.email = form.elements["email"].value;
  profile.phone = form.elements["phone"].value;
  profile.location = form.elements["location"].value;
  profile.resumeLink = form.elements["resumeLink"].value;
  profile.shortIntro = form.elements["shortIntro"].value;
  profile.careerGoal = form.elements["careerGoal"].value;
  profile.aboutBio = form.elements["aboutBio"].value;

  profile.socials.linkedin = form.elements["linkedin"].value;
  profile.socials.github = form.elements["github"].value;
  profile.socials.scholar = form.elements["scholar"].value;
  profile.socials.youtube = form.elements["youtube"].value;
  profile.socials.email = `mailto:${form.elements["email"].value}`;

  // Save changes
  savePortfolioData();
  renderAllComponents();
  showToast("Profile details updated successfully!", "success");
}

// PROJECTS TAB LOGIC
function populateProjectsList() {
  if (!adminProjectsList) return;
  adminProjectsList.innerHTML = PORTFOLIO_DATA.projects.map(proj => `
    <div class="admin-list-item">
      <div class="admin-item-details">
        <h5>${proj.title}</h5>
        <p>${proj.tech.join(", ")}</p>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-secondary btn-small" onclick="editProject('${proj.id}')"><i class="fas fa-edit"></i> Edit</button>
        <button class="btn btn-danger-outline btn-small" onclick="deleteProject('${proj.id}')"><i class="fas fa-trash-alt"></i> Delete</button>
      </div>
    </div>
  `).join("");
}

// Bind sub-form buttons
const addProjectBtn = document.getElementById("add-project-btn");
const cancelProjectBtn = document.getElementById("cancel-project-btn");

if (addProjectBtn) {
  addProjectBtn.addEventListener("click", () => {
    projectForm.classList.remove("hidden");
    document.getElementById("project-form-title").textContent = "Add New Project";
    projectForm.reset();
    projectForm.elements["id"].value = "";
    projectForm.scrollIntoView({ behavior: 'smooth' });
  });
}

if (cancelProjectBtn) {
  cancelProjectBtn.addEventListener("click", () => projectForm.classList.add("hidden"));
}

if (projectForm) {
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = projectForm.elements["id"].value;
    const title = projectForm.elements["title"].value;
    const description = projectForm.elements["description"].value;
    const tech = projectForm.elements["tech"].value.split(",").map(t => t.trim());
    const github = projectForm.elements["github"].value;
    const demo = projectForm.elements["demo"].value;

    if (id) {
      // Edit existing
      const index = PORTFOLIO_DATA.projects.findIndex(p => p.id === id);
      if (index !== -1) {
        PORTFOLIO_DATA.projects[index] = { id, title, description, tech, github, demo };
      }
    } else {
      // Create new
      const newId = "proj-" + Date.now();
      PORTFOLIO_DATA.projects.push({ id: newId, title, description, tech, github, demo });
    }

    savePortfolioData();
    projectForm.classList.add("hidden");
    populateProjectsList();
    renderProjects();
    showToast("Project list updated!", "success");
  });
}

window.editProject = function(id) {
  const proj = PORTFOLIO_DATA.projects.find(p => p.id === id);
  if (!proj) return;

  document.getElementById("project-form-title").textContent = "Edit Project";
  projectForm.elements["id"].value = proj.id;
  projectForm.elements["title"].value = proj.title;
  projectForm.elements["description"].value = proj.description;
  projectForm.elements["tech"].value = proj.tech.join(", ");
  projectForm.elements["github"].value = proj.github || "";
  projectForm.elements["demo"].value = proj.demo || "";

  projectForm.classList.remove("hidden");
  projectForm.scrollIntoView({ behavior: 'smooth' });
};

window.deleteProject = function(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    PORTFOLIO_DATA.projects = PORTFOLIO_DATA.projects.filter(p => p.id !== id);
    savePortfolioData();
    populateProjectsList();
    renderProjects();
    showToast("Project deleted.", "success");
  }
};

// PUBLICATIONS TAB LOGIC
function populatePubsList() {
  if (!adminPubsList) return;
  adminPubsList.innerHTML = PORTFOLIO_DATA.publications.map(pub => `
    <div class="admin-list-item">
      <div class="admin-item-details">
        <h5>${pub.title}</h5>
        <p>${pub.type} | ${pub.venue} (${pub.year})</p>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-secondary btn-small" onclick="editPub('${pub.id}')"><i class="fas fa-edit"></i> Edit</button>
        <button class="btn btn-danger-outline btn-small" onclick="deletePub('${pub.id}')"><i class="fas fa-trash-alt"></i> Delete</button>
      </div>
    </div>
  `).join("");
}

const addPubBtn = document.getElementById("add-pub-btn");
const cancelPubBtn = document.getElementById("cancel-pub-btn");

if (addPubBtn) {
  addPubBtn.addEventListener("click", () => {
    pubForm.classList.remove("hidden");
    document.getElementById("pub-form-title").textContent = "Add Publication";
    pubForm.reset();
    pubForm.elements["id"].value = "";
    pubForm.scrollIntoView({ behavior: 'smooth' });
  });
}

if (cancelPubBtn) {
  cancelPubBtn.addEventListener("click", () => pubForm.classList.add("hidden"));
}

if (pubForm) {
  pubForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = pubForm.elements["id"].value;
    const title = pubForm.elements["title"].value;
    const type = pubForm.elements["type"].value;
    const venue = pubForm.elements["venue"].value;
    const year = pubForm.elements["year"].value;
    const authors = pubForm.elements["authors"].value;
    const doi = pubForm.elements["doi"].value;
    const abstract = pubForm.elements["abstract"].value;

    if (id) {
      const index = PORTFOLIO_DATA.publications.findIndex(p => p.id === id);
      if (index !== -1) {
        PORTFOLIO_DATA.publications[index] = { id, title, type, venue, year, authors, doi, abstract };
      }
    } else {
      const newId = "pub-" + Date.now();
      PORTFOLIO_DATA.publications.push({ id: newId, title, type, venue, year, authors, doi, abstract });
    }

    savePortfolioData();
    pubForm.classList.add("hidden");
    populatePubsList();
    renderPublications(document.querySelector(".filter-btn.active").getAttribute("data-filter"));
    showToast("Publication database updated!", "success");
  });
}

window.editPub = function(id) {
  const pub = PORTFOLIO_DATA.publications.find(p => p.id === id);
  if (!pub) return;

  document.getElementById("pub-form-title").textContent = "Edit Publication";
  pubForm.elements["id"].value = pub.id;
  pubForm.elements["title"].value = pub.title;
  pubForm.elements["type"].value = pub.type;
  pubForm.elements["venue"].value = pub.venue;
  pubForm.elements["year"].value = pub.year;
  pubForm.elements["authors"].value = pub.authors;
  pubForm.elements["doi"].value = pub.doi || "";
  pubForm.elements["abstract"].value = pub.abstract || "";

  pubForm.classList.remove("hidden");
  pubForm.scrollIntoView({ behavior: 'smooth' });
};

window.deletePub = function(id) {
  if (confirm("Are you sure you want to delete this publication?")) {
    PORTFOLIO_DATA.publications = PORTFOLIO_DATA.publications.filter(p => p.id !== id);
    savePortfolioData();
    populatePubsList();
    renderPublications(document.querySelector(".filter-btn.active").getAttribute("data-filter"));
    showToast("Publication removed.", "success");
  }
};

// CERTIFICATIONS TAB LOGIC
function populateCertsList() {
  if (!adminCertsList) return;
  adminCertsList.innerHTML = PORTFOLIO_DATA.certifications.map(cert => `
    <div class="admin-list-item">
      <div class="admin-item-details">
        <h5>${cert.name}</h5>
        <p>${cert.issuer} (${cert.year})</p>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-secondary btn-small" onclick="editCert('${cert.id}')"><i class="fas fa-edit"></i> Edit</button>
        <button class="btn btn-danger-outline btn-small" onclick="deleteCert('${cert.id}')"><i class="fas fa-trash-alt"></i> Delete</button>
      </div>
    </div>
  `).join("");
}

const addCertBtn = document.getElementById("add-cert-btn");
const cancelCertBtn = document.getElementById("cancel-cert-btn");

if (addCertBtn) {
  addCertBtn.addEventListener("click", () => {
    certForm.classList.remove("hidden");
    document.getElementById("cert-form-title").textContent = "Add Certification";
    certForm.reset();
    certForm.elements["id"].value = "";
    certForm.scrollIntoView({ behavior: 'smooth' });
  });
}

if (cancelCertBtn) {
  cancelCertBtn.addEventListener("click", () => certForm.classList.add("hidden"));
}

if (certForm) {
  certForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = certForm.elements["id"].value;
    const name = certForm.elements["name"].value;
    const issuer = certForm.elements["issuer"].value;
    const year = certForm.elements["year"].value;
    const icon = certForm.elements["icon"].value || "fas fa-award";

    if (id) {
      const index = PORTFOLIO_DATA.certifications.findIndex(c => c.id === id);
      if (index !== -1) {
        PORTFOLIO_DATA.certifications[index] = { id, name, issuer, year, icon };
      }
    } else {
      const newId = "cert-" + Date.now();
      PORTFOLIO_DATA.certifications.push({ id: newId, name, issuer, year, icon });
    }

    savePortfolioData();
    certForm.classList.add("hidden");
    populateCertsList();
    renderCertifications();
    showToast("Certifications log updated!", "success");
  });
}

window.editCert = function(id) {
  const cert = PORTFOLIO_DATA.certifications.find(c => c.id === id);
  if (!cert) return;

  document.getElementById("cert-form-title").textContent = "Edit Certification";
  certForm.elements["id"].value = cert.id;
  certForm.elements["name"].value = cert.name;
  certForm.elements["issuer"].value = cert.issuer;
  certForm.elements["year"].value = cert.year;
  certForm.elements["icon"].value = cert.icon;

  certForm.classList.remove("hidden");
  certForm.scrollIntoView({ behavior: 'smooth' });
};

window.deleteCert = function(id) {
  if (confirm("Are you sure you want to delete this certification?")) {
    PORTFOLIO_DATA.certifications = PORTFOLIO_DATA.certifications.filter(c => c.id !== id);
    savePortfolioData();
    populateCertsList();
    renderCertifications();
    showToast("Certification deleted.", "success");
  }
};

// ACHIEVEMENTS TAB LOGIC
function populateAchievementsList() {
  if (!adminAchievementsContainer) return;
  adminAchievementsContainer.innerHTML = `
    <form id="admin-achievements-form">
      ${PORTFOLIO_DATA.achievements.map((ach, index) => `
        <div class="admin-ach-row">
          <label>${ach.label.replace("Educational", "")}</label>
          <input type="text" name="val-${ach.id}" value="${ach.value}" required>
          <span class="text-muted" style="font-size: 0.8rem;">Current Value</span>
        </div>
      `).join("")}
      <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Update Impact Stats</button>
    </form>
  `;

  // Bind Achievements Form Submit
  const achForm = document.getElementById("admin-achievements-form");
  if (achForm) {
    achForm.addEventListener("submit", (e) => {
      e.preventDefault();
      PORTFOLIO_DATA.achievements.forEach(ach => {
        const inputVal = achForm.elements[`val-${ach.id}`].value;
        ach.value = inputVal;
      });
      savePortfolioData();
      renderAchievements();
      showToast("Impact statistics updated!", "success");
    });
  }
}

// TOAST NOTIFICATIONS HELPER
function showToast(message, type = "success") {
  const toast = document.getElementById("notification-toast");
  const msgEl = document.getElementById("toast-message");
  const iconEl = document.getElementById("toast-icon");
  
  if (!toast || !msgEl || !iconEl) return;

  msgEl.textContent = message;
  if (type === "success") {
    iconEl.innerHTML = '<i class="fas fa-check-circle"></i>';
    iconEl.style.color = "var(--accent-green)";
  } else {
    iconEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    iconEl.style.color = "var(--accent-danger)";
  }

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// EXPORT/DOWNLOAD CONFIG FUNCTIONS
function openExportModal() {
  exportModal.classList.add("open");
  const jsonStr = JSON.stringify(PORTFOLIO_DATA, null, 2);
  exportTextarea.value = jsonStr;
}

function copyConfigJson() {
  exportTextarea.select();
  document.execCommand("copy");
  showToast("JSON code copied to clipboard!", "success");
}

function downloadConfigJsFile() {
  const jsonStr = JSON.stringify(PORTFOLIO_DATA, null, 2);
  
  // Wrap into full data.js code block
  const fullJsCode = `// Customized database for Dr. Ramesh Gummadi
const DEFAULT_PORTFOLIO_DATA = ${jsonStr};

// Global state holding active portfolio data
let PORTFOLIO_DATA = { ...DEFAULT_PORTFOLIO_DATA };

// Key to store custom modifications
const STORAGE_KEY = "ramesh_portfolio_custom_data";

// Load from local storage if available
function loadPortfolioData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      // Merge keys to avoid breaking structures
      PORTFOLIO_DATA = {
        profile: { ...DEFAULT_PORTFOLIO_DATA.profile, ...parsed.profile },
        achievements: parsed.achievements || [...DEFAULT_PORTFOLIO_DATA.achievements],
        education: parsed.education || [...DEFAULT_PORTFOLIO_DATA.education],
        experience: parsed.experience || [...DEFAULT_PORTFOLIO_DATA.experience],
        skills: { ...DEFAULT_PORTFOLIO_DATA.skills, ...parsed.skills },
        research: { ...DEFAULT_PORTFOLIO_DATA.research, ...parsed.research },
        publications: parsed.publications || [...DEFAULT_PORTFOLIO_DATA.publications],
        projects: parsed.projects || [...DEFAULT_PORTFOLIO_DATA.projects],
        certifications: parsed.certifications || [...DEFAULT_PORTFOLIO_DATA.certifications],
        youtube: { ...DEFAULT_PORTFOLIO_DATA.youtube, ...parsed.youtube },
        blogs: parsed.blogs || [...DEFAULT_PORTFOLIO_DATA.blogs]
      };
    } catch (e) {
      console.error("Failed to parse saved portfolio data, resetting to defaults", e);
      PORTFOLIO_DATA = { ...DEFAULT_PORTFOLIO_DATA };
    }
  } else {
    PORTFOLIO_DATA = { ...DEFAULT_PORTFOLIO_DATA };
  }
  return PORTFOLIO_DATA;
}

// Save current state to local storage
function savePortfolioData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(PORTFOLIO_DATA));
}

// Reset local modifications
function resetPortfolioData() {
  localStorage.removeItem(STORAGE_KEY);
  PORTFOLIO_DATA = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
}

// Initialize data
loadPortfolioData();
`;

  const blob = new Blob([fullJsCode], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.js";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showToast("data.js downloaded! Replace js/data.js to make changes permanent.", "success");
}

// Export Toast support for App.js
window.showAdminToast = showToast;
