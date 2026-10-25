// Application State
let appData = null;
let currentClass = 12;
let currentChapterIdx = 0;
let userAnswers = {}; // key: "chapterIdx_qIdx" -> { selected: int, isCorrect: bool }

// Run immediately on page load
document.addEventListener("DOMContentLoaded", () => {
  initRequestTracker();
  loadQuestionsData();
});

// 1. Fetch JSON Database
async function loadQuestionsData() {
  try {
    const res = await fetch('questions.json');
    if (!res.ok) throw new Error("Could not load questions.json");
    appData = await res.json();
    renderClassView();
  } catch (err) {
    console.error(err);
    document.getElementById('quiz-container').innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-triangle-exclamation" style="color: #f43f5e;"></i>
        <p>Failed to load questions.json. Check browser console or ensure you run via a local server / GitHub Pages.</p>
      </div>`;
  }
}

// 2. Class Switch Handler
function switchClass(cls) {
  currentClass = cls;
  currentChapterIdx = 0;
  userAnswers = {};

  document.getElementById('btn-cls-11').classList.toggle('active', cls === 11);
  document.getElementById('btn-cls-12').classList.toggle('active', cls === 12);

  renderClassView();
}

// 3. Render Chapters and Chapter Arena
function renderClassView() {
  if (!appData) return;

  const chapters = appData.physics[currentClass] || [];
  const listContainer = document.getElementById('chapter-list');
  document.getElementById('chapter-count').textContent = `${chapters.length} Chapters`;

  listContainer.innerHTML = '';
  chapters.forEach((ch, idx) => {
    const btn = document.createElement('button');
    btn.className = `chapter-btn ${idx === currentChapterIdx ? 'active' : ''}`;
    btn.innerHTML = `
      <span>${idx + 1}. ${ch.title}</span>
      <i class="fa-solid fa-chevron-right" style="font-size: 0.65rem;"></i>
    `;
    btn.onclick = () => selectChapter(idx);
    listContainer.appendChild(btn);
  });

  loadCurrentChapter();
}

function selectChapter(idx) {
  currentChapterIdx = idx;
  
  // Update active sidebar item
  const btns = document.querySelectorAll('.chapter-btn');
  btns.forEach((b, i) => b.classList.toggle('active', i === idx));

  loadCurrentChapter();
}

// 4. Load Current Chapter Questions & Study Material Links
function loadCurrentChapter() {
  const chapter = appData.physics[currentClass][currentChapterIdx];
  if (!chapter) return;

  document.getElementById('current-subject-tag').textContent = `PHYSICS • CLASS ${currentClass}`;
  document.getElementById('current-chapter-title').textContent = chapter.title;

  // Study Materials bar
  const materialContainer = document.getElementById('study-material-container');
  materialContainer.innerHTML = '';
  
  if (chapter.materials && chapter.materials.length > 0) {
    chapter.materials.forEach(mat => {
      const link = document.createElement('a');
      link.href = mat.url;
      link.target = "_blank";
      link.className = "material-link";
      link.innerHTML = `<i class="${mat.icon || 'fa-solid fa-file-pdf'}"></i> ${mat.label}`;
      materialContainer.appendChild(link);
    });
  } else {
    // Default placeholder for upcoming materials
    materialContainer.innerHTML = `
      <span class="material-link" style="opacity: 0.6; cursor: default;">
        <i class="fa-solid fa-file-lines"></i> Formula Sheet (Coming Soon)
      </span>
    `;
  }

  // Render Questions
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';

  chapter.questions.forEach((q, qIdx) => {
    const qKey = `${currentChapterIdx}_${qIdx}`;
    const answeredState = userAnswers[qKey];

    const qBlock = document.createElement('div');
    qBlock.className = 'q-block';

    let optionsHtml = '';
    q.options.forEach((opt, oIdx) => {
      let extraClass = '';
      let disabled = '';

      if (answeredState) {
        disabled = 'disabled';
        if (oIdx === q.correct) extraClass = 'correct';
        if (answeredState.selected === oIdx && !answeredState.isCorrect) extraClass = 'wrong';
      }

      optionsHtml += `
        <button class="option-btn ${extraClass}" ${disabled} onclick="handleAnswer(${qIdx}, ${oIdx})">
          <span>${opt}</span>
          ${answeredState && oIdx === q.correct ? '<i class="fa-solid fa-check"></i>' : ''}
          ${answeredState && answeredState.selected === oIdx && !answeredState.isCorrect ? '<i class="fa-solid fa-xmark"></i>' : ''}
        </button>
      `;
    });

    let expHtml = '';
    if (answeredState) {
      expHtml = `
        <div class="exp-box">
          <strong>Instant Solution:</strong>
          ${q.explanation}
        </div>
      `;
    }

    qBlock.innerHTML = `
      <div class="q-title"><strong>Q${qIdx + 1}.</strong> ${q.question}</div>
      <div class="options-grid">${optionsHtml}</div>
      ${expHtml}
    `;

    quizContainer.appendChild(qBlock);
  });

  renderScoreSummary(chapter.questions.length);
}

// 5. Answer Selection Handler
function handleAnswer(qIdx, selectedOptIdx) {
  const chapter = appData.physics[currentClass][currentChapterIdx];
  const q = chapter.questions[qIdx];
  const isCorrect = selectedOptIdx === q.correct;
  const qKey = `${currentChapterIdx}_${qIdx}`;

  userAnswers[qKey] = {
    selected: selectedOptIdx,
    isCorrect: isCorrect
  };

  // Re-render chapter questions to display color feedback & explanation
  loadCurrentChapter();
}

// 6. Score Summary
function renderScoreSummary(totalQuestions) {
  const chapter = appData.physics[currentClass][currentChapterIdx];
  let answeredCount = 0;
  let correctCount = 0;

  chapter.questions.forEach((_, qIdx) => {
    const qKey = `${currentChapterIdx}_${qIdx}`;
    if (userAnswers[qKey]) {
      answeredCount++;
      if (userAnswers[qKey].isCorrect) correctCount++;
    }
  });

  if (answeredCount > 0) {
    const quizContainer = document.getElementById('quiz-container');
    const summary = document.createElement('div');
    summary.className = 'score-summary-card';
    summary.innerHTML = `
      <h4>Chapter Progress: ${correctCount} / ${totalQuestions} Correct</h4>
      <p>${correctCount === totalQuestions ? '🔥 Exam Ready! You nailed every concept.' : 'Review the concept explanations above and lock down weak spots.'}</p>
    `;
    quizContainer.appendChild(summary);
  }
}

// 7. Request Access & Upvote Tracker (Local Storage persistence)
function initRequestTracker() {
  const defaultVotes = { chemistry: 142, mathematics: 189 };
  const storedVotes = JSON.parse(localStorage.getItem('becules_subject_votes')) || defaultVotes;

  document.getElementById('chem-votes').textContent = `${storedVotes.chemistry} requests`;
  document.getElementById('math-votes').textContent = `${storedVotes.mathematics} requests`;
}

function requestSubject(subj) {
  const hasVoted = localStorage.getItem(`voted_${subj}`);
  if (hasVoted) {
    showToast(`You already requested access for ${subj.toUpperCase()}!`);
    return;
  }

  const defaultVotes = { chemistry: 142, mathematics: 189 };
  const storedVotes = JSON.parse(localStorage.getItem('becules_subject_votes')) || defaultVotes;

  storedVotes[subj] += 1;
  localStorage.setItem('becules_subject_votes', JSON.stringify(storedVotes));
  localStorage.setItem(`voted_${subj}`, 'true');

  initRequestTracker();
  showToast(`Request submitted! We'll prioritize ${subj.toUpperCase()}.`);
}

// 8. Toast Helper
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}
