// ========================================
// Thailand DTV Visa - Full Interactive Features
// ========================================

let currentUser = null;
let allCases = [];
let showSource = true;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize i18n first - builds dynamic sections
  translatePage();

  initNavbar();
  initParticles();
  initScrollReveal();
  initSmoothScroll();
  initSearch();
  loadCases();
  loadComments();
  checkAuth();
  initCommentInput();
  initCaseModal();
});

// ========================================
// Auth System
// ========================================
async function checkAuth() {
  try {
    const res = await fetch('/api/me');
    if (res.ok) {
      const data = await res.json();
      currentUser = data.user;
      updateAuthUI();
    }
  } catch { }
}

function updateAuthUI() {
  const authButtons = document.getElementById('auth-buttons');
  const userMenu = document.getElementById('user-menu');
  const commentPrompt = document.getElementById('comment-login-prompt');
  const commentForm = document.getElementById('comment-form');

  if (currentUser) {
    authButtons.style.display = 'none';
    userMenu.style.display = 'flex';
    document.getElementById('username-display').textContent = currentUser.username;
    if (commentPrompt) commentPrompt.style.display = 'none';
    if (commentForm) commentForm.style.display = 'block';
  } else {
    authButtons.style.display = 'flex';
    userMenu.style.display = 'none';
    if (commentPrompt) commentPrompt.style.display = 'block';
    if (commentForm) commentForm.style.display = 'none';
  }
}

function showModal(type) {
  closeModal();
  document.getElementById('modal-overlay').classList.add('active');
  document.getElementById(`${type}-modal`).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
  document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
}

async function handleLogin(e) {
  e.preventDefault();
  const login = document.getElementById('login-input').value;
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });
    const data = await res.json();
    if (res.ok) {
      currentUser = data.user;
      updateAuthUI();
      closeModal();
      e.target.reset();
    } else {
      errEl.textContent = data.error;
    }
  } catch {
    errEl.textContent = getLang() === 'en' ? 'Network error, please retry' : '网络错误，请重试';
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const errEl = document.getElementById('register-error');

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      showModal('login');
      document.getElementById('login-error').textContent = '';
      document.getElementById('login-input').value = username;
    } else {
      errEl.textContent = data.error;
    }
  } catch {
    errEl.textContent = getLang() === 'en' ? 'Network error, please retry' : '网络错误，请重试';
  }
}

async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  currentUser = null;
  updateAuthUI();
}

// ========================================
// Knowledge Search
// ========================================
function initSearch() {
  const input = document.getElementById('global-search');
  const results = document.getElementById('search-results');
  const clearBtn = document.getElementById('search-clear');
  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    clearBtn.style.display = q ? 'block' : 'none';

    if (q.length < 1) { results.classList.remove('active'); return; }

    debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/knowledge?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        renderSearchResults(data.items, q);
      } catch { }
    }, 300);
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      results.classList.remove('active');
    }
  });
}

function renderSearchResults(items, query) {
  const results = document.getElementById('search-results');
  const lang = getLang();
  const noResultText = lang === 'en' ? `No results found for "${query}"` : `没有找到与"${query}"相关的结果`;

  if (items.length === 0) {
    results.innerHTML = `<div class="search-no-results">${noResultText}</div>`;
    results.classList.add('active');
    return;
  }

  results.innerHTML = items.map(item => `
    <div class="search-result-item" onclick="this.querySelector('.search-result-answer')?.classList.toggle('expanded')">
      <h4>${highlightText(item.question, query)}</h4>
      <p>${highlightText(item.answer, query)}</p>
      <span class="search-category">${item.category}</span>
    </div>
  `).join('');
  results.classList.add('active');
}

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark style="background:rgba(212,160,23,0.3);color:var(--text-gold);padding:0 2px;border-radius:2px;">$1</mark>');
}

function clearSearch() {
  document.getElementById('global-search').value = '';
  document.getElementById('search-results').classList.remove('active');
  document.getElementById('search-clear').style.display = 'none';
}

// ========================================
// Cases Loading
// ========================================
async function loadCases() {
  try {
    const res = await fetch('/api/cases');
    const data = await res.json();
    allCases = data.cases;
    showSource = data.show_source !== false;
    renderCases(allCases);
  } catch { }
}

function renderCases(cases) {
  const grid = document.getElementById('cases-grid');
  if (!grid) return;
  const lang = getLang();
  const readText = lang === 'en' ? 'Read Article' : '阅读全文';

  grid.innerHTML = cases.map((c, idx) => {
    const translated = (typeof translateCase === 'function') ? translateCase(c) : c;
    const platformLabel = { youtube: '▶️ YouTube', x: '𝕏 X/Twitter', xiaohongshu: '📕 小红书' }[c.platform] || c.platform;
    const tags = c.tags ? c.tags.split(',').map(tag => `<span class="case-tag">${tag.trim()}</span>`).join('') : '';

    return `
      <div class="case-card reveal visible" data-platform="${c.platform}" onclick="openCaseModal(${c.id})" style="cursor:pointer;">
        <div class="case-header">
          <span class="case-platform ${c.platform}">${platformLabel}</span>
        </div>
        <h4>${translated.title}</h4>
        <p>${translated.description}</p>
        <div class="case-tags">${tags}</div>
        <div class="case-meta">
          <span class="case-author">${c.author}</span>
          <span class="case-read-btn">${readText} →</span>
        </div>
      </div>
    `;
  }).join('');
}

// Case detail modal
function initCaseModal() {
  // Create modal if not exists
  if (!document.getElementById('case-modal')) {
    const overlay = document.createElement('div');
    overlay.id = 'case-modal';
    overlay.className = 'case-modal-overlay';
    overlay.innerHTML = `
      <div class="case-modal-content">
        <button class="case-modal-close" onclick="closeCaseModal()">✕</button>
        <div class="case-modal-body" id="case-modal-body"></div>
      </div>
    `;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCaseModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (document.getElementById('case-modal')?.classList.contains('active')) closeCaseModal();
        else if (document.getElementById('modal-overlay')?.classList.contains('active')) closeModal();
      }
    });
    document.body.appendChild(overlay);
  }
}

function openCaseModal(caseId) {
  const c = allCases.find(x => x.id === caseId);
  if (!c) return;
  const lang = getLang();
  const translated = (typeof translateCase === 'function') ? translateCase(c) : c;
  const platformLabel = { youtube: '▶️ YouTube', x: '𝕏 X/Twitter', xiaohongshu: '📕 小红书' }[c.platform] || c.platform;

  // Render content — simple markdown to HTML
  const contentHtml = c.content ? simpleMarkdown(c.content) : `<p>${translated.description}</p>`;

  // Source section
  const sourceLabel = lang === 'en' ? 'Source' : '出处';
  const sourceHtml = showSource ? `
    <div class="case-source">
      <span class="case-source-label">📌 ${sourceLabel}：</span>
      <span class="case-source-platform">${platformLabel}</span>
      <span class="case-source-author">— ${c.author}</span>
      ${c.url ? `<a href="${c.url}" target="_blank" rel="noopener" class="case-source-link">${lang === 'en' ? 'View Original' : '查看原文'} ↗</a>` : ''}
    </div>
  ` : '';

  const body = document.getElementById('case-modal-body');
  body.innerHTML = `
    <div class="case-modal-header">
      <span class="case-platform ${c.platform}">${platformLabel}</span>
      <div class="case-tags" style="display:inline-flex;gap:0.4rem;margin-left:0.5rem;">
        ${c.tags ? c.tags.split(',').map(tag => `<span class="case-tag">${tag.trim()}</span>`).join('') : ''}
      </div>
    </div>
    <h2 class="case-modal-title">${translated.title}</h2>
    <div class="case-modal-article">${contentHtml}</div>
    ${sourceHtml}
  `;

  document.getElementById('case-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseModal() {
  document.getElementById('case-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// Simple markdown to HTML converter for case content
function simpleMarkdown(md) {
  let html = md
    // Escape HTML
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Tables
    .replace(/^(\|.+\|)\n(\|[-: |]+\|)\n((?:\|.+\|\n?)*)/gm, (match, header, sep, body) => {
      const thCells = header.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = body.trim().split('\n').map(row => {
        const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table class="case-table"><thead><tr>${thCells}</tr></thead><tbody>${rows}</tbody></table>`;
    })
    // Headers
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Blockquotes
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Checkboxes
    .replace(/^- ☑ (.+)$/gm, '<li>☑ $1</li>')
    // Emoji status lines
    .replace(/^(- [✅❌⚠️☑]) (.+)$/gm, '<li>$1 $2</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  return `<p>${html}</p>`.replace(/<p><\/p>/g, '').replace(/<p>(<h[34]>)/g, '$1').replace(/(<\/h[34]>)<\/p>/g, '$1').replace(/<p>(<table)/g, '$1').replace(/(<\/table>)<\/p>/g, '$1').replace(/<p>(<ul>)/g, '$1').replace(/(<\/ul>)<\/p>/g, '$1').replace(/<p>(<blockquote>)/g, '$1').replace(/(<\/blockquote>)<\/p>/g, '$1');
}

function filterCases(platform, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filtered = platform === 'all' ? allCases : allCases.filter(c => c.platform === platform);
  renderCases(filtered);
}

function searchCases() {
  const q = document.getElementById('cases-search-input').value.trim().toLowerCase();
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.platform || 'all';

  let filtered = activeFilter === 'all' ? allCases : allCases.filter(c => c.platform === activeFilter);
  if (q) {
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.toLowerCase().includes(q)
    );
  }
  renderCases(filtered);
}

// ========================================
// Comments
// ========================================
function initCommentInput() {
  const input = document.getElementById('comment-input');
  const counter = document.getElementById('char-count');
  if (input && counter) {
    input.addEventListener('input', () => {
      counter.textContent = input.value.length;
    });
  }
}

async function loadComments() {
  try {
    const res = await fetch('/api/comments');
    const data = await res.json();
    renderComments(data.comments);
  } catch { }
}

function renderComments(comments) {
  const list = document.getElementById('comments-list');
  if (!list) return;
  const lang = getLang();
  const emptyText = t('comment_empty');
  const replyText = t('comment_reply');
  const locale = lang === 'en' ? 'en-US' : 'zh-CN';

  if (comments.length === 0) {
    list.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:2rem;">${emptyText}</div>`;
    return;
  }

  list.innerHTML = comments.map(c => {
    const date = new Date(c.created_at + 'Z').toLocaleString(locale);
    const replies = (c.replies || []).map(r => {
      const rDate = new Date(r.created_at + 'Z').toLocaleString(locale);
      return `
        <div class="reply-item">
          <div class="comment-header">
            <span class="comment-user">${r.username}</span>
            <span class="comment-date">${rDate}</span>
          </div>
          <div class="comment-content">${escapeHtml(r.content)}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="comment-item">
        <div class="comment-header">
          <span class="comment-user">👤 ${c.username}</span>
          <span class="comment-date">${date}</span>
        </div>
        <div class="comment-content">${escapeHtml(c.content)}</div>
        ${replies ? `<div class="comment-replies">${replies}</div>` : ''}
      </div>
    `;
  }).join('');
}

async function postComment(e) {
  e.preventDefault();
  const input = document.getElementById('comment-input');
  const content = input.value.trim();
  if (!content) return;

  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    if (res.ok) {
      input.value = '';
      document.getElementById('char-count').textContent = '0';
      loadComments();
    } else {
      const data = await res.json();
      alert(data.error || (getLang() === 'en' ? 'Failed to post' : '发表失败'));
    }
  } catch {
    alert(getLang() === 'en' ? 'Network error, please retry' : '网络错误，请重试');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================================
// Navbar
// ========================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
      }
    });
  });
}

// ========================================
// Particles
// ========================================
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 12 + 8}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(p);
  }
}

// ========================================
// Scroll Reveal
// ========================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========================================
// FAQ Accordion
// ========================================
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    // Remove existing listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isActive) {
        item.classList.add('active');
        item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
      }
    });
  });
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });
}
