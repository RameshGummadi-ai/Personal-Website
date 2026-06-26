// Dynamic HTML Component Renderers for Mr. Ramesh Gummadi's Portfolio

// Path helper to translate assets for subfolders
function getAssetPath(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("data:")) {
    return path;
  }
  
  // Robust check to determine if the current page is loaded from a subfolder
  let isSubfolder = false;
  
  // 1. Check window.location.pathname
  const pathname = window.location.pathname.toLowerCase();
  if (pathname.includes("rameshgummadi")) {
    isSubfolder = true;
  } 
  // 2. Check if body class does not contain the root page identifier "aivr-page"
  else if (document.body && !document.body.classList.contains("aivr-page")) {
    isSubfolder = true;
  }
  // 3. Fallback: check if the scripts are loaded via parent-relative paths
  else {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].getAttribute("src") || "";
      if (src.includes("components.js") && src.startsWith("../")) {
        isSubfolder = true;
        break;
      }
    }
  }

  console.log(`[getAssetPath] Path: "${path}", detected isSubfolder: ${isSubfolder}, pathname: "${pathname}"`);

  if (isSubfolder) {
    if (path.startsWith("../")) {
      return path;
    }
    // Remove leading slash if present to avoid double-slashes when prefixing
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return "../" + cleanPath;
  }
  return path;
}


// Render social links in Hero and Contact sections
function renderSocialIcons() {
  const socials = PORTFOLIO_DATA.profile.socials;
  
  // Hero socials
  const heroContainer = document.getElementById("hero-socials-container");
  if (heroContainer) {
    heroContainer.innerHTML = `
      <a href="${socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      <a href="${socials.github}" target="_blank" rel="noopener noreferrer" class="social-icon" title="GitHub"><i class="fab fa-github"></i></a>
      <a href="${socials.scholar}" target="_blank" rel="noopener noreferrer" class="social-icon" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
      <a href="${socials.youtube}" target="_blank" rel="noopener noreferrer" class="social-icon" title="YouTube"><i class="fab fa-youtube"></i></a>
      <a href="${socials.email}" class="social-icon" title="Email"><i class="fas fa-envelope"></i></a>
    `;
  }

  // Contact socials
  const contactContainer = document.getElementById("contact-socials-container");
  if (contactContainer) {
    contactContainer.innerHTML = `
      <a href="${socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      <a href="${socials.github}" target="_blank" rel="noopener noreferrer" class="social-icon" title="GitHub"><i class="fab fa-github"></i></a>
      <a href="${socials.scholar}" target="_blank" rel="noopener noreferrer" class="social-icon" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>
      <a href="${socials.youtube}" target="_blank" rel="noopener noreferrer" class="social-icon" title="YouTube"><i class="fab fa-youtube"></i></a>
    `;
  }
}

// Render dynamic counters / achievement stats
function renderAchievements() {
  const container = document.getElementById("achievements-container");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.achievements.map(ach => `
    <div class="achievement-card glass-panel">
      <div class="achievement-icon-box">
        <i class="${ach.icon}"></i>
      </div>
      <div class="achievement-value" data-target="${ach.value.replace(/\D/g, '')}">${ach.value}</div>
      <div class="achievement-label">${ach.label}</div>
    </div>
  `).join("");
}

// Render About Me section
function renderAboutSection() {
  const container = document.getElementById("about-container");
  if (!container) return;

  const profile = PORTFOLIO_DATA.profile;
  const researchAreas = PORTFOLIO_DATA.research.areas;

  container.innerHTML = `
    <div class="about-grid">
      <div class="about-info-col">
        <p class="about-bio-text">${profile.aboutBio}</p>
        <div class="about-meta-grid">
          <div class="about-meta-item">
            <div class="meta-icon-box"><i class="fas fa-graduation-cap"></i></div>
            <div class="meta-info">
              <h5>Postgraduate Degrees</h5>
              <p>M.Tech (CSE - Artificial Intelligence) & MCA (Computer Applications)</p>
            </div>
          </div>
          <div class="about-meta-item">
            <div class="meta-icon-box"><i class="fas fa-chalkboard-teacher"></i></div>
            <div class="meta-info">
              <h5>Academic Experience</h5>
              <p>4+ Years teaching undergraduate & coaching engineering graduates</p>
            </div>
          </div>
          <div class="about-meta-item">
            <div class="meta-icon-box"><i class="fas fa-users-cog"></i></div>
            <div class="meta-info">
              <h5>Student Mentorship</h5>
              <p>Direct mentoring support for 10,000+ students globally</p>
            </div>
          </div>
          <div class="about-meta-item">
            <div class="meta-icon-box"><i class="fas fa-map-marker-alt"></i></div>
            <div class="meta-info">
              <h5>Based In</h5>
              <p>${profile.location}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="about-focus-col">
        <div class="focus-card glass-panel">
          <div class="goal-box">
            <h5>Career PhD Goal</h5>
            <p>${profile.careerGoal}</p>
          </div>
          <h4 class="focus-tag-title">Research & Technical Focus</h4>
          <div class="focus-tags">
            ${researchAreas.map(area => `<span class="focus-tag">${area}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render professional timeline (Experience & Education)
function renderTimeline() {
  // Experience timeline
  const expContainer = document.getElementById("experience-timeline-container");
  if (expContainer) {
    expContainer.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-marker">
          <i class="${exp.icon || 'fas fa-briefcase'}"></i>
        </div>
        <div class="timeline-panel glass-panel">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h4>${exp.role}</h4>
              <div class="timeline-org">${exp.organization}</div>
            </div>
            <span class="timeline-period">${exp.period}</span>
          </div>
          <p class="timeline-desc">${exp.description}</p>
        </div>
      </div>
    `).join("");
  }

  // Education timeline
  const eduContainer = document.getElementById("education-timeline-container");
  if (eduContainer) {
    eduContainer.innerHTML = PORTFOLIO_DATA.education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-marker">
          <i class="${edu.icon || 'fas fa-graduation-cap'}"></i>
        </div>
        <div class="timeline-panel glass-panel">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h4>${edu.degree}</h4>
              <div class="timeline-org">${edu.institution}</div>
            </div>
            <span class="timeline-period">${edu.period}</span>
          </div>
          <p class="timeline-desc">${edu.description}</p>
        </div>
      </div>
    `).join("");
  }
}

// Render dynamic skills grids
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  const skills = PORTFOLIO_DATA.skills;

  const skillCategories = [
    { title: "AI & Data Science", list: skills.ai_data, icon: "fas fa-brain" },
    { title: "Programming Languages", list: skills.programming, icon: "fas fa-code" },
    { title: "Frontend Development", list: skills.frontend, icon: "fas fa-laptop-code" },
    { title: "Cloud & Dev Tools", list: skills.cloud_tools, icon: "fas fa-cloud-upload-alt" }
  ];

  container.innerHTML = skillCategories.map(cat => `
    <div class="skill-card glass-panel">
      <div class="skill-card-header">
        <div class="skill-icon-box">
          <i class="${cat.icon}"></i>
        </div>
        <h4>${cat.title}</h4>
      </div>
      <ul class="skill-list">
        ${cat.list.map(skill => `
          <li class="skill-item">
            <div class="skill-item-info">
              <span class="skill-dot"></span>
              <span class="skill-name">${skill}</span>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");
}

// Render research overview
function renderResearchSection() {
  const container = document.getElementById("research-focus-container");
  if (!container) return;

  const research = PORTFOLIO_DATA.research;

  container.innerHTML = `
    <div class="rf-header-group">
      <span class="section-subtitle">Primary Thesis Focus</span>
      <h4>${research.mainTitle}</h4>
    </div>
    <p class="rf-desc">${research.description}</p>
    <div class="rf-areas-box">
      <h5>Core Research Domains</h5>
      <div class="rf-areas-list">
        ${research.areas.map(area => `<span class="rf-area-tag">${area}</span>`).join("")}
      </div>
    </div>
  `;
}

// Render publications with active filter
function renderPublications(filterType = "all") {
  const container = document.getElementById("publications-container");
  if (!container) return;

  let pubs = PORTFOLIO_DATA.publications;
  if (filterType !== "all") {
    pubs = pubs.filter(pub => pub.type === filterType);
  }

  if (pubs.length === 0) {
    container.innerHTML = `
      <div class="glass-panel text-center" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
        <i class="fas fa-file-invoice" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-muted);"></i>
        <p>No publications found under this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pubs.map((pub, index) => `
    <div class="publication-card glass-panel" data-pub-type="${pub.type}">
      <div class="pub-meta-row">
        <span class="pub-type-badge ${pub.type.toLowerCase()}">${pub.type}</span>
        <span class="pub-year">${pub.year}</span>
      </div>
      <h4>${pub.title}</h4>
      <div class="pub-authors">${pub.authors}</div>
      <div class="pub-venue">${pub.venue}</div>
      
      <div class="pub-actions">
        ${pub.doi ? `
          <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer" class="pub-action-link">
            <i class="fas fa-external-link-alt"></i> DOI Link
          </a>
        ` : ''}
        <button class="pub-toggle-abstract" onclick="toggleAbstract('abstract-${pub.id || index}')">
          <i class="fas fa-align-left"></i> View Abstract <i class="fas fa-chevron-down" style="font-size: 0.75rem;"></i>
        </button>
      </div>
      
      <div class="pub-abstract-content" id="abstract-${pub.id || index}">
        <strong>Abstract:</strong>
        <p>${pub.abstract || "Abstract placeholder text for publication detail analysis."}</p>
      </div>
    </div>
  `).join("");
}

// Render projects grid
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.projects.map(proj => `
    <div class="project-card glass-panel">
      <h4>${proj.title}</h4>
      <p class="project-desc">${proj.description}</p>
      <div class="project-tags">
        ${proj.tech.map(t => `<span class="project-tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        ${proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link repo"><i class="fab fa-github"></i> Source Code</a>` : ''}
        ${proj.demo ? `<a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="project-link demo"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
      </div>
    </div>
  `).join("");
}

// Render certifications list
function renderCertifications() {
  const container = document.getElementById("certifications-container");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.certifications.map(cert => {
    // Safe string escape for onclick handler
    const escapedName = cert.name.replace(/'/g, "\\'");
    const escapedIssuer = cert.issuer.replace(/'/g, "\\'");
    return `
      <div class="cert-card glass-panel">
        <div class="cert-icon-box">
          <i class="${cert.icon || 'fas fa-award'}"></i>
        </div>
        <div class="cert-info">
          <h4>${cert.name}</h4>
          <div class="cert-issuer">${cert.issuer}</div>
          <div class="cert-year">${cert.year}</div>
          <button class="btn btn-glass btn-small cert-preview-btn" style="margin-top: 0.8rem; width: 100%; font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="openCertPreview('${escapedName}', '${escapedIssuer}', '${cert.year}')">
            <i class="fas fa-eye"></i> Preview Credential
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Render YouTube channel branding, stats, and latest video lists
function renderYouTube() {
  const yt = PORTFOLIO_DATA.youtube;
  
  // Set channel title/link
  const nameEl = document.getElementById("yt-channel-name");
  if (nameEl) {
    nameEl.textContent = yt.channelName;
  }

  // Channel Stats
  const statsContainer = document.getElementById("youtube-stats-container");
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="yt-stat-card">
        <div class="yt-stat-val">${yt.stats.subscribers}</div>
        <div class="yt-stat-lbl">Active Subscribers</div>
      </div>
      <div class="yt-stat-card">
        <div class="yt-stat-val">${yt.stats.videos}</div>
        <div class="yt-stat-lbl">Videos Published</div>
      </div>
      <div class="yt-stat-card">
        <div class="yt-stat-val">${yt.stats.watchHours}</div>
        <div class="yt-stat-lbl">Watch Hours</div>
      </div>
    `;
  }

  // Videos Grid
  const vidsContainer = document.getElementById("youtube-videos-container");
  if (vidsContainer) {
    vidsContainer.innerHTML = yt.latestVideos.map(vid => `
      <div class="yt-video-card">
        <div class="yt-thumbnail-wrapper">
          <img src="${vid.thumbnail}" alt="${vid.title}" class="yt-thumbnail">
          <span class="yt-duration">${vid.duration}</span>
          <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="yt-play-btn">
            <i class="fas fa-play"></i>
          </a>
        </div>
        <div class="yt-video-details">
          <h5>${vid.title}</h5>
          <div class="yt-video-meta">
            <span>${vid.views}</span>
            <span>${vid.date}</span>
          </div>
        </div>
      </div>
    `).join("");
  }
}

// Render dynamic academic blogs
function renderBlogs() {
  const container = document.getElementById("blogs-container");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.blogs.map(blog => `
    <article class="blog-card glass-panel">
      <div class="blog-meta">
        <span><i class="far fa-calendar-alt"></i> ${blog.date}</span>
        <span><i class="far fa-clock"></i> ${blog.readTime}</span>
      </div>
      <h4>${blog.title}</h4>
      <p class="blog-summary">${blog.summary}</p>
      <a href="#blog" class="blog-read-link">Read Full Article <i class="fas fa-arrow-right"></i></a>
    </article>
  `).join("");
}

// Global toggle abstract helper
function toggleAbstract(elementId) {
  const content = document.getElementById(elementId);
  if (!content) return;
  
  content.classList.toggle("open");
  
  // Find matching button to rotate icon
  const button = content.previousElementSibling.querySelector(".pub-toggle-abstract");
  if (button) {
    const icon = button.querySelector(".fa-chevron-down, .fa-chevron-up");
    if (icon) {
      if (content.classList.contains("open")) {
        icon.className = "fas fa-chevron-up";
      } else {
        icon.className = "fas fa-chevron-down";
      }
    }
  }
}

// Master rendering coordinator
function renderAllComponents() {
  // Update static layout header texts
  const introEl = document.getElementById("hero-intro-text");
  if (introEl) introEl.textContent = PORTFOLIO_DATA.profile.shortIntro;
  
  const imgEl = document.getElementById("hero-profile-img");
  if (imgEl) {
    const resolvedSrc = getAssetPath(PORTFOLIO_DATA.profile.avatar);
    imgEl.src = resolvedSrc;
    
    // Self-healing fallback if the resolved image path fails to load (e.g. due to custom domain mapping differences)
    imgEl.onerror = function() {
      if (!this.dataset.triedFallback) {
        this.dataset.triedFallback = "true";
        const currentSrc = this.src;
        console.warn(`[hero-profile-img] Failed to load from: "${currentSrc}". Trying self-healing fallback path.`);
        
        // If relative failed, try root relative
        if (currentSrc.includes("/RameshGummadi/") || currentSrc.includes("../")) {
          this.src = "assets/ram.jpg";
        } 
        // If root relative failed, try relative
        else {
          this.src = "../assets/ram.jpg";
        }
      } else {
        console.error("[hero-profile-img] All fallback path attempts failed to load the profile photo.");
      }
    };
  }

  const emailEl = document.getElementById("contact-val-email");
  if (emailEl) {
    emailEl.textContent = PORTFOLIO_DATA.profile.email;
    emailEl.href = `mailto:${PORTFOLIO_DATA.profile.email}`;
  }

  const locEl = document.getElementById("contact-val-location");
  if (locEl) locEl.textContent = PORTFOLIO_DATA.profile.location;

  const downloadBtn = document.getElementById("resume-download-btn");
  if (downloadBtn) downloadBtn.href = getAssetPath(PORTFOLIO_DATA.profile.resumeLink);

  const heroDownloadBtn = document.getElementById("hero-download-cv-btn");
  if (heroDownloadBtn) heroDownloadBtn.href = getAssetPath(PORTFOLIO_DATA.profile.resumeLink);

  // Run dynamic list builders
  renderSocialIcons();
  renderAchievements();
  renderAboutSection();
  renderTimeline();
  renderSkills();
  renderResearchSection();
  renderPublications("all");
  renderProjects();
  renderCertifications();
  renderYouTube();
  renderBlogs();
}
