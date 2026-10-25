// Application State
let appData = null;
let currentClass = 12;
let currentChapterIdx = 0;
let answeredQuestions = {}; // Key: "class_chapterIdx_qIdx" -> { selected: index, isCorrect: bool }
let sessionPoints = 0;

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initVotesTracker();
  loadDatabase();
});

// 1. THEME SWITCHER (Dark & Light Mode)
function initTheme() {
  const savedTheme = localStorage.getItem("becules_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("becules_theme", next);
  showToast(`Switched to ${next.toUpperCase()} mode`);
}

// 2. LOAD QUESTIONS DATABASE
async function loadDatabase() {
  try {
    const res = await fetch("questions.json");
    if (!res.ok) throw new Error("Could not find questions.json");
    appData = await res.json();
    renderClass();
  } catch (err) {
    console.error(err);
    document.getElementById("questions-stream").innerHTML = `
      <div style="text-align:center; padding: 3rem 1rem;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; color:#f43f5e; margin-bottom:1rem;"></i>
        <p style="font-weight:700;">Failed to load questions.json</p>
        <p style="font-size:0.8rem; color:var(--text-muted);">Ensure questions.json is in your root repository folder.</p>
      </div>`;
  }
}

// 3. CLASS TOGGLE (11 vs 12)
function switchClass(cls) {
  currentClass = cls;
  currentChapterIdx = 0;

  document.getElementById("btn-11").classList.toggle("active", cls === 11);
  document.getElementById("btn-12").classList.toggle("active", cls === 12);

  renderClass();
}

// 4. RENDER CHAPTERS SIDEBAR
function renderClass() {
  if (!appData) return;

  const chapters = appData.physics[currentClass] || [];
  const listEl = document.getElementById("chapter-list");
  document.getElementById("total-chapters-tag").textContent = `${chapters.length} Chapters`;

  listEl.innerHTML = "";
  chapters.forEach((chap, idx) => {
    const btn = document.createElement("button");
    btn.className = `chapter-item-btn ${idx === currentChapterIdx ? "active" : ""}`;
    btn.innerHTML = `
      <span>${idx + 1}. ${chap.title}</span>
      <i class="fa-solid fa-chevron-right" style="font-size:0.65rem;"></i>
    `;
    btn.onclick = () => selectChapter(idx);
    listEl.appendChild(btn);
  });

  renderChapterArena();
}

function selectChapter(idx) {
  currentChapterIdx = idx;

  const allBtns = document.querySelectorAll(".chapter-item-btn");
  allBtns.forEach((b, i) => b.classList.toggle("active", i === idx));

  renderChapterArena();
}

// 5. RENDER ACTIVE CHAPTER & STUDY MATERIALS
function renderChapterArena() {
  const chapter = appData.physics[currentClass][currentChapterIdx];
  if (!chapter) return;

  document.getElementById("current-badge").textContent = `PHYSICS • CLASS ${currentClass}`;
  document.getElementById("current-chapter-title").textContent = chapter.title;

  // Render Attached Study Material Links
  const matContainer = document.getElementById("materials-container");
  matContainer.innerHTML = "";

  if (chapter.materials && chapter.materials.length > 0) {
    chapter.materials.forEach((mat) => {
      const a = document.createElement("a");
      a.href = mat.url;
      a.target = "_blank";
      a.className = "doc-link";
      a.innerHTML = `<i class="${mat.icon || "fa-solid fa-file-pdf"}"></i> ${mat.label}`;
      matContainer.appendChild(a);
    });
  } else {
    matContainer.innerHTML = `
      <span class="doc-link" style="opacity:0.6; cursor:default;">
        <i class="fa-solid fa-clock"></i> Formula Sheet (Compiling)
      </span>`;
  }

  // Render Questions
  const stream = document.getElementById("questions-stream");
  stream.innerHTML = "";

  chapter.questions.forEach((q, qIdx) => {
    const key = `${currentClass}_${currentChapterIdx}_${qIdx}`;
    const state = answeredQuestions[key];

    const card = document.createElement("div");
    card.className = "question-card";

    let optionsMarkup = "";
    q.options.forEach((opt, oIdx) => {
      let optionClass = "";
      let disabledAttr = "";

      if (state) {
        disabledAttr = "disabled";
        if (oIdx === q.correct) optionClass = "correct";
        if (state.selected === oIdx && !state.isCorrect) optionClass = "wrong";
      }

      optionsMarkup += `
        <button class="option-choice ${optionClass}" ${disabledAttr} onclick="answerQuestion(${qIdx}, ${oIdx})">
          <span>${opt}</span>
          ${state && oIdx === q.correct ? '<i class="fa-solid fa-circle-check"></i>' : ""}
          ${state && state.selected === oIdx && !state.isCorrect ? '<i class="fa-solid fa-circle-xmark"></i>' : ""}
        </button>
      `;
    });

    let solutionMarkup = "";
    if (state) {
      solutionMarkup = `
        <div class="solution-box">
          <strong>Key Concept & Solution:</strong>
          ${q.explanation}
        </div>
      `;
    }

    card.innerHTML = `
      <div class="question-text">
        <span class="question-num">Q${qIdx + 1}.</span> ${q.question}
      </div>
      <div class="options-stack">${optionsMarkup}</div>
      ${solutionMarkup}
    `;

    stream.appendChild(card);
  });

  renderSummary(chapter.questions.length);
}

// 6. ANSWER HANDLING WITH SCORE UPDATES
function answerQuestion(qIdx, selectedIdx) {
  const chapter = appData.physics[currentClass][currentChapterIdx];
  const q = chapter.questions[qIdx];
  const isCorrect = selectedIdx === q.correct;
  const key = `${currentClass}_${currentChapterIdx}_${qIdx}`;

  answeredQuestions[key] = {
    selected: selectedIdx,
    isCorrect: isCorrect
  };

  if (isCorrect) {
    sessionPoints += 10;
    showToast("Correct! +10 Points ⚡");
  } else {
    showToast("Incorrect. Check the breakdown below.");
  }

  document.getElementById("session-score").textContent = sessionPoints;
  renderChapterArena();
}

// 7. PROGRESS SUMMARY
function renderSummary(total) {
  const chapter = appData.physics[currentClass][currentChapterIdx];
  let answered = 0;
  let correct = 0;

  chapter.questions.forEach((_, qIdx) => {
    const key = `${currentClass}_${currentChapterIdx}_${qIdx}`;
    if (answeredQuestions[key]) {
      answered++;
      if (answeredQuestions[key].isCorrect) correct++;
    }
  });

  if (answered > 0) {
    const stream = document.getElementById("questions-stream");
    const summary = document.createElement("div");
    summary.className = "chapter-summary";
    summary.innerHTML = `
      <h4>Accuracy: ${correct} / ${total} Correct</h4>
      <p>${correct === total ? "🏆 Outstanding! You have full command of this chapter." : "Review the highlighted solutions to lock in your understanding."}</p>
    `;
    stream.appendChild(summary);
  }
}

// 8. SUBJECT REQUEST VOTE TRACKER
function initVotesTracker() {
  const initial = { chemistry: 168, mathematics: 214 };
  const votes = JSON.parse(localStorage.getItem("becules_votes")) || initial;

  document.getElementById("chem-count").textContent = `${votes.chemistry} requests`;
  document.getElementById("math-count").textContent = `${votes.mathematics} requests`;
}

function registerVote(subj) {
  const hasVoted = localStorage.getItem(`voted_${subj}`);
  if (hasVoted) {
    showToast(`You have already requested ${subj.toUpperCase()}!`);
    return;
  }

  const initial = { chemistry: 168, mathematics: 214 };
  const votes = JSON.parse(localStorage.getItem("becules_votes")) || initial;
  votes[subj] += 1;

  localStorage.setItem("becules_votes", JSON.stringify(votes));
  localStorage.setItem(`voted_${subj}`, "true");

  initVotesTracker();
  showToast(`Vote recorded! ${subj.toUpperCase()} access priority bumped up.`);
}

// 9. TOAST NOTIFICATION
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2800);
}
