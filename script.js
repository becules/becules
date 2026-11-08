// =============================================================================
// SUPABASE CREDENTIALS (Pre-configured)
// =============================================================================
const SUPABASE_URL = "https://kfsbjxvrewtinwssjarq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KkWW2xH5c49W16MQG72Vgw_WLiP9Nps";

let supabase = null;
try {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.warn("Supabase connection fallback to local storage:", e);
}

// =============================================================================
// APPLICATION STATE
// =============================================================================
const state = {
    currentPage: 'home',
    selectedClass: 12,
    selectedChapterIdx: 0,
    activeTab: 'quiz',
    userAnswers: {},
    curriculumData: null
};

// Fallback questions to guarantee the site NEVER opens to a blank screen
const fallbackCurriculum = {
    physics: {
        11: [
            {
                title: "Units and Measurement",
                summary: "Focus heavily on dimensional formulas of constants (G, h, η, permeability) and propagation of percentage errors (ΔZ/Z = a·ΔA/A + b·ΔB/B).",
                materials: [
                    { label: "Dimensions & Constants Cheat Sheet (PDF)", url: "#", icon: "fa-solid fa-file-pdf" },
                    { label: "Error Analysis 1-Page Summary", url: "#", icon: "fa-solid fa-bolt" }
                ],
                questions: [
                    {
                        question: "What is the dimensional formula for Gravitational Constant (G)?",
                        options: ["[M⁻¹ L³ T⁻²]", "[M¹ L² T⁻²]", "[M⁻² L³ T⁻¹]", "[M¹ L³ T⁻²]"],
                        correct: 0,
                        explanation: "From F = G(m₁m₂)/r², G = F·r²/(m₁m₂). Substituting dimensions: [M L T⁻²][L²] / [M²] = [M⁻¹ L³ T⁻²]."
                    },
                    {
                        question: "If error in measuring mass is 2% and velocity is 3%, maximum error in calculated Kinetic Energy is:",
                        options: ["5%", "8%", "11%", "12%"],
                        correct: 1,
                        explanation: "K = (1/2)mv². Error ΔK/K = (Δm/m) + 2(Δv/v) = 2% + 2(3%) = 8%."
                    }
                ]
            },
            {
                title: "Laws of Motion",
                summary: "Master Free Body Diagrams (FBD), impulse J = Δp = F·Δt, apparent weight in elevators, and limiting friction f_max = μ_s · N.",
                materials: [
                    { label: "Friction & Pulley Formulas (PDF)", url: "#", icon: "fa-solid fa-file-pdf" }
                ],
                questions: [
                    {
                        question: "A 2kg block rests on a rough floor (μs = 0.4). If a 5N horizontal force is applied, static friction is:",
                        options: ["7.84 N", "5 N", "0 N", "2 N"],
                        correct: 1,
                        explanation: "Limiting friction f_max = μs·m·g = 0.4 × 2 × 9.8 = 7.84 N. Since applied force (5N) < limiting friction, static friction self-adjusts to equal 5 N."
                    }
                ]
            }
        ],
        12: [
            {
                title: "Electric Charges and Fields",
                summary: "Crucial topics: Coulomb's Law in vector form, torque on dipole (τ = p × E), potential energy (U = -p · E), and Gauss's Law applications for wire, infinite plane sheet, and shell.",
                materials: [
                    { label: "Gauss Law Derivations Summary (PDF)", url: "#", icon: "fa-solid fa-file-pdf" },
                    { label: "Dipole Formulas Quick Sheet", url: "#", icon: "fa-solid fa-bolt" }
                ],
                questions: [
                    {
                        question: "An electric dipole of moment p is placed in a uniform field E. Torque is maximum when angle between p and E is:",
                        options: ["0°", "45°", "90°", "180°"],
                        correct: 2,
                        explanation: "Torque is τ = pE sin(θ). The sine function attains its maximum value of 1 when θ = 90°."
                    },
                    {
                        question: "What is the SI unit of electric flux (Φ)?",
                        options: ["N / C", "N m² / C", "V / m", "J / C"],
                        correct: 1,
                        explanation: "Flux Φ = E · A = (Force / Charge) × Area = (N / C) × m² = N m² / C (also equivalent to Volt·meter)."
                    },
                    {
                        question: "If radius of a Gaussian sphere enclosing a point charge is doubled, total electric flux:",
                        options: ["Halves", "Doubles", "Remains unchanged", "Quadruples"],
                        correct: 2,
                        explanation: "By Gauss's Law, Φ = Q_enclosed / ε₀. Flux depends strictly on net enclosed charge, not the surface radius."
                    }
                ]
            },
            {
                title: "Current Electricity",
                summary: "High-probability: Drift velocity (I = n·e·A·v_d), temperature coefficient of resistance, Kirchhoff's Junction & Loop rules, and Wheatstone bridge condition.",
                materials: [
                    { label: "Kirchhoff Rules & Bridge Circuit Handout (PDF)", url: "#", icon: "fa-solid fa-file-pdf" }
                ],
                questions: [
                    {
                        question: "Two resistors of 3 Ω and 6 Ω are in parallel across an ideal 6V battery. Total current drawn is:",
                        options: ["1 A", "2 A", "3 A", "9 A"],
                        correct: 2,
                        explanation: "Parallel resistance R_eq = (3 × 6)/(3 + 6) = 2 Ω. Current I = V / R_eq = 6V / 2Ω = 3 A."
                    }
                ]
            }
        ]
    }
};

// =============================================================================
// INITIALIZATION (Renders immediately so screen is NEVER blank)
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    state.curriculumData = fallbackCurriculum; // Default to fallback immediately
    renderMain();                              // Show page instantly
    loadCurriculum();                          // Fetch questions.json in background
    initRequestVotes();                        // Sync votes with Supabase
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
        if (res.ok) {
            const data = await res.json();
            if (data && data.physics) {
                state.curriculumData = data;
                if (state.currentPage === 'resources') renderMain();
            }
        }
    } catch (err) {
        console.warn("Using built-in curriculum data:", err);
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
    if (!container) return;

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

                    <!-- Chemistry Card (Locked with Live Supabase Counter) -->
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

                    <!-- Mathematics Card (Locked with Live Supabase Counter) -->
                    <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div>
                            <div
