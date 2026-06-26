// Core Application Logic for Dr. Ramesh Gummadi's Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Render
  renderAllComponents();

  // 2. Initialize Admin Logic
  if (typeof initAdminPanel === "function") {
    initAdminPanel();
  }

  // 3. Dark/Light Mode Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

  // Check saved theme
  const savedTheme = localStorage.getItem("ramesh_portfolio_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("ramesh_portfolio_theme", newTheme);
      updateThemeIcon(newTheme);
      
      if (typeof window.showAdminToast === "function") {
        window.showAdminToast(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode!`, "success");
      }
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === "light") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }

  // 4. Header Scroll Action
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 5. Mobile Navigation Menu Drawer
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const drawerOverlay = document.getElementById("drawer-overlay");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  const openDrawer = () => {
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (mobileMenuToggle) mobileMenuToggle.addEventListener("click", openDrawer);
  if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      closeDrawer();
      
      // Update active state immediately
      drawerLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 6. Navigation Link Scrolling Spy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "home";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // accounting for sticky header
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Update Desktop Nav Links
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    // Update Mobile Drawer Links
    drawerLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // 7. Timeline Experience / Education Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const timelineViews = document.querySelectorAll(".timeline-view");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetViewId = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      timelineViews.forEach(v => v.classList.remove("active"));

      btn.classList.add("active");
      const targetView = document.getElementById(targetViewId);
      if (targetView) targetView.classList.add("active");
    });
  });

  // 8. Publications Category Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filterValue = btn.getAttribute("data-filter");

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (typeof renderPublications === "function") {
        renderPublications(filterValue);
      }
    });
  });

  // 9. Interactive Counters (Scroll Animation)
  const counterElements = document.querySelectorAll(".achievement-value");
  
  if ("IntersectionObserver" in window && counterElements.length > 0) {
    const animateCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetText = el.textContent;
          const hasPlus = targetText.includes("+");
          const hasK = targetText.includes("K");
          const targetValue = parseInt(el.getAttribute("data-target"));
          
          let currentVal = 0;
          const duration = 1500; // ms
          const stepTime = Math.max(Math.floor(duration / targetValue), 15);
          
          const counterInterval = setInterval(() => {
            currentVal += Math.ceil(targetValue / 50);
            if (currentVal >= targetValue) {
              currentVal = targetValue;
              clearInterval(counterInterval);
            }
            
            let displayVal = currentVal;
            if (hasK) displayVal = currentVal + "K";
            if (hasPlus) displayVal = displayVal + "+";
            el.textContent = displayVal;
          }, stepTime);
          
          observer.unobserve(el); // only animate once
        }
      });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
      threshold: 0.5
    });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 10. Title Rotator (Typing Effect)
  const rotatorTextEl = document.getElementById("title-rotator-text");
  if (rotatorTextEl) {
    const titles = PORTFOLIO_DATA.profile.titles || ["Assistant Professor", "AI Researcher", "Technical Trainer", "Content Creator"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        rotatorTextEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // faster deleting
      } else {
        rotatorTextEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120; // natural typing speed
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        typingSpeed = 2000; // pause at full title
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // pause before starting next title
      }

      setTimeout(typeEffect, typingSpeed);
    };

    // Start typing after a short delay
    setTimeout(typeEffect, 1000);
  }

  // 11. Contact Form Validation and Mock Submit
  const contactForm = document.getElementById("portfolio-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let isValid = true;
      const name = contactForm.elements["name"];
      const email = contactForm.elements["email"];
      const subject = contactForm.elements["subject"];
      const message = contactForm.elements["message"];

      // Clear errors
      document.querySelectorAll(".form-group").forEach(group => group.classList.remove("has-error"));

      // Name check
      if (name.value.trim().length === 0) {
        name.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      // Email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      // Subject check
      if (subject.value.trim().length === 0) {
        subject.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      // Message check
      if (message.value.trim().length === 0) {
        message.closest(".form-group").classList.add("has-error");
        isValid = false;
      }

      if (isValid) {
        const btn = contactForm.querySelector("button[type='submit']");
        const originalBtnText = btn.innerHTML;
        
        // Mock loading spinner/sending effect
        btn.disabled = true;
        btn.innerHTML = 'Sending Message <i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
          // Success Callback
          btn.disabled = false;
          btn.innerHTML = originalBtnText;
          contactForm.reset();
          
          if (typeof window.showAdminToast === "function") {
            window.showAdminToast("Message sent successfully! Mr. Ramesh will respond soon.", "success");
          }
        }, 1500);
      }
    });
  }

  // --- CERTIFICATE MODAL TRIGGER BINDINGS ---
  const certModalClose = document.getElementById("cert-modal-close");
  const certModalDone = document.getElementById("cert-modal-done");
  if (certModalClose) {
    certModalClose.addEventListener("click", closeCertPreview);
  }
  if (certModalDone) {
    certModalDone.addEventListener("click", closeCertPreview);
  }

  // --- AI CHATBOT SYSTEM ---
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatWindow = document.getElementById("chat-window");
  const chatClose = document.getElementById("chat-close");
  const chatMessages = document.getElementById("chat-messages");
  const chatInputForm = document.getElementById("chat-input-form");
  const chatInput = document.getElementById("chat-input");
  const suggestionChips = document.querySelectorAll(".cs-chip");

  // Toggle chat window
  if (chatbotBtn && chatWindow) {
    chatbotBtn.addEventListener("click", () => {
      chatWindow.classList.add("open");
      chatbotBtn.classList.add("hidden");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  if (chatClose && chatWindow && chatbotBtn) {
    chatClose.addEventListener("click", () => {
      chatWindow.classList.remove("open");
      chatbotBtn.classList.remove("hidden");
    });
  }

  // Handle suggested prompt clicks
  suggestionChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt");
      if (prompt) {
        handleUserMessage(prompt);
      }
    });
  });

  // Handle chat submission
  if (chatInputForm) {
    chatInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      
      chatInput.value = "";
      handleUserMessage(message);
    });
  }

  // Handle core user messaging logic
  async function handleUserMessage(messageText) {
    // 1. Append user message
    const userMsg = document.createElement("div");
    userMsg.className = "msg msg-user";
    userMsg.innerHTML = `<div class="msg-bubble">${escapeHtml(messageText)}</div>`;
    chatMessages.appendChild(userMsg);
    
    // Scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Hide suggestions to keep view clean
    const suggestions = document.getElementById("chat-suggestions");
    if (suggestions) suggestions.style.display = "none";

    // 2. Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "msg msg-bot";
    typingIndicator.id = "chat-typing-indicator";
    typingIndicator.innerHTML = `
      <div class="msg-avatar"><i class="fas fa-robot"></i></div>
      <div class="msg-bubble typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Get response (Gemini API or fallback)
    let botReplyText = "";
    const apiKey = localStorage.getItem("ramesh_gemini_api_key");

    try {
      if (apiKey) {
        botReplyText = await callGeminiAPI(apiKey, messageText);
      } else {
        // Mock a slight network delay for natural feel
        await new Promise(resolve => setTimeout(resolve, 800));
        botReplyText = generateLocalResponse(messageText);
      }
    } catch (err) {
      console.error("AI Chatbot Error: ", err);
      botReplyText = `Sorry, I encountered an error while trying to process your request: ${err.message}. Please check your Gemini API key configuration in Admin Panel settings or try again.`;
    }

    // 4. Remove typing indicator
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) indicator.remove();

    // 5. Append bot message
    const botMsg = document.createElement("div");
    botMsg.className = "msg msg-bot";
    botMsg.innerHTML = `
      <div class="msg-avatar"><i class="fas fa-robot"></i></div>
      <div class="msg-bubble">${botReplyText}</div>
    `;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }

  async function callGeminiAPI(apiKey, query) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `You are the AI Assistant representative for Mr. Ramesh Gummadi, an AI Researcher, Assistant Professor, and Technical Trainer. 
Here is his profile information from his portfolio:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

Instructions:
1. Respond as Ramesh's friendly AI representative. Use third person ("Mr. Ramesh Gummadi...", "He...") or first-person representation if appropriate, but third-person is preferred.
2. Answer the user's question accurately using ONLY the provided data.
3. Be professional, concise, and helpful. Keep responses under 3-4 sentences if possible. Try to use simple HTML formatting (like <strong> tags, lists, or line breaks) if it helps presentation, but keep it clean.
4. If asked about things not related to Ramesh's professional background, education, skills, or portfolio, politely pivot back to how you can assist them regarding Ramesh's credentials.

User Question: ${query}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "HTTP error " + response.status);
    }

    const result = await response.json();
    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      throw new Error("Invalid response structure from Gemini API");
    }
    return reply;
  }

  function generateLocalResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes("education") || q.includes("degree") || q.includes("study") || q.includes("college") || q.includes("university") || q.includes("mca") || q.includes("m.tech") || q.includes("qualification") || q.includes("jntu") || q.includes("academic")) {
      return `Mr. Ramesh has dual postgraduate degrees: an M.Tech in Artificial Intelligence from JNTU Kakinada (GPA: 8.5/10, 2023-2025) and an MCA from Dr. BR Ambedkar University (GPA: 7.88/10, 2020-2022). He also completed his B.Com from Aditya Degree College.`;
    }
    
    if (q.includes("experience") || q.includes("teaching") || q.includes("work") || q.includes("job") || q.includes("collegedekho") || q.includes("giet") || q.includes("veranda") || q.includes("six phrase") || q.includes("professor") || q.includes("trainer")) {
      return `Mr. Ramesh has over 4 years of academic and corporate training experience. Currently, he is a Java & AI SME / Faculty at College Dekho - ImaginXP. He was previously a Technical Trainer at Six Phrase-VERANDA, and an Assistant Professor & IT Developer at GIET Institutions.`;
    }
    
    if (q.includes("project") || q.includes("rag") || q.includes("instagram") || q.includes("n8n") || q.includes("fake news") || q.includes("system") || q.includes("code") || q.includes("github") || q.includes("demo")) {
      return `Ramesh has built several advanced projects:
      <br>• <strong>RAG-Based Intelligent Document Assistant</strong> (LangChain, ChromaDB, FastAPI)
      <br>• <strong>AI-Powered Instagram Content Automation System</strong> (n8n, OpenAI, Google Sheets)
      <br>• <strong>Fake News Detection System</strong> (Python, Scikit-Learn, NLP, Flask).
      <br>Check out his repositories on <a href="https://github.com/ramesh-gummadi" target="_blank">GitHub</a>!`;
    }
    
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("mobile") || q.includes("reach") || q.includes("linkedin") || q.includes("location") || q.includes("social")) {
      return `You can reach Mr. Ramesh Gummadi via email at <a href="mailto:rameshgummadi53@gmail.com">rameshgummadi53@gmail.com</a> or phone at <strong>+91 95154 54211</strong>. He is located in Andhra Pradesh, India. His LinkedIn is <a href="https://linkedin.com/in/gummadi-ramesh-85257a260" target="_blank">linkedin.com/in/gummadi-ramesh-85257a260</a>.`;
    }
    
    if (q.includes("research") || q.includes("publication") || q.includes("paper") || q.includes("icrame") || q.includes("thesis") || q.includes("conference") || q.includes("journal")) {
      return `Ramesh published a paper titled "Faculty-Guided Generative AI Framework for Immersive Classroom Education: A Conceptual Framework" at the ICRAME-2026 International Conference. His research focus domains are Generative AI, RAG Systems, and Agentic AI.`;
    }
    
    if (q.includes("youtube") || q.includes("channel") || q.includes("video") || q.includes("aivr tube")) {
      return `Ramesh hosts the <strong>AIVR</strong> YouTube Channel (<a href="https://youtube.com/@AIVR_Channel" target="_blank">@AIVR_Channel</a>) where he uploads content on AI pipelines, VR classroom integrations, and WebXR tutorials. The channel has 12K+ subscribers and 150+ videos.`;
    }
    
    if (q.includes("skills") || q.includes("java") || q.includes("python") || q.includes("programming") || q.includes("sql") || q.includes("ml") || q.includes("ai") || q.includes("nlp") || q.includes("deep learning") || q.includes("cloud") || q.includes("tools")) {
      return `Ramesh's core competencies include:
      <br>• <strong>AI & ML</strong>: Gen AI, Machine Learning, RAG, NLP, Deep Learning, CNN
      <br>• <strong>Programming</strong>: Java, Python, C, SQL
      <br>• <strong>Frontend</strong>: HTML, CSS, Flask, Streamlit
      <br>• <strong>Cloud/Tools</strong>: Google Cloud, TensorFlow, n8n, Git`;
    }
    
    if (q.includes("who are you") || q.includes("who is") || q.includes("ramesh") || q.includes("about") || q.includes("bio") || q.includes("gummadi")) {
      return `Mr. Ramesh Gummadi is an Assistant Professor, AI Researcher, and Technical Trainer specializing in Java programming and Generative AI frameworks. He holds an M.Tech in AI and MCA, and is passionate about educational innovation.`;
    }
    
    return `I am Ramesh's local AI assistant. I couldn't find a direct match for "${query}". Try asking me about his "education", "experience", "projects", "publications", "skills", or how to "contact" him. Or, add a Google Gemini API Key in the Admin Panel to unlock full open-ended AI conversation.`;
  }
});

// --- GLOBAL MODAL CONTROLLERS ---
window.openCertPreview = function(name, issuer, year) {
  const modal = document.getElementById("cert-modal");
  const title = document.getElementById("cert-modal-title");
  const issuerEl = document.getElementById("cert-modal-issuer");
  const yearEl = document.getElementById("cert-modal-year");
  
  if (modal && title && issuerEl && yearEl) {
    title.textContent = name;
    issuerEl.textContent = issuer;
    yearEl.textContent = `Year: ${year}`;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closeCertPreview = function() {
  const modal = document.getElementById("cert-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};
