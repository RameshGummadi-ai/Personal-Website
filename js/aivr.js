// AIVR Interactive Sandbox Simulator Logic
// Synthesizes textbook content into immersive 3D/VR canvas views

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const topicCards = document.querySelectorAll(".aivr-topic-card");
  const compileBtn = document.getElementById("aivr-compile-btn");
  const compileHint = document.getElementById("aivr-compile-hint");
  const simulatedDisplay = document.getElementById("aivr-simulated-display");
  const compileOverlay = document.getElementById("aivr-compile-overlay");
  const compileLogs = document.getElementById("aivr-compile-logs");
  const compileBar = document.getElementById("aivr-compile-bar");

  // Viewport canvases
  const canvasL = document.getElementById("aivr-canvas-l");
  const canvasR = document.getElementById("aivr-canvas-r");
  let ctxL = canvasL ? canvasL.getContext("2d") : null;
  let ctxR = canvasR ? canvasR.getContext("2d") : null;

  // Simulator controls
  const btnOrbit = document.getElementById("aivr-btn-orbit");
  const btnLabels = document.getElementById("aivr-btn-labels");
  const btnZoom = document.getElementById("aivr-btn-zoom");

  // State
  let activeTopic = "solar"; // default: solar, atom, photosynthesis
  let isCompiled = false;
  let isCompiling = false;
  let animationFrameId = null;
  
  // Interactive options toggled by controls
  let orbitAngle = 0;
  let orbitSpeed = 1; // 1 = normal, 0 = paused
  let showLabels = true;
  let zoomScale = 1.0;

  // Topic specifications
  const topicData = {
    solar: {
      name: "Solar System Exploration",
      logs: [
        "Initializing textbook parser for Astronomy Unit 4...",
        "Extracting mass, orbital periods, and scale metrics for Sun-Earth-Mars system...",
        "Querying Gemini API to generate pedagogical VR narration scripts...",
        "Synthesizing script: 'Welcome to the Heliocentric orbit simulation. Notice Keplerian speeds...'",
        "Generating 3D meshes for Sun, Mercury, Venus, Earth, Mars...",
        "Compiling procedural pixel shaders for solar flare crown animations...",
        "Packaging WebXR physics engine container for orbital gravity equations...",
        "Translating coordinates to VR stereoscopic camera rig orientation...",
        "Linking stereoscopic parallax channels (IPD offset: 64mm)...",
        "Deploying immersive VR scene. Synthesis complete!"
      ]
    },
    atom: {
      name: "Bohr's Atomic Structure",
      logs: [
        "Initializing textbook parser for Quantum Physics Section 12...",
        "Extracting atomic numbers, shells, and electron quantum energy levels...",
        "Querying Gemini API to outline lesson plan on Bohr Model quantum leaps...",
        "Synthesizing script: 'Observe electron orbits. Clicking energy bands triggers photon emission...'",
        "Generating central nucleus cluster models (protons and neutrons)...",
        "Calculating shell radii curves based on Rutherford-Bohr constants...",
        "Compiling glowing neon trail shaders for high-speed electron wavefunctions...",
        "Injecting event handlers for interactive shell electron transitions...",
        "Configuring stereoscopic spatial sound coordinates for quantum jumps...",
        "Deploying immersive atomic world. Synthesis complete!"
      ]
    },
    photosynthesis: {
      name: "Photosynthesis Process",
      logs: [
        "Initializing textbook parser for Plant Biology Chapter 7...",
        "Mapping chemical reactions: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2...",
        "Querying Gemini API to structure light-dependent vs Calvin cycle VR interactions...",
        "Synthesizing script: 'Identify stomata cells and trace carbon inputs entering the stroma...'",
        "Generating procedural 3D plant cell stomata and chloroplast model assemblies...",
        "Constructing photon stream particle emitters for solar energy inputs...",
        "Building gas molecule flow trajectories (CO2, O2, H2O)...",
        "Setting up interactive ATP/NADPH energy synthesis triggers...",
        "Configuring Left/Right projection matrix offsets for immersive cell volume...",
        "Deploying immersive molecular biology lab. Synthesis complete!"
      ]
    }
  };

  // 1. Handle Topic Card Clicks
  topicCards.forEach(card => {
    card.addEventListener("click", () => {
      if (isCompiling) return; // lock selection during compiling
      
      topicCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      
      const topic = card.getAttribute("data-topic");
      if (topic) {
        activeTopic = topic;
      }
    });
  });

  // 2. Compile button click
  if (compileBtn) {
    compileBtn.addEventListener("click", () => {
      if (isCompiling) return;
      startCompilation();
    });
  }

  // 3. Compile Console Simulator Loop
  function startCompilation() {
    isCompiling = true;
    isCompiled = false;
    compileBtn.disabled = true;
    compileBtn.innerHTML = `Compiling... <i class="fas fa-spinner fa-spin"></i>`;
    
    // Reset view states
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    compileHint.style.display = "flex";
    simulatedDisplay.classList.remove("active");
    
    // Show compile overlay logs
    compileOverlay.classList.add("active");
    compileLogs.innerHTML = "";
    compileBar.style.width = "0%";

    const logs = topicData[activeTopic].logs;
    let logIndex = 0;
    
    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        // Append log line
        const logLine = document.createElement("div");
        logLine.className = "log-line";
        logLine.innerHTML = `<span style="color: var(--aivr-cyan)">[AIVR-SYS]</span> ${logs[logIndex]}`;
        compileLogs.appendChild(logLine);
        compileLogs.scrollTop = compileLogs.scrollHeight;
        
        // Update bar percentage
        const pct = Math.floor(((logIndex + 1) / logs.length) * 100);
        compileBar.style.width = `${pct}%`;
        
        logIndex++;
      } else {
        // Compilation done
        clearInterval(interval);
        setTimeout(() => {
          endCompilation();
        }, 600);
      }
    }, 450); // delay per log line
  }

  function endCompilation() {
    isCompiling = false;
    isCompiled = true;
    compileBtn.disabled = false;
    compileBtn.innerHTML = `AI Generate VR Lesson <i class="fas fa-vr-cardboard"></i>`;
    
    compileOverlay.classList.remove("active");
    compileHint.style.display = "none";
    simulatedDisplay.classList.add("active");

    // Initialize Canvas Sizes
    resizeCanvases();
    
    // Start stereoscopic animation loop
    startSimulationLoop();
  }

  // Handle resizing canvases
  function resizeCanvases() {
    if (!canvasL || !canvasR) return;
    
    const parent = canvasL.parentElement;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    
    canvasL.width = w;
    canvasL.height = h;
    canvasR.width = w;
    canvasR.height = h;
  }
  
  window.addEventListener("resize", () => {
    if (isCompiled) {
      resizeCanvases();
    }
  });

  // 4. Simulator UI controls
  if (btnOrbit) {
    btnOrbit.addEventListener("click", () => {
      orbitSpeed = orbitSpeed === 1 ? 0 : 1;
      btnOrbit.classList.toggle("active");
    });
  }

  if (btnLabels) {
    btnLabels.addEventListener("click", () => {
      showLabels = !showLabels;
      btnLabels.classList.toggle("active");
    });
  }

  if (btnZoom) {
    btnZoom.addEventListener("click", () => {
      zoomScale = zoomScale === 1.0 ? 1.3 : (zoomScale === 1.3 ? 0.7 : 1.0);
      btnZoom.querySelector("span").textContent = `Zoom ${zoomScale}x`;
    });
  }

  // 5. Drawing Loops for Left / Right eye with Stereoscopic parallax offsets
  function startSimulationLoop() {
    orbitAngle = 0;
    
    function updateAndDraw() {
      // Rotate if not paused
      if (orbitSpeed > 0) {
        orbitAngle += 0.01;
      }
      
      const isLightMode = document.documentElement.getAttribute("data-theme") === "light";
      const bgCol = isLightMode ? "#f8fafc" : "#020306";
      
      // Clear canvases
      ctxL.fillStyle = bgCol;
      ctxL.fillRect(0, 0, canvasL.width, canvasL.height);
      
      ctxR.fillStyle = bgCol;
      ctxR.fillRect(0, 0, canvasR.width, canvasR.height);

      // Draw left eye scene (parallax offset positive)
      drawScene(ctxL, canvasL.width, canvasL.height, 8 * zoomScale);
      
      // Draw right eye scene (parallax offset negative)
      drawScene(ctxR, canvasR.width, canvasR.height, -8 * zoomScale);
      
      animationFrameId = requestAnimationFrame(updateAndDraw);
    }
    
    animationFrameId = requestAnimationFrame(updateAndDraw);
  }

  // Consolidated draw router
  function drawScene(ctx, w, h, eyeOffset) {
    ctx.save();
    
    // Zoom factor scaling
    ctx.translate(w / 2, h / 2);
    ctx.scale(zoomScale, zoomScale);
    
    // Apply IPD (Interpupillary Distance) offset along horizontal axis
    ctx.translate(eyeOffset, 0);

    const isLightMode = document.documentElement.getAttribute("data-theme") === "light";

    // Render based on topic
    if (activeTopic === "solar") {
      drawSolarSystem(ctx, isLightMode);
    } else if (activeTopic === "atom") {
      drawBohrModel(ctx, isLightMode);
    } else if (activeTopic === "photosynthesis") {
      drawPhotosynthesis(ctx, isLightMode);
    }

    ctx.restore();
  }

  // Topic A: Solar System Animation
  function drawSolarSystem(ctx, isLightMode) {
    // 1. Draw Sun (Yellow glow)
    const sunGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, 32);
    sunGlow.addColorStop(0, "#ffffff");
    sunGlow.addColorStop(0.3, "#ffeb3b");
    sunGlow.addColorStop(0.7, "#ff9800");
    sunGlow.addColorStop(1, "transparent");
    
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 2);
    ctx.fill();
    
    // Sun flare pulsing crown
    const flarePulse = Math.sin(orbitAngle * 5) * 2;
    ctx.strokeStyle = "rgba(255, 152, 0, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 26 + flarePulse, 0, Math.PI * 2);
    ctx.stroke();

    if (showLabels) {
      ctx.fillStyle = isLightMode ? "#0f172a" : "#ffffff";
      ctx.font = "bold 9px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SUN", 0, -42);
    }

    // Planets configurations: orbital radius, physical radius, speed mult, color, name
    const planets = [
      { rOrbit: 60, rBody: 4, speed: 2.2, color: "#9e9e9e", name: "Mercury" },
      { rOrbit: 90, rBody: 8, speed: 1.6, color: "#ffb74d", name: "Venus" },
      { rOrbit: 135, rBody: 9, speed: 1.0, color: "#4fc3f7", name: "Earth" },
      { rOrbit: 175, rBody: 6, speed: 0.8, color: "#e57373", name: "Mars" }
    ];

    planets.forEach(p => {
      // Draw Orbit line
      ctx.strokeStyle = isLightMode ? "rgba(2, 132, 199, 0.12)" : "rgba(0, 242, 254, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, p.rOrbit, 0, Math.PI * 2);
      ctx.stroke();
      
      // Calculate coordinates
      const angle = orbitAngle * p.speed;
      const px = Math.cos(angle) * p.rOrbit;
      const py = Math.sin(angle) * p.rOrbit;
      
      // Draw Planet body
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, p.rBody, 0, Math.PI * 2);
      ctx.fill();

      // Shadow overlay to simulate sunlight illumination
      const shadowGradient = ctx.createLinearGradient(px - p.rBody/2, py - p.rBody/2, px + p.rBody/2, py + p.rBody/2);
      shadowGradient.addColorStop(0, "rgba(255,255,255,0.15)");
      shadowGradient.addColorStop(0.5, "rgba(0,0,0,0.5)");
      shadowGradient.addColorStop(1, "rgba(0,0,0,0.95)");
      
      ctx.fillStyle = shadowGradient;
      ctx.beginPath();
      ctx.arc(px, py, p.rBody + 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Draw Earth's Moon
      if (p.name === "Earth") {
        const moonAngle = orbitAngle * 8;
        const mx = px + Math.cos(moonAngle) * 16;
        const my = py + Math.sin(moonAngle) * 16;
        
        ctx.fillStyle = isLightMode ? "#78909c" : "#cfd8dc";
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Labels
      if (showLabels) {
        ctx.fillStyle = isLightMode ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.8)";
        ctx.font = "8px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(p.name, px, py - p.rBody - 4);
      }
    });
  }

  // Topic B: Bohr Model Animation
  function drawBohrModel(ctx, isLightMode) {
    // 1. Draw Nucleus Cluster (Protons + Neutrons)
    const particles = [
      { x: -5, y: -4, color: "#ef5350", symbol: "+" }, // Proton (Red)
      { x: 4, y: -2, color: "#1e88e5", symbol: "" },  // Neutron (Blue)
      { x: -1, y: 5, color: "#ef5350", symbol: "+" },  // Proton
      { x: 3, y: 5, color: "#1e88e5", symbol: "" },   // Neutron
      { x: -4, y: 1, color: "#1e88e5", symbol: "" },  // Neutron
      { x: 2, y: -5, color: "#ef5350", symbol: "+" }   // Proton
    ];

    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      if (p.symbol) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 8px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(p.symbol, p.x, p.y + 3);
      }
    });

    if (showLabels) {
      ctx.fillStyle = isLightMode ? "#0f172a" : "#ffffff";
      ctx.font = "bold 9px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("NUCLEUS (3p + 3n)", 0, -22);
    }

    // Shell rings & electron counts
    const shells = [
      { radius: 55, electrons: 2, speed: 3.5, color: isLightMode ? "rgba(2, 132, 199, 0.25)" : "rgba(0, 242, 254, 0.25)" },
      { radius: 105, electrons: 1, speed: 2.0, color: isLightMode ? "rgba(124, 58, 237, 0.25)" : "rgba(155, 81, 224, 0.25)" }
    ];

    shells.forEach((shell, sIdx) => {
      // Draw shell boundary ring
      ctx.strokeStyle = shell.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]); // dashed quantum orbits
      ctx.beginPath();
      ctx.arc(0, 0, shell.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Orbit label
      if (showLabels && sIdx === 0) {
        ctx.fillStyle = isLightMode ? "rgba(2, 132, 199, 0.85)" : "rgba(0, 242, 254, 0.7)";
        ctx.font = "7px Outfit, sans-serif";
        ctx.fillText("n = 1 (Ground)", shell.radius - 8, -5);
      } else if (showLabels && sIdx === 1) {
        ctx.fillStyle = isLightMode ? "rgba(124, 58, 237, 0.85)" : "rgba(155, 81, 224, 0.7)";
        ctx.font = "7px Outfit, sans-serif";
        ctx.fillText("n = 2 (Excited)", shell.radius - 12, -5);
      }

      // Draw Orbiting Electrons
      for (let i = 0; i < shell.electrons; i++) {
        const baseAngle = (Math.PI * 2 / shell.electrons) * i;
        const angle = baseAngle + (orbitAngle * shell.speed);
        
        const ex = Math.cos(angle) * shell.radius;
        const ey = Math.sin(angle) * shell.radius;
        
        // Electron glow halo
        const eGlow = ctx.createRadialGradient(ex, ey, 1, ex, ey, 8);
        eGlow.addColorStop(0, "#ffffff");
        eGlow.addColorStop(0.3, sIdx === 0 ? "#00f2fe" : "#9b51e0");
        eGlow.addColorStop(1, "transparent");
        
        ctx.fillStyle = eGlow;
        ctx.beginPath();
        ctx.arc(ex, ey, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = sIdx === 0 ? "#00f2fe" : "#9b51e0";
        ctx.beginPath();
        ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
        ctx.fill();

        if (showLabels) {
          ctx.fillStyle = isLightMode ? "#0f172a" : "#ffffff";
          ctx.font = "8px Outfit, sans-serif";
          ctx.fillText("e-", ex, ey - 6);
        }
      }
    });
  }

  // Topic C: Photosynthesis Animation
  function drawPhotosynthesis(ctx, isLightMode) {
    // 1. Draw Simulated Leaf Chloroplast boundary outline on left
    ctx.strokeStyle = isLightMode ? "rgba(22, 163, 74, 0.25)" : "rgba(57, 255, 20, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-80, 0, 60, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = isLightMode ? "rgba(22, 163, 74, 0.05)" : "rgba(57, 255, 20, 0.03)";
    ctx.fill();

    if (showLabels) {
      ctx.fillStyle = isLightMode ? "#16a34a" : "#39ff14";
      ctx.font = "bold 9px Outfit, sans-serif";
      ctx.fillText("CHLOROPLAST MEMBRANE", -80, -68);
    }

    // Thylakoid stacks (stacked green pills)
    const stacks = [
      { x: -105, y: -20, height: 4 },
      { x: -75, y: -30, height: 5 },
      { x: -85, y: 15, height: 4 },
      { x: -60, y: 5, height: 3 }
    ];

    stacks.forEach(st => {
      ctx.fillStyle = isLightMode ? "rgba(22, 101, 52, 0.85)" : "rgba(46, 125, 50, 0.85)";
      ctx.strokeStyle = isLightMode ? "rgba(22, 163, 74, 0.4)" : "rgba(57, 255, 20, 0.3)";
      ctx.lineWidth = 1;
      
      for (let hIdx = 0; hIdx < st.height; hIdx++) {
        const py = st.y - (hIdx * 4);
        ctx.beginPath();
        ctx.ellipse(st.x, py, 14, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    });

    if (showLabels) {
      ctx.fillStyle = isLightMode ? "#475569" : "rgba(255,255,255,0.7)";
      ctx.font = "8px Outfit, sans-serif";
      ctx.fillText("Thylakoids", -80, 32);
    }

    // 2. Draw solar light rays entering chloroplast
    const rayProgress = (orbitAngle * 2) % 1;
    const rayLength = 120;
    
    ctx.strokeStyle = isLightMode ? "rgba(202, 138, 4, 0.5)" : "rgba(255, 235, 59, 0.4)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.lineDashOffset = -orbitAngle * 40;
    
    ctx.beginPath();
    ctx.moveTo(-180, -110);
    ctx.lineTo(-90, -30);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    if (showLabels) {
      ctx.fillStyle = isLightMode ? "#ca8a04" : "#ffeb3b";
      ctx.font = "bold 8px Outfit, sans-serif";
      ctx.fillText("Light Energy (Photons)", -165, -92);
    }

    // 3. Floating input gas (Carbon Dioxide: CO2) entering leaf
    const gasProgress = (orbitAngle * 0.4) % 1.0;
    
    // Draw Carbon Dioxide
    const co2X = 80 - (gasProgress * 150);
    const co2Y = -50 + (Math.sin(orbitAngle * 3) * 10);
    
    drawGasMolecule(ctx, co2X, co2Y, "#ff3d00", "#78909c", "CO2", isLightMode);
    
    // Draw Water entering
    const h2oX = 80 - (gasProgress * 150);
    const h2oY = 60 + (Math.cos(orbitAngle * 2.5) * 8);
    
    drawGasMolecule(ctx, h2oX, h2oY, "#1e88e5", isLightMode ? "#475569" : "#ffffff", "H2O", isLightMode);

    // 4. Output gas (Oxygen: O2) exiting leaf from reaction
    const releaseProgress = ((orbitAngle * 0.4) + 0.5) % 1.0;
    const o2X = -70 + (releaseProgress * 150);
    const o2Y = -10 + (Math.sin(orbitAngle * 2) * 15);
    
    drawGasMolecule(ctx, o2X, o2Y, "#10b981", "#10b981", "O2", isLightMode);

    // Draw Sugar / Glucose
    const gluX = -50 + (releaseProgress * 110);
    const gluY = 40 + (Math.cos(orbitAngle * 1.5) * 10);
    drawGlucoseSymbol(ctx, gluX, gluY, isLightMode);
  }

  function drawGasMolecule(ctx, x, y, atomColor1, atomColor2, label, isLightMode) {
    // Draw connections
    ctx.strokeStyle = isLightMode ? "rgba(15, 23, 42, 0.15)" : "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x + 6, y);
    ctx.stroke();

    // Atom 1
    ctx.fillStyle = atomColor1;
    ctx.beginPath();
    ctx.arc(x - 6, y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Atom 2
    ctx.fillStyle = atomColor2;
    ctx.beginPath();
    ctx.arc(x + 6, y, 4, 0, Math.PI * 2);
    ctx.fill();

    if (showLabels) {
      ctx.fillStyle = isLightMode ? "#0f172a" : "#ffffff";
      ctx.font = "bold 8px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y - 8);
    }
  }

  function drawGlucoseSymbol(ctx, x, y, isLightMode) {
    // Draw simplified hexagon
    ctx.fillStyle = isLightMode ? "#d97706" : "#ffb300";
    ctx.beginPath();
    for (let side = 0; side < 6; side++) {
      const angle = (Math.PI * 2 / 6) * side;
      const hx = x + Math.cos(angle) * 7;
      const hy = y + Math.sin(angle) * 7;
      if (side === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.fill();

    if (showLabels) {
      ctx.fillStyle = isLightMode ? "#d97706" : "#ffb300";
      ctx.font = "bold 7px Outfit, sans-serif";
      ctx.fillText("Glucose", x, y - 10);
    }
  }

  // --- THEME TOGGLE CONTROL ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

  // Set initial icon on load
  const savedTheme = localStorage.getItem("ramesh_portfolio_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeIcon) {
    themeIcon.className = savedTheme === "light" ? "fas fa-sun" : "fas fa-moon";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("ramesh_portfolio_theme", newTheme);
      
      if (themeIcon) {
        themeIcon.className = newTheme === "light" ? "fas fa-sun" : "fas fa-moon";
      }
    });
  }
});
