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

      themeToggleBtn.addEventListener('click', function () {
        var htmlEl = document.documentElement;
        htmlEl.classList.toggle('dark');
        var isDark = htmlEl.classList.contains('dark');
        try {
          localStorage.setItem('react_guide_theme', isDark ? 'dark' : 'light');
        } catch (e) {}
      });

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
      mobileMenuBtn.addEventListener('click', function () {
        mobileNavDrawer.classList.toggle('hidden');
      });
      var mobileLinks = document.querySelectorAll('.mobile-nav-link');
      mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          mobileNavDrawer.classList.add('hidden');
        });
      });

      // -----------------------------------------------------------
      // Hero Interactive Lifecycle Switcher
      // -----------------------------------------------------------
      var cycleDetails = {
        state: {
          title: 'Stage 1: State Setter Triggered (`setCount(prev => prev + 1)`)',
          color: 'text-sky-600 dark:text-sky-400',
          body: 'A user interaction (like `onClick`), network response, or timer calls the state updater function from `useState`. React stores the updated value in component memory.'
        },
        render: {
          title: 'Stage 2: Object.is Check & Component Re-render',
          color: 'text-sky-600 dark:text-sky-400',
          body: 'React compares the new value to the old value using `Object.is`. If different, React calls your component function top-to-bottom, calculates the new JSX, and updates only the changed DOM nodes.'
        },
        effect: {
          title: 'Stage 3: useEffect Synchronizes After Paint',
          color: 'text-sky-600 dark:text-sky-400',
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
            b.className = 'cycle-step-btn p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-left transition-all';
          });
          btn.className = 'cycle-step-btn p-3 rounded-xl border-2 border-sky-500 bg-sky-500/10 text-left transition-all';
          cycleStepDetail.innerHTML = '<strong class="' + info.color + ' block mb-1">' + info.title + '</strong>' + info.body;
        });
      });

      // -----------------------------------------------------------
      // Read Progress Tracker
      // -----------------------------------------------------------
      var readSections = {};
      var totalSections = 8;
      var readProgressCount = document.getElementById('readProgressCount');

      function updateReadUI() {
        var count = Object.keys(readSections).filter(function (k) { return readSections[k]; }).length;
        if (readProgressCount) {
          readProgressCount.textContent = count + '/' + totalSections;
        }
        document.querySelectorAll('.mark-read-btn').forEach(function (btn) {
          var secId = btn.getAttribute('data-mark-read');
          var isDone = !!readSections[secId];
          if (isDone) {
            btn.textContent = '✓ Completed';
            btn.className = 'mark-read-btn shrink-0 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-colors';
          } else {
            btn.textContent = 'Mark Read';
            btn.className = 'mark-read-btn shrink-0 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-sky-500 transition-colors';
          }
        });
        document.querySelectorAll('[data-check-badge]').forEach(function (badge) {
          var secId = badge.getAttribute('data-check-badge');
          if (readSections[secId]) {
            badge.textContent = '✓';
            badge.className = 'w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold';
          } else {
            badge.textContent = '';
            badge.className = 'w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px]';
          }
        });
      }

      document.querySelectorAll('.mark-read-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var secId = btn.getAttribute('data-mark-read');
          readSections[secId] = !readSections[secId];
          updateReadUI();
        });
      });

      var markAllReadBtn = document.getElementById('markAllReadBtn');
      if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function () {
          ['sec-1-1', 'sec-1-2', 'sec-1-3', 'sec-2-1', 'sec-2-2', 'sec-3-1', 'sec-3-2', 'sec-3-3'].forEach(function (id) {
            readSections[id] = true;
          });
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
          topicSearchInput.value = '';
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
            staleClosureExplain.innerHTML = '<span class="text-rose-500 font-bold">⚠️ Stale Snapshot Trap!</span> Called <code>setScore(' + snapshot + ' + 1)</code> 3 times in a row. Because all three used the old snapshot (<code>' + snapshot + '</code>), score only went from <strong>' + snapshot + '</strong> to <strong>' + sbScore + '</strong>!';
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
          staleClosureExplain.innerHTML = '<span class="text-emerald-500 font-bold">✅ Updater Function Win!</span> Called <code>setScore(prev =&gt; prev + 1)</code> 3 times. React queued the state transitions sequentially (<strong>' + start + ' → ' + (start+1) + ' → ' + (start+2) + ' → ' + sbScore + '</strong>)!';
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
          staleClosureExplain.textContent = '💡 Click both buttons to see the difference between stale snapshot closures and pending updater functions.';
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
            depArrayLog.innerHTML = '<span class="text-rose-400 font-bold">⚠️ Stale Prop Bug!</span> Mode is <code>[]</code>. `userId` changed to <strong>' + nextId + '</strong>, but <code>useEffect</code> never re-ran. Stale user data remains on screen!';
            showToast('Mode [] ignored userId change (stale user displayed)!');
            return;
          }

          if (nextId === currentUserId) {
            if (currentDepMode === 'none') {
              apiCalls += 1;
              apiFetchCounter.textContent = String(apiCalls);
              depArrayLog.innerHTML = '<span class="text-rose-400 font-bold">⚠️ Inefficient:</span> Mode has <strong>No Array</strong>. Even though `userId` stayed <strong>' + nextId + '</strong>, fetch fired again!';
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
          depArrayLog.innerHTML = '<span class="text-rose-400 font-bold">⚠️ Redundant API Call!</span> Because there is <strong>No Dependency Array</strong>, this unrelated state update triggered another redundant network fetch!';
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

      var quizAnswers = {};
      var quizContainer = document.getElementById('quizContainer');
      var quizScoreDisplay = document.getElementById('quizScoreDisplay');

      function renderQuiz() {
        quizContainer.innerHTML = '';
        var correctCount = 0;
        quizQuestions.forEach(function (q, idx) {
          var userChoice = quizAnswers[q.id];
          var isAnswered = typeof userChoice === 'number';
          if (isAnswered && userChoice === q.correct) {
            correctCount += 1;
          }

          var card = document.createElement('div');
          card.className = 'p-5 rounded-xl bg-slate-800/90 border border-slate-700/80 flex flex-col justify-between space-y-4';

          var headerHtml = '<div class="space-y-1.5">' +
            '<div class="text-[11px] font-mono text-sky-400">' + q.topic + '</div>' +
            '<h3 class="text-sm font-bold text-white leading-snug">' + (idx + 1) + '. ' + q.question + '</h3>' +
            '</div>';

          var optionsHtml = '<div class="space-y-2">';
          q.options.forEach(function (opt, optIdx) {
            var btnCls = 'w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium border transition-all ';
            if (!isAnswered) {
              btnCls += 'bg-slate-900/70 hover:bg-slate-700/70 border-slate-700 text-slate-200';
            } else if (optIdx === q.correct) {
              btnCls += 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-semibold';
            } else if (optIdx === userChoice) {
              btnCls += 'bg-rose-500/20 border-rose-400 text-rose-200';
            } else {
              btnCls += 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-70';
            }
            optionsHtml += '<button type="button" data-qid="' + q.id + '" data-opt="' + optIdx + '" class="quiz-opt-btn ' + btnCls + '">' + opt + '</button>';
          });
          optionsHtml += '</div>';

          var feedbackHtml = '';
          if (isAnswered) {
            var isRight = userChoice === q.correct;
            feedbackHtml = '<div class="p-3 rounded-lg text-xs ' + (isRight ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-200' : 'bg-rose-950/80 border border-rose-700/60 text-rose-200') + '">' +
              '<strong>' + (isRight ? '✓ Correct! ' : '✕ Not quite. ') + '</strong>' + q.explanation +
              '</div>';
          }

          card.innerHTML = headerHtml + optionsHtml + feedbackHtml;
          quizContainer.appendChild(card);
        });

        quizScoreDisplay.textContent = correctCount + ' / ' + quizQuestions.length;

        quizContainer.querySelectorAll('.quiz-opt-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var qid = btn.getAttribute('data-qid');
            var opt = parseInt(btn.getAttribute('data-opt'), 10);
            quizAnswers[qid] = opt;
            renderQuiz();
          });
        });
      }

      document.getElementById('resetQuizBtn').addEventListener('click', function () {
        quizAnswers = {};
        renderQuiz();
        showToast('Quiz reset!');
      });

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
      // Presenter Mode (Slides deck with Keyboard navigation)
      // -----------------------------------------------------------
      var currentSlide = 0;
      var presentationSlides = [
        {
          num: '1 / 10',
          badge: 'Overview • Mental Model',
          title: 'React State & Side Effects',
          subtitle: 'The Core Engine of Modern React Functional Components',
          bullets: [
            '<strong>State:</strong> Internal component memory that survives function re-invocations.',
            '<strong>Re-rendering:</strong> React calls your component again to generate updated JSX and diff the DOM.',
            '<strong>Side Effects:</strong> Operations escaping React (APIs, timers, manual DOM) synchronized via <code>useEffect</code>.'
          ],
          codeTitle: 'ReactComponentFlow.jsx',
          code: '// 1. State changes via setter\nsetCount(prev => prev + 1);\n\n// 2. React re-renders component\n// Object.is compares old vs new state\n\n// 3. Screen paints & useEffect runs\nuseEffect(() => {\n  syncWithServer();\n}, [count]);',
          anchor: '#top'
        },
        {
          num: '2 / 10',
          badge: 'Topic 1.1',
          title: 'Understanding State in React',
          subtitle: 'Why Standard JavaScript Variables Fail in React UI',
          bullets: [
            'Standard variables (<code>let x = 0</code>) mutate silently in RAM, but React is never notified to re-render.',
            'State acts as component <strong>memory</strong> that is preserved between component renders.',
            'Calling state setter signals React to schedule a screen repaint.'
          ],
          codeTitle: 'VariableVsState.js',
          code: '// ❌ Normal Variable: React never knows to redraw UI\nlet count = 0;\ncount = count + 1;\n\n// ✅ React State: Memory preserved + schedules re-render\nconst [count, setCount] = useState(0);\nsetCount(count + 1);',
          anchor: '#sec-1-1'
        },
        {
          num: '3 / 10',
          badge: 'Topic 1.2',
          title: 'Using the useState Hook',
          subtitle: 'Syntax, Array Destructuring & Initial State',
          bullets: [
            'Must be declared at the <strong>top level</strong> of functional components (never in loops/conditions).',
            'Returns a 2-element tuple: <code>[currentState, updaterFunction]</code>.',
            'Initial argument is only evaluated on the very first mount.'
          ],
          codeTitle: 'Greeting.jsx',
          code: 'import { useState } from \'react\';\n\nfunction Greeting() {\n  // [stateValue, setterFunction]\n  const [name, setName] = useState(\'Guest\');\n\n  return <h1>Hello, {name}!</h1>;\n}',
          anchor: '#sec-1-2'
        },
        {
          num: '4 / 10',
          badge: 'Topic 1.3',
          title: 'Handling User Events',
          subtitle: 'Synthetic Events & User Interactions',
          bullets: [
            'React uses camelCase event listener props: <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>.',
            'Pass function references: <code>onClick={handleClick}</code> (do NOT call it with parentheses <code>handleClick()</code>).',
            'Event handler calls setter → React queues update → UI repaints.'
          ],
          codeTitle: 'Counter.jsx',
          code: 'function Counter() {\n  const [count, setCount] = useState(0);\n\n  const handleIncrement = () => {\n    setCount(count + 1);\n  };\n\n  return <button onClick={handleIncrement}>Clicked {count}</button>;\n}',
          anchor: '#sec-1-3'
        },
        {
          num: '5 / 10',
          badge: 'Topic 2.1',
          title: 'Updating State & Immutability',
          subtitle: 'Never Mutate State Directly — Spread Objects & Use Updaters',
          bullets: [
            '<strong>Immutability:</strong> Always create new copies of objects/arrays (<code>{ ...prev, key: val }</code>).',
            '<strong>Stale Closure Trap:</strong> 3 calls to <code>setScore(score + 1)</code> in the same tick only add +1!',
            '<strong>Updater Function:</strong> Use <code>setScore(prev => prev + 1)</code> to safely queue rapid updates.'
          ],
          codeTitle: 'ScoreBoard.jsx',
          code: '// Updating an object immutably:\nsetPlayer(prev => ({ ...prev, level: prev.level + 1 }));\n\n// Safe sequential updates with updater function:\nsetScore(prev => prev + 1);\nsetScore(prev => prev + 1); // Guarantees +2 total!',
          anchor: '#sec-2-1'
        },
        {
          num: '6 / 10',
          badge: 'Topic 2.2',
          title: 'State & Re-rendering',
          subtitle: 'How React Compares State and Diffs the DOM',
          bullets: [
            'React performs strict equality checks via <code>Object.is(oldState, newState)</code>.',
            'If values are identical, React <strong>bails out</strong> and skips the re-render completely.',
            'If values differ, React calls the component function top-to-bottom and patches only the changed DOM nodes.'
          ],
          codeTitle: 'RenderLogger.jsx',
          code: 'function RenderLogger() {\n  const [toggle, setToggle] = useState(false);\n  console.log(\'Rendering toggle:\', toggle);\n\n  // Object.is(old, new) === false -> Re-render scheduled\n  return <button onClick={() => setToggle(!toggle)}>Toggle</button>;\n}',
          anchor: '#sec-2-2'
        },
        {
          num: '7 / 10',
          badge: 'Topic 3.1',
          title: 'Introduction to useEffect Hook',
          subtitle: 'Synchronizing Components with External Systems',
          bullets: [
            'Pure components render JSX from props/state. Side effects live in <code>useEffect</code>.',
            'Side effects include: API fetching, timers, manual DOM updates, WebSockets.',
            'Executes <strong>after screen paint</strong>, preventing slow operations from freezing the UI.'
          ],
          codeTitle: 'TitleUpdater.jsx',
          code: 'import { useState, useEffect } from \'react\';\n\nfunction TitleUpdater() {\n  const [clicks, setClicks] = useState(0);\n\n  // Synchronize browser tab title after paint\n  useEffect(() => {\n    document.title = `Clicked ${clicks} times`;\n  });\n\n  return <button onClick={() => setClicks(clicks + 1)}>Click</button>;\n}',
          anchor: '#sec-3-1'
        },
        {
          num: '8 / 10',
          badge: 'Topic 3.2',
          title: 'The Dependency Array',
          subtitle: 'Controlling Exactly When Your Effect Re-runs',
          bullets: [
            '<strong>No Array:</strong> Runs after initial mount + after EVERY single render (infinite loop risk!).',
            '<strong>Empty <code>[]</code>:</strong> Runs ONCE on mount (ideal for one-time event listeners).',
            '<strong>With <code>[deps]</code>:</strong> Runs on mount + only when listed dependencies change.'
          ],
          codeTitle: 'UserProfile.jsx',
          code: 'useEffect(() => {\n  // Only re-fetches when userId prop actually changes\n  fetch(`https://api.example.com/users/${userId}`)\n    .then(res => res.json())\n    .then(data => setUserData(data));\n}, [userId]); // Dependency array',
          anchor: '#sec-3-2'
        },
        {
          num: '9 / 10',
          badge: 'Topic 3.3',
          title: 'Effects & Cleanup Function',
          subtitle: 'Stopping Continuous Processes & Preventing Memory Leaks',
          bullets: [
            'Return a cleanup function from inside your effect: <code>return () => { clearInterval(id); }</code>.',
            'Runs when the component <strong>unmounts</strong> from the DOM.',
            'Also runs right before the effect re-runs with new dependencies to clean up the previous run.'
          ],
          codeTitle: 'Timer.jsx',
          code: 'useEffect(() => {\n  const id = setInterval(() => setSeconds(s => s + 1), 1000);\n\n  // Teardown / cleanup function prevents memory leaks!\n  return () => clearInterval(id);\n}, []);',
          anchor: '#sec-3-3'
        },
        {
          num: '10 / 10',
          badge: 'Review & Quiz',
          title: 'Cheat Sheet Matrix & Assessment',
          subtitle: 'Summary of Best Practices & Live Class Quiz',
          bullets: [
            '<strong>useState:</strong> Local state memory; always update with setter or updater functions.',
            '<strong>useEffect:</strong> External sync; always declare all dependencies used inside.',
            '<strong>Cleanup:</strong> Clear timers, subscriptions, and listeners to prevent leaks.',
            'Use the interactive quiz to test mastery with instant feedback.'
          ],
          codeTitle: 'SummaryMatrix.txt',
          code: 'useState(init)     -> Component Memory\nsetVal(p => p + 1) -> Updater Queue (Prevents Stale Closure)\nuseEffect(fn)      -> Runs Every Render\nuseEffect(fn, [])  -> Runs Once on Mount\nuseEffect(fn, [d]) -> Runs When [d] Changes\nreturn () => clean -> Runs on Unmount / Re-run',
          anchor: '#quiz-section'
        }
      ];

      var presentModal = document.getElementById('presentModal');
      var slideViewport = document.getElementById('slideViewport');
      var slideIndicator = document.getElementById('slideIndicator');
      var slideProgressBar = document.getElementById('slideProgressBar');
      var slideDotsContainer = document.getElementById('slideDotsContainer');
      var prevSlideBtn = document.getElementById('prevSlideBtn');
      var nextSlideBtn = document.getElementById('nextSlideBtn');
      var closePresentBtn = document.getElementById('closePresentBtn');
      var presentModeBtn = document.getElementById('presentModeBtn');
      var mobilePresentBtn = document.getElementById('mobilePresentBtn');
      var heroPresentBtn = document.getElementById('heroPresentBtn');

      function renderSlide(index) {
        if (index < 0) index = 0;
        if (index >= presentationSlides.length) index = presentationSlides.length - 1;
        currentSlide = index;
        var s = presentationSlides[index];

        if (slideIndicator) {
          slideIndicator.textContent = 'Slide ' + (index + 1) + ' of ' + presentationSlides.length;
        }
        if (slideProgressBar) {
          slideProgressBar.style.width = (((index + 1) / presentationSlides.length) * 100) + '%';
        }

        // Render dots
        if (slideDotsContainer) {
          slideDotsContainer.innerHTML = '';
          presentationSlides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.className = i === index
              ? 'w-6 h-2 rounded-full bg-sky-400 transition-all'
              : 'w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-500 transition-all';
            dot.addEventListener('click', function () { renderSlide(i); });
            slideDotsContainer.appendChild(dot);
          });
        }

        // Bullets HTML
        var bulletsHtml = s.bullets.map(function (b) {
          return '<li class="flex items-start gap-2.5 text-sm sm:text-base text-slate-300 leading-relaxed"><span class="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0"></span><span>' + b + '</span></li>';
        }).join('');

        // Slide card markup
        slideViewport.innerHTML =
          '<div class="space-y-6 animate-fade">' +
            '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">' +
              '<div class="space-y-1">' +
                '<span class="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">' + s.badge + '</span>' +
                '<h2 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">' + s.title + '</h2>' +
                '<p class="text-sm sm:text-base text-slate-400">' + s.subtitle + '</p>' +
              '</div>' +
              '<a href="' + s.anchor + '" id="jumpToHandbookBtn" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors">' +
                'View in Handbook' +
                '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>' +
              '</a>' +
            '</div>' +
            '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">' +
              '<div class="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-center space-y-4 shadow-xl">' +
                '<div class="text-xs font-mono uppercase tracking-wider text-slate-400">Key Takeaways &amp; Concepts:</div>' +
                '<ul class="space-y-3.5">' + bulletsHtml + '</ul>' +
              '</div>' +
              '<div class="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col shadow-xl">' +
                '<div class="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">' +
                  '<span>' + s.codeTitle + '</span>' +
                  '<span class="text-sky-400 font-semibold">Live Reference</span>' +
                '</div>' +
                '<pre class="p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto code-scroll flex-1 leading-relaxed bg-slate-950/60"><code>' + s.code + '</code></pre>' +
              '</div>' +
            '</div>' +
          '</div>';

        // Add event listener to exit modal when clicking "View in Handbook"
        var jumpBtn = document.getElementById('jumpToHandbookBtn');
        if (jumpBtn) {
          jumpBtn.addEventListener('click', function () {
            closePresentationMode();
          });
        }
      }

      function openPresentationMode() {
        if (!presentModal) return;
        presentModal.classList.remove('hidden');
        renderSlide(currentSlide);
        document.body.style.overflow = 'hidden';
      }

      function closePresentationMode() {
        if (!presentModal) return;
        presentModal.classList.add('hidden');
        document.body.style.overflow = '';
      }

      if (presentModeBtn) presentModeBtn.addEventListener('click', openPresentationMode);
      if (mobilePresentBtn) mobilePresentBtn.addEventListener('click', openPresentationMode);
      if (heroPresentBtn) heroPresentBtn.addEventListener('click', openPresentationMode);
      if (closePresentBtn) closePresentBtn.addEventListener('click', closePresentationMode);

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
