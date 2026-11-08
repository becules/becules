// Application State
const state = {
    currentPage: 'home',
    selectedClass: 12,
    selectedChapterIdx: 0,
    curriculumData: null,
    userAnswers: {},     // Key: `${cls}_${chapIdx}_${qIdx}` -> { selected: int, isCorrect: bool }
    activeTab: 'quiz'    // 'notes' or 'quiz'
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadCurriculum();
});

// -----------------------------------------------------------------------------
// 1. Theme Toggle System
// -----------------------------------------------------------------------------
function initTheme() {
    const saved = localStorage.getItem('becules_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcons(saved === 'dark');
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('becules_theme', next);
    updateThemeIcons(next === 'dark');
    showToast(`Switched to ${next} mode`);
}

function updateThemeIcons(isDark) {
    const icon = document.getElementById('theme-icon');
    const mobIcon = document.getElementById('mobile-theme-icon');
    const cls = isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-600';
    if (icon) icon.className = cls;
    if (mobIcon) mobIcon.className = cls;
}

// -----------------------------------------------------------------------------
// 2. Fetch Curriculum & Questions (questions.json)
// -----------------------------------------------------------------------------
async function loadCurriculum() {
    try {
        const res = await fetch('questions.json');
        if (!res.ok) throw new Error("questions.json could not be fetched.");
        state.curriculumData = await res.json();
        renderMain();
    } catch (err) {
        console.error("Data Load Error:", err);
        document.getElementById('main-content').innerHTML = `
            <div class="max-w-md mx-auto px-4 py-16 text-center">
                <i class="fa-solid fa-triangle-exclamation text-3xl text-rose-500 mb-3"></i>
                <h3 class="font-bold text-slate-800 dark:text-white">Unable to Load Questions</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Make sure <code>questions.json</code> exists in the root folder of your GitHub repository.</p>
            </div>
        `;
    }
}

// -----------------------------------------------------------------------------
// 3. Navigation
// -----------------------------------------------------------------------------
function navigateTo(page) {
    state.currentPage = page;
    updateNavUI();
    renderMain();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavUI() {
    ['home', 'resources', 'about', 'contribute'].forEach(p => {
        const btn = document.getElementById(`nav-${p}`);
        if (!btn) return;
        if (p === state.currentPage) {
            btn.className = "text-sm font-bold text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 pb-1";
        } else {
            btn.className = "text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition";
        }
    });
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// -----------------------------------------------------------------------------
// 4. Page View Renderers
// -----------------------------------------------------------------------------
function renderMain() {
    const container = document.getElementById('main-content');
    if (!state.curriculumData && state.currentPage === 'resources') return;

    if (state.currentPage === 'home') {
        container.innerHTML = renderHomePage();
        initRequestVotes();
    } else if (state.currentPage === 'resources') {
        container.innerHTML = renderResourcesPage();
    } else if (state.currentPage === 'about') {
        container.innerHTML = renderAboutPage();
    } else if (state.currentPage === 'contribute') {
        container.innerHTML = renderContributePage();
    }
}

// --- HOME PAGE ---
function renderHomePage() {
    return `
        <div class="max-w-5xl mx-auto px-4 py-12 sm:py-16">
            <!-- Badge -->
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-6">
                <i class="fa-solid fa-bolt text-amber-500"></i>
                <span>ISC CLASS 11 & 12 • NIGHT-BEFORE SPRINT</span>
            </div>

            <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Last-Minute Physics Revision.<br>
                <span class="text-teal-600 dark:text-teal-400">Formula Sheets & Targeted Drills.</span>
            </h1>

            <p class="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
                Skip long textbook explanations. Pick your chapter, skim the high-yield formula cheat sheet, and test yourself on high-probability exam questions in under 15 minutes.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
                <button onclick="navigateTo('resources')" class="px-6 py-3 rounded-xl font-bold text-white bg-teal-700 hover:bg-teal-800 transition flex items-center space-x-2 shadow-sm">
                    <span>Open Study Arena</span>
                    <i class="fa-solid fa-arrow-right text-xs"></i>
                </button>
                <button onclick="navigateTo('contribute')" class="px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                    Contribute Notes
                </button>
            </div>

            <!-- Subject Cards & Request Access Block -->
            <div class="mt-14">
                <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Choose Your Subject</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <!-- Physics Card (Live) -->
                    <div onclick="navigateTo('resources')" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-500/70 shadow-sm hover:border-teal-500 cursor-pointer transition group glow-card">
                        <div class="flex items-center justify-between">
                            <div class="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center text-lg font-bold">
                                <i class="fa-solid fa-atom"></i>
                            </div>
                            <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                Active Now
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-white mt-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">Physics</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Full Class 11 & 12 formula sheets and concept questions.</p>
                    </div>

                    <!-- Chemistry Card (Locked with Request Tracker starting at 0) -->
                    <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between">
                                <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center text-lg font-bold">
                                    <i class="fa-solid fa-flask"></i>
                                </div>
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                    In Queue
                                </span>
                            </div>
                            <h3 class="text-base font-bold text-slate-900 dark:text-white mt-3">Chemistry</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Organic conversion roadmaps & physical formula sheets.</p>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <button onclick="requestSubjectVote('chemistry')" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-700 transition flex items-center space-x-1.5">
                                <i class="fa-regular fa-thumbs-up"></i>
                                <span>Request Access</span>
                            </button>
                            <span id="vote-count-chemistry" class="font-mono text-xs font-bold text-slate-500">0 requests</span>
                        </div>
                    </div>

                    <!-- Mathematics Card (Locked with Request Tracker starting at 0) -->
                    <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between">
                                <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-500 flex items-center justify-center text-lg font-bold">
                                    <i class="fa-solid fa-calculator"></i>
                                </div>
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                    In Queue
                                </span>
                            </div>
                            <h3 class="text-base font-bold text-slate-900 dark:text-white mt-3">Mathematics</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Calculus rules, vector shortcuts, and high-probability problem sets.</p>
                        </div>
                        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <button onclick="requestSubjectVote('mathematics')" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-700 transition flex items-center space-x-1.5">
                                <i class="fa-regular fa-thumbs-up"></i>
                                <span>Request Access</span>
                            </button>
                            <span id="vote-count-mathematics" class="font-mono text-xs font-bold text-slate-500">0 requests</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

// --- RESOURCES & PRACTICAL CRAMMING ARENA ---
function renderResourcesPage() {
    const chapters = (state.curriculumData.physics && state.curriculumData.physics[state.selectedClass]) || [];
    const activeChapter = chapters[state.selectedChapterIdx] || chapters[0];

    return `
        <div class="max-w-6xl mx-auto px-4 py-8">
            <!-- Top Controls Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <!-- Class Switcher -->
                <div class="inline-flex p-1 rounded-xl bg-slate-200 dark:bg-slate-800 select-none">
                    <button onclick="selectClass(11)" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${state.selectedClass === 11 ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}">
                        Class XI
                    </button>
                    <button onclick="selectClass(12)" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${state.selectedClass === 12 ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}">
                        Class XII
                    </button>
                </div>

                <div class="text-xs text-slate-500 dark:text-slate-400">
                    <i class="fa-solid fa-clock text-amber-500 mr-1"></i> Designed for rapid chapter revision before tests
                </div>
            </div>

            <!-- Two-Column Workspace -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <!-- Left Sidebar: Chapter Selector -->
                <aside class="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                    <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Physics Chapters</span>
                        <span class="text-xs font-bold text-teal-600 dark:text-teal-400">${chapters.length} Total</span>
                    </div>

                    <div class="space-y-1.5 max-h-[580px] overflow-y-auto custom-scrollbar pr-1">
                        ${chapters.map((ch, idx) => `
                            <button onclick="selectChapter(${idx})" class="w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${idx === state.selectedChapterIdx ? 'bg-teal-50 dark:bg-teal-950/70 border border-teal-500 text-teal-800 dark:text-teal-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'}">
                                <span class="truncate pr-2">${idx + 1}. ${ch.title}</span>
                                <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                            </button>
                        `).join('')}
                    </div>
                </aside>

                <!-- Right Workspace: Study Materials + Live MCQs -->
                <section class="lg:col-span-8 space-y-6">
                    
                    <!-- Chapter Header Box -->
                    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="text-[11px] font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                                Chapter ${state.selectedChapterIdx + 1} • Class ${state.selectedClass}
                            </span>
                            
                            <!-- Tab Switcher between Revision Notes and Practice Drill -->
                            <div class="flex space-x-2 text-xs font-bold">
                                <button onclick="setTab('notes')" class="px-3 py-1.5 rounded-lg border transition ${state.activeTab === 'notes' ? 'bg-teal-700 text-white border-teal-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent'}">
                                    <i class="fa-solid fa-book-open mr-1"></i> Revision Notes
                                </button>
                                <button onclick="setTab('quiz')" class="px-3 py-1.5 rounded-lg border transition ${state.activeTab === 'quiz' ? 'bg-teal-700 text-white border-teal-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent'}">
                                    <i class="fa-solid fa-circle-question mr-1"></i> Practice MCQs (${activeChapter.questions ? activeChapter.questions.length : 0})
                                </button>
                            </div>
                        </div>

                        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                            ${activeChapter.title}
                        </h2>

                        <!-- TAB 1: REVISION NOTES & CHEAT-SHEETS -->
                        ${state.activeTab === 'notes' ? `
                            <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                                <div class="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60">
                                    <h4 class="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-200 mb-1">
                                        <i class="fa-solid fa-lightbulb mr-1"></i> Last-Minute Key Concept & Formulas
                                    </h4>
                                    <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                        ${activeChapter.summary || "High-yield summary points and core formulas are being formatted for this chapter. Check the attached links below for quick download."}
                                    </p>
                                </div>

                                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mt-4">Attached Chapter Resources</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                    ${(activeChapter.materials || []).map(mat => `
                                        <a href="${mat.url}" target="_blank" class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 transition group">
                                            <span class="flex items-center space-x-2">
                                                <i class="${mat.icon || 'fa-solid fa-file-pdf'} text-teal-600 dark:text-teal-400"></i>
                                                <span>${mat.label}</span>
                                            </span>
                                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 group-hover:text-teal-500"></i>
                                        </a>
                                    `).join('') || `
                                        <div class="col-span-2 text-xs text-slate-400 dark:text-slate-500 italic p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                            No external PDF attached yet. Use the "Contribute" page to upload notes for this chapter!
                                        </div>
                                    `}
                                </div>
                            </div>
                        ` : ''}

                        <!-- TAB 2: LIVE PRACTICAL MCQS -->
                        ${state.activeTab === 'quiz' ? `
                            <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                                ${(activeChapter.questions || []).map((q, qIdx) => {
                                    const key = `${state.selectedClass}_${state.selectedChapterIdx}_${qIdx}`;
                                    const answered = state.userAnswers[key];

                                    return `
                                        <div class="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
                                            <div class="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                                                <span class="text-teal-600 dark:text-teal-400 mr-1.5 font-mono">Q${qIdx + 1}.</span> ${q.question}
                                            </div>

                                            <div class="space-y-2 mt-3">
                                                ${q.options.map((opt, oIdx) => {
                                                    let stateClass = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:border-teal-500";
                                                    let iconMarkup = "";

                                                    if (answered) {
                                                        if (oIdx === q.correct) {
                                                            stateClass = "correct";
                                                            iconMarkup = '<i class="fa-solid fa-check text-xs"></i>';
                                                        } else if (answered.selected === oIdx && !answered.isCorrect) {
                                                            stateClass = "wrong";
                                                            iconMarkup = '<i class="fa-solid fa-xmark text-xs"></i>';
                                                        }
                                                    }

                                                    return `
                                                        <button 
                                                            ${answered ? 'disabled' : ''} 
                                                            onclick="recordAnswer(${qIdx}, ${oIdx})" 
                                                            class="mcq-option w-full text-left p-3 rounded-xl border text-xs font-medium flex items-center justify-between ${stateClass}">
                                                            <span>${opt}</span>
                                                            ${iconMarkup}
                                                        </button>
                                                    `;
                                                }).join('')}
                                            </div>

                                            ${answered ? `
                                                <div class="mt-3 p-3.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-900 text-xs text-slate-700 dark:text-slate-300">
                                                    <strong class="text-teal-800 dark:text-teal-300 block mb-0.5 uppercase tracking-wide text-[10px]">Exam Tip & Concept:</strong>
                                                    ${q.explanation}
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('') || `
                                    <p class="text-xs text-slate-400 italic">No questions listed for this chapter yet.</p>
                                `}
                            </div>
                        ` : ''}

                    </div>
                </section>
            </div>
        </div>
    `;
}

// --- ABOUT PAGE ---
function renderAboutPage() {
    return `
        <div class="max-w-3xl mx-auto px-4 py-12">
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">About Becules</h1>
                <p class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mt-1">
                    OPEN SOURCE • NOT FOR PROFIT • LAST-MINUTE FOCUSED
                </p>

                <p class="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                    Becules is a free, focused learning hub designed specifically for ISC Class 11 & 12 students who need high-yield preparation without the clutter. During exam nights, nobody has time to read 80-page reference manuals. We break down the syllabus into straight-to-the-point formula sheets, high-frequency MCQs, and clear step-by-step explanations.
                </p>

                <div class="mt-6 p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 text-xs text-slate-700 dark:text-slate-300">
                    <p class="font-bold text-teal-900 dark:text-teal-200 mb-1"><i class="fa-solid fa-graduation-cap mr-1"></i> Student-Created Project</p>
                    Built by students who <strong></strong>—learn from the same syllabus, facing the same board expectations, and solving real exam prep bottlenecks together.
                </div>

                <ul class="mt-6 space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <li class="flex items-center space-x-2">
                        <i class="fa-solid fa-check text-teal-600 dark:text-teal-400"></i>
                        <span><strong>Zero paywalls</strong>, subscriptions, or login walls.</span>
                    </li>
                    <li class="flex items-center space-x-2">
                        <i class="fa-solid fa-check text-teal-600 dark:text-teal-400"></i>
                        <span><strong>No distracting animations</strong>—clean and easy on tired eyes.</span>
                    </li>
                    <li class="flex items-center space-x-2">
                        <i class="fa-solid fa-check text-teal-600 dark:text-teal-400"></i>
                        <span><strong>Community driven</strong>: Submit your own handwritten summaries to help peers.</span>
                    </li>
                </ul>
            </div>
        </div>
    `;
}

// --- CONTRIBUTE PAGE ---
function renderContributePage() {
    return `
        <div class="max-w-2xl mx-auto px-4 py-12">
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Contribute Notes & Questions</h1>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Have high-scoring handwritten formula sheets or solved board questions? Share them with fellow ISC students.</p>

                <form onsubmit="handleContributionSubmit(event)" class="mt-6 space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Your Name (or Anonymous)</label>
                        <input type="text" placeholder="e.g. Rahul S." class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Subject</label>
                            <select class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option>Physics</option>
                                <option>Chemistry</option>
                                <option>Mathematics</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Class</label>
                            <select class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option>Class 11</option>
                                <option>Class 12</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Resource Title / Topic</label>
                        <input type="text" required placeholder="e.g. Current Electricity - Kirchhoff Laws 1-page summary" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Attach File (PDF, DOCX, Images)</label>
                        <input type="file" required class="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-950 dark:file:text-teal-300 cursor-pointer border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
                    </div>

                    <button type="submit" class="w-full py-3 rounded-xl font-bold text-xs text-white bg-teal-700 hover:bg-teal-800 transition shadow-sm">
                        Submit Contribution
                    </button>
                </form>
            </div>
        </div>
    `;
}

// -----------------------------------------------------------------------------
// 5. User Interaction Handlers
// -----------------------------------------------------------------------------
function selectClass(cls) {
    state.selectedClass = cls;
    state.selectedChapterIdx = 0;
    renderResourcesPage();
}

function selectChapter(idx) {
    state.selectedChapterIdx = idx;
    renderResourcesPage();
}

function setTab(tabName) {
    state.activeTab = tabName;
    renderResourcesPage();
}

function recordAnswer(qIdx, optIdx) {
    const chapters = state.curriculumData.physics[state.selectedClass];
    const q = chapters[state.selectedChapterIdx].questions[qIdx];
    const key = `${state.selectedClass}_${state.selectedChapterIdx}_${qIdx}`;

    state.userAnswers[key] = {
        selected: optIdx,
        isCorrect: optIdx === q.correct
    };

    if (optIdx === q.correct) {
        showToast("Correct! Check the explanation below.");
    } else {
        showToast("Incorrect. Read the exam tip below.");
    }

    renderResourcesPage();
}

// -----------------------------------------------------------------------------
// 6. Request Access Tracker (Starts at 0, Increments cleanly)
// -----------------------------------------------------------------------------
function initRequestVotes() {
    const votes = getVotes();
    const chemEl = document.getElementById('vote-count-chemistry');
    const mathEl = document.getElementById('vote-count-mathematics');

    if (chemEl) chemEl.textContent = `${votes.chemistry} requests`;
    if (mathEl) mathEl.textContent = `${votes.mathematics} requests`;
}

function getVotes() {
    // Strictly starts at 0 for each subject
    const saved = localStorage.getItem('becules_subject_votes');
    return saved ? JSON.parse(saved) : { chemistry: 0, mathematics: 0 };
}

function requestSubjectVote(subj) {
    const votedKey = `becules_voted_${subj}`;
    if (localStorage.getItem(votedKey)) {
        showToast(`You have already requested ${subj.toUpperCase()}!`);
        return;
    }

    const votes = getVotes();
    votes[subj] = (votes[subj] || 0) + 1;

    localStorage.setItem('becules_subject_votes', JSON.stringify(votes));
    localStorage.setItem(votedKey, 'true');

    initRequestVotes();
    showToast(`Request counted! We will prioritize ${subj.toUpperCase()}.`);
}

// -----------------------------------------------------------------------------
// 7. Utilities (Toast & Form Handlers)
// -----------------------------------------------------------------------------
function handleContributionSubmit(e) {
    e.preventDefault();
    showToast("Thank you! Contribution received for review.");
    e.target.reset();
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const text = document.getElementById('toast-message');
    if (!toast || !text) return;
    text.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2800);
}
