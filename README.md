<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Free, student-focused learning resources for ISC Class 11 and 12 students.">
    <meta name="theme-color" content="#007a78">
    <title>Becules — Learn Smarter. Achieve Greater.</title>
    <style>
        :root {
            --bg-color: #f4fbfb;
            --primary: #007a78;
            --primary-dark: #005f5e;
            --text-main: #1a2e2e;
            --text-muted: #5a7373;
            --card-bg: #ffffff;
            --border-color: #d1e8e8;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body, button, input { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        button, a { -webkit-tap-highlight-color: transparent; }
        button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid rgba(0,122,120,.35); outline-offset: 3px; }
        button:disabled { cursor: not-allowed; opacity: .65; }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        /* Header & Navigation */
        header {
            position: sticky;
            top: 0;
            background: rgba(244, 251, 251, 0.95);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--border-color);
            z-index: 1000;
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1050px;
            width: 90%;
            margin: 0 auto;
            padding: 18px 0;
        }

        .logo {
            font-size: 22px;
            font-weight: 700;
            color: var(--text-main);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
        }

        .logo span {
            color: var(--primary);
        }

        nav {
            display: flex;
            gap: 28px;
        }

        nav a {
            text-decoration: none;
            color: var(--text-muted);
            font-size: 15px;
            font-weight: 500;
            transition: color 0.2s;
            cursor: pointer;
        }

        nav a:hover, nav a.active {
            color: var(--primary);
        }

        /* Main Sections Layout */
        .page-section {
            max-width: 980px;
            width: min(90%, 980px);
            margin: 52px auto;
            min-height: 65vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            animation: section-enter 220ms ease-out;
        }
        @keyframes section-enter { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        /* Home Section */
        .badge {
            display: inline-block;
            background: rgba(0, 122, 120, 0.08);
            color: var(--primary);
            font-size: 12px;
            font-weight: 600;
            padding: 6px 14px;
            border-radius: 20px;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
            text-transform: uppercase;
        }

        h1 {
            font-size: 42px;
            font-weight: 800;
            color: var(--text-main);
            line-height: 1.2;
            margin-bottom: 16px;
        }

        p.subtitle {
            font-size: 18px;
            color: var(--text-muted);
            line-height: 1.5;
            max-width: 650px;
            margin-bottom: 36px;
        }

        .actions {
            display: flex;
            gap: 16px;
            margin-bottom: 50px;
        }

        .btn {
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            padding: 12px 24px;
            border-radius: 8px;
            transition: all 0.2s;
            cursor: pointer;
            border: none;
            display: inline-block;
        }

        .btn-primary {
            background-color: var(--primary);
            color: #fff;
        }

        .btn-primary:hover {
            background-color: var(--primary-dark);
        }

        .btn-secondary {
            background-color: #ffffff;
            color: var(--text-main);
            border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
            border-color: var(--primary);
            color: var(--primary);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
        }

        .feature-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 24px;
            border-radius: 14px;
            box-shadow: 0 4px 18px rgba(20,70,70,.035);
            cursor: pointer;
            text-align: left;
            color: inherit;
            width: 100%;
            transition: transform .2s, border-color .2s, box-shadow .2s;
        }

        .feature-card:hover { transform: translateY(-3px); border-color: var(--primary); box-shadow: 0 8px 24px rgba(20,70,70,.08); }
        .feature-card:focus-visible { outline: 3px solid rgba(0,122,120,.35); outline-offset: 3px; }

        .feature-card h3 {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-main);
            margin-bottom: 8px;
        }

        .feature-card p {
            font-size: 14px;
            color: var(--text-muted);
            line-height: 1.4;
        }

        /* Generic Section Styling */
        h2.section-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            color: var(--text-main);
        }

        .section-desc {
            font-size: 16px;
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 30px;
        }

        /* Resources Tab Styling */
        .class-group {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
        }

        .class-group h3 {
            font-size: 18px;
            color: var(--primary);
            margin-bottom: 14px;
        }

        .subject-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .subject-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #edf6f6;
        }

        .subject-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .resource-links {
            display: flex;
            gap: 8px;
        }

        .resource-links button {
            font-size: 13px; font-weight: 650; color: var(--primary);
            background: rgba(0,122,120,.07); padding: 8px 12px; min-height: 36px;
            border-radius: 7px; border: 1px solid transparent; cursor: pointer;
            transition: background .2s, border-color .2s;
        }

        .resource-links button:hover, .resource-links button[aria-pressed="true"] { background: rgba(0,122,120,.14); border-color: rgba(0,122,120,.25); }

        /* Content Boxes */
        .content-box {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .content-box ul {
            margin-top: 15px;
            padding-left: 20px;
            color: var(--text-muted);
            line-height: 1.6;
        }

        /* Interactive Dynamic Viewer Area */
        .viewer-container {
            margin-top: 20px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            padding: 24px;
            border-radius: 12px;
            display: none;
        }

        .viewer-container h3 {
            color: var(--primary);
            margin-bottom: 10px;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 24px 0;
            font-size: 13px;
            color: var(--text-muted);
            border-top: 1px solid var(--border-color);
            max-width: 1050px;
            width: 90%;
            margin: 0 auto;
        }

        .viewer-container p { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-top: 6px; }
        .status-message { margin-top: 14px; padding: 12px 14px; border-radius: 8px; background: rgba(0,122,120,.07); color: var(--primary-dark); font-size: 14px; line-height: 1.5; }
        .contribute-form { margin-top: 22px; display: grid; gap: 14px; }
        .contribute-form label { display: grid; gap: 7px; font-size: 14px; font-weight: 600; }
        .contribute-form input { width: 100%; border: 1px solid var(--border-color); border-radius: 8px; padding: 11px 12px; background: #fff; color: var(--text-main); font-size: 14px; }
        .muted-small { color: var(--text-muted); font-size: 13px; line-height: 1.5; }

        @media (max-width: 768px) {
            .nav-container { align-items: flex-start; flex-direction: column; gap: 12px; padding: 14px 0; }
            nav { width: 100%; gap: 18px; overflow-x: auto; padding: 2px 0 5px; }
            nav a { white-space: nowrap; font-size: 14px; }
            .page-section { margin: 36px auto; min-height: 60vh; }
            .features-grid { grid-template-columns: 1fr; }
            h1 { font-size: clamp(30px, 8vw, 40px); }
            h2.section-title { font-size: 28px; }
            .subject-item { flex-direction: column; align-items: flex-start; gap: 10px; padding-bottom: 14px; }
            .resource-links { flex-wrap: wrap; }
            .content-box, .class-group { padding: 20px; }
        }
        @media (max-width: 420px) {
            .actions { flex-direction: column; align-items: stretch; }
            .actions .btn { width: 100%; }
            .resource-links button { padding-inline: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
    </style>
</head>
<body>

    <!-- Header Navigation -->
    <header>
        <div class="nav-container">
            <a onclick="showSection('home')" class="logo">Becules<span>.</span></a>
            <nav>
                <a onclick="showSection('home')" class="active" id="nav-home">Home</a>
                <a onclick="showSection('resources')" id="nav-resources">Resources</a>
                <a onclick="showSection('about')" id="nav-about">About Us</a>
                <a onclick="showSection('contribute')" id="nav-contribute">Contribute</a>
            </nav>
        </div>
    </header>

    <!-- 1. Home Section -->
    <section id="home" class="page-section">
        <div>
            <div class="badge">ISC Class 11 & 12</div>
            <h1>Make Every Study Session Count.</h1>
            <p class="subtitle">Chapter-wise MCQs, competency-based questions, and clean notes built to help you prepare smarter and ace your exams.</p>
            
            <div class="actions">
                <button class="btn btn-primary" onclick="showSection('resources')">Explore Resources →</button>
                <button class="btn btn-secondary" onclick="showSection('contribute')">Contribute Notes</button>
            </div>

            <div class="features-grid">
                <button type="button" class="feature-card" onclick="showSection('resources')">
                    <h3>Chapter MCQs</h3><p>Focused practice organised by class, subject, and chapter.</p>
                </button>
                <button type="button" class="feature-card" onclick="showSection('resources')">
                    <h3>Competency Questions</h3><p>Build confidence with application-focused learning.</p>
                </button>
                <button type="button" class="feature-card" onclick="showSection('resources')">
                    <h3>Clean Study Notes</h3><p>Keep key concepts and revision material organised in one place.</p>
                </button>
            </div>
        </div>
    </section>

    <!-- 2. Resources Section -->
    <section id="resources" class="page-section" style="display: none;">
        <div>
            <h2 class="section-title">ISC Study Resources</h2>
            <p class="section-desc">Select your class and subject to instantly access revision notes, MCQs, and competency-based questions.</p>

            <div class="class-group">
                <h3>📦 ISC Class 11</h3>
                <div class="subject-list">
                    <div class="subject-item">
                        <span>📐 Physics</span>
                        <div class="resource-links">
                            <button onclick="openResource('Class 11 Physics', 'Notes')">Notes</button>
                            <button onclick="openResource('Class 11 Physics', 'MCQs')">MCQs</button>
                            <button onclick="openResource('Class 11 Physics', 'CBQs')">CBQs</button>
                        </div>
                    </div>
                    <div class="subject-item">
                        <span>🧪 Chemistry</span>
                        <div class="resource-links">
                            <button onclick="openResource('Class 11 Chemistry', 'Notes')">Notes</button>
                            <button onclick="openResource('Class 11 Chemistry', 'MCQs')">MCQs</button>
                            <button onclick="openResource('Class 11 Chemistry', 'CBQs')">CBQs</button>
                        </div>
                    </div>
                    <div class="subject-item">
                        <span>➗ Mathematics</span>
                        <div class="resource-links">
                            <button onclick="openResource('Class 11 Mathematics', 'Notes')">Notes</button>
                            <button onclick="openResource('Class 11 Mathematics', 'MCQs')">MCQs</button>
                            <button onclick="openResource('Class 11 Mathematics', 'CBQs')">CBQs</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="class-group">
                <h3>📦 ISC Class 12</h3>
                <div class="subject-list">
                    <div class="subject-item">
                        <span>📐 Physics</span>
                        <div class="resource-links">
                            <button onclick="openResource('Class 12 Physics', 'Notes')">Notes</button>
                            <button onclick="openResource('Class 12 Physics', 'MCQs')">MCQs</button>
                            <button onclick="openResource('Class 12 Physics', 'CBQs')">CBQs</button>
                        </div>
                    </div>
                    <div class="subject-item">
                        <span>🧪 Chemistry</span>
                        <div class="resource-links">
                            <button onclick="openResource('Class 12 Chemistry', 'Notes')">Notes</button>
                            <button onclick="openResource('Class 12 Chemistry', 'MCQs')">MCQs</button>
                            <button onclick="openResource('Class 12 Chemistry', 'CBQs')">CBQs</button>
                        </div>
                    </div>
                    <div class="subject-item">
                        <span>➗ Mathematics</span>
                        <div class="resource-links">
                            <button onclick="openResource('Class 12 Mathematics', 'Notes')">Notes</button>
                            <button onclick="openResource('Class 12 Mathematics', 'MCQs')">MCQs</button>
                            <button onclick="openResource('Class 12 Mathematics', 'CBQs')">CBQs</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dynamic Interactive Viewer Box -->
            <div id="viewer" class="viewer-container">
                <h3 id="viewer-title">Selected Resource</h3>
                <p id="viewer-desc">Choose a class, subject, and resource type to view its status.</p>
                <p id="viewer-status" class="status-message" role="status">Study materials have not been added here yet.</p>
            </div>
        </div>
    </section>

    <!-- 3. About Us Section -->
    <section id="about" class="page-section" style="display: none;">
        <div class="content-box">
            <h2 class="section-title">About Becules</h2>
            <p class="section-desc" style="margin-bottom: 15px;">
                <strong>Open Source. Not for Profit. Student-Focused.</strong>
            </p>
            <p class="section-desc">
                Becules is a free, open-learning initiative built for ISC Class 11 and 12 students. We know how overwhelming heavy textbooks and unorganized guides can get during exam season. Our mission is to strip away the clutter and give you crisp, high-quality revision materials that actually help you score.
            </p>
            <ul>
                <li>No paywalls or hidden subscriptions.</li>
                <li>Zero distractions.</li>
                <li>Built by students, for students.</li>
            </ul>
        </div>
    </section>

    <!-- 4. Contribute Section -->
    <section id="contribute" class="page-section" style="display: none;">
        <div class="content-box">
            <h2 class="section-title">Contribute to Becules</h2>
            <p class="section-desc">
                Got neat notes, formula sheets, or solved problem sets that helped you ace a test? Share them with fellow ISC peers across the country!
            </p>
            <ul>
                <li><strong>What you can share:</strong> Handwritten or typed chapter summaries, shortcut sheets, or MCQs.</li>
                <li><strong>How to submit:</strong> Upload files via our quick submission form or send a pull request on GitHub.</li>
            </ul>
            <form id="contribution-form" class="contribute-form">
                <label for="contributor-name">Your name (optional)
                    <input id="contributor-name" name="name" type="text" maxlength="80" autocomplete="name" placeholder="Enter your name">
                </label>
                <label for="contribution-title">Material title
                    <input id="contribution-title" name="title" type="text" maxlength="120" required placeholder="e.g. Laws of Motion — summary">
                </label>
                <label for="contribution-file">Choose a file
                    <input id="contribution-file" name="file" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt">
                </label>
                <p class="muted-small">This page is a front-end prototype. Submissions are not uploaded or stored until a submission service is connected.</p>
                <button class="btn btn-primary" type="submit">Prepare Contribution</button>
                <p id="contribution-status" class="status-message" role="status" hidden></p>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        © 2026 Becules · Learn Smarter. Achieve Greater.
    </footer>

    <script>
        "use strict";
        const sectionIds = ["home", "resources", "about", "contribute"];

        function showSection(sectionId) {
            if (!sectionIds.includes(sectionId)) return;
            sectionIds.forEach((id) => {
                const section = document.getElementById(id);
                const navLink = document.getElementById("nav-" + id);
                const active = id === sectionId;
                section.style.display = active ? "flex" : "none";
                section.setAttribute("aria-hidden", String(!active));
                if (navLink) {
                    navLink.classList.toggle("active", active);
                    if (active) navLink.setAttribute("aria-current", "page");
                    else navLink.removeAttribute("aria-current");
                }
            });
            if (window.location.hash !== "#" + sectionId) history.replaceState(null, "", "#" + sectionId);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        function openResource(subject, type, button) {
            document.querySelectorAll(".resource-links button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
            document.getElementById("viewer").style.display = "block";
            document.getElementById("viewer-title").textContent = subject + " — " + type;
            document.getElementById("viewer-desc").textContent = "Selected resource: " + type + " for " + subject + ".";
            document.getElementById("viewer-status").textContent = "This resource area is ready to be connected to the relevant study material. No notes, MCQs, or competency questions have been added yet.";
            document.getElementById("viewer").scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        document.querySelectorAll(".resource-links button").forEach((button) => {
            button.setAttribute("aria-pressed", "false");
            button.addEventListener("click", () => {
                const row = button.closest(".subject-item");
                const subject = row.querySelector("span").textContent.replace(/^\S+\s*/, "").trim();
                const className = button.closest(".class-group").querySelector("h3").textContent.includes("12") ? "Class 12" : "Class 11";
                openResource(className + " " + subject, button.textContent.trim(), button);
            });
        });

        document.getElementById("contribution-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const titleInput = document.getElementById("contribution-title");
            const fileInput = document.getElementById("contribution-file");
            const status = document.getElementById("contribution-status");
            const title = titleInput.value.trim();
            if (!title) { titleInput.focus(); return; }
            const file = fileInput.files && fileInput.files[0];
            status.hidden = false;
            status.textContent = file
                ? 'Contribution details prepared for "' + title + '" with file "' + file.name + '". Nothing has been uploaded; connect a backend to enable submissions.'
                : 'Contribution details prepared for "' + title + '". Nothing has been submitted or stored; connect a backend to enable submissions.';
        });

        const initialSection = window.location.hash.slice(1);
        showSection(sectionIds.includes(initialSection) ? initialSection : "home");
    </script>
</body>
</html>
