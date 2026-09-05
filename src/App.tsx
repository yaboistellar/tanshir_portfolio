import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Brush,
  Coffee,
  Cpu,
  Eraser,
  Facebook,
  FileText,
  Github,
  GraduationCap,
  Hourglass,
  Instagram,
  Linkedin,
  Lock,
  Menu,
  MousePointerClick,
  Pencil,
  PenLine,
  PenTool,
  Play,
  Quote,
  Send,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  Timer,
} from 'lucide-react';

type PageKey = 'home' | 'games' | 'bookshelf' | 'education';

const navigation = [
  { label: 'Home', href: '/', page: 'home' as PageKey },
  { label: 'Demo Projects', href: '/#projects', page: 'home' as PageKey },
  { label: 'Notebook Games', href: '/games', page: 'games' as PageKey },
  { label: 'Bookshelf', href: '/bookshelf', page: 'bookshelf' as PageKey },
  { label: 'Education', href: '/education', page: 'education' as PageKey },
  { label: 'Contact', href: '/#contact', page: 'home' as PageKey },
];

function currentPage(): PageKey {
  const path = window.location.pathname;
  if (path.startsWith('/games')) return 'games';
  if (path.startsWith('/bookshelf')) return 'bookshelf';
  if (path.startsWith('/education')) return 'education';
  return 'home';
}

function Navigation({
  page,
  mobile,
  onNavigate,
}: {
  page: PageKey;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav
      className={mobile ? 'mobile-nav typewriter' : 'desktop-nav typewriter'}
      aria-label="Primary navigation"
    >
      {navigation.map((item) => (
        <a
          key={item.label}
          className={`nav-link${item.page === page && item.label !== 'Demo Projects' && item.label !== 'Contact' ? ' active' : ''}`}
          href={item.href}
          data-testid={`link-${item.label.toLowerCase().replaceAll(' ', '-')}`}
          onClick={onNavigate}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function SiteHeader({ page }: { page: PageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="availability">
        <div className="site-width availability-inner typewriter">
          <span className="availability-dot" aria-hidden="true" />
          <span>Currently available for Q2 design sprints &amp; creative projects</span>
        </div>
      </div>
      <header className="site-header">
        <div className="site-width header-inner">
          <a className="brand handwritten" href="/" data-testid="link-brand">
            <Star aria-hidden="true" />
            <span>Tanshir Al Musnad</span>
          </a>
          <Navigation page={page} />
          <button
            className="menu-button"
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
        {menuOpen && (
          <div className="site-width">
            <Navigation
              page={page}
              mobile
              onNavigate={() => setMenuOpen(false)}
            />
          </div>
        )}
      </header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-width footer-inner typewriter">
        <span>Vol. 2024 / Notebook Ed. • Drafted with fountain ink &amp; code</span>
        <span>© Tanshir Al Musnad. All handwritten thoughts reserved.</span>
      </div>
    </footer>
  );
}

function PaperDecorations() {
  const doodles = ['✦ 〰', '☕', '✎', '♡', '◇ 〰', '☼', '✧', '● 〰'];

  return (
    <div className="paper-decorations" aria-hidden="true">
      <span className="paper-coffee coffee-one" />
      <span className="paper-coffee coffee-two" />
      <span className="paper-coffee coffee-three" />
      <span className="paper-coffee coffee-four" />
      <span className="paper-coffee coffee-five" />
      {doodles.map((doodle, index) => (
        <span className={`paper-doodle doodle-${index + 1}`} key={`${doodle}-${index}`}>
          {doodle}
        </span>
      ))}
    </div>
  );
}

function SiteFrame({
  page,
  children,
  className = '',
}: {
  page: PageKey;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`notebook-page ${className}`}>
      <PaperDecorations />
      <SiteHeader page={page} />
      <main className="site-width page-main">{children}</main>
      <SiteFooter />
    </div>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function HomePage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const portraitSrc = `${import.meta.env.BASE_URL}images/tanshir-portrait.webp`;

  async function submitNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus('sending');
    setFormError('');

    const form = event.currentTarget;
    const data = new FormData(form);

    const body = {
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      subject: 'New Note from Portfolio — ' + (data.get('name') as string),
      from_name: data.get('name') as string,
      email: data.get('email') as string,
      message: (data.get('message') as string) +
        '\n\nServices requested: ' + [
          (data.get('ux') ? 'Full UI/UX Sprint' : null),
          (data.get('code') ? 'Code / Frontend' : null),
        ].filter(Boolean).join(', '),
      replyto: data.get('email') as string,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json() as { success: boolean; message?: string };
      if (json.success) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
        setFormError(json.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setFormStatus('error');
      setFormError('Network error — please check your connection and try again.');
    }
  }

  const projects = [
    {
      title: 'Kindle ReadFlow',
      icon: <Hourglass />,
      number: '01',
      copy: 'A focused reading-flow study exploring typography, pace, and frictionless chapter navigation for e-readers.',
      tags: ['UX Research', 'Figma Prototype', 'Typography Engine'],
      action: 'Read Study',
    },
    {
      title: 'Artisan Coffee Wheel',
      icon: <Coffee />,
      number: '02',
      copy: 'An interactive flavor wheel pairing tasting notes with roast origins — built for delightful discovery.',
      tags: ['Next.js 16', 'Tailwind CSS', 'Framer Motion'],
      action: 'Explore Demo',
    },
    {
      title: 'FinDoodle',
      icon: <FileText />,
      number: '03',
      copy: 'Making personal finance feel less scary through hand-drawn data viz and gentle nudges.',
      tags: ['Design System', 'Data Viz', 'React Native'],
      action: 'Read Study',
    },
    {
      title: 'TypeCraft',
      icon: <Terminal />,
      number: '04',
      copy: 'An interactive typographic playground for tweaking variable fonts and OpenType features in real time.',
      tags: ['TypeScript', 'Canvas API', 'OpenType.js'],
      action: 'Launch Tool',
    },
  ];

  const toolkit = [
    { name: 'Figma', kind: 'Cool Bababoey UI/UX Design', detail: 'Design Systems & Prototypes', icon: <PenTool /> },
    { name: 'ChatGPT', kind: 'AI / Ideation', detail: 'Prompt Crafting & Logic', icon: <Cpu /> },
    { name: 'Gemini', kind: 'Multimodal AI', detail: 'Deep Research & Vision', icon: <Sparkles /> },
    { name: 'Google Stitch', kind: 'AI Design Tool', detail: 'Generative UI Architecture', icon: <MousePointerClick /> },
    { name: 'Adobe Illustrator', kind: 'Vector Craft', detail: 'Vector & Precision Assets', icon: <Brush /> },
  ];

  return (
    <SiteFrame page="home" className="home-page">
      <div className="home-content">
        <section className="home-hero">
          <div className="portrait-frame ink-border shadow-note">
            <div className="tape-tab" />
            <img src={portraitSrc} alt="Pixel portrait of Tanshir" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow typewriter">• Page 01 • Cover Sheet</p>
            <h1 className="hero-title handwritten">
              Hello, I&apos;m Tanshir <span aria-hidden="true">✩</span>
            </h1>
            <p className="hero-description">
              Translating complex systems into intuitive tactile digital crafts. I bridge thoughtful UX research, delightful frontend interactions, and tangible paper prototyping to deliver software people genuinely fall in love with.
            </p>
            <div className="hero-actions">
              <a className="ink-button handwritten" href="#projects">
                Flip through my works <ArrowDown aria-hidden="true" />
              </a>
              <a className="dashed-button handwritten" href="#contact">
                <Pencil aria-hidden="true" /> Pass a Note
              </a>
            </div>
            <div className="home-aside handwritten">
              <ArrowRight aria-hidden="true" /> homework inside!
            </div>
          </div>
          <div className="home-stats">
            <div className="note-card cream-note">
              <div className="typewriter note-kicker">Field Metrics</div>
              <p className="handwritten">nothing but a lot of self teaching which worked out pretty well</p>
            </div>
            <div className="note-card white-note">
              <div className="typewriter note-kicker"><BookOpen aria-hidden="true" /> Currently Reading</div>
              <p className="handwritten">Harry Potter</p>
              <span className="typewriter">by J.K. Rowling • Ch. 4 (Notes taken)</span>
            </div>
          </div>
        </section>

        <section id="projects" className="home-section anchor-offset">
          <p className="section-kicker typewriter red-kicker">Assignment Log // Index 02</p>
          <h2 className="home-section-title handwritten">Demo Projects</h2>
          <div className="filter-row typewriter">
            <span className="filter-chip selected">All (4)</span>
            <span className="filter-chip">UX Research</span>
            <span className="filter-chip">Next.js &amp; Web</span>
            <span className="filter-chip">Creative Coding</span>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card ink-border shadow-note" key={project.title}>
                <div className="project-meta">
                  <span className="project-icon">{project.icon}</span>
                  <span className="typewriter">Demo Project {project.number}</span>
                </div>
                <h3 className="handwritten">{project.title}</h3>
                <p>{project.copy}</p>
                <div className="tag-row typewriter">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <button className="text-link handwritten" type="button">
                  {project.action} <ArrowRight aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="toolkit" className="home-section anchor-offset">
          <p className="section-kicker typewriter"><PenTool aria-hidden="true" /> Field Gear • Daily Arsenal</p>
          <h2 className="home-section-title handwritten">My Sketchbook &amp; Engineering Toolkit</h2>
          <p className="section-subtitle handwritten">tested &amp; coffee-approved everyday carry</p>
          <div className="toolkit-grid">
            {toolkit.map((tool) => (
              <article className="toolkit-card ink-border shadow-note" key={tool.name}>
                <div className="toolkit-name">
                  <span className="toolkit-icon">{tool.icon}</span>
                  <span className="handwritten">{tool.name}</span>
                </div>
                <p className="typewriter">{tool.kind}</p>
                <div className="handwritten">{tool.detail}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="home-section anchor-offset contact-section">
          <p className="section-kicker typewriter"><Send aria-hidden="true" /> Pass a Note in Class</p>
          <h2 className="home-section-title handwritten">Got a project in mind? Drop a note.</h2>
          <div className="squiggle" aria-hidden="true" />
          <form className="contact-form ink-border shadow-note" onSubmit={submitNote} ref={formRef}>
            <label>
              <span className="typewriter">01. Your Name / Company *</span>
              <input name="name" required placeholder="Write your name here…" />
            </label>
            <label>
              <span className="typewriter">02. Electronic Post Address (Email) *</span>
              <input name="email" required type="email" placeholder="you@inbox.com" />
            </label>
            <label>
              <span className="typewriter">03. The Note (Brief, Scope, Timeline, or just say hello!) *</span>
              <textarea name="message" required rows={4} placeholder="Fold your note here…" />
            </label>
            <div className="contact-checks typewriter">
              <label><input type="checkbox" name="ux" /> Full UI/UX Sprint</label>
              <label><input type="checkbox" name="code" /> Code / Frontend</label>
            </div>
            <button
              className="ink-button handwritten"
              type="submit"
              disabled={formStatus === 'sending'}
              style={{ opacity: formStatus === 'sending' ? 0.65 : 1 }}
            >
              <Send aria-hidden="true" />
              {formStatus === 'sending' ? 'Sending…' : 'Fold & Send Note'}
            </button>
            {formStatus === 'success' && (
              <p className="sent-note typewriter">✓ Note folded and sent! I'll reply within 24h of a fresh cup of coffee.</p>
            )}
            {formStatus === 'error' && (
              <p className="sent-note typewriter" style={{ color: 'var(--note-accent)' }}>✗ {formError}</p>
            )}
            <div className="contact-links typewriter">
              <div>
                <a href="https://github.com/yaboistellar/tanshir_portfolio" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" /> GitHub</a>
                <a href="https://www.instagram.com/curtainsyh/" target="_blank" rel="noopener noreferrer"><Instagram aria-hidden="true" /> Instagram</a>
                <a href="https://web.facebook.com/profile.php?id=61590300914480" target="_blank" rel="noopener noreferrer"><Facebook aria-hidden="true" /> Facebook</a>
                <a href="https://www.linkedin.com/in/tanshir-al-musnad-020914424/" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
              </div>
              <span>schedule: Usually replies within 24h of fresh brewed coffee</span>
            </div>
          </form>
        </section>
      </div>
    </SiteFrame>
  );
}

type TicTacToeMark = 'X' | 'O' | null;

const ticTacToeLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getTicTacToeWinner(board: TicTacToeMark[]) {
  for (const [a, b, c] of ticTacToeLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isTicTacToeTie(board: TicTacToeMark[]) {
  return board.every(Boolean) && !getTicTacToeWinner(board);
}

function minimax(board: TicTacToeMark[], maximizing: boolean): number {
  const winner = getTicTacToeWinner(board);
  if (winner === 'O') return 10;
  if (winner === 'X') return -10;
  if (isTicTacToeTie(board)) return 0;

  const scores = board
    .map((mark, index) => {
      if (mark) return null;
      const next = [...board];
      next[index] = maximizing ? 'O' : 'X';
      const score = minimax(next, !maximizing);
      return maximizing ? score - 1 : score + 1;
    })
    .filter((score): score is number => score !== null);

  return maximizing ? Math.max(...scores) : Math.min(...scores);
}

function findPaperAiMove(board: TicTacToeMark[]) {
  let bestScore = -Infinity;
  let bestMove = -1;

  board.forEach((mark, index) => {
    if (mark) return;
    const next = [...board];
    next[index] = 'O';
    const score = minimax(next, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  });

  return bestMove;
}

function GamesPage() {
  const [board, setBoard] = useState<TicTacToeMark[]>(Array(9).fill(null));
  const [aiThinking, setAiThinking] = useState(false);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0, ties: 0 });

  function finishRound(nextBoard: TicTacToeMark[]) {
    const winner = getTicTacToeWinner(nextBoard);
    if (winner) {
      setRoundResult(`${winner === 'X' ? 'You win' : 'Paper AI wins'}!`);
      setScore((current) => ({ ...current, [winner]: current[winner] + 1 }));
      return true;
    }
    if (isTicTacToeTie(nextBoard)) {
      setRoundResult('A tidy little tie.');
      setScore((current) => ({ ...current, ties: current.ties + 1 }));
      return true;
    }
    return false;
  }

  function markSquare(index: number) {
    if (aiThinking || roundResult || board[index]) return;

    const nextBoard = [...board];
    nextBoard[index] = 'X';
    setBoard(nextBoard);

    if (!finishRound(nextBoard)) {
      setAiThinking(true);
    }
  }

  useEffect(() => {
    if (!aiThinking) return;

    const aiTimer = window.setTimeout(() => {
      const move = findPaperAiMove(board);
      if (move === -1) {
        setAiThinking(false);
        return;
      }

      const nextBoard = [...board];
      nextBoard[move] = 'O';
      setBoard(nextBoard);
      setAiThinking(false);
      finishRound(nextBoard);
    }, 420);

    return () => window.clearTimeout(aiTimer);
  }, [aiThinking, board]);

  function eraseBoard() {
    setBoard(Array(9).fill(null));
    setAiThinking(false);
    setRoundResult(null);
  }

  return (
    <SiteFrame page="games">
      <div className="games-content">
        <header className="page-intro">
          <p className="eyebrow typewriter">Arcade Ed.</p>
          <div className="yellow-sticker typewriter">Study Break • Period 4 Free Time</div>
          <h1 className="page-title handwritten"><Pencil aria-hidden="true" /> Doodle Arcade &amp; Playground</h1>
          <p className="page-description">Handcrafted mini-games scribbled during long study sessions. Grab your pen, pick a game, and play directly on the notebook paper!</p>
        </header>
        <div className="game-tabs typewriter">
          <span className="selected">1. Tic-Tac-Toe Ink</span>
          <span>2. Pencil Snake Grid</span>
          <span>3. Scribble Cards Match</span>
        </div>
        <div className="games-layout">
          <section className="game-board-card ink-border shadow-note">
            <h2 className="handwritten">Ink Duel • Tic-Tac-Toe (X&apos;s &amp; O&apos;s)</h2>
            <p className="typewriter muted-copy">Blue Ballpoint vs Crimson Pencil margin classic.</p>
            <div className="game-controls typewriter">
              <button className="dark-control" type="button" disabled><Cpu aria-hidden="true" /> VS Paper AI</button>
              <button type="button" onClick={eraseBoard}><Eraser aria-hidden="true" /> Erase Board</button>
            </div>
            <div className="typewriter game-turn">
              {roundResult ?? (aiThinking ? 'Paper AI is thinking…' : 'Your turn (Player X)!')}
            </div>
            <div className="typewriter game-score">X Wins: {score.X} | O Wins: {score.O} | Ties: {score.ties}</div>
            <div className="tic-tac-toe">
              {board.map((mark, index) => (
                <button key={index} type="button" onClick={() => markSquare(index)} aria-label={`Square ${index + 1}`}>
                  <span className={mark === 'O' ? 'red-mark' : ''}>{mark}</span>
                </button>
              ))}
            </div>
            <div className="typewriter board-tip">X: Ballpoint Ink • O: Red Pencil Sketch — Tip: The paper AI never sleeps in math class.</div>
          </section>
          <aside className="game-aside">
            <div className="game-note yellow-note ink-border shadow-note">
              <div className="typewriter note-kicker"><StickyNote aria-hidden="true" /> Free Space</div>
              <p className="handwritten">Jot a doodle here while you think about your next move…</p>
            </div>
            <div className="game-note ink-border shadow-note">
              <div className="typewriter note-kicker">0 Shavings Collected</div>
              <div className="shavings-bar"><span /></div>
              <p className="typewriter"><Award aria-hidden="true" /> Sharpen 25 times to unlock golden chalk badge</p>
            </div>
            <div className="game-note peach-note ink-border shadow-note">
              <div className="typewriter note-kicker">Quick Memo</div>
              <p className="handwritten">Remember to close the notebook before Teacher Davies walks down row 3! Keep margins clean for algebra notes.</p>
            </div>
          </aside>
        </div>
        <section className="draft-section">
          <p className="section-kicker typewriter"><Pencil aria-hidden="true" /> In the Drafting Phase • Upcoming Notebook Game Drafts</p>
          <h2 className="home-section-title handwritten">Blueprinted for Next Semester</h2>
          <div className="draft-grid">
            {[
              ['Notebook Battleship', 'Grid Coordinates: A1 to J10', 'Graph paper sea warfare — call out coordinates and sink your classmate’s paper fleet before the bell rings.', 'Drafting 70%', '2 Players / Split Paper'],
              ['Hangman Doodle Word', 'Vocabulary test survival', 'Guess vocabulary words one letter at a time. Each wrong guess adds a stroke to the doodled stick figure.', 'Concept Sketched', '1-4 Players / Pass Sheet'],
              ['Physics Paper Ball', 'Crumpled Paper Toss', 'Aim your flick shot into the recycling bin across the room. Wind from the open window changes the trajectory.', 'Prototype', 'Physics Engine / High Score'],
            ].map(([title, kicker, copy, badge, footer]) => (
              <article className="draft-card ink-border shadow-note" key={title}>
                <span className="draft-badge typewriter">{badge}</span>
                <h3 className="handwritten">{title}</h3>
                <p className="typewriter draft-kicker">{kicker}</p>
                <p>{copy}</p>
                <div className="typewriter draft-footer"><Lock aria-hidden="true" /> {footer}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}

const finishedBooks = [
  ['Steal Like an Artist', 'Creativity is combinatorial — copy your heroes, then remix honestly.', 'Sept 14 • 160 pgs'],
  ['Atomic Habits', '1% better every day compounds. Systems beat goals; identity beats systems.', 'Aug 29 • 320 pgs'],
  ['Creative Selection', 'Demos as decisions. Apple’s craft came from tiny, opinionated iterations.', 'Aug 11 • 304 pgs'],
  ['Exhalation: Stories', 'Sci-fi as philosophy. Chiang asks what makes a mind worth keeping.', 'Jul 03 • 352 pgs'],
];

function BookCard({
  title,
  author,
  progress,
  progressLabel,
  cover,
  coverSrc,
  note,
  kicker,
}: {
  title: string;
  author: string;
  progress: number;
  progressLabel: string;
  cover: string;
  coverSrc: string;
  note: string;
  kicker: string;
}) {
  return (
    <article className={`reading-card ink-border shadow-note${cover === 'black-cover' ? ' black-beauty-card' : ''}`}>
      <p className="typewriter reading-kicker">{kicker}</p>
      <div className="book-details">
        <div className={`book-cover ${cover}`}>
          <img src={coverSrc} alt={`Cover of ${title}`} />
        </div>
        <div className="book-info">
          <h3 className="handwritten">{title}</h3>
          <p className="typewriter">by {author}</p>
          <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
          <small className="typewriter">{progressLabel}</small>
        </div>
      </div>
      <div className="book-note handwritten">{note}</div>
    </article>
  );
}

function BookshelfPage() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(15 * 60);
  const bookCoverBase = `${import.meta.env.BASE_URL}images/`;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const timerLabel = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <SiteFrame page="bookshelf">
      <div className="bookshelf-content">
        <header className="bookshelf-intro">
          <div>
            <p className="eyebrow typewriter">• Page 38 • Study Hall Reading Nook</p>
            <h1 className="page-title handwritten bookshelf-title"><Star aria-hidden="true" /> Books I&apos;m Reading &amp; Studying <PenTool aria-hidden="true" /></h1>
          </div>
          <div className="desk-stats dashed-ink typewriter">
            <strong>Desk Stats // 2024</strong>
            <ul>
              <li>Total Books Read: 14 vols</li>
              <li>Current Pace: 34 pgs / night</li>
              <li>Favorite Realm: Magic Realism &amp; HCI</li>
              <li>Bookmarks In Play: 12 dog-eared</li>
            </ul>
            <span>Updated: Oct 28 • Status: On Track</span>
          </div>
        </header>

        <section className="bookshelf-section">
          <div className="black-label typewriter">Section 01 • Currently Open On My Desk</div>
          <div className="reading-grid">
            <BookCard
              title="Harry Potter and the Goblet of Fire"
              author="J.K. Rowling"
              progress={68}
              progressLabel="68% finished"
              cover="harry-cover"
              coverSrc={`${bookCoverBase}harry-potter-goblet-of-fire.jpg`}
              kicker="Reading • Ch. 20 / 37 (The First Task)"
              note="“Differences of habit and language are nothing at all if our aims are identical and our hearts are open.”"
            />
            <BookCard
              title="Black Beauty"
              author="Anna Sewell"
              progress={76}
              progressLabel="186 / 245 pgs"
              cover="black-cover"
              coverSrc={`${bookCoverBase}black-beauty.jpg`}
              kicker="Classic Literature • 76%"
              note="KEY NOTE — A horse’s-eye-view that quietly teaches empathy. The chapter on Ginger still hits hard."
            />
          </div>
        </section>

        <section className="bookshelf-section">
          <div className="black-label typewriter">Section 02 • Recently Finished &amp; Study Notes</div>
          <div className="finished-grid">
            {finishedBooks.map(([title, copy, meta]) => (
              <article className="finished-card ink-border shadow-note" key={title}>
                <div className="stars" aria-label="5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} />)}</div>
                <h3 className="handwritten">{title}</h3>
                <p>{copy}</p>
                <span className="typewriter">{meta}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="shelf-tools">
          <div className="to-read ink-border shadow-note">
            <div className="typewriter tools-kicker"><BookOpen aria-hidden="true" /> Shelf • The To-Read Stack (Drafting Shelf)</div>
            <ul>
              {['Diary of a Wimpy Kid', 'Sprint', 'The Shape of Design', 'Gödel, Escher, Bach', 'Invisible Cities'].map((book) => (
                <li className="handwritten" key={book}><input type="checkbox" /> {book}</li>
              ))}
            </ul>
          </div>
          <div className="study-tools">
            <div className="sprint-card ink-border shadow-note">
              <div className="typewriter tools-kicker"><Timer aria-hidden="true" /> Study Sprint</div>
              <div className="timer handwritten">{timerLabel}</div>
              <p className="typewriter">Study Hall Countdown</p>
              <button type="button" onClick={() => setRunning((value) => !value)}><Play aria-hidden="true" /> {running ? 'Pause Pencil Sprint' : 'Start Pencil Sprint'}</button>
            </div>
            <div className="quote-card shadow-note">
              <Quote aria-hidden="true" />
              <p className="handwritten">“It is our choices, Harry, that show what we truly are, far more than our abilities.”</p>
              <span className="typewriter">— Albus Dumbledore</span>
            </div>
          </div>
        </section>

        <div className="lending-policy ink-border typewriter">
          <span>Studio Book-Lending Policy: Return books with doodles intact — marginalia welcome.</span>
          <span>Ink on Paper Permitted</span>
        </div>
      </div>
    </SiteFrame>
  );
}

function FormalFoundations() {
  return (
    <section data-testid="section-formal-foundations">
      <div className="section-label typewriter">Section A // Formal Foundations</div>
      <div className="foundations-grid">
        <div className="foundation-list">
          <div className="current-school ink-border shadow-note">
            <div className="card-heading">
              <h3 className="card-title handwritten">Canadian Maple International School</h3>
              <span className="small-label cambridge typewriter">Cambridge Curriculum</span>
            </div>
            <div className="status-row typewriter">
              <span className="small-label status-green ink-border">Enrolled</span>
              <span className="small-label status-yellow ink-border">Current</span>
              <span className="small-label status-blue ink-border">Grade 5</span>
              <span className="small-label status-peach ink-border">Advanced Standing / Honors</span>
            </div>
          </div>
          <div>
            <p className="previous-title typewriter">Previous Foundations</p>
            <div className="previous-grid">
              {[
                ['Playpen School', 'Local Foundation', 'Early Years'],
                ['Al-Hidayah', 'Islamic Studies', 'Primary'],
                ['CIDER', 'Inclusive Ed.', 'Bridge Program'],
                ['Bangladesh Elementary', 'National Curriculum', 'Grades 1-4'],
              ].map(([name, kind, stage]) => (
                <div className="previous-card ink-border shadow-note" key={name}>
                  <h4 className="handwritten">{name}</h4>
                  <p className="typewriter">{kind}</p>
                  <p className="typewriter">{stage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="milestone ink-border shadow-note">
          <p className="milestone-kicker typewriter">Milestone • Secondary Target</p>
          <h3 className="handwritten">Approaching O-Levels</h3>
          <p className="milestone-target typewriter">Target: Cambridge IGCSE / O-Levels</p>
          <p className="milestone-copy">Started with HTML on a borrowed laptop, then Pascal, then C — each one felt like a secret handshake with the machine. The graph paper and physics notebooks came right after.</p>
          <div className="milestone-note handwritten">&quot;Pencils, graph papers, and physics notebooks.&quot;</div>
        </aside>
      </div>
    </section>
  );
}

function Specializations() {
  const cards: Array<{
    title: string;
    status: string;
    copy: string;
    tags: string[];
    source: string;
  }> = [
    { title: 'Cool Bababoey UI/UX Design', status: 'Completed & Certified Pro', copy: 'Hundreds of hours sketching wireframes, breaking grids, and rebuilding them until the affordances felt obvious. The certificate is just paper; the muscle memory is the real diploma.', tags: ['rectangle pusher', 'figma auto-layout sorcery', 'vibes & affordances', 'certified pixel perfectionist'], source: 'Curated through: Refactoring UI, Nielsen Norman, 3am Reddit rabbit holes • Self-Guided' },
    { title: 'Ilm Enslavement', status: 'Ongoing', copy: 'AI-assisted coding adventures — where the GPU fan screams, the model apologizes, and the div still won’t center. A loving, slightly unhinged partnership with the machine.', tags: ['gpu fan screaming', 'emotional manipulation (prompts)', 'apology accepted now fix the div', 'vibe coder supreme', 'jailbreak engineer'], source: 'Source: ChatGPT apology logs, 4am stackoverflow hallucinations • Ongoing' },
  ];
  return (
    <section className="specializations">
      <div className="section-label typewriter">Section B // Self-Taught Curriculum &amp; Specializations</div>
      <div className="specialization-grid">
        {cards.map(({ title, status, copy, tags, source }) => (
          <div className="specialization-card ink-border shadow-note" key={title}>
            <div className="card-heading">
              <h3 className="card-title handwritten">{title}</h3>
              <span className="small-label status-certified ink-border typewriter">{status}</span>
            </div>
            <p className="specialization-copy">{copy}</p>
            <div className="skill-row">
              {tags.map((tag) => <span className="skill typewriter" key={tag}>{tag}</span>)}
            </div>
            <div className="source-line typewriter">{source}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationPage() {
  return (
    <SiteFrame page="education">
      <div className="page-content">
        <header className="intro">
          <div>
            <p className="eyebrow typewriter">Log Entry No. 04 • Academic &amp; Self-Directed</p>
            <h1 className="intro-title handwritten"><GraduationCap aria-hidden="true" /><span>Education &amp; Learning Log</span></h1>
            <p className="intro-copy">honestly, nothing beats an obsession with curiosity — chasing the next thing that makes the brain itch until it&apos;s scratched.</p>
          </div>
          <div className="intro-tags typewriter">
            <span className="tag tag-yellow ink-border">Major Path: CS &amp; Interaction</span>
            <span className="tag tag-peach ink-border">Focus: Interactive Systems</span>
            <span className="tag tag-green ink-border">Self-Taught: Countless hrs</span>
          </div>
        </header>
        <FormalFoundations />
        <Specializations />
        <div className="always-learning ink-border shadow-note">
          <div className="learning-heading typewriter"><Pencil aria-hidden="true" /><span>Always Learning</span></div>
          <p className="learning-quote handwritten">&quot;Always learning, sketching, and breaking production to see how it works.&quot;</p>
          <p className="learning-detail typewriter">Currently reading: Meme design papers &amp; WebGL shaders at 3am.</p>
          <p className="learning-signature handwritten">— Tanshir Al Musnad (TAM)</p>
        </div>
      </div>
    </SiteFrame>
  );
}

function App() {
  const page = currentPage();
  if (page === 'games') return <GamesPage />;
  if (page === 'bookshelf') return <BookshelfPage />;
  if (page === 'education') return <EducationPage />;
  return <HomePage />;
}

export default App;