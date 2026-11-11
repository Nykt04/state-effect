// ==========================================
// 1. Tailwind Play CDN Configuration
// ==========================================
tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            react: {
              50: '#ecfeff',
              100: '#cffafe',
              200: '#a5f3fc',
              300: '#67e8f9',
              400: '#22d3ee',
              500: '#06b6d4',
              600: '#0891b2',
              700: '#0e7490',
              800: '#155e75',
              900: '#164e63',
            }
          }
        }
      }
    };

// ==========================================
// 2. Immediate Theme Restoration
// ==========================================
(function () {
  try {
    var savedTheme = localStorage.getItem('react_guide_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();

// ==========================================
// 3. Application Interactive Logic
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
(function () {
      // -----------------------------------------------------------
      // Helper: Toast Notification
      // -----------------------------------------------------------
      function showToast(message) {
        var container = document.getElementById('toastContainer');
        if (!container) return;
        var toast = document.createElement('div');
        toast.className = 'px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-lg border border-slate-700 dark:border-slate-200 transition-all duration-300';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(function () {
          toast.style.opacity = '0';
          setTimeout(function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
          }, 300);
        }, 2200);
      }

      // -----------------------------------------------------------
      // Pinoy Big Brother (PBB) Assembling Intro Splash Controller
      // -----------------------------------------------------------
      var pbbSplash = document.getElementById('pbbSplash');
      var replayPbbIntroBtn = document.getElementById('replayPbbIntroBtn');

      var splashActive = true;
      var splashTimer = null;

      function resetAssembleAnimation() {
        var stage = document.querySelector('.pbb-assembly-stage');
        if (!stage) return;
        var animElements = stage.querySelectorAll('.pbb-assemble-blue, .pbb-assemble-red, .pbb-assemble-sun, .pbb-assemble-flash');
        animElements.forEach(function (el) {
          el.style.animation = 'none';
          void el.offsetWidth;
          el.style.animation = '';
        });
      }

      function dismissPbbSplash() {
        if (!pbbSplash || !splashActive) return;
        splashActive = false;
        if (splashTimer) clearTimeout(splashTimer);
        pbbSplash.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(function () {
          pbbSplash.classList.add('hidden');
        }, 700);
      }

      function startPbbSplashAnimation() {
        if (!pbbSplash) return;
        splashActive = true;
        pbbSplash.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        resetAssembleAnimation();

        splashTimer = setTimeout(function () {
          dismissPbbSplash();
        }, 2500);
      }

      // Auto-start splash on load
      startPbbSplashAnimation();

      if (pbbSplash) {
        pbbSplash.addEventListener('click', function () {
          dismissPbbSplash();
        });
      }

      if (replayPbbIntroBtn) {
        replayPbbIntroBtn.addEventListener('click', function () {
          startPbbSplashAnimation();
        });
      }

      // -----------------------------------------------------------
      // Theme Toggle (Dark / Light) with LocalStorage Persistence
      // -----------------------------------------------------------
      var themeToggleBtn = document.getElementById('themeToggleBtn');
      try {
        var savedTheme = localStorage.getItem('react_guide_theme');
        if (savedTheme === 'light') {
          document.documentElement.classList.remove('dark');
        } else if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}

      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
          var htmlEl = document.documentElement;
          htmlEl.classList.toggle('dark');
          var isDark = htmlEl.classList.contains('dark');
          try {
            localStorage.setItem('react_guide_theme', isDark ? 'dark' : 'light');
          } catch (e) {}
        });
      }

      // -----------------------------------------------------------
      // Scrollspy: Highlight Active Nav Pill & Sidebar Link
      // -----------------------------------------------------------
      if ('IntersectionObserver' in window) {
        var observedSections = document.querySelectorAll('.concept-card, #topic-1, #topic-2, #topic-3, #comparison-matrix, #quiz-section');
        var spyLinks = document.querySelectorAll('.sidebar-link');
        var navPills = document.querySelectorAll('.nav-pill');

        var scrollSpyObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.id;

              // Auto-mark topic as completed in contents when reached/passed
              if (id && id.startsWith('sec-') && !readSections[id] && (!unmarkedByUser || !unmarkedByUser[id])) {
                readSections[id] = true;
                updateReadUI();
              }

              // Left sidebar link styling
              spyLinks.forEach(function (link) {
                var target = link.getAttribute('data-spy');
                if (target === id) {
                  link.classList.add('bg-sky-500/10', 'text-sky-600', 'dark:text-sky-400', 'font-semibold', 'border-l-2', 'border-sky-500');
                } else if (id.indexOf('sec-') !== -1) {
                  link.classList.remove('bg-sky-500/10', 'text-sky-600', 'dark:text-sky-400', 'font-semibold', 'border-l-2', 'border-sky-500');
                }
              });

              // Top nav pills styling
              var activeTopic = null;
              if (id.startsWith('sec-1') || id === 'topic-1') activeTopic = 'topic-1';
              else if (id.startsWith('sec-2') || id === 'topic-2') activeTopic = 'topic-2';
              else if (id.startsWith('sec-3') || id === 'topic-3') activeTopic = 'topic-3';
              else if (id === 'quiz-section' || id === 'comparison-matrix') activeTopic = 'quiz-section';

              if (activeTopic) {
                navPills.forEach(function (pill) {
                  if (pill.getAttribute('data-nav-pill') === activeTopic) {
                    pill.className = 'nav-pill px-3 py-1.5 rounded-lg transition-all bg-sky-600 text-white font-semibold shadow-sm';
                  } else {
                    pill.className = 'nav-pill px-3 py-1.5 rounded-lg transition-all text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300';
                  }
                });
              }
            }
          });
        }, { threshold: 0.2, rootMargin: '-10% 0px -40% 0px' });

        observedSections.forEach(function (sec) {
          scrollSpyObserver.observe(sec);
        });
      }

      // -----------------------------------------------------------
      // Mobile Drawer Toggle
      // -----------------------------------------------------------
      var mobileMenuBtn = document.getElementById('mobileMenuBtn');
      var mobileNavDrawer = document.getElementById('mobileNavDrawer');
      if (mobileMenuBtn && mobileNavDrawer) {
        mobileMenuBtn.addEventListener('click', function () {
          mobileNavDrawer.classList.toggle('hidden');
        });
      }
      var mobileLinks = document.querySelectorAll('.mobile-nav-link');
      mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          if (mobileNavDrawer) mobileNavDrawer.classList.add('hidden');
        });
      });

      // -----------------------------------------------------------
      // Hero Interactive Lifecycle Switcher
      // -----------------------------------------------------------
      var cycleDetails = {
        state: {
          title: 'Stage 1: State Setter Triggered (`setCount(prev => prev + 1)`)',
          color: 'text-blue-500 dark:text-blue-400',
          body: 'A user interaction (like `onClick`), network response, or timer calls the state updater function from `useState`. React stores the updated value in component memory.'
        },
        render: {
          title: 'Stage 2: Object.is Check & Component Re-render',
          color: 'text-red-500 dark:text-red-400',
          body: 'React compares the new value to the old value using `Object.is`. If different, React calls your component function top-to-bottom, calculates the new JSX, and updates only the changed DOM nodes.'
        },
        effect: {
          title: 'Stage 3: useEffect Synchronizes After Paint',
          color: 'text-yellow-500 dark:text-yellow-400',
          body: 'After the component finishes rendering and the screen updates, React checks the `useEffect` dependency array. If dependencies changed, it runs cleanup (if any) and executes your effect.'
        }
      };

      var cycleBtns = document.querySelectorAll('.cycle-step-btn');
      var cycleStepDetail = document.getElementById('cycleStepDetail');
      cycleBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var step = btn.getAttribute('data-cycle-step');
          var info = cycleDetails[step];
          if (!info) return;
          cycleBtns.forEach(function (b) {
            b.className = 'cycle-step-btn p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-left transition-all';
          });
          var activeBorder = step === 'state'
            ? 'border-2 border-blue-500 bg-blue-500/10'
            : (step === 'render'
              ? 'border-2 border-red-500 bg-red-500/10'
              : 'border-2 border-yellow-400 bg-yellow-400/10');
          btn.className = 'cycle-step-btn p-3.5 rounded-xl ' + activeBorder + ' text-left transition-all';
          cycleStepDetail.innerHTML = '<strong class="' + info.color + ' block mb-1">' + info.title + '</strong>' + info.body;
        });
      });

      // -----------------------------------------------------------
      // Read Progress Tracker & Auto-Mark on Scroll
      // -----------------------------------------------------------
      var readSections = {};
      var totalSections = 8;
      var readProgressCount = document.getElementById('readProgressCount');
      var unmarkedByUser = {};

      try {
        var savedProgress = localStorage.getItem('react_guide_read_sections');
        if (savedProgress) {
          readSections = JSON.parse(savedProgress) || {};
        }
      } catch (e) {}

      function updateReadUI() {
        var count = Object.keys(readSections).filter(function (k) { return readSections[k]; }).length;
        if (readProgressCount) {
          readProgressCount.textContent = count + '/' + totalSections;
        }

        try {
          localStorage.setItem('react_guide_read_sections', JSON.stringify(readSections));
        } catch (e) {}

        document.querySelectorAll('.mark-read-btn').forEach(function (btn) {
          var secId = btn.getAttribute('data-mark-read');
          var isDone = !!readSections[secId];
          if (isDone) {
            btn.innerHTML = '<span class="inline-flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Completed</span></span>';
            btn.className = 'mark-read-btn shrink-0 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-colors';
          } else {
            btn.textContent = 'Mark Read';
            btn.className = 'mark-read-btn shrink-0 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-sky-500 transition-colors';
          }
        });
        document.querySelectorAll('[data-check-badge]').forEach(function (badge) {
          var secId = badge.getAttribute('data-check-badge');
          if (readSections[secId]) {
            badge.innerHTML = '<svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
            badge.className = 'w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm';
          } else {
            badge.textContent = '';
            badge.className = 'w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px]';
          }
        });
      }

      // Auto-mark when a section enters or passes the reading waterline
      function checkAutoMarkOnScroll() {
        var triggerWaterline = window.innerHeight * 0.45;
        var changed = false;
        document.querySelectorAll('.concept-card').forEach(function (card) {
          var id = card.id;
          if (!id || readSections[id] || (unmarkedByUser && unmarkedByUser[id])) return;
          var rect = card.getBoundingClientRect();
          if (rect.top <= triggerWaterline) {
            readSections[id] = true;
            changed = true;
          }
        });
        if (changed) {
          updateReadUI();
        }
      }

      window.addEventListener('scroll', checkAutoMarkOnScroll, { passive: true });
      updateReadUI();
      checkAutoMarkOnScroll();

      document.querySelectorAll('.mark-read-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var secId = btn.getAttribute('data-mark-read');
          if (readSections[secId]) {
            readSections[secId] = false;
            unmarkedByUser[secId] = true;
          } else {
            readSections[secId] = true;
            delete unmarkedByUser[secId];
          }
          updateReadUI();
        });
      });

      var markAllReadBtn = document.getElementById('markAllReadBtn');
      if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function () {
          ['sec-1-1', 'sec-1-2', 'sec-1-3', 'sec-2-1', 'sec-2-2', 'sec-3-1', 'sec-3-2', 'sec-3-3'].forEach(function (id) {
            readSections[id] = true;
          });
          unmarkedByUser = {};
          updateReadUI();
          showToast('All 8 sections marked as read!');
        });
      }

      // -----------------------------------------------------------
      // Search / Filter Across Subtopics
      // -----------------------------------------------------------
      var topicSearchInput = document.getElementById('topicSearchInput');
      var mobileSearchInput = document.getElementById('mobileSearchInput');
      var clearSearchBtn = document.getElementById('clearSearchBtn');
      var noSearchResults = document.getElementById('noSearchResults');
      var resetSearchEmptyBtn = document.getElementById('resetSearchEmptyBtn');

      function applyFilter(query) {
        var q = (query || '').trim().toLowerCase();
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', q.length === 0);
        }
        var cards = document.querySelectorAll('.concept-card');
        var visibleCount = 0;
        cards.forEach(function (card) {
          var hay = (card.getAttribute('data-searchable') || '') + ' ' + card.textContent.toLowerCase();
          var match = !q || hay.indexOf(q) !== -1;
          card.classList.toggle('hidden', !match);
          if (match) visibleCount++;
        });
        if (noSearchResults) {
          noSearchResults.classList.toggle('hidden', visibleCount > 0);
          noSearchResults.hidden = visibleCount > 0;
        }
      }

      if (topicSearchInput) {
        topicSearchInput.addEventListener('input', function (e) {
          applyFilter(e.target.value);
        });
      }
      if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function (e) {
          applyFilter(e.target.value);
        });
      }
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function () {
          if (topicSearchInput) topicSearchInput.value = '';
          applyFilter('');
        });
      }
      if (resetSearchEmptyBtn) {
        resetSearchEmptyBtn.addEventListener('click', function () {
          if (topicSearchInput) topicSearchInput.value = '';
          if (mobileSearchInput) mobileSearchInput.value = '';
          applyFilter('');
        });
      }

      // -----------------------------------------------------------
      // Copy Code Buttons (Sandbox-safe fallback included)
      // -----------------------------------------------------------
      document.querySelectorAll('.copy-code-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.getAttribute('data-copy-target');
          var preEl = document.getElementById(targetId);
          if (!preEl) return;
          var codeText = preEl.textContent;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(codeText).then(function () {
              btn.textContent = 'Copied!';
              showToast('Code snippet copied to clipboard');
              setTimeout(function () { btn.textContent = 'Copy Code'; }, 1800);
            }).catch(function () {
              fallbackCopy(codeText, btn);
            });
          } else {
            fallbackCopy(codeText, btn);
          }
        });
      });

      function fallbackCopy(text, btn) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          btn.textContent = 'Copied!';
          showToast('Code snippet copied to clipboard');
          setTimeout(function () { btn.textContent = 'Copy Code'; }, 1800);
        } catch (err) {}
        document.body.removeChild(ta);
      }

      // -----------------------------------------------------------
      // Enlarged Code Modal Lightbox & Font Scaler
      // -----------------------------------------------------------
      var enlargeCodeModal = document.getElementById('enlargeCodeModal');
      var enlargeModalTitle = document.getElementById('enlargeModalTitle');
      var enlargeModalCode = document.getElementById('enlargeModalCode');
      var enlargeModalCopyBtn = document.getElementById('enlargeModalCopyBtn');
      var closeEnlargeModalBtn = document.getElementById('closeEnlargeModalBtn');
      var enlargeFontDownBtn = document.getElementById('enlargeFontDownBtn');
      var enlargeFontUpBtn = document.getElementById('enlargeFontUpBtn');
      var enlargeFontLabel = document.getElementById('enlargeFontLabel');

      var fontSizes = ['14px', '16px', '18px', '21px', '24px'];
      var currentFontIdx = 2; // Default 18px

      function setEnlargeFontSize(idx) {
        if (idx < 0) idx = 0;
        if (idx >= fontSizes.length) idx = fontSizes.length - 1;
        currentFontIdx = idx;
        if (enlargeModalCode) {
          enlargeModalCode.style.fontSize = fontSizes[currentFontIdx];
        }
        if (enlargeFontLabel) {
          enlargeFontLabel.textContent = fontSizes[currentFontIdx];
        }
      }

      function openEnlargedCode(title, codeText) {
        if (!enlargeCodeModal) return;
        if (enlargeModalTitle) enlargeModalTitle.textContent = title || 'Code Preview';
        if (enlargeModalCode) {
          var codeEl = enlargeModalCode.querySelector('code');
          if (codeEl) {
            codeEl.textContent = codeText;
          } else {
            enlargeModalCode.textContent = codeText;
          }
        }
        setEnlargeFontSize(currentFontIdx);
        enlargeCodeModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      function closeEnlargedCode() {
        if (!enlargeCodeModal) return;
        enlargeCodeModal.classList.add('hidden');
        var presentModal = document.getElementById('presentModal');
        if (!presentModal || presentModal.classList.contains('hidden')) {
          document.body.style.overflow = '';
        }
      }

      document.querySelectorAll('.enlarge-code-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.getAttribute('data-enlarge-target');
          var title = btn.getAttribute('data-code-title') || 'Code Snippet';
          var preEl = document.getElementById(targetId);
          if (!preEl) return;
          openEnlargedCode(title, preEl.textContent);
        });
      });

      if (closeEnlargeModalBtn) {
        closeEnlargeModalBtn.addEventListener('click', closeEnlargedCode);
      }

      if (enlargeCodeModal) {
        enlargeCodeModal.addEventListener('click', function (e) {
          if (e.target === enlargeCodeModal) {
            closeEnlargedCode();
          }
        });
      }

      if (enlargeFontDownBtn) {
        enlargeFontDownBtn.addEventListener('click', function () {
          setEnlargeFontSize(currentFontIdx - 1);
        });
      }
      if (enlargeFontUpBtn) {
        enlargeFontUpBtn.addEventListener('click', function () {
          setEnlargeFontSize(currentFontIdx + 1);
        });
      }

      if (enlargeModalCopyBtn) {
        enlargeModalCopyBtn.addEventListener('click', function () {
          if (!enlargeModalCode) return;
          var text = enlargeModalCode.textContent;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              enlargeModalCopyBtn.textContent = 'Copied!';
              showToast('Enlarged code copied to clipboard');
              setTimeout(function () { enlargeModalCopyBtn.textContent = 'Copy'; }, 1800);
            }).catch(function () {
              fallbackCopy(text, enlargeModalCopyBtn);
            });
          } else {
            fallbackCopy(text, enlargeModalCopyBtn);
          }
        });
      }

      // -----------------------------------------------------------
      // Section 1.1 Interactive Demo: Plain JS Variable vs React State
      // -----------------------------------------------------------
      var plainCount = 0;
      var reactCount11 = 0;
      var plainVarMemory = document.getElementById('plainVarMemory');
      var plainVarUI = document.getElementById('plainVarUI');
      var plainVarStatus = document.getElementById('plainVarStatus');
      var reactStateMemory = document.getElementById('reactStateMemory');
      var reactStateUI = document.getElementById('reactStateUI');
      var reactStateStatus = document.getElementById('reactStateStatus');
      var reactStateCard11 = document.getElementById('reactStateCard11');

      document.getElementById('incPlainVarBtn').addEventListener('click', function () {
        plainCount += 1;
        plainVarMemory.textContent = String(plainCount);
        plainVarStatus.innerHTML = 'Memory is now <strong>' + plainCount + '</strong>, but the UI still shows <strong>0</strong> because mutating a local variable does not trigger a React re-render!';
      });

      document.getElementById('incReactStateBtn').addEventListener('click', function () {
        reactCount11 += 1;
        reactStateMemory.textContent = String(reactCount11);
        reactStateUI.textContent = String(reactCount11);
        reactStateCard11.classList.remove('render-flash');
        void reactStateCard11.offsetWidth;
        reactStateCard11.classList.add('render-flash');
        reactStateStatus.innerHTML = '<code>setCount(' + reactCount11 + ')</code> updated component memory AND triggered a UI re-render!';
      });

      document.getElementById('resetDemo11Btn').addEventListener('click', function () {
        plainCount = 0;
        reactCount11 = 0;
        plainVarMemory.textContent = '0';
        plainVarUI.textContent = '0';
        reactStateMemory.textContent = '0';
        reactStateUI.textContent = '0';
        plainVarStatus.textContent = 'Click the button: memory increments, but React never knows to redraw the UI!';
        reactStateStatus.textContent = 'Calling the setter tells React state changed, immediately re-rendering the UI in sync.';
      });

      // -----------------------------------------------------------
      // Section 1.2 Interactive Demo: useState Anatomy & Greeting
      // -----------------------------------------------------------
      var anatomyData = {
        stateVal: '<strong class="text-sky-300">1st Element (`name`):</strong> The current state value stored by React. On the initial render, it equals `"Guest"`.',
        setterFn: '<strong class="text-blue-300">2nd Element (`setName`):</strong> The state setter function. Calling `setName(newValue)` updates memory and schedules a component re-render.',
        hookCall: '<strong class="text-sky-300">Hook Call (`useState`):</strong> Built-in React Hook called at the top level of a functional component to declare a state variable.',
        initArg: '<strong class="text-emerald-300">Initial State (`\'Guest\'`):</strong> The single argument passed to `useState`. Used only during the component\'s initial render.'
      };
      var anatomyExplainBox = document.getElementById('anatomyExplainBox');
      document.querySelectorAll('.anatomy-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-anatomy');
          if (anatomyData[key] && anatomyExplainBox) {
            anatomyExplainBox.innerHTML = anatomyData[key];
          }
        });
      });

      var greetingNameInput = document.getElementById('greetingNameInput');
      var greetingNameSpan = document.getElementById('greetingNameSpan');
      var greetingStateArrayReadout = document.getElementById('greetingStateArrayReadout');
      var greetingPreviewBox = document.getElementById('greetingPreviewBox');

      function updateGreetingState(val) {
        var clean = val === '' ? 'Guest' : val;
        greetingNameSpan.textContent = clean;
        greetingStateArrayReadout.textContent = '["' + clean + '", ƒ setName()]';
        greetingPreviewBox.classList.remove('render-flash');
        void greetingPreviewBox.offsetWidth;
        greetingPreviewBox.classList.add('render-flash');
      }

      greetingNameInput.addEventListener('input', function (e) {
        updateGreetingState(e.target.value);
      });
      document.getElementById('resetGreetingBtn').addEventListener('click', function () {
        greetingNameInput.value = 'Guest';
        updateGreetingState('Guest');
      });

      // -----------------------------------------------------------
      // Section 1.3 Interactive Demo: Counter & Event Handling
      // -----------------------------------------------------------
      var counterVal = 0;
      var counterValueSpan = document.getElementById('counterValueSpan');
      var counterEventLog = document.getElementById('counterEventLog');
      var counterPreviewCard = document.getElementById('counterPreviewCard');

      document.getElementById('counterClickMeBtn').addEventListener('click', function () {
        var prev = counterVal;
        counterVal = counterVal + 1;
        counterValueSpan.textContent = String(counterVal);
        counterPreviewCard.classList.remove('render-flash');
        void counterPreviewCard.offsetWidth;
        counterPreviewCard.classList.add('render-flash');
        counterEventLog.innerHTML = '<span class="text-sky-400">onClick</span> fired → <span class="text-blue-400">handleIncrement()</span> → <span class="text-emerald-400">setCount(' + prev + ' + 1)</span> → UI re-rendered with <strong>' + counterVal + '</strong>';
      });

      document.getElementById('counterResetBtn').addEventListener('click', function () {
        counterVal = 0;
        counterValueSpan.textContent = '0';
        counterEventLog.textContent = 'Counter reset to initial state (0).';
      });

      // -----------------------------------------------------------
      // Section 2.1 Interactive Demo: ScoreBoard (Updater fn & Object Spread)
      // -----------------------------------------------------------
      var sbScore = 0;
      var sbPlayer = { name: 'Alice', level: 1 };
      var sbPlayerName = document.getElementById('sbPlayerName');
      var sbPlayerLevel = document.getElementById('sbPlayerLevel');
      var sbScoreVal = document.getElementById('sbScoreVal');
      var sbStateJson = document.getElementById('sbStateJson');
      var scoreboardPreviewBox = document.getElementById('scoreboardPreviewBox');
      var staleClosureExplain = document.getElementById('staleClosureExplain');

      function renderScoreBoard() {
        sbPlayerName.textContent = sbPlayer.name;
        sbPlayerLevel.textContent = String(sbPlayer.level);
        sbScoreVal.textContent = String(sbScore);
        sbStateJson.textContent = 'score: ' + sbScore + '\nplayer: ' + JSON.stringify(sbPlayer);
        scoreboardPreviewBox.classList.remove('render-flash');
        void scoreboardPreviewBox.offsetWidth;
        scoreboardPreviewBox.classList.add('render-flash');
      }

      document.getElementById('sbAddPointBtn').addEventListener('click', function () {
        sbScore = sbScore + 1;
        renderScoreBoard();
      });

      // Showdown 1: Direct Setter 3 times (Stale snapshot trap)
      var sbDirectStaleBtn = document.getElementById('sbDirectStaleBtn');
      if (sbDirectStaleBtn) {
        sbDirectStaleBtn.addEventListener('click', function () {
          var snapshot = sbScore;
          // In React, calling setScore(score + 1) three times in one event handler:
          // All 3 calls close over `score = snapshot`, so the final state is snapshot + 1!
          sbScore = snapshot + 1;
          renderScoreBoard();
          if (staleClosureExplain) {
            staleClosureExplain.innerHTML = '<span class="inline-flex items-center gap-1 text-rose-500 font-bold"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Stale Snapshot Trap!</span> Called <code>setScore(' + snapshot + ' + 1)</code> 3 times in a row. Because all three used the old snapshot (<code>' + snapshot + '</code>), score only went from <strong>' + snapshot + '</strong> to <strong>' + sbScore + '</strong>!';
          }
          showToast('Direct setter used stale snapshot: only +1 added!');
        });
      }

      // Showdown 2: Updater Function 3 times (Safe queue)
      document.getElementById('sbBurstPointBtn').addEventListener('click', function () {
        var start = sbScore;
        // In React, calling setScore(prev => prev + 1) three times:
        // React queues updates sequentially: prev => prev + 1, so +3!
        sbScore = sbScore + 3;
        renderScoreBoard();
        if (staleClosureExplain) {
          staleClosureExplain.innerHTML = '<span class="inline-flex items-center gap-1 text-emerald-500 font-bold"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Updater Function Win!</span> Called <code>setScore(prev =&gt; prev + 1)</code> 3 times. React queued the state transitions sequentially (<strong>' + start + ' → ' + (start+1) + ' → ' + (start+2) + ' → ' + sbScore + '</strong>)!';
        }
        showToast('Updater functions queued sequentially: +3 full!');
      });

      document.getElementById('sbLevelUpBtn').addEventListener('click', function () {
        sbPlayer = { name: sbPlayer.name, level: sbPlayer.level + 1 };
        renderScoreBoard();
      });

      document.getElementById('sbResetBtn').addEventListener('click', function () {
        sbScore = 0;
        sbPlayer = { name: 'Alice', level: 1 };
        renderScoreBoard();
        if (staleClosureExplain) {
          staleClosureExplain.innerHTML = '<svg class="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span>Click both buttons to see the difference between stale snapshot closures and pending updater functions.</span>';
        }
      });

      // -----------------------------------------------------------
      // Section 2.2 Interactive Demo: RenderLogger & Object.is
      // -----------------------------------------------------------
      var toggleState = false;
      var renderCount = 1;
      var renderToggleBtn = document.getElementById('renderToggleBtn');
      var renderLoggerCount = document.getElementById('renderLoggerCount');
      var renderConsoleOutput = document.getElementById('renderConsoleOutput');
      var objectIsBadge = document.getElementById('objectIsBadge');
      var renderLoggerBox = document.getElementById('renderLoggerBox');

      function appendConsoleLine(text, colorClass) {
        var line = document.createElement('div');
        line.className = colorClass || 'text-emerald-400';
        line.textContent = text;
        renderConsoleOutput.appendChild(line);
        renderConsoleOutput.scrollTop = renderConsoleOutput.scrollHeight;
      }

      renderToggleBtn.addEventListener('click', function () {
        var oldVal = toggleState;
        toggleState = !toggleState;
        renderCount += 1;
        renderLoggerCount.textContent = String(renderCount);
        renderToggleBtn.textContent = toggleState ? 'On' : 'Off';
        renderToggleBtn.className = toggleState
          ? 'px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow'
          : 'px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-slate-600 hover:bg-slate-700 transition-all shadow';
        objectIsBadge.textContent = 'Object.is(' + oldVal + ', ' + toggleState + ') === false → Re-render!';
        renderLoggerBox.classList.remove('render-flash');
        void renderLoggerBox.offsetWidth;
        renderLoggerBox.classList.add('render-flash');
        appendConsoleLine('> Component is rendering! Toggle is: ' + toggleState, 'text-emerald-400');
      });

      document.getElementById('renderSameValBtn').addEventListener('click', function () {
        objectIsBadge.textContent = 'Object.is(' + toggleState + ', ' + toggleState + ') === true → Bail out!';
        appendConsoleLine('// Called setToggle(' + toggleState + '): Object.is is true, React skipped re-render.', 'text-amber-400');
      });

      document.getElementById('clearRenderConsoleBtn').addEventListener('click', function () {
        renderConsoleOutput.innerHTML = '';
        appendConsoleLine('// Console cleared. Current toggle state: ' + toggleState, 'text-slate-400');
      });

      // -----------------------------------------------------------
      // Section 3.1 Interactive Demo: TitleUpdater (useEffect)
      // -----------------------------------------------------------
      var titleClicks = 0;
      var simBrowserTab = document.getElementById('simBrowserTab');
      var titleClicksCount = document.getElementById('titleClicksCount');
      var titleEffectTimeline = document.getElementById('titleEffectTimeline');

      function updateTitleDemo() {
        var newTitle = 'Clicked ' + titleClicks + ' times';
        simBrowserTab.textContent = newTitle;
        titleClicksCount.textContent = String(titleClicks);
        document.title = newTitle + ' — React State & Effect';
        titleEffectTimeline.innerHTML = '1. Render JSX (clicks = ' + titleClicks + ') → 2. Screen Painted → 3. <span class="text-sky-400">useEffect</span> updated <code class="text-emerald-400">document.title = "' + newTitle + '"</code>';
      }

      document.getElementById('titleUpdaterClickBtn').addEventListener('click', function () {
        titleClicks += 1;
        updateTitleDemo();
      });

      document.getElementById('resetTitleUpdaterBtn').addEventListener('click', function () {
        titleClicks = 0;
        updateTitleDemo();
      });

      // -----------------------------------------------------------
      // Section 3.2 Interactive Demo: Dependency Array & UserProfile
      // -----------------------------------------------------------
      var mockUsers = {
        '1': { name: 'Ada Lovelace (ID #1)', role: 'Systems Architect' },
        '2': { name: 'Alan Turing (ID #2)', role: 'Principal Cryptographer' },
        '3': { name: 'Grace Hopper (ID #3)', role: 'Compiler Pioneer' }
      };
      var currentUserId = '1';
      var currentDepMode = 'smart'; // 'smart' = [userId], 'mount' = [], 'none' = no array
      var apiCalls = 1;
      var apiFetchCounter = document.getElementById('apiFetchCounter');
      var userProfileNameDisplay = document.getElementById('userProfileNameDisplay');
      var userProfileRoleDisplay = document.getElementById('userProfileRoleDisplay');
      var depArrayLog = document.getElementById('depArrayLog');
      var userProfileOutputCard = document.getElementById('userProfileOutputCard');
      var depModeBadge = document.getElementById('depModeBadge');

      // Mode switch buttons
      document.querySelectorAll('.dep-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentDepMode = btn.getAttribute('data-dep-mode');
          document.querySelectorAll('.dep-mode-btn').forEach(function (b) {
            b.className = 'dep-mode-btn py-1 px-1.5 rounded-lg text-[11px] font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all';
          });
          btn.className = 'dep-mode-btn py-1 px-1.5 rounded-lg text-[11px] font-mono font-bold bg-sky-600 text-white transition-all';

          if (currentDepMode === 'smart') {
            if (depModeBadge) depModeBadge.textContent = '[userId] (Smart)';
            depArrayLog.innerHTML = '<span class="text-sky-400 font-semibold">Mode: [userId]</span>. Effect only runs on mount and whenever <code>userId</code> changes.';
          } else if (currentDepMode === 'mount') {
            if (depModeBadge) depModeBadge.textContent = '[] (Mount only)';
            depArrayLog.innerHTML = '<span class="text-amber-400 font-semibold">Mode: []</span>. Effect runs ONCE on initial mount; subsequent <code>userId</code> changes will be completely ignored!';
          } else if (currentDepMode === 'none') {
            if (depModeBadge) depModeBadge.textContent = 'No Array (Every Render)';
            depArrayLog.innerHTML = '<span class="text-rose-400 font-semibold">Mode: No Array</span>. Warning: Effect executes after EVERY single render!';
          }
        });
      });

      document.querySelectorAll('.userid-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var nextId = btn.getAttribute('data-userid');
          document.querySelectorAll('.userid-btn').forEach(function (b) {
            b.className = 'userid-btn py-1.5 px-2 rounded-lg text-xs font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
          });
          btn.className = 'userid-btn py-1.5 px-2 rounded-lg text-xs font-mono font-semibold bg-sky-600 text-white';

          if (currentDepMode === 'mount') {
            // Mode [] ignores prop changes!
            depArrayLog.innerHTML = '<span class="inline-flex items-center gap-1 text-rose-400 font-bold"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Stale Prop Bug!</span> Mode is <code>[]</code>. `userId` changed to <strong>' + nextId + '</strong>, but <code>useEffect</code> never re-ran. Stale user data remains on screen!';
            showToast('Mode [] ignored userId change (stale user displayed)!');
            return;
          }

          if (nextId === currentUserId) {
            if (currentDepMode === 'none') {
              apiCalls += 1;
              apiFetchCounter.textContent = String(apiCalls);
              depArrayLog.innerHTML = '<span class="inline-flex items-center gap-1 text-rose-400 font-bold"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Inefficient:</span> Mode has <strong>No Array</strong>. Even though `userId` stayed <strong>' + nextId + '</strong>, fetch fired again!';
            } else {
              depArrayLog.innerHTML = 'Re-render: <code class="text-amber-400">userId</code> is still <strong>' + nextId + '</strong> → Dependency <code class="text-sky-400">[userId]</code> unchanged → <strong>Skipped fetch!</strong>';
            }
            return;
          }

          var prevId = currentUserId;
          currentUserId = nextId;
          apiCalls += 1;
          apiFetchCounter.textContent = String(apiCalls);
          userProfileNameDisplay.textContent = 'Loading...';
          userProfileRoleDisplay.textContent = 'Fetching https://api.example.com/users/' + nextId;

          setTimeout(function () {
            var u = mockUsers[nextId];
            userProfileNameDisplay.textContent = u.name;
            userProfileRoleDisplay.textContent = u.role;
            userProfileOutputCard.classList.remove('render-flash');
            void userProfileOutputCard.offsetWidth;
            userProfileOutputCard.classList.add('render-flash');
            depArrayLog.innerHTML = 'Dependency changed (<code class="text-sky-400">' + prevId + ' → ' + nextId + '</code>) → Effect ran <code class="text-emerald-400">fetch("https://api.example.com/users/' + nextId + '")</code>';
          }, 200);
        });
      });

      document.getElementById('unrelatedRenderBtn').addEventListener('click', function () {
        if (currentDepMode === 'none') {
          apiCalls += 1;
          apiFetchCounter.textContent = String(apiCalls);
          depArrayLog.innerHTML = '<span class="inline-flex items-center gap-1 text-rose-400 font-bold"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Redundant API Call!</span> Because there is <strong>No Dependency Array</strong>, this unrelated state update triggered another redundant network fetch!';
          showToast('No Array: Unrelated re-render caused redundant fetch!');
        } else {
          depArrayLog.innerHTML = 'Component re-rendered, but dependencies did not change → <strong class="text-emerald-400">useEffect skipped fetch!</strong>';
        }
      });

      // -----------------------------------------------------------
      // Section 3.3 Interactive Demo: Timer & Cleanup Function
      // -----------------------------------------------------------
      var timerSeconds = 0;
      var timerMounted = true;
      var timerIntervalId = null;
      var intervalSeq = 1;
      var timerSecondsSpan = document.getElementById('timerSecondsSpan');
      var timerMountBadge = document.getElementById('timerMountBadge');
      var timerComponentViewport = document.getElementById('timerComponentViewport');
      var toggleTimerMountBtn = document.getElementById('toggleTimerMountBtn');
      var timerLifecycleLog = document.getElementById('timerLifecycleLog');

      function logTimerEvent(msg, cls) {
        var div = document.createElement('div');
        div.className = cls || 'text-slate-300';
        div.textContent = msg;
        timerLifecycleLog.appendChild(div);
        timerLifecycleLog.scrollTop = timerLifecycleLog.scrollHeight;
      }

      function startTimerEffect() {
        if (timerIntervalId !== null) {
          clearInterval(timerIntervalId);
        }
        var currentSeq = intervalSeq;
        timerIntervalId = setInterval(function () {
          timerSeconds += 1;
          if (timerSecondsSpan) {
            timerSecondsSpan.textContent = String(timerSeconds);
          }
        }, 1000);
        logTimerEvent('[Mount] setInterval started (intervalId #' + currentSeq + ')', 'text-emerald-400');
      }

      function stopTimerCleanup() {
        if (timerIntervalId !== null) {
          clearInterval(timerIntervalId);
          timerIntervalId = null;
        }
        logTimerEvent('[Cleanup] clearInterval(intervalId #' + intervalSeq + ') ran — timer stopped cleanly!', 'text-rose-400');
        intervalSeq += 1;
      }

      startTimerEffect();

      toggleTimerMountBtn.addEventListener('click', function () {
        timerMounted = !timerMounted;
        if (timerMounted) {
          timerSeconds = 0;
          timerComponentViewport.innerHTML = '<div class="text-xs font-mono text-slate-400">&lt;Timer /&gt;</div><h4 class="text-lg font-extrabold text-slate-900 dark:text-white">Time spent: <span id="timerSecondsSpan" class="font-mono text-sky-600 dark:text-sky-400">0</span> seconds</h4>';
          timerSecondsSpan = document.getElementById('timerSecondsSpan');
          timerMountBadge.textContent = 'Mounted';
          timerMountBadge.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
          toggleTimerMountBtn.textContent = 'Unmount <Timer /> (Run Cleanup)';
          toggleTimerMountBtn.className = 'flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all';
          startTimerEffect();
        } else {
          stopTimerCleanup();
          timerComponentViewport.innerHTML = '<div class="py-3 text-xs font-mono text-slate-400 italic">&lt;Timer /&gt; is unmounted from the DOM (Cleanup executed).</div>';
          timerMountBadge.textContent = 'Unmounted';
          timerMountBadge.className = 'text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400';
          toggleTimerMountBtn.textContent = 'Mount <Timer /> Again';
          toggleTimerMountBtn.className = 'flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all';
        }
      });

      document.getElementById('resetTimerSandboxBtn').addEventListener('click', function () {
        timerSeconds = 0;
        if (!timerMounted) {
          toggleTimerMountBtn.click();
        } else if (timerSecondsSpan) {
          timerSecondsSpan.textContent = '0';
          logTimerEvent('[Reset] Timer seconds reset to 0', 'text-sky-400');
        }
      });

      // -----------------------------------------------------------
      // Interactive 6-Question Knowledge Check Quiz
      // -----------------------------------------------------------
      var quizQuestions = [
        {
          id: 'q1',
          topic: 'Topic 1.1 • State Fundamentals',
          question: 'Why does updating a standard JavaScript variable (like `let count = 0`) fail to update the React UI?',
          options: [
            'Standard variables cannot store numbers inside JSX functions.',
            'React does not know when a plain variable changes, so it never triggers a re-render.',
            'JavaScript blocks variable mutations inside functional components.'
          ],
          correct: 1,
          explanation: 'React relies on state setters to know when data has changed so it can re-render the component and keep the screen in sync.'
        },
        {
          id: 'q2',
          topic: 'Topic 1.2 • useState Hook',
          question: 'What does `useState(initialValue)` return when called at the top level of a component?',
          options: [
            'An object containing `{ state, setState }`.',
            'An array with two elements: `[currentStateValue, stateSetterFunction]`.',
            'A single mutable state reference.'
          ],
          correct: 1,
          explanation: '`useState` returns a 2-element array `[state, setState]`, which we typically unpack using array destructuring.'
        },
        {
          id: 'q3',
          topic: 'Topic 2.1 • Updating State',
          question: 'How should you safely update a state object like `const [player, setPlayer] = useState({ name: "Alice", level: 1 })`?',
          options: [
            'Mutate `player.level = 2` directly.',
            'Pass a new copied object using spread syntax: `setPlayer(prev => ({ ...prev, level: prev.level + 1 }))`.',
            'Call `useState({ level: 2 })` inside the click handler.'
          ],
          correct: 1,
          explanation: 'State in React is immutable. Always create a new copy of objects/arrays (e.g., with `...prevPlayer`) and pass it to the setter.'
        },
        {
          id: 'q4',
          topic: 'Topic 2.2 • Re-rendering',
          question: 'How does React decide whether calling a state setter should schedule a re-render?',
          options: [
            'It compares the old state and new state using `Object.is` (strict equality).',
            'It always re-renders every component on the page unconditionally.',
            'It waits 5 seconds and checks if the HTML changed.'
          ],
          correct: 0,
          explanation: 'React uses `Object.is` to compare the new value to the old value. If they are identical, React bails out without re-rendering.'
        },
        {
          id: 'q5',
          topic: 'Topic 3.2 • Dependency Array',
          question: 'When does `useEffect(() => { ... }, [userId])` execute its effect function?',
          options: [
            'Only when the component unmounts.',
            'After every single render regardless of what changed.',
            'On the initial mount, and subsequently only when `userId` changes between renders.'
          ],
          correct: 2,
          explanation: 'Passing `[userId]` tells React to run the effect on mount and re-run it only when `userId` has changed since the last render.'
        },
        {
          id: 'q6',
          topic: 'Topic 3.3 • Cleanup Function',
          question: 'Why should an effect that starts a `setInterval` return a cleanup function `() => clearInterval(intervalId)`?',
          options: [
            'To destroy the continuous timer before the component unmounts or before the effect re-runs, preventing memory leaks.',
            'To convert `useEffect` into `useState`.',
            'Because React requires every `useEffect` to return a number.'
          ],
          correct: 0,
          explanation: 'Cleanup functions stop continuous processes (timers, subscriptions, event listeners) on unmount or before re-running the effect.'
        }
      ];

      var currentQuizIndex = 0;
      var quizAnswers = {};
      var quizContainer = document.getElementById('quizContainer');
      var quizScoreDisplay = document.getElementById('quizScoreDisplay');

      function renderQuiz() {
        if (!quizContainer) return;
        quizContainer.innerHTML = '';

        var total = quizQuestions.length;
        var correctCount = 0;
        var answeredCount = 0;

        quizQuestions.forEach(function (q) {
          if (typeof quizAnswers[q.id] === 'number') {
            answeredCount += 1;
            if (quizAnswers[q.id] === q.correct) correctCount += 1;
          }
        });

        if (quizScoreDisplay) {
          quizScoreDisplay.textContent = correctCount + ' / ' + total;
        }

        // Summary Screen State when user finishes all questions
        if (currentQuizIndex >= total) {
          var pct = Math.round((correctCount / total) * 100);
          var summaryCard = document.createElement('div');
          summaryCard.className = 'p-6 sm:p-8 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-xl text-center space-y-6 animate-in fade-in duration-200';

          var badgeColor = pct >= 80 ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                           pct >= 50 ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                           'text-rose-400 border-rose-500/30 bg-rose-500/10';

          var msg = pct === 100 ? 'Flawless Victory! You have completely mastered React State and Side Effects.' :
                    pct >= 80 ? 'Outstanding! You have a solid grasp of state management and effect lifecycles.' :
                    pct >= 50 ? 'Good work! Review the topics in the handbook to sharpen your knowledge.' :
                    'Keep practicing! Revisit Topic 1 & Topic 3 to solidify your mental model.';

          summaryCard.innerHTML =
            '<div class="space-y-2">' +
              '<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold ' + badgeColor + '">' +
                '<span>QUIZ COMPLETED</span>' +
              '</div>' +
              '<h3 class="text-2xl font-black text-white">Your Final Score</h3>' +
              '<div class="text-4xl sm:text-5xl font-black font-mono text-yellow-400 py-2">' +
                correctCount + ' <span class="text-slate-500 text-2xl">/ ' + total + '</span>' +
                '<span class="text-lg text-slate-300 font-semibold ml-2">(' + pct + '%)</span>' +
              '</div>' +
              '<p class="text-sm text-slate-300 max-w-md mx-auto">' + msg + '</p>' +
            '</div>' +
            '<div class="flex flex-wrap items-center justify-center gap-3 pt-2">' +
              '<button type="button" id="reviewQuizBtn" class="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors">' +
                'Review Questions' +
              '</button>' +
              '<button type="button" id="retakeQuizBtn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 hover:from-blue-500 hover:via-red-500 hover:to-amber-400 text-white text-xs font-bold transition-all shadow-md border border-yellow-400/40">' +
                'Retake Quiz' +
              '</button>' +
            '</div>';

          quizContainer.appendChild(summaryCard);

          var reviewBtn = document.getElementById('reviewQuizBtn');
          if (reviewBtn) {
            reviewBtn.addEventListener('click', function () {
              currentQuizIndex = 0;
              renderQuiz();
            });
          }

          var retakeBtn = document.getElementById('retakeQuizBtn');
          if (retakeBtn) {
            retakeBtn.addEventListener('click', function () {
              quizAnswers = {};
              currentQuizIndex = 0;
              renderQuiz();
              showToast('Quiz reset! Good luck.');
            });
          }
          return;
        }

        // Active Question Card State
        var q = quizQuestions[currentQuizIndex];
        var userChoice = quizAnswers[q.id];
        var isAnswered = typeof userChoice === 'number';

        var card = document.createElement('div');
        card.className = 'p-6 sm:p-8 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-xl space-y-6 animate-in fade-in duration-150';

        // Step Dots Navigation Bar
        var dotsHtml = '<div class="flex items-center gap-1.5 flex-wrap">';
        quizQuestions.forEach(function (quest, idx) {
          var isCur = idx === currentQuizIndex;
          var ans = quizAnswers[quest.id];
          var hasAns = typeof ans === 'number';
          var isCor = hasAns && ans === quest.correct;

          var dotClass = 'w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all ';
          if (isCur) {
            dotClass += 'ring-2 ring-yellow-400 bg-blue-600 text-white shadow-md shadow-blue-500/30';
          } else if (hasAns && isCor) {
            dotClass += 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30';
          } else if (hasAns && !isCor) {
            dotClass += 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30';
          } else {
            dotClass += 'bg-slate-900/60 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200';
          }

          dotsHtml += '<button type="button" data-jump-q="' + idx + '" class="quiz-step-btn ' + dotClass + '" title="Jump to Question ' + (idx + 1) + '">' + (idx + 1) + '</button>';
        });
        dotsHtml += '</div>';

        // Header: Topic + Indicator + Step Tabs
        var headerHtml =
          '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">' +
            '<div class="space-y-0.5">' +
              '<span class="text-xs font-mono text-yellow-400 font-bold uppercase tracking-wider">' + q.topic + '</span>' +
              '<div class="text-xs text-slate-400 font-mono">Question ' + (currentQuizIndex + 1) + ' of ' + total + '</div>' +
            '</div>' +
            dotsHtml +
          '</div>' +
          '<div class="space-y-2">' +
            '<h3 class="text-base sm:text-lg font-bold text-white leading-snug">' + q.question + '</h3>' +
          '</div>';

        // Options List
        var optionsHtml = '<div class="space-y-2.5">';
        q.options.forEach(function (opt, optIdx) {
          var btnCls = 'w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all flex items-start gap-3 ';
          var optLetter = String.fromCharCode(65 + optIdx);

          if (!isAnswered) {
            btnCls += 'bg-slate-900/70 hover:bg-slate-700/70 hover:border-yellow-400/50 border-slate-700 text-slate-200';
          } else if (optIdx === q.correct) {
            btnCls += 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-semibold ring-1 ring-emerald-400/40';
          } else if (optIdx === userChoice) {
            btnCls += 'bg-rose-500/20 border-rose-400 text-rose-200 ring-1 ring-rose-400/40';
          } else {
            btnCls += 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
          }

          var indicatorHtml =
            '<span class="w-5 h-5 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 ' +
              (!isAnswered ? 'bg-slate-800 text-slate-300' :
               optIdx === q.correct ? 'bg-emerald-500 text-slate-950' :
               optIdx === userChoice ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-600') + '">' +
              optLetter +
            '</span>';

          optionsHtml += '<button type="button" data-qid="' + q.id + '" data-opt="' + optIdx + '" class="quiz-opt-btn ' + btnCls + '">' +
            indicatorHtml +
            '<span class="flex-1">' + opt + '</span>' +
          '</button>';
        });
        optionsHtml += '</div>';

        // Feedback / Explanation Box
        var feedbackHtml = '';
        if (isAnswered) {
          var isRight = userChoice === q.correct;
          feedbackHtml =
            '<div class="p-4 rounded-xl text-xs sm:text-sm leading-relaxed animate-in fade-in duration-150 ' +
              (isRight ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-200' : 'bg-rose-950/80 border border-rose-700/60 text-rose-200') + '">' +
              '<div class="font-bold flex items-center gap-1.5 mb-1.5">' +
                (isRight ?
                  '<svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span class="text-emerald-400">Correct!</span>' :
                  '<svg class="w-4 h-4 text-rose-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span class="text-rose-400">Incorrect</span>') +
              '</div>' +
              '<div class="text-slate-300">' + q.explanation + '</div>' +
            '</div>';
        }

        // Bottom Navigation Controls
        var isFirst = currentQuizIndex === 0;
        var isLast = currentQuizIndex === total - 1;
        var nextBtnLabel = isLast ? 'Finish Quiz' : 'Next Question';

        var navHtml =
          '<div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-700/80">' +
            '<button type="button" id="prevQuizBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ' +
              (isFirst ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200') + '" ' +
              (isFirst ? 'disabled' : '') + '>' +
              '<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>' +
              '<span>Previous</span>' +
            '</button>' +
            '<button type="button" id="nextQuizBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ' +
              (isAnswered ? 'bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 hover:from-blue-500 hover:via-red-500 hover:to-amber-400 text-white shadow-md border border-yellow-400/40' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700') + '">' +
              '<span>' + nextBtnLabel + '</span>' +
              '<svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>' +
            '</button>' +
          '</div>';

        card.innerHTML = headerHtml + optionsHtml + feedbackHtml + navHtml;
        quizContainer.appendChild(card);

        // Bind Option Selection
        card.querySelectorAll('.quiz-opt-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var qid = btn.getAttribute('data-qid');
            var opt = parseInt(btn.getAttribute('data-opt'), 10);
            quizAnswers[qid] = opt;
            renderQuiz();
          });
        });

        // Bind Previous Button
        var prevBtn = document.getElementById('prevQuizBtn');
        if (prevBtn && !isFirst) {
          prevBtn.addEventListener('click', function () {
            currentQuizIndex -= 1;
            renderQuiz();
          });
        }

        // Bind Next / Finish Button
        var nextBtn = document.getElementById('nextQuizBtn');
        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            currentQuizIndex += 1;
            renderQuiz();
          });
        }

        // Bind Step Question Jump Buttons
        card.querySelectorAll('.quiz-step-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var jumpIdx = parseInt(btn.getAttribute('data-jump-q'), 10);
            currentQuizIndex = jumpIdx;
            renderQuiz();
          });
        });
      }

      var resetQuizBtn = document.getElementById('resetQuizBtn');
      if (resetQuizBtn) {
        resetQuizBtn.addEventListener('click', function () {
          quizAnswers = {};
          currentQuizIndex = 0;
          renderQuiz();
          showToast('Quiz reset! Starting from Question 1.');
        });
      }

      // -----------------------------------------------------------
      // Lightweight Syntax Highlighter for JSX/JS Pre Blocks
      // -----------------------------------------------------------
      function highlightAllCodeBlocks() {
        document.querySelectorAll('pre[id^="code-"] code').forEach(function (block) {
          if (block.getAttribute('data-highlighted')) return;
          block.setAttribute('data-highlighted', 'true');
          var raw = block.innerHTML;
          // Mask comments
          var pass = raw.replace(/(\/\/[^\n]*)/g, '___COMMENT___$1___ENDCOMMENT___');
          // Mask strings
          pass = pass.replace(/('(?:[^'\\\n]|\\.)*'|`[\s\S]*?`)/g, '___STR___$1___ENDSTR___');
          // JS Keywords
          pass = pass.replace(/\b(import|from|export|default|function|return|const|let|var|if|else)\b/g, '<span class="text-sky-400 font-semibold">$1</span>');
          // React Hooks
          pass = pass.replace(/\b(useState|useEffect)\b/g, '<span class="text-sky-400 font-bold">$1</span>');
          // JSX Tag opening and closing
          pass = pass.replace(/(&lt;\/?[a-zA-Z0-9]+)/g, '<span class="text-blue-400 font-semibold">$1</span>');
          pass = pass.replace(/(&gt;)/g, '<span class="text-indigo-300 font-semibold">&gt;</span>');
          // React Event handler props
          pass = pass.replace(/\b(onClick|onChange|onSubmit)\b/g, '<span class="text-amber-300 font-medium">$1</span>');
          // Restore strings
          pass = pass.replace(/___STR___([\s\S]*?)___ENDSTR___/g, '<span class="text-emerald-300 font-mono">$1</span>');
          // Restore comments
          pass = pass.replace(/___COMMENT___([\s\S]*?)___ENDCOMMENT___/g, '<span class="text-slate-500 italic">$1</span>');
          block.innerHTML = pass;
        });
      }
      highlightAllCodeBlocks();

      // -----------------------------------------------------------
      // Kuya's Confession Room (Focused Handbook Section Mode)
      // -----------------------------------------------------------
      var currentSlide = 0;
      var confessionSections = [
        {
          id: 'sec-1-1',
          secNum: '1.1',
          topicNum: 1,
          topicBadge: 'Topic 1 • Introduction to State',
          title: 'Understanding State in React',
          subtitle: 'The Component Memory that Surpasses Normal JavaScript Variables',
          anchor: '#sec-1-1',
          definition: '<strong>State</strong> is a built-in React object that stores data or information about a component. It represents the parts of an application that can change over time based on user action, network responses, or timers.',
          explanation: 'In standard JavaScript, mutating a variable does not notify React to redraw the screen. State acts as the <strong>memory of a component</strong>. When state updates via its setter, React schedules a re-render to redraw the screen and keep the UI in sync.',
          codeTitle: 'VariableVsState.js',
          code: '// [Normal Variable]: Memory updates, but React never redraws the UI\nlet count = 0;\ncount = count + 1;\n\n// [React State]: Memory persists across renders + triggers immediate UI update\nconst [count, setCount] = useState(0);\nsetCount(count + 1);',
          takeaways: [
            '<strong>Silent Mutation:</strong> Standard variables (<code>let x = 0</code>) mutate silently in RAM without scheduling a UI repaint.',
            '<strong>Component Memory:</strong> State persists across component re-renders while the component stays mounted.',
            '<strong>Setter Signal:</strong> Calling a state setter function alerts React to queue an immediate UI update.'
          ]
        },
        {
          id: 'sec-1-2',
          secNum: '1.2',
          topicNum: 1,
          topicBadge: 'Topic 1 • Introduction to State',
          title: 'Using the useState Hook',
          subtitle: 'Array Destructuring, Syntax Anatomy & Initial State Rules',
          anchor: '#sec-1-2',
          definition: '<code class="font-semibold text-sky-400">useState</code> is a React Hook that allows you to add state variables and persistent memory to functional components.',
          explanation: 'You call <code class="text-sky-400">useState</code> at the top level of your component. It takes one argument (the initial state) and returns a 2-element tuple: the <strong>current state value</strong> and a <strong>setter function</strong>. We unpack this with array destructuring: <code>const [name, setName] = useState(\'Guest\')</code>.',
          codeTitle: 'Greeting.jsx',
          code: 'import { useState } from \'react\';\n\nfunction Greeting() {\n  // name: current state value | setName: updater function\n  const [name, setName] = useState(\'Guest\');\n\n  return (\n    <div>\n      <p>Hello, {name}!</p>\n      <button onClick={() => setName(\'Kuya\')}>Change Name</button>\n    </div>\n  );\n}',
          takeaways: [
            '<strong>Top-Level Only:</strong> Never call <code>useState</code> inside loops, conditions, or nested functions.',
            '<strong>Tuple Return:</strong> Returns <code>[state, setState]</code> — convention is <code>[value, setValue]</code>.',
            '<strong>Initial Argument:</strong> Evaluated only on the initial mount; ignored on subsequent re-renders.'
          ]
        },
        {
          id: 'sec-1-3',
          secNum: '1.3',
          topicNum: 1,
          topicBadge: 'Topic 1 • Introduction to State',
          title: 'Handling User Events',
          subtitle: 'Connecting User Gestures to State Updates with Synthetic Events',
          anchor: '#sec-1-3',
          definition: '<strong>Event handling</strong> in React involves capturing user interactions (like clicks, keypresses, or form submissions) and executing an event handler function to update state.',
          explanation: 'React uses camelCase props like <code class="text-sky-400">onClick</code>, <code class="text-sky-400">onChange</code>, and <code class="text-sky-400">onSubmit</code>. Always pass a function reference (<code>onClick={handleClick}</code>) rather than calling the function immediately (<code>onClick={handleClick()}</code>). When clicked, the handler fires, calls the setter, and schedules a repaint.',
          codeTitle: 'Counter.jsx',
          code: 'function Counter() {\n  const [count, setCount] = useState(0);\n\n  // Event handler references the setter\n  const handleIncrement = () => {\n    setCount(count + 1);\n  };\n\n  return <button onClick={handleIncrement}>Clicked {count} times</button>;\n}',
          takeaways: [
            '<strong>Synthetic Events:</strong> React wraps native browser events in a cross-browser SyntheticEvent wrapper.',
            '<strong>Pass Function Reference:</strong> Do not invoke handlers inline (avoid <code>onClick={fn()}</code>).',
            '<strong>Action Pipeline:</strong> User action → Event listener fires → Setter invoked → React schedules re-render.'
          ]
        },
        {
          id: 'sec-2-1',
          secNum: '2.1',
          topicNum: 2,
          topicBadge: 'Topic 2 • More on State',
          title: 'Updating State & Immutability',
          subtitle: 'Immutable Data Structures, Object Spreading & Functional Updaters',
          anchor: '#sec-2-1',
          definition: '<strong>State updating</strong> replaces old state with new state using the setter function. State in React is <strong>immutable</strong>; modifying it directly (e.g. <code>player.level = 2</code>) will break React\'s change detection.',
          explanation: 'When state holds objects or arrays, you must copy the previous object with the spread operator (<code>{ ...prevPlayer, level: prevPlayer.level + 1 }</code>). Furthermore, when new state depends on previous state, always pass an <strong>updater function</strong> (<code>setScore(prev => prev + 1)</code>) to prevent stale closure traps during rapid updates.',
          codeTitle: 'ScoreBoard.jsx',
          code: '// Updating an object immutably with spread:\nsetPlayer(prevPlayer => ({\n  ...prevPlayer,\n  level: prevPlayer.level + 1\n}));\n\n// Safe sequential updates with functional updater:\nsetScore(prevScore => prevScore + 1);\nsetScore(prevScore => prevScore + 1); // Correctly increments by +2!',
          takeaways: [
            '<strong>Never Mutate Directly:</strong> Direct mutations bypass React\'s change detection completely.',
            '<strong>Spread Syntax:</strong> Use <code>...prev</code> to preserve existing properties when updating objects/arrays.',
            '<strong>Functional Updater:</strong> Use <code>setState(prev => prev + 1)</code> whenever state calculation depends on previous state.'
          ]
        },
        {
          id: 'sec-2-2',
          secNum: '2.2',
          topicNum: 2,
          topicBadge: 'Topic 2 • More on State',
          title: 'State & Re-rendering Mechanics',
          subtitle: 'How React Detects State Changes Using Object.is Equality',
          anchor: '#sec-2-2',
          definition: 'A <strong>re-render</strong> is React\'s process of executing your component function again to compute new JSX and diff the virtual DOM against the real DOM.',
          explanation: 'When a setter is called, React compares the new value to the previous value using <code class="text-sky-400">Object.is</code>. If they are identical (like mutating an object in-place and passing the same reference), React skips the re-render. If the reference or primitive differs, React recalculates the component and updates only changed DOM nodes.',
          codeTitle: 'RenderLogger.jsx',
          code: 'function RenderLogger() {\n  const [user, setUser] = useState({ name: \'Bob\' });\n\n  // [Trap] Same object reference: Object.is is TRUE -> NO RE-RENDER!\n  const badUpdate = () => {\n    user.name = \'Charlie\';\n    setUser(user); \n  };\n\n  // [Correct] New object reference: Object.is is FALSE -> RE-RENDERS!\n  const goodUpdate = () => {\n    setUser({ ...user, name: \'Charlie\' });\n  };\n}',
          takeaways: [
            '<strong>Object.is Comparison:</strong> React uses strict reference equality to determine if an update occurred.',
            '<strong>Bailout Optimization:</strong> If new state === old state by <code>Object.is</code>, React bails out without re-rendering.',
            '<strong>Targeted DOM Diffing:</strong> React re-executes the function, but only updates the actual DOM nodes that changed.'
          ]
        },
        {
          id: 'sec-3-1',
          secNum: '3.1',
          topicNum: 3,
          topicBadge: 'Topic 3 • Side Effects & useEffect',
          title: 'Introduction to useEffect',
          subtitle: 'Synchronizing Components with External Systems Beyond React',
          anchor: '#sec-3-1',
          definition: 'A <strong>side effect</strong> is any operation that interacts with the world outside the component: data fetching, document title modifications, timers, or subscriptions. <code class="text-sky-400">useEffect</code> is the Hook designed for this.',
          explanation: 'React components should be pure functions that take props/state and return JSX. Side effects belong inside <code class="text-sky-400">useEffect</code>. The effect function runs <strong>after</strong> the component renders and the screen paints, ensuring that heavy external tasks never block initial UI rendering.',
          codeTitle: 'TitleUpdater.jsx',
          code: 'import { useState, useEffect } from \'react\';\n\nfunction TitleUpdater() {\n  const [count, setCount] = useState(0);\n\n  // Side effect: reaches outside React to touch browser window\n  useEffect(() => {\n    document.title = `Clicked ${count} times`;\n  }, [count]);\n\n  return <button onClick={() => setCount(count + 1)}>Click {count}</button>;\n}',
          takeaways: [
            '<strong>Pure Rendering:</strong> Component rendering must remain pure; keep side effects inside <code>useEffect</code>.',
            '<strong>Post-Paint Execution:</strong> Effects run after the browser paints the screen, preventing UI lag.',
            '<strong>Synchronization:</strong> Think of <code>useEffect</code> as synchronizing state with external systems, not as a lifecycle hook.'
          ]
        },
        {
          id: 'sec-3-2',
          secNum: '3.2',
          topicNum: 3,
          topicBadge: 'Topic 3 • Side Effects & useEffect',
          title: 'The Dependency Array',
          subtitle: 'Controlling Exactly When Your Effect Re-runs',
          anchor: '#sec-3-2',
          definition: 'The <strong>dependency array</strong> is the optional second argument passed to <code class="text-sky-400">useEffect</code>. It controls whether React re-runs or skips the effect on subsequent renders.',
          explanation: 'Passing <strong>no array</strong> runs the effect after every single render. Passing an <strong>empty array <code>[]</code></strong> runs the effect only once when the component mounts. Passing <strong>dependencies <code>[userId]</code></strong> runs the effect on mount and whenever <code>userId</code> changes between renders.',
          codeTitle: 'UserProfile.jsx',
          code: 'function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n\n  // [userId] dependency: re-runs ONLY when userId changes\n  useEffect(() => {\n    fetchUserFromAPI(userId).then(data => setUser(data));\n  }, [userId]);\n\n  return <div>{user ? user.name : \'Loading...\'}</div>;\n}',
          takeaways: [
            '<strong>No Array:</strong> Runs after every single render (can trigger infinite loops if setting state!).',
            '<strong>Empty Array <code>[]</code>:</strong> Runs exactly once after the initial component mount.',
            '<strong>With Dependencies <code>[a, b]</code>:</strong> Re-runs only when <code>a</code> or <code>b</code> changes between renders.'
          ]
        },
        {
          id: 'sec-3-3',
          secNum: '3.3',
          topicNum: 3,
          topicBadge: 'Topic 3 • Side Effects & useEffect',
          title: 'Using Effects & Cleanup Functions',
          subtitle: 'Preventing Memory Leaks, Ghost Timers & Stale Subscriptions',
          anchor: '#sec-3-3',
          definition: 'A <strong>cleanup function</strong> is a function returned by your <code class="text-sky-400">useEffect</code> callback. React executes it when the component unmounts or right before re-running the effect.',
          explanation: 'Continuous operations like <code>setInterval</code>, WebSockets, or global event listeners keep running in memory even after a component is removed from the DOM unless stopped. Returning a cleanup function (<code>return () => clearInterval(id)</code>) guarantees that old subscriptions are destroyed before new ones start.',
          codeTitle: 'Timer.jsx',
          code: 'function Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setSeconds(prev => prev + 1);\n    }, 1000);\n\n    // Cleanup function: runs on unmount or before effect re-runs\n    return () => {\n      clearInterval(id);\n    };\n  }, []);\n\n  return <div>Seconds elapsed: {seconds}</div>;\n}',
          takeaways: [
            '<strong>Return a Function:</strong> Return <code>() => cleanup()</code> from your effect to tear down continuous tasks.',
            '<strong>Prevent Memory Leaks:</strong> Avoid orphan timers, abandoned event listeners, and memory leaks.',
            '<strong>Re-run Lifecycle:</strong> On effect re-runs, the previous cleanup executes first before the new effect runs.'
          ]
        }
      ];

      var presentModal = document.getElementById('presentModal');
      var slideViewport = document.getElementById('slideViewport');
      var slideIndicator = document.getElementById('slideIndicator');
      var slideDotsContainer = document.getElementById('slideDotsContainer');
      var confessionSectionPills = document.getElementById('confessionSectionPills');
      var prevSlideBtn = document.getElementById('prevSlideBtn');
      var nextSlideBtn = document.getElementById('nextSlideBtn');
      var closePresentBtn = document.getElementById('closePresentBtn');
      var presentModeBtn = document.getElementById('presentModeBtn');
      var mobilePresentBtn = document.getElementById('mobilePresentBtn');
      var heroPresentBtn = document.getElementById('heroPresentBtn');
      var presenterActiveTab = 'code';
      var confessTimerInterval = null;

      function escapeHtml(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      function getSectionOutputHtml(s) {
        if (s.id === 'sec-1-1') {
          return '<div class="space-y-4">' +
            '<div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">' +
              '<span class="text-amber-400 font-bold">Goal:</span> See why standard JS variables fail to update the UI while React State triggers a screen redraw.' +
            '</div>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
              '<div class="p-4 rounded-xl bg-slate-900/90 border border-rose-500/30 space-y-3">' +
                '<div class="flex items-center justify-between">' +
                  '<span class="text-xs font-mono font-bold text-rose-400 uppercase">1. Normal JS Variable</span>' +
                  '<span class="text-xs font-mono text-slate-400">let count = 0;</span>' +
                '</div>' +
                '<div class="p-3 rounded-lg bg-slate-950 font-mono text-center space-y-1">' +
                  '<div class="text-xs text-slate-400">UI Screen Display:</div>' +
                  '<div id="demo11NormalUi" class="text-2xl font-black text-slate-200">0</div>' +
                  '<div class="text-[11px] text-slate-500">Internal RAM: <span id="demo11NormalRam" class="text-amber-400 font-bold">0</span></div>' +
                '</div>' +
                '<button type="button" id="demo11MutateBtn" class="w-full py-2 px-3 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 border border-rose-500/40 text-xs font-mono font-semibold transition-colors">' +
                  'Mutate (count = count + 1)' +
                '</button>' +
                '<div id="demo11NormalFeedback" class="text-xs text-slate-400 italic min-h-[36px] flex items-center">Click to mutate the variable silently in RAM...</div>' +
              '</div>' +
              '<div class="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-3">' +
                '<div class="flex items-center justify-between">' +
                  '<span class="text-xs font-mono font-bold text-emerald-400 uppercase">2. React useState()</span>' +
                  '<span class="text-xs font-mono text-slate-400">[count, setCount]</span>' +
                '</div>' +
                '<div class="p-3 rounded-lg bg-slate-950 font-mono text-center space-y-1">' +
                  '<div class="text-xs text-slate-400">UI Screen Display:</div>' +
                  '<div id="demo11StateUi" class="text-2xl font-black text-emerald-400 transition-transform">0</div>' +
                  '<div class="text-[11px] text-slate-500">State Memory: <span id="demo11StateMem" class="text-emerald-300 font-bold">0</span></div>' +
                '</div>' +
                '<button type="button" id="demo11StateBtn" class="w-full py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-200 border border-emerald-500/40 text-xs font-mono font-semibold transition-colors">' +
                  'Call setCount(count + 1)' +
                '</button>' +
                '<div id="demo11StateFeedback" class="text-xs text-slate-400 italic min-h-[36px] flex items-center">Click to invoke the state setter...</div>' +
              '</div>' +
            '</div>' +
            '<div class="flex justify-end pt-1">' +
              '<button type="button" id="demo11ResetBtn" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-colors">Reset Demo</button>' +
            '</div>' +
          '</div>';
        }

        if (s.id === 'sec-1-2') {
          return '<div class="space-y-4">' +
            '<div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3 shadow-lg">' +
              '<div class="text-xs font-mono text-slate-400 uppercase tracking-wider">&lt;Greeting /&gt; Live Rendered Output:</div>' +
              '<div class="text-2xl sm:text-3xl lg:text-4xl font-black text-white py-2">' +
                'Hello, <span id="demo12NameDisplay" class="text-amber-400 underline decoration-amber-400/50 decoration-2">Guest</span>!' +
              '</div>' +
              '<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400">' +
                '<span>Current Hook State:</span>' +
                '<code id="demo12StateCode" class="text-sky-400 font-bold">name = "Guest"</code>' +
              '</div>' +
            '</div>' +
            '<div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">' +
              '<div class="text-xs font-mono font-bold text-slate-300">Call Setter Function (setName):</div>' +
              '<div class="flex flex-wrap items-center gap-2">' +
                '<button type="button" data-name="Kuya" class="demo12SetBtn px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-blue-950/40">' +
                  'setName(\'Kuya\')' +
                '</button>' +
                '<button type="button" data-name="Fyang" class="demo12SetBtn px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-amber-950/40">' +
                  'setName(\'Fyang\')' +
                '</button>' +
                '<button type="button" data-name="JM" class="demo12SetBtn px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-purple-950/40">' +
                  'setName(\'JM\')' +
                '</button>' +
                '<button type="button" data-name="Guest" class="demo12SetBtn px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-semibold border border-slate-700 transition-colors">' +
                  'Reset (\'Guest\')' +
                '</button>' +
              '</div>' +
              '<div class="pt-2 flex items-center gap-2">' +
                '<span class="text-xs font-mono text-slate-400 shrink-0">Custom input:</span>' +
                '<input type="text" id="demo12CustomInput" placeholder="Type custom housemate name..." class="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400" />' +
              '</div>' +
            '</div>' +
          '</div>';
        }

        if (s.id === 'sec-1-3') {
          return '<div class="space-y-4">' +
            '<div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-lg">' +
              '<div class="text-xs font-mono text-slate-400 uppercase tracking-wider">&lt;Counter /&gt; JSX Button Element:</div>' +
              '<div>' +
                '<button type="button" id="demo13ClickBtn" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-500 hover:to-amber-500 text-white font-mono text-base sm:text-lg font-black shadow-lg shadow-blue-950/50 hover:scale-[1.02] active:scale-95 transition-all">' +
                  'Clicked <span id="demo13CountNum">0</span> times' +
                '</button>' +
              '</div>' +
              '<div class="text-xs font-mono text-slate-500">' +
                'Rendered markup: <code>&lt;button onClick={handleIncrement}&gt;...&lt;/button&gt;</code>' +
              '</div>' +
            '</div>' +
            '<div class="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">' +
              '<div class="flex items-center justify-between text-xs font-mono">' +
                '<span class="text-amber-400 font-bold uppercase">React Event Pipeline Log:</span>' +
                '<button type="button" id="demo13ResetBtn" class="text-slate-400 hover:text-white transition-colors">Reset Counter</button>' +
              '</div>' +
              '<div id="demo13Log" class="p-3 rounded-lg bg-black/60 font-mono text-xs space-y-1 max-h-[130px] overflow-y-auto code-scroll text-slate-300">' +
                '<div class="text-slate-500">• Ready. Click the button above to dispatch SyntheticEvent.</div>' +
              '</div>' +
            '</div>' +
          '</div>';
        }

        if (s.id === 'sec-2-1') {
          return '<div class="space-y-4">' +
            '<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">' +
              '<div class="p-3 rounded-xl bg-slate-900 border border-slate-800">' +
                '<div class="text-[11px] font-mono text-slate-400 uppercase">Player</div>' +
                '<div class="text-lg font-bold text-white font-mono" id="demo21Name">Fyang</div>' +
              '</div>' +
              '<div class="p-3 rounded-xl bg-slate-900 border border-slate-800">' +
                '<div class="text-[11px] font-mono text-slate-400 uppercase">Level</div>' +
                '<div class="text-lg font-bold text-amber-400 font-mono" id="demo21Level">1</div>' +
              '</div>' +
              '<div class="p-3 rounded-xl bg-slate-900 border border-slate-800">' +
                '<div class="text-[11px] font-mono text-slate-400 uppercase">Score</div>' +
                '<div class="text-lg font-bold text-emerald-400 font-mono" id="demo21Score">0</div>' +
              '</div>' +
            '</div>' +
            '<div class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">' +
              '<div class="text-slate-400 text-[11px] mb-1 font-bold">Current State Object in RAM:</div>' +
              '<pre id="demo21Json" class="text-sky-300 bg-black/50 p-2.5 rounded-lg overflow-x-auto">{\n  "name": "Fyang",\n  "level": 1,\n  "score": 0\n}</pre>' +
            '</div>' +
            '<div class="grid grid-cols-1 sm:grid-cols-3 gap-2">' +
              '<button type="button" id="demo21SpreadBtn" class="p-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 border border-blue-500/40 text-xs font-mono font-semibold transition-all text-left">' +
                '<div class="font-bold text-blue-300">Spread Object</div>' +
                '<div class="text-[10px] text-slate-400">...prev, level + 1</div>' +
              '</button>' +
              '<button type="button" id="demo21BatchBtn" class="p-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-200 border border-emerald-500/40 text-xs font-mono font-semibold transition-all text-left">' +
                '<div class="font-bold text-emerald-300">2x Updater Batch</div>' +
                '<div class="text-[10px] text-slate-400">prev =&gt; prev + 1 (+2 pts)</div>' +
              '</button>' +
              '<button type="button" id="demo21MutateBtn" class="p-2.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 text-xs font-mono font-semibold transition-all text-left">' +
                '<div class="font-bold text-rose-300">Direct Mutation Trap</div>' +
                '<div class="text-[10px] text-slate-400">player.level = 99 (fails)</div>' +
              '</button>' +
            '</div>' +
            '<div id="demo21Feedback" class="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 min-h-[38px] flex items-center">' +
              'Select an action above to observe immutable vs direct state updating.' +
            '</div>' +
          '</div>';
        }

        if (s.id === 'sec-2-2') {
          return '<div class="space-y-4">' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
              '<div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">' +
                '<div class="text-xs font-mono text-slate-400 uppercase">Component Status</div>' +
                '<div class="flex items-center justify-between">' +
                  '<span class="text-xs font-mono text-slate-300">Render Count:</span>' +
                  '<span id="demo22RenderCount" class="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold text-sm border border-blue-500/30">1</span>' +
                '</div>' +
                '<div class="flex items-center justify-between">' +
                  '<span class="text-xs font-mono text-slate-300">Object.is Equality:</span>' +
                  '<span id="demo22EqualityBadge" class="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-800 text-slate-400">N/A</span>' +
                '</div>' +
                '<div class="flex items-center justify-between">' +
                  '<span class="text-xs font-mono text-slate-300">user.name:</span>' +
                  '<span id="demo22UserName" class="text-xs font-mono font-bold text-amber-400">"Bob"</span>' +
                '</div>' +
              '</div>' +
              '<div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">' +
                '<div class="text-xs font-mono text-slate-400 uppercase">React Engine Action</div>' +
                '<div id="demo22EngineStatus" class="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 min-h-[75px] flex items-center leading-relaxed">' +
                  'Component mounted (Initial Render). Ready for updates.' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
              '<button type="button" id="demo22BadBtn" class="p-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-left font-mono transition-all">' +
                '<div class="text-xs font-bold text-rose-300 flex items-center gap-1.5">' +
                  '<svg class="w-3.5 h-3.5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>' +
                  '<span>Bad Update (Mutate Same Reference)</span>' +
                '</div>' +
                '<div class="text-[11px] text-slate-400 mt-1">user.name = \'Charlie\'; setUser(user)</div>' +
              '</button>' +
              '<button type="button" id="demo22GoodBtn" class="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-left font-mono transition-all">' +
                '<div class="text-xs font-bold text-emerald-300 flex items-center gap-1.5">' +
                  '<svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>' +
                  '<span>Good Update (New Object Reference)</span>' +
                '</div>' +
                '<div class="text-[11px] text-slate-400 mt-1">setUser({ ...user, name: \'Charlie\' })</div>' +
              '</button>' +
            '</div>' +
            '<div class="flex justify-end pt-1">' +
              '<button type="button" id="demo22ResetBtn" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-colors">Reset Engine</button>' +
            '</div>' +
          '</div>';
        }

        if (s.id === 'sec-3-1') {
          return '<div class="space-y-4">' +
            '<div class="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">' +
              '<div class="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-3">' +
                '<div class="flex items-center gap-1.5">' +
                  '<span class="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>' +
                  '<span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>' +
                  '<span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>' +
                '</div>' +
                '<div class="px-3 py-1 rounded-t-lg bg-slate-900 border-t border-x border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-2 max-w-[320px] truncate">' +
                  '<svg class="w-3.5 h-3.5 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' +
                  '<span id="demo31TabTitle" class="font-semibold text-amber-400">State &amp; Effect | Clicked 0 times</span>' +
                '</div>' +
              '</div>' +
              '<div class="p-6 text-center space-y-3">' +
                '<div class="text-xs font-mono text-slate-400">In-Page Component:</div>' +
                '<button type="button" id="demo31ClickBtn" class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-sm shadow-md transition-all">' +
                  'Click Me (Count: <span id="demo31CountNum">0</span>)' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<div class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">' +
              '<div class="text-amber-400 font-bold uppercase text-[11px]">Lifecycle Execution Order:</div>' +
              '<div class="flex items-center gap-2 text-slate-300">' +
                '<span class="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">1</span>' +
                '<span>User clicks button &rarr; <code>setCount</code> called</span>' +
              '</div>' +
              '<div class="flex items-center gap-2 text-slate-300">' +
                '<span class="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold">2</span>' +
                '<span>React re-renders component &amp; paints screen</span>' +
              '</div>' +
              '<div class="flex items-center gap-2 text-emerald-400">' +
                '<span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold">3</span>' +
                '<span><code>useEffect</code> runs post-paint &rarr; <code>document.title</code> updated!</span>' +
              '</div>' +
            '</div>' +
          '</div>';
        }

        if (s.id === 'sec-3-2') {
          return '<div class="space-y-4">' +
            '<div class="flex items-center justify-between">' +
              '<span class="text-xs font-mono font-bold text-slate-300 uppercase">Select Prop (userId):</span>' +
              '<span class="text-xs font-mono text-amber-400">useEffect(..., [userId])</span>' +
            '</div>' +
            '<div class="grid grid-cols-3 gap-2">' +
              '<button type="button" data-uid="1" class="demo32UserBtn p-2.5 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold border border-blue-400/50 shadow transition-all">' +
                'User #1 (Fyang)' +
              '</button>' +
              '<button type="button" data-uid="2" class="demo32UserBtn p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-800 transition-all">' +
                'User #2 (JM)' +
              '</button>' +
              '<button type="button" data-uid="3" class="demo32UserBtn p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-800 transition-all">' +
                'User #3 (Kolette)' +
              '</button>' +
            '</div>' +
            '<div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">' +
              '<div class="flex items-center justify-between text-xs font-mono">' +
                '<span class="text-slate-400">API Response Data:</span>' +
                '<span id="demo32StatusBadge" class="text-emerald-400 font-bold flex items-center gap-1.5">' +
                  '<svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>' +
                  '<span>Synchronized</span>' +
                '</span>' +
              '</div>' +
              '<div id="demo32UserData" class="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-200 space-y-1">' +
                '<div>Name: <span class="text-amber-400 font-bold">Fyang Smith</span></div>' +
                '<div>Role: <span class="text-sky-400">Big Winner</span></div>' +
                '<div>Origin: <span class="text-slate-300">Mandaluyong</span></div>' +
              '</div>' +
            '</div>' +
            '<div id="demo32Log" class="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-slate-300 min-h-[38px] flex items-center">' +
              'Mounted with userId: 1. API fetch completed.' +
            '</div>' +
          '</div>';
        }

        if (s.id === 'sec-3-3') {
          return '<div class="space-y-4">' +
            '<div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3 shadow-lg">' +
              '<div class="flex items-center justify-center gap-2">' +
                '<span id="demo33StatusDot" class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>' +
                '<span id="demo33StatusText" class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">&lt;Timer /&gt; MOUNTED &amp; RUNNING</span>' +
              '</div>' +
              '<div class="text-4xl sm:text-5xl font-black font-mono text-white py-2">' +
                '<span id="demo33TimerSeconds">0</span><span class="text-amber-400 text-2xl">s</span>' +
              '</div>' +
              '<div class="text-xs font-mono text-slate-400">' +
                'Effect code: <code>const id = setInterval(...)</code>' +
              '</div>' +
            '</div>' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
              '<button type="button" id="demo33MountToggleBtn" class="py-2.5 px-4 rounded-xl bg-rose-600/30 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 font-mono text-xs font-bold transition-all">' +
                'Unmount Component (Test Cleanup)' +
              '</button>' +
              '<button type="button" id="demo33ResetBtn" class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-all">' +
                'Reset Timer (0s)' +
              '</button>' +
            '</div>' +
            '<div id="demo33CleanupLog" class="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-1">' +
              '<div class="text-emerald-400 font-bold uppercase text-[11px]">Cleanup Lifecycle Monitor:</div>' +
              '<div id="demo33LifecycleMsg" class="text-slate-300">• Timer active. Interval ID running cleanly.</div>' +
            '</div>' +
          '</div>';
        }

        return '<div class="p-4 rounded-xl bg-slate-900 text-slate-400 font-mono text-xs">Live output preview is being loaded...</div>';
      }

      function bindSectionOutputListeners(secId) {
        if (secId === 'sec-1-1') {
          var normalCount = 0;
          var stateCount = 0;
          var normalUi = document.getElementById('demo11NormalUi');
          var normalRam = document.getElementById('demo11NormalRam');
          var normalFeedback = document.getElementById('demo11NormalFeedback');
          var mutateBtn = document.getElementById('demo11MutateBtn');

          var stateUi = document.getElementById('demo11StateUi');
          var stateMem = document.getElementById('demo11StateMem');
          var stateFeedback = document.getElementById('demo11StateFeedback');
          var stateBtn = document.getElementById('demo11StateBtn');
          var resetBtn = document.getElementById('demo11ResetBtn');

          if (mutateBtn) {
            mutateBtn.onclick = function () {
              normalCount++;
              if (normalRam) normalRam.textContent = normalCount;
              if (normalFeedback) {
                var alertSvg = '<svg class="w-3.5 h-3.5 text-rose-400 shrink-0 inline-block mr-1 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';
                normalFeedback.innerHTML = '<span class="text-rose-400 font-bold inline-flex items-center gap-1">' + alertSvg + 'Mutated in RAM (count = ' + normalCount + ')</span>, but React was never notified! UI display stays <strong>0</strong>.';
              }
            };
          }

          if (stateBtn) {
            stateBtn.onclick = function () {
              stateCount++;
              if (stateUi) {
                stateUi.textContent = stateCount;
                stateUi.classList.add('text-amber-300');
                setTimeout(function () {
                  if (stateUi) stateUi.classList.remove('text-amber-300');
                }, 200);
              }
              if (stateMem) stateMem.textContent = stateCount;
              if (stateFeedback) {
                var checkSvg = '<svg class="w-3.5 h-3.5 text-emerald-400 shrink-0 inline-block mr-1 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>';
                stateFeedback.innerHTML = '<span class="text-emerald-400 font-bold inline-flex items-center gap-1">' + checkSvg + 'setCount(' + stateCount + ') called!</span> React scheduled a re-render and updated the UI.';
              }
            };
          }

          if (resetBtn) {
            resetBtn.onclick = function () {
              normalCount = 0;
              stateCount = 0;
              if (normalUi) normalUi.textContent = '0';
              if (normalRam) normalRam.textContent = '0';
              if (normalFeedback) normalFeedback.textContent = 'Click to mutate the variable silently in RAM...';
              if (stateUi) stateUi.textContent = '0';
              if (stateMem) stateMem.textContent = '0';
              if (stateFeedback) stateFeedback.textContent = 'Click to invoke the state setter...';
            };
          }
        }

        if (secId === 'sec-1-2') {
          var nameDisplay = document.getElementById('demo12NameDisplay');
          var stateCode = document.getElementById('demo12StateCode');
          var customInput = document.getElementById('demo12CustomInput');
          var setButtons = document.querySelectorAll('.demo12SetBtn');

          function updateName(newName) {
            if (nameDisplay) nameDisplay.textContent = newName;
            if (stateCode) stateCode.textContent = 'name = "' + newName + '"';
          }

          setButtons.forEach(function (btn) {
            btn.onclick = function () {
              var n = btn.getAttribute('data-name');
              updateName(n);
              if (customInput) customInput.value = '';
            };
          });

          if (customInput) {
            customInput.oninput = function () {
              var val = customInput.value.trim() || 'Guest';
              updateName(val);
            };
          }
        }

        if (secId === 'sec-1-3') {
          var count = 0;
          var clickBtn = document.getElementById('demo13ClickBtn');
          var countNum = document.getElementById('demo13CountNum');
          var log = document.getElementById('demo13Log');
          var resetBtn = document.getElementById('demo13ResetBtn');

          function appendLog(action) {
            if (!log) return;
            var row = document.createElement('div');
            row.className = 'text-slate-300';
            row.innerHTML = '<span class="text-amber-400 font-bold">[' + new Date().toLocaleTimeString().split(' ')[0] + ']</span> ' + action;
            log.appendChild(row);
            log.scrollTop = log.scrollHeight;
          }

          if (clickBtn) {
            clickBtn.onclick = function () {
              count++;
              if (countNum) countNum.textContent = count;
              appendLog('User clicked &rarr; <code>onClick</code> &rarr; <code>setCount(' + count + ')</code> &rarr; UI repainted!');
            };
          }

          if (resetBtn) {
            resetBtn.onclick = function () {
              count = 0;
              if (countNum) countNum.textContent = '0';
              if (log) log.innerHTML = '<div class="text-slate-500">• Counter reset to 0. Ready for clicks.</div>';
            };
          }
        }

        if (secId === 'sec-2-1') {
          var player = { name: 'Fyang', level: 1, score: 0 };
          var nameEl = document.getElementById('demo21Name');
          var levelEl = document.getElementById('demo21Level');
          var scoreEl = document.getElementById('demo21Score');
          var jsonEl = document.getElementById('demo21Json');
          var feedbackEl = document.getElementById('demo21Feedback');

          var spreadBtn = document.getElementById('demo21SpreadBtn');
          var batchBtn = document.getElementById('demo21BatchBtn');
          var mutateBtn = document.getElementById('demo21MutateBtn');

          function syncPlayerUi() {
            if (nameEl) nameEl.textContent = player.name;
            if (levelEl) levelEl.textContent = player.level;
            if (scoreEl) scoreEl.textContent = player.score;
            if (jsonEl) jsonEl.textContent = JSON.stringify(player, null, 2);
          }

          if (spreadBtn) {
            spreadBtn.onclick = function () {
              player = Object.assign({}, player, { level: player.level + 1 });
              syncPlayerUi();
              if (feedbackEl) {
                var checkSvg = '<svg class="w-3.5 h-3.5 text-blue-400 shrink-0 inline-block mr-1 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>';
                feedbackEl.innerHTML = '<span class="text-blue-400 font-bold inline-flex items-center gap-1">' + checkSvg + 'Spread copy ({ ...prev, level: ' + player.level + ' })</span> created a fresh object reference! React detected change.';
              }
            };
          }

          if (batchBtn) {
            batchBtn.onclick = function () {
              var newScore = player.score + 2;
              player = Object.assign({}, player, { score: newScore });
              syncPlayerUi();
              if (feedbackEl) {
                var checkSvg = '<svg class="w-3.5 h-3.5 text-emerald-400 shrink-0 inline-block mr-1 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>';
                feedbackEl.innerHTML = '<span class="text-emerald-400 font-bold inline-flex items-center gap-1">' + checkSvg + 'Functional updater (prev =&gt; prev + 1 x2)</span> safely incremented score by +2 (Current: ' + newScore + ').';
              }
            };
          }

          if (mutateBtn) {
            mutateBtn.onclick = function () {
              player.level = 99;
              if (feedbackEl) {
                var crossSvg = '<svg class="w-3.5 h-3.5 text-rose-400 shrink-0 inline-block mr-1 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>';
                feedbackEl.innerHTML = '<span class="text-rose-400 font-bold inline-flex items-center gap-1">' + crossSvg + 'DIRECT MUTATION TRAP!</span> <code>player.level = 99</code> mutated the object in-place. React\'s <code>Object.is</code> equality check would see the same reference and BAIL OUT without re-rendering!';
              }
            };
          }
        }

        if (secId === 'sec-2-2') {
          var renderCount = 1;
          var userState = { name: 'Bob' };
          var renderCountEl = document.getElementById('demo22RenderCount');
          var equalityBadge = document.getElementById('demo22EqualityBadge');
          var userNameEl = document.getElementById('demo22UserName');
          var engineStatus = document.getElementById('demo22EngineStatus');
          var badBtn = document.getElementById('demo22BadBtn');
          var goodBtn = document.getElementById('demo22GoodBtn');
          var resetBtn = document.getElementById('demo22ResetBtn');

          if (badBtn) {
            badBtn.onclick = function () {
              userState.name = 'Charlie';
              if (equalityBadge) {
                equalityBadge.textContent = 'Object.is(prev, next) === TRUE';
                equalityBadge.className = 'px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30';
              }
              if (engineStatus) {
                var stopSvg = '<svg class="w-3.5 h-3.5 text-rose-400 shrink-0 inline-block mr-1 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke-width="2"></line></svg>';
                engineStatus.innerHTML = '<div class="space-y-1"><span class="text-rose-400 font-bold inline-flex items-center gap-1">' + stopSvg + 'BAILOUT DETECTED:</span> <span>Same object reference passed. React skips render execution. <strong>Render count stays ' + renderCount + '.</strong></span></div>';
              }
            };
          }

          if (goodBtn) {
            goodBtn.onclick = function () {
              var newName = userState.name === 'Charlie' ? 'Bob' : 'Charlie';
              userState = { name: newName };
              renderCount++;
              if (renderCountEl) renderCountEl.textContent = renderCount;
              if (userNameEl) userNameEl.textContent = '"' + newName + '"';
              if (equalityBadge) {
                equalityBadge.textContent = 'Object.is(prev, next) === FALSE';
                equalityBadge.className = 'px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
              }
              if (engineStatus) {
                var zapSvg = '<svg class="w-3.5 h-3.5 text-emerald-400 shrink-0 inline-block mr-1 align-text-bottom" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>';
                engineStatus.innerHTML = '<div class="space-y-1"><span class="text-emerald-400 font-bold inline-flex items-center gap-1">' + zapSvg + 'RE-RENDER TRIGGERED:</span> <span>New object reference created. React re-executed the component function. <strong>Render count: ' + renderCount + '.</strong></span></div>';
              }
            };
          }

          if (resetBtn) {
            resetBtn.onclick = function () {
              renderCount = 1;
              userState = { name: 'Bob' };
              if (renderCountEl) renderCountEl.textContent = '1';
              if (userNameEl) userNameEl.textContent = '"Bob"';
              if (equalityBadge) {
                equalityBadge.textContent = 'N/A';
                equalityBadge.className = 'px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-800 text-slate-400';
              }
              if (engineStatus) engineStatus.textContent = 'Component mounted (Initial Render). Ready for updates.';
            };
          }
        }

        if (secId === 'sec-3-1') {
          var clickCount = 0;
          var clickBtn = document.getElementById('demo31ClickBtn');
          var countNum = document.getElementById('demo31CountNum');
          var tabTitle = document.getElementById('demo31TabTitle');

          if (clickBtn) {
            clickBtn.onclick = function () {
              clickCount++;
              if (countNum) countNum.textContent = clickCount;
              if (tabTitle) {
                tabTitle.textContent = 'State & Effect | Clicked ' + clickCount + ' times';
                tabTitle.classList.add('text-amber-300', 'underline');
                setTimeout(function () {
                  if (tabTitle) tabTitle.classList.remove('text-amber-300', 'underline');
                }, 300);
              }
            };
          }
        }

        if (secId === 'sec-3-2') {
          var users = {
            '1': { name: 'Fyang Smith', role: 'Big Winner', origin: 'Mandaluyong' },
            '2': { name: 'JM Ibarra', role: 'Housemate', origin: 'Manila' },
            '3': { name: 'Kolette Madelo', role: 'Housemate', origin: 'General Santos' }
          };
          var currentUid = '1';
          var userButtons = document.querySelectorAll('.demo32UserBtn');
          var userDataEl = document.getElementById('demo32UserData');
          var statusBadge = document.getElementById('demo32StatusBadge');
          var logEl = document.getElementById('demo32Log');

          userButtons.forEach(function (btn) {
            btn.onclick = function () {
              var uid = btn.getAttribute('data-uid');
              userButtons.forEach(function (b) {
                b.className = (b.getAttribute('data-uid') === uid)
                  ? 'demo32UserBtn p-2.5 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold border border-blue-400/50 shadow transition-all'
                  : 'demo32UserBtn p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-800 transition-all';
              });

              if (uid === currentUid) {
                if (statusBadge) {
                  statusBadge.innerHTML = '<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Skipped (No change)</span></span>';
                  statusBadge.className = 'text-amber-400 font-bold';
                }
                if (logEl) {
                  logEl.innerHTML = '<span class="text-amber-400 font-bold">Dependency unchanged (' + uid + ' === ' + currentUid + '):</span> React skipped running the effect callback!';
                }
              } else {
                currentUid = uid;
                if (statusBadge) {
                  statusBadge.innerHTML = '<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-sky-400 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg><span>Fetching (Effect fired)...</span></span>';
                  statusBadge.className = 'text-sky-400 font-bold';
                }
                if (userDataEl) {
                  userDataEl.innerHTML = '<div class="text-slate-400 animate-pulse">Loading Housemate #' + uid + ' from external API...</div>';
                }
                setTimeout(function () {
                  var u = users[uid];
                  if (userDataEl && u) {
                    userDataEl.innerHTML =
                      '<div>Name: <span class="text-amber-400 font-bold">' + u.name + '</span></div>' +
                      '<div>Role: <span class="text-sky-400">' + u.role + '</span></div>' +
                      '<div>Origin: <span class="text-slate-300">' + u.origin + '</span></div>';
                  }
                  if (statusBadge) {
                    statusBadge.innerHTML = '<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg><span>Synchronized</span></span>';
                    statusBadge.className = 'text-emerald-400 font-bold';
                  }
                  if (logEl) {
                    logEl.innerHTML = '<span class="text-emerald-400 font-bold">Dependency changed to ' + uid + ':</span> useEffect callback executed and fetched new profile!';
                  }
                }, 350);
              }
            };
          });
        }

        if (secId === 'sec-3-3') {
          var seconds = 0;
          var isMounted = true;
          var secondsEl = document.getElementById('demo33TimerSeconds');
          var statusDot = document.getElementById('demo33StatusDot');
          var statusText = document.getElementById('demo33StatusText');
          var mountToggleBtn = document.getElementById('demo33MountToggleBtn');
          var resetBtn = document.getElementById('demo33ResetBtn');
          var lifecycleMsg = document.getElementById('demo33LifecycleMsg');

          function startTimer() {
            if (confessTimerInterval) clearInterval(confessTimerInterval);
            confessTimerInterval = setInterval(function () {
              seconds++;
              if (secondsEl) secondsEl.textContent = seconds;
            }, 1000);
          }

          function stopTimer() {
            if (confessTimerInterval) {
              clearInterval(confessTimerInterval);
              confessTimerInterval = null;
            }
          }

          startTimer();

          if (mountToggleBtn) {
            mountToggleBtn.onclick = function () {
              isMounted = !isMounted;
              if (isMounted) {
                startTimer();
                if (statusDot) statusDot.className = 'w-3 h-3 rounded-full bg-emerald-400 animate-pulse';
                if (statusText) {
                  statusText.textContent = '<Timer /> MOUNTED & RUNNING';
                  statusText.className = 'text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider';
                }
                mountToggleBtn.textContent = 'Unmount Component (Test Cleanup)';
                mountToggleBtn.className = 'py-2.5 px-4 rounded-xl bg-rose-600/30 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 font-mono text-xs font-bold transition-all';
                if (lifecycleMsg) {
                  lifecycleMsg.innerHTML = '<span class="text-emerald-400 font-bold">useEffect fired:</span> New interval initialized. Timer running safely.';
                }
              } else {
                stopTimer();
                if (statusDot) statusDot.className = 'w-3 h-3 rounded-full bg-rose-500';
                if (statusText) {
                  statusText.textContent = '<Timer /> UNMOUNTED';
                  statusText.className = 'text-xs font-mono font-bold text-rose-400 uppercase tracking-wider';
                }
                mountToggleBtn.textContent = 'Mount Component (Restart Effect)';
                mountToggleBtn.className = 'py-2.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-200 border border-emerald-500/40 font-mono text-xs font-bold transition-all';
                if (lifecycleMsg) {
                  lifecycleMsg.innerHTML = '<span class="text-rose-400 font-bold">Cleanup executed (clearInterval):</span> Timer destroyed on unmount. <strong>Zero memory leak!</strong>';
                }
              }
            };
          }

          if (resetBtn) {
            resetBtn.onclick = function () {
              seconds = 0;
              if (secondsEl) secondsEl.textContent = '0';
            };
          }
        }
      }

      function renderSlide(index) {
        if (!slideViewport) return;
        if (confessTimerInterval) {
          clearInterval(confessTimerInterval);
          confessTimerInterval = null;
        }
        if (index < 0) index = 0;
        if (index >= confessionSections.length) index = confessionSections.length - 1;
        currentSlide = index;
        var s = confessionSections[index];

        if (slideIndicator) {
          slideIndicator.textContent = '';
        }

        // Render Quick-Jump Pills in Header
        if (confessionSectionPills) {
          confessionSectionPills.innerHTML = '';
          confessionSections.forEach(function (sec, i) {
            var pill = document.createElement('button');
            pill.type = 'button';
            var isActive = i === index;
            var topicBorder = sec.topicNum === 1
              ? 'text-blue-400 hover:text-blue-200 hover:bg-blue-950/40 border-blue-500/30'
              : (sec.topicNum === 2
                ? 'text-red-400 hover:text-red-200 hover:bg-red-950/40 border-red-500/30'
                : 'text-yellow-400 hover:text-yellow-200 hover:bg-yellow-950/40 border-yellow-500/30');

            pill.className = 'px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-bold whitespace-nowrap transition-all border ' +
              (isActive
                ? 'bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 text-white shadow-lg shadow-blue-950/50 border-yellow-400 scale-105'
                : topicBorder + ' bg-slate-900/60');
            pill.textContent = sec.secNum;
            pill.title = 'Sub-section ' + sec.secNum + ': ' + sec.title;
            pill.addEventListener('click', function () {
              renderSlide(i);
            });
            confessionSectionPills.appendChild(pill);
          });
        }

        // Render Bottom Counter
        if (slideDotsContainer) {
          slideDotsContainer.innerHTML = '<span class="px-2.5 py-0.5 rounded bg-yellow-400/15 text-yellow-300 font-bold border border-yellow-400/30">Sub-section ' + s.secNum + '</span> <span class="text-white font-medium">' + s.title + '</span>';
        }

        // Bullets HTML
        var bulletsHtml = s.takeaways.map(function (b) {
          return '<li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"><span class="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span><span>' + b + '</span></li>';
        }).join('');

        var topicBadgeGradient = s.topicNum === 1
          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-400/40'
          : (s.topicNum === 2
            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400/40'
            : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black border-yellow-300/40');

        // Focused Section Markup (2-Column Presentation: Left = Explanations & Rules, Right = LIVE CODE & OUTPUT TOGGLE)
        slideViewport.innerHTML =
          '<div class="space-y-4 max-w-[1550px] w-full mx-auto animate-in fade-in zoom-in-95 duration-150">' +
            // Section Header Bar with Prominent Sub-section Indicator
            '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">' +
              '<div class="flex items-center gap-3.5">' +
                '<span class="px-3.5 py-1.5 rounded-xl ' + topicBadgeGradient + ' font-mono text-sm sm:text-base font-black tracking-wide shadow-md shadow-blue-950/40 border">SUB-SECTION ' + s.secNum + '</span>' +
                '<div>' +
                  '<div class="flex items-center gap-2">' +
                    '<span class="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400">' + s.topicBadge + '</span>' +
                    '<span class="text-slate-500">•</span>' +
                    '<span class="text-xs font-mono text-slate-400">Sub-section ' + (index + 1) + ' of ' + confessionSections.length + '</span>' +
                  '</div>' +
                  '<h2 class="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase">' + s.title + '</h2>' +
                '</div>' +
              '</div>' +
              '<div class="flex items-center gap-2">' +
                '<a href="' + s.anchor + '" id="jumpToHandbookBtn" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-semibold text-slate-200 border border-slate-700 hover:border-yellow-400/60 flex items-center gap-2 transition-colors">' +
                  '<span>View in House Handbook</span>' +
                  '<svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>' +
                '</a>' +
              '</div>' +
            '</div>' +

            // Main 2-Column Content Grid: Left = Explanations & Rules, Right = CODE & OUTPUT TOGGLE!
            '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">' +
              // Left Column (lg:col-span-5): Definition (Blue), Explanation (Red), Rules (Yellow)
              '<div class="lg:col-span-5 space-y-3.5 flex flex-col justify-between">' +
                // Definition Card (Blue)
                '<div class="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 border-l-4 border-l-blue-500 space-y-2 shadow-lg">' +
                  '<div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">' +
                    '<svg class="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' +
                    '<span>Sub-Section ' + s.secNum + ' Definition</span>' +
                  '</div>' +
                  '<p class="text-sm text-slate-100 leading-relaxed">' + s.definition + '</p>' +
                '</div>' +

                // Explanation Card (Red)
                '<div class="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-red-500/30 border-l-4 border-l-red-500 space-y-2 shadow-lg">' +
                  '<div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">' +
                    '<svg class="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>' +
                    '<span>Explanation &amp; Inner Mechanics</span>' +
                  '</div>' +
                  '<p class="text-sm text-slate-200 leading-relaxed">' + s.explanation + '</p>' +
                '</div>' +

                // Kuya's Key Takeaways Card (Yellow)
                '<div class="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-yellow-500/30 border-l-4 border-l-yellow-400 space-y-2.5 shadow-lg">' +
                  '<div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold">' +
                    '<span class="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>' +
                    '<span>Kuya\'s Confession Room Rules:</span>' +
                  '</div>' +
                  '<ul class="space-y-2">' + bulletsHtml + '</ul>' +
                '</div>' +
              '</div>' +

              // Right Column (lg:col-span-7): PROMINENT CODE & OUTPUT CARD!
              '<div class="lg:col-span-7 flex flex-col">' +
                '<div class="rounded-2xl bg-slate-950 border-2 border-slate-800 hover:border-yellow-400/40 transition-colors overflow-hidden shadow-2xl flex flex-col flex-1">' +
                  // Header Bar with [ Code ] [ Output ] Segmented Toggle
                  '<div class="px-5 py-3 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">' +
                    '<div class="flex items-center gap-3">' +
                      '<span class="w-2.5 h-2.5 rounded-full bg-red-600 rec-dot"></span>' +
                      '<div class="flex items-center gap-2">' +
                        '<span class="text-yellow-400 font-mono text-xs font-bold uppercase tracking-wider">Sub-section ' + s.secNum + ':</span>' +
                        '<span class="text-white font-bold font-mono text-sm sm:text-base">' + s.codeTitle + '</span>' +
                      '</div>' +
                    '</div>' +
                    '<div class="flex items-center gap-2.5">' +
                      // Toggle Button: Code / Output
                      '<div class="inline-flex items-center p-0.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">' +
                        '<button type="button" id="slideTabCodeBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ' +
                          (presenterActiveTab === 'code'
                            ? 'bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 text-white shadow-sm border border-yellow-400/40'
                            : 'text-slate-400 hover:text-white') + '">' +
                          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>' +
                          '<span>Code</span>' +
                        '</button>' +
                        '<button type="button" id="slideTabOutputBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ' +
                          (presenterActiveTab === 'output'
                            ? 'bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 text-white shadow-sm border border-yellow-400/40'
                            : 'text-slate-400 hover:text-white') + '">' +
                          '<svg class="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>' +
                          '<span>Output</span>' +
                        '</button>' +
                      '</div>' +
                      // Code actions (Copy & Enlarge)
                      '<div id="slideCodeActions" class="' + (presenterActiveTab === 'code' ? 'flex' : 'hidden') + ' items-center gap-2">' +
                        '<button type="button" id="slideCopyBtn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors" title="Copy code snippet">' +
                          '<svg class="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
                          '<span id="slideCopyText">Copy</span>' +
                        '</button>' +
                        '<button type="button" id="slideEnlargeBtn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-colors" title="Projector mode / enlarge code">' +
                          '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>' +
                          '<span>Enlarge</span>' +
                        '</button>' +
                      '</div>' +
                      // Output active badge
                      '<div id="slideOutputBadge" class="' + (presenterActiveTab === 'output' ? 'flex' : 'hidden') + ' items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">' +
                        '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>' +
                        '<span>Live Interactive</span>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +

                  // Code Pre Block (Escaped code text)
                  '<div id="slideCodeView" class="' + (presenterActiveTab === 'code' ? 'flex flex-col flex-1' : 'hidden') + '">' +
                    '<div class="relative flex-1 p-5 sm:p-6 bg-[#030712] overflow-auto code-scroll min-h-[300px]">' +
                      '<pre class="text-sm sm:text-base font-mono text-slate-100 leading-relaxed select-text"><code>' + escapeHtml(s.code) + '</code></pre>' +
                    '</div>' +
                    '<div class="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">' +
                      '<div class="flex items-center gap-2">' +
                        '<span class="text-emerald-400 font-semibold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0"></span><span>React 18+ Live Syntax</span></span>' +
                        '<span class="text-slate-600">|</span>' +
                        '<span>Sub-section ' + s.secNum + '</span>' +
                      '</div>' +
                      '<span class="text-amber-400/80 font-medium">Click Enlarge for Projector View</span>' +
                    '</div>' +
                  '</div>' +

                  // Output Live Preview Block
                  '<div id="slideOutputView" class="' + (presenterActiveTab === 'output' ? 'flex flex-col flex-1' : 'hidden') + '">' +
                    '<div class="relative flex-1 p-5 sm:p-6 bg-[#020617] overflow-auto code-scroll min-h-[300px] flex flex-col justify-between space-y-4">' +
                      getSectionOutputHtml(s) +
                    '</div>' +
                    '<div class="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">' +
                      '<div class="flex items-center gap-2">' +
                        '<span class="text-amber-400 font-semibold flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg><span>Simulated Live Component</span></span>' +
                        '<span class="text-slate-600">|</span>' +
                        '<span>Pure Client-Side React Runtime</span>' +
                      '</div>' +
                      '<span class="text-slate-400">Interact with UI to test behavior</span>' +
                    '</div>' +
                  '</div>' +

                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';

        var slideEnlargeBtn = document.getElementById('slideEnlargeBtn');
        if (slideEnlargeBtn) {
          slideEnlargeBtn.addEventListener('click', function () {
            openEnlargedCode(s.codeTitle, s.code);
          });
        }

        var slideCopyBtn = document.getElementById('slideCopyBtn');
        var slideCopyText = document.getElementById('slideCopyText');
        if (slideCopyBtn) {
          slideCopyBtn.addEventListener('click', function () {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(s.code).then(function () {
                if (slideCopyText) slideCopyText.textContent = 'Copied!';
                setTimeout(function () {
                  if (slideCopyText) slideCopyText.textContent = 'Copy';
                }, 2000);
              });
            }
          });
        }

        var jumpBtn = document.getElementById('jumpToHandbookBtn');
        if (jumpBtn) {
          jumpBtn.addEventListener('click', function () {
            closePresentationMode();
          });
        }

        // Tab Switching Logic
        var slideTabCodeBtn = document.getElementById('slideTabCodeBtn');
        var slideTabOutputBtn = document.getElementById('slideTabOutputBtn');
        var slideCodeView = document.getElementById('slideCodeView');
        var slideOutputView = document.getElementById('slideOutputView');
        var slideCodeActions = document.getElementById('slideCodeActions');
        var slideOutputBadge = document.getElementById('slideOutputBadge');

        function updateTabVisibility(tab) {
          presenterActiveTab = tab;
          if (tab === 'code') {
            if (slideCodeView) slideCodeView.className = 'flex flex-col flex-1';
            if (slideOutputView) slideOutputView.className = 'hidden';
            if (slideCodeActions) slideCodeActions.className = 'flex items-center gap-2';
            if (slideOutputBadge) slideOutputBadge.className = 'hidden';
            if (slideTabCodeBtn) {
              slideTabCodeBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 text-white shadow-sm border border-yellow-400/40';
            }
            if (slideTabOutputBtn) {
              slideTabOutputBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all text-slate-400 hover:text-white';
            }
          } else {
            if (slideCodeView) slideCodeView.className = 'hidden';
            if (slideOutputView) slideOutputView.className = 'flex flex-col flex-1';
            if (slideCodeActions) slideCodeActions.className = 'hidden';
            if (slideOutputBadge) slideOutputBadge.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono';
            if (slideTabCodeBtn) {
              slideTabCodeBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all text-slate-400 hover:text-white';
            }
            if (slideTabOutputBtn) {
              slideTabOutputBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all bg-gradient-to-r from-blue-600 via-red-600 to-amber-500 text-white shadow-sm border border-yellow-400/40';
            }
            bindSectionOutputListeners(s.id);
          }
        }

        if (slideTabCodeBtn) {
          slideTabCodeBtn.addEventListener('click', function () {
            updateTabVisibility('code');
          });
        }
        if (slideTabOutputBtn) {
          slideTabOutputBtn.addEventListener('click', function () {
            updateTabVisibility('output');
          });
        }

        if (presenterActiveTab === 'output') {
          bindSectionOutputListeners(s.id);
        }
      }

      function detectCurrentHandbookSection() {
        var secIds = ['sec-1-1', 'sec-1-2', 'sec-1-3', 'sec-2-1', 'sec-2-2', 'sec-3-1', 'sec-3-2', 'sec-3-3'];
        var currentId = 'sec-1-1';
        for (var i = 0; i < secIds.length; i++) {
          var el = document.getElementById(secIds[i]);
          if (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              currentId = secIds[i];
            }
          }
        }
        return currentId;
      }

      function openPresentationMode(targetSecId) {
        if (!presentModal) return;
        var targetIndex = 0;
        var lookupId = typeof targetSecId === 'string' ? targetSecId : detectCurrentHandbookSection();

        for (var i = 0; i < confessionSections.length; i++) {
          if (confessionSections[i].id === lookupId) {
            targetIndex = i;
            break;
          }
        }

        currentSlide = targetIndex;
        presentModal.classList.remove('hidden');
        renderSlide(currentSlide);
        document.body.style.overflow = 'hidden';
      }

      function closePresentationMode() {
        if (confessTimerInterval) {
          clearInterval(confessTimerInterval);
          confessTimerInterval = null;
        }
        if (!presentModal) return;
        presentModal.classList.add('hidden');
        document.body.style.overflow = '';
      }

      if (presentModeBtn) presentModeBtn.addEventListener('click', function () { openPresentationMode(); });
      if (mobilePresentBtn) mobilePresentBtn.addEventListener('click', function () { openPresentationMode(); });
      if (heroPresentBtn) heroPresentBtn.addEventListener('click', function () { openPresentationMode(); });
      if (closePresentBtn) closePresentBtn.addEventListener('click', closePresentationMode);

      document.querySelectorAll('.confess-sec-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var secId = btn.getAttribute('data-confess-sec');
          openPresentationMode(secId);
        });
      });

      if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', function () {
          renderSlide(currentSlide - 1);
        });
      }
      if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', function () {
          renderSlide(currentSlide + 1);
        });
      }

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        if (splashActive) {
          dismissPbbSplash();
          return;
        }

        if (enlargeCodeModal && !enlargeCodeModal.classList.contains('hidden')) {
          if (e.key === 'Escape') {
            closeEnlargedCode();
            return;
          }
        }

        if (e.key === 'p' || e.key === 'P') {
          // If not typing in input
          var tag = (e.target && e.target.tagName) || '';
          if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
            if (presentModal && presentModal.classList.contains('hidden')) {
              openPresentationMode();
            }
          }
        } else if (presentModal && !presentModal.classList.contains('hidden')) {
          if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            renderSlide(currentSlide + 1);
          } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            renderSlide(currentSlide - 1);
          } else if (e.key === 'Escape') {
            closePresentationMode();
          }
        }
      });

      renderQuiz();
    })();
});
