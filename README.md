<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            scroll-behavior: smooth;
        }

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
            max-width: 850px;
            width: 90%;
            margin: 60px auto;
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

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
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .feature-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
            cursor: pointer;
            transition: transform 0.2s, border-color 0.2s;
        }

        .feature-card:hover {
            transform: translateY(-3px);
            border-color: var(--primary);
        }

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
            font-size: 13px;
            font-weight: 600;
            color: var(--primary);
            background: rgba(0, 122, 120, 0.06);
            padding: 6px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            transition: background 0.2s;
        }

        .resource-links button:hover {
            background: rgba(0, 122, 120, 0.18);
        }

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

        /* Responsive Mobile Layout */
        @media (max-width: 768px) {
            .features-grid {
                grid-template-columns: 1fr;
            }
            h1 {
                font-size: 32px;
            }
            .subject-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            nav {
                gap: 14px;
            }
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
                <div class="feature-card" onclick="showSection('resources')">
                    <h3>Chapter MCQs</h3>
                    <p>Test your knowledge instantly with focused questions for every chapter.</p>
                </div>
                <div class="feature-card" onclick="showSection('resources')">
                    <h3>Competency Questions</h3>
                    <p>Build critical thinking and real-world application skills easily.</p>
                </div>
                <div class="feature-card" onclick="showSection('resources')">
                    <h3>Clean Study Notes</h3>
                    <p>Revise key definitions, formulas, and concepts in one clear place.</p>
                </div>
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
                <p id="viewer-desc" style="color: var(--text-muted); font-size: 14px; margin-top: 6px;">Content packages are loading smoothly for your curriculum...</p>
                <button class="btn btn-primary" style="margin-top: 15px; font-size: 13px; padding: 8px 16px;" onclick="alert('Downloading/Opening Chapter PDF package!')">Download / View PDF</button>
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
            <div style="margin-top: 25px;">
                <button class="btn btn-primary" onclick="triggerUploadModal()">Upload Notes / Submit Material →</button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        © 2026 Becules · Learn Smarter. Achieve Greater.[span_0](start_span)[span_0](end_span)
    </footer>

    <!-- Interactive Navigation and Widget Script -->
    <script>
        function showSection(sectionId) {
            document.getElementById('home').style.display = 'none';
            document.getElementById('resources').style.display = 'none';
            document.getElementById('about').style.display = 'none';
            document.getElementById('contribute').style.display = 'none';

            document.getElementById('nav-home').classList.remove('active');
            document.getElementById('nav-resources').classList.remove('active');
            document.getElementById('nav-about').classList.remove('active');
            document.getElementById('nav-contribute').classList.remove('active');

            document.getElementById(sectionId).style.display = 'flex';
            document.getElementById('nav-' + sectionId).classList.add('active');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function openResource(subject, type) {
            const viewer = document.getElementById('viewer');
            const title = document.getElementById('viewer-title');
            const desc = document.getElementById('viewer-desc');

            viewer.style.display = 'block';
            title.innerText = `${subject} — ${type}`;
            desc.innerText = `Accessing curated chapter modules, practice sets, and verified ${type.toLowerCase()} materials for ${subject}.`;
            
            viewer.scrollIntoView({ behavior: 'smooth' });
        }

        function triggerUploadModal() {
            let userNote = prompt("Enter your name or note title to share your contribution:");
            if (userNote) {
                alert(`Thank you, ${userNote}! Your contribution request has been registered. You can connect via GitHub or upload files directly.`);
            }
        }
    </script>
</body>
</html>
