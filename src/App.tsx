import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Lenis from 'lenis';
import * as THREE from 'three';
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Box,
  Brush,
  Check,
  ChevronDown,
  Coffee,
  Cpu,
  Eraser,
  Facebook,
  Flame,
  Gamepad2,
  Github,
  GraduationCap,
  Hammer,
  HelpCircle,
  Hourglass,
  Instagram,
  Layers,
  Linkedin,
  Lock,
  Maximize2,
  Menu,
  Minimize2,
  Moon,
  MousePointerClick,
  Orbit,
  Pencil,
  PenLine,
  PenTool,
  Play,
  Quote,
  RotateCcw,
  Send,
  Ship,
  Smartphone,
  Sparkles,
  Star,
  StickyNote,
  Sun,
  Target,
  Timer,
  Triangle,
  Trophy,
  Wind,
  ZoomIn,
  ZoomOut,
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

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme };
}

function ThemeToggleButton({
  isDark,
  onToggle,
  mobile,
}: {
  isDark: boolean;
  onToggle: () => void;
  mobile?: boolean;
}) {
  return (
    <motion.button
      type="button"
      className={`theme-toggle-btn typewriter${mobile ? ' mobile' : ''}`}
      onClick={onToggle}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? 'Switch to Day Paper mode' : 'Switch to Night Ink mode'}
      title={isDark ? 'Switch to Day Paper' : 'Switch to Night Ink'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -8, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 8, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18, ease: 'easeOut' as const }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          {isDark ? (
            <Sun className="theme-toggle-icon" aria-hidden="true" />
          ) : (
            <Moon className="theme-toggle-icon" aria-hidden="true" />
          )}
          <span className="theme-toggle-label">{isDark ? 'DAY INK' : 'NIGHT INK'}</span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function SiteHeader({
  page,
  isDark,
  onToggleTheme,
}: {
  page: PageKey;
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="availability">
        <div className="site-width availability-inner typewriter">
          <span className="availability-dot" aria-hidden="true" />
          <span>trying to vibe-code while my laptop fans scream in mercy</span>
        </div>
      </div>
      <header className="site-header">
        <div className="site-width header-inner">
          <motion.a
            className="brand handwritten"
            href="/"
            data-testid="link-brand"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 6, duration: 1.2 }}
              style={{ display: 'inline-flex' }}
            >
              <Star aria-hidden="true" />
            </motion.span>
            <span>Tanshir Al Musnad</span>
          </motion.a>
          <div className="header-nav-cluster">
            <Navigation page={page} />
            <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} />
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
        </div>
        {menuOpen && (
          <div className="site-width mobile-menu-wrap">
            <Navigation
              page={page}
              mobile
              onNavigate={() => setMenuOpen(false)}
            />
            <div className="mobile-theme-row">
              <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} mobile />
            </div>
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

interface MarginStamp {
  id: number;
  x: number;
  y: number;
  symbol: string;
  rot: number;
}

function InkCursorFollower() {
  const [active, setActive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 450, damping: 28 });
  const ringY = useSpring(cursorY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('.project-card') ||
          target.closest('.toolkit-card'))
      ) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="ink-cursor-dot"
        style={{ left: cursorX, top: cursorY }}
        aria-hidden="true"
      />
      <motion.div
        className={`ink-cursor-ring${active ? ' active' : ''}`}
        style={{ left: ringX, top: ringY }}
        aria-hidden="true"
      />
    </>
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
  const { isDark, toggleTheme } = useTheme();
  const [stamps, setStamps] = useState<MarginStamp[]>([]);
  const stampIndexRef = useRef(0);
  const doodleSymbols = ['✦', '✎', '☕', '★', '〰', '✧', '♡', '◇', '◡'];

  // Initialize Lenis smooth inertia momentum scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth anchor link gliding with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          lenis.scrollTo(href, { offset: -60, duration: 1.4 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only stamp if clicked on empty/notebook background areas (not interactive forms/buttons/inputs)
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('.project-card') ||
      target.closest('.contact-form')
    ) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top + window.scrollY;

    const newStamp: MarginStamp = {
      id: Date.now() + Math.random(),
      x,
      y,
      symbol: doodleSymbols[stampIndexRef.current % doodleSymbols.length],
      rot: Math.floor(Math.random() * 40) - 20,
    };
    stampIndexRef.current += 1;

    setStamps((prev) => [...prev.slice(-12), newStamp]);

    setTimeout(() => {
      setStamps((prev) => prev.filter((s) => s.id !== newStamp.id));
    }, 2400);
  }, []);

  return (
    <div className={`notebook-page ${className}`} onClick={handlePageClick}>
      <InkCursorFollower />
      <ScrollProgressBar />
      {stamps.map((stamp) => (
        <span
          key={stamp.id}
          className="margin-stamp"
          style={{
            left: `${stamp.x}px`,
            top: `${stamp.y}px`,
            transform: `translate(-50%, -50%) rotate(${stamp.rot}deg)`,
          }}
        >
          {stamp.symbol}
        </span>
      ))}
      <PaperDecorations />
      <SiteHeader page={page} isDark={isDark} onToggleTheme={toggleTheme} />
      <main className="site-width page-main">{children}</main>
      <SiteFooter />
    </div>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, transformOrigin: '0%' }}
      aria-hidden="true"
    />
  );
}

function ScrollDownIndicator({ targetId = 'projects' }: { targetId?: string }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 180], [1, 0]);
  const y = useTransform(scrollY, [0, 180], [0, 16]);

  const scrollToTarget = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="scroll-down-container typewriter"
      style={{ opacity, y }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' as const }}
    >
      <button
        type="button"
        className="scroll-down-button"
        onClick={scrollToTarget}
        aria-label="Scroll down to projects"
      >
        <div className="mouse-indicator">
          <motion.span
            className="mouse-wheel-dot"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.25, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
            }}
          />
        </div>
        <div className="scroll-text-group">
          <span className="scroll-label">SCROLL DOWN</span>
          <motion.div
            className="scroll-chevrons"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <ChevronDown aria-hidden="true" />
          </motion.div>
        </div>
      </button>
    </motion.div>
  );
}

function ThreeBackgroundScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 750;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for real-time parallax tilt
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Check theme initially
    const isInitialDark = document.documentElement.classList.contains('dark');
    let mainColor = isInitialDark ? 0xeee7d8 : 0x252621;
    let accentColor = isInitialDark ? 0xef8275 : 0xb43b35;
    let mutedColor = isInitialDark ? 0xaeb8b4 : 0x67685f;

    // 1. Central Massive Drafting Desk Geometric Polyhedron (Icosahedron)
    const outerGeom = new THREE.IcosahedronGeometry(2.6, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: isInitialDark ? 0.38 : 0.28,
    });
    const outerMesh = new THREE.Mesh(outerGeom, outerMat);
    worldGroup.add(outerMesh);

    // 2. Secondary Nested Dodecahedron in Crimson Ink
    const midGeom = new THREE.DodecahedronGeometry(1.95, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isInitialDark ? 0.45 : 0.35,
    });
    const midMesh = new THREE.Mesh(midGeom, midMat);
    worldGroup.add(midMesh);

    // 3. Inner Fast-spinning Octahedron Core
    const coreGeom = new THREE.OctahedronGeometry(1.15, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: isInitialDark ? 0.55 : 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    worldGroup.add(coreMesh);

    // 4. Orbiting Celestial/Drafting Astrolabe Rings
    const ringGeom1 = new THREE.TorusGeometry(3.8, 0.015, 12, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: isInitialDark ? 0.3 : 0.22,
    });
    const ringMesh1 = new THREE.Mesh(ringGeom1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3.5;
    ringMesh1.rotation.y = Math.PI / 5;
    worldGroup.add(ringMesh1);

    const ringGeom2 = new THREE.TorusGeometry(4.4, 0.015, 12, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isInitialDark ? 0.28 : 0.2,
    });
    const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 6;
    worldGroup.add(ringMesh2);

    // 5. Desk Blueprint Grid Helper
    const gridHelper = new THREE.GridHelper(18, 22, accentColor, mainColor);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = isInitialDark ? 0.14 : 0.09;
    gridHelper.position.y = -3.4;
    gridHelper.rotation.x = 0.25;
    worldGroup.add(gridHelper);

    // 6. Floating Scattered Ink Polyhedra across the page
    interface FloatingShape {
      mesh: THREE.Mesh;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatOffset: number;
      basePos: THREE.Vector3;
    }

    const floatingShapes: FloatingShape[] = [];
    const shapeGeometries = [
      new THREE.TetrahedronGeometry(0.38, 0),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.BoxGeometry(0.45, 0.45, 0.45),
      new THREE.IcosahedronGeometry(0.34, 0),
    ];

    const inkMaterials = [
      new THREE.MeshBasicMaterial({ color: mainColor, wireframe: true, transparent: true, opacity: isInitialDark ? 0.32 : 0.25 }),
      new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: isInitialDark ? 0.36 : 0.28 }),
      new THREE.MeshBasicMaterial({ color: mutedColor, wireframe: true, transparent: true, opacity: isInitialDark ? 0.3 : 0.22 }),
    ];

    const positions = [
      [-4.8, 2.4, -1.5],
      [5.0, 2.0, -1.0],
      [-5.5, -1.8, -0.8],
      [5.6, -2.4, -1.2],
      [-3.0, 3.4, 0.5],
      [3.4, 3.6, -0.5],
      [-3.8, -3.4, 0.2],
      [4.0, -3.2, 0.4],
      [-6.2, 0.2, -2.0],
      [6.4, 0.5, -1.8],
      [-1.8, -3.0, 1.0],
      [2.2, 3.0, 0.8],
      [-5.2, 4.0, -2.5],
      [5.4, -4.0, -2.0],
    ];

    positions.forEach((pos, idx) => {
      const geom = shapeGeometries[idx % shapeGeometries.length];
      const mat = inkMaterials[idx % inkMaterials.length];
      const mesh = new THREE.Mesh(geom, mat);
      const basePos = new THREE.Vector3(pos[0], pos[1], pos[2]);
      mesh.position.copy(basePos);
      worldGroup.add(mesh);

      floatingShapes.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: 1 + Math.random() * 1.5,
        floatOffset: Math.random() * Math.PI * 2,
        basePos,
      });
    });

    const updateThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const curMain = isDark ? 0xeee7d8 : 0x252621;
      const curAccent = isDark ? 0xef8275 : 0xb43b35;
      const curMuted = isDark ? 0xaeb8b4 : 0x67685f;

      outerMat.color.setHex(curMain);
      outerMat.opacity = isDark ? 0.38 : 0.28;
      midMat.color.setHex(curAccent);
      midMat.opacity = isDark ? 0.45 : 0.35;
      coreMat.color.setHex(curMain);
      coreMat.opacity = isDark ? 0.55 : 0.45;
      ringMat1.color.setHex(curMain);
      ringMat2.color.setHex(curAccent);

      inkMaterials[0].color.setHex(curMain);
      inkMaterials[1].color.setHex(curAccent);
      inkMaterials[2].color.setHex(curMuted);
    };

    const themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateThemeColors();
        }
      }
    });

    themeObserver.observe(document.documentElement, { attributes: true });

    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse damping
      smoothMouseX += (mouseX - smoothMouseX) * 0.04;
      smoothMouseY += (mouseY - smoothMouseY) * 0.04;

      // Rotate central geometric models
      outerMesh.rotation.x = elapsed * 0.18 + smoothMouseY * 0.6;
      outerMesh.rotation.y = elapsed * 0.22 + smoothMouseX * 0.6;
      outerMesh.position.y = Math.sin(elapsed * 1.2) * 0.12;

      midMesh.rotation.x = -elapsed * 0.24 - smoothMouseY * 0.4;
      midMesh.rotation.y = -elapsed * 0.28 + smoothMouseX * 0.4;
      midMesh.position.y = Math.cos(elapsed * 1.4) * 0.08;

      coreMesh.rotation.x = elapsed * 0.45;
      coreMesh.rotation.z = elapsed * 0.4;

      ringMesh1.rotation.z = elapsed * 0.12 + smoothMouseX * 0.3;
      ringMesh2.rotation.y = -elapsed * 0.14 - smoothMouseY * 0.3;

      // Parallax world tilt & pan
      worldGroup.rotation.y = smoothMouseX * 0.25;
      worldGroup.rotation.x = -smoothMouseY * 0.18;
      worldGroup.position.x = smoothMouseX * 0.35;
      worldGroup.position.y = smoothMouseY * 0.25;

      // Animate floating geometric solids
      floatingShapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotSpeed.x;
        shape.mesh.rotation.y += shape.rotSpeed.y;
        shape.mesh.rotation.z += shape.rotSpeed.z;
        shape.mesh.position.y =
          shape.basePos.y + Math.sin(elapsed * shape.floatSpeed + shape.floatOffset) * 0.2;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeom.dispose();
      midGeom.dispose();
      coreGeom.dispose();
      ringGeom1.dispose();
      ringGeom2.dispose();
      gridHelper.dispose();
      shapeGeometries.forEach((g) => g.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="three-hero-bg"
      aria-hidden="true"
    />
  );
}

interface ProjectItem {
  title: string;
  icon: React.ReactNode;
  number?: string;
  copy: string;
  tags: string[];
  category: string[];
  action: string;
  url?: string;
  banner?: string;
}

function Interactive3DProjectCard({ project }: { project: ProjectItem }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-120, 120], [16, -16]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-16, 16]), { stiffness: 300, damping: 20 });
  const glareOpacity = useSpring(useTransform(y, [-120, 120], [0.35, 0]), { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92, rotateX: 14 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04, z: 25 }}
      className="project-card ink-border shadow-note card-3d"
      key={project.title}
    >
      <motion.div
        className="card-glare"
        style={{ opacity: glareOpacity }}
        aria-hidden="true"
      />
      <div className="project-meta" style={{ transform: 'translateZ(26px)', transformStyle: 'preserve-3d' }}>
        <motion.span
          className="project-icon"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 15 }}
        >
          {project.icon}
        </motion.span>
        {project.number && <span className="typewriter">Demo Project {project.number}</span>}
      </div>
      <h3 className="handwritten" style={{ transform: 'translateZ(34px)' }}>
        {project.title}
      </h3>
      <p style={{ transform: 'translateZ(20px)' }}>{project.copy}</p>
      <div className="tag-row typewriter" style={{ transform: 'translateZ(28px)' }}>
        {project.tags.map((tag: string) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {project.banner && (
        <div className="project-banner-wrap" style={{ transform: 'translateZ(28px)' }}>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-banner-link"
              tabIndex={-1}
              aria-label={`Open ${project.title}`}
            >
              <img
                src={project.banner}
                alt={`${project.title} Banner`}
                className="project-banner-img ink-border shadow-note"
              />
            </a>
          ) : (
            <img
              src={project.banner}
              alt={`${project.title} Banner`}
              className="project-banner-img ink-border shadow-note"
            />
          )}
        </div>
      )}
      <div style={{ transform: 'translateZ(30px)' }}>
        {project.url ? (
          <motion.a
            className="text-link handwritten"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.95 }}
          >
            {project.action} <ArrowRight aria-hidden="true" />
          </motion.a>
        ) : (
          <motion.button
            className="text-link handwritten"
            type="button"
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.95 }}
          >
            {project.action} <ArrowRight aria-hidden="true" />
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

function Interactive3DBox({
  children,
  className = '',
  style = {},
  glare = true,
  maxTilt = 10,
  depth = 18,
  whileHoverScale = 1.025,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glare?: boolean;
  maxTilt?: number;
  depth?: number;
  whileHoverScale?: number;
  onClick?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [maxTilt, -maxTilt]), { stiffness: 280, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-maxTilt, maxTilt]), { stiffness: 280, damping: 22 });
  const glareOpacity = useSpring(useTransform(y, [-100, 100], [0.26, 0]), { stiffness: 280, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`card-3d ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: whileHoverScale, z: depth }}
      transition={{ duration: 0.22, ease: 'easeOut' as const }}
      onClick={onClick}
    >
      {glare && (
        <motion.div
          className="card-glare"
          style={{ opacity: glareOpacity }}
          aria-hidden="true"
        />
      )}
      <div style={{ transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d', width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type ProjectFilter = 'all' | 'ux' | 'web' | 'code';

function HomePage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
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

  const allProjects = [
    {
      title: 'Ambient Studio',
      icon: (
        <img
          src="/images/ambient-studio-logo.jpg"
          alt="Ambient Studio Logo"
        />
      ),
      copy: 'An indie gaming laboratory crafting quirky arcade mechanics, retro soundscapes, and delightfully silly interactive web games.',
      tags: ['Indie Game Lab', 'Web Audio API', 'Creative Coding'],
      category: ['web', 'code', 'ux'],
      action: 'Explore Studio',
      url: 'https://ambientstudio-delta.vercel.app',
      banner: '/images/ambient-studio-banner.png',
    },
  ];

  const filteredProjects = allProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category.includes(activeFilter);
  });

  const toolkit = [
    { name: 'Figma', kind: 'UI/UX & Design Systems', detail: 'Design Systems & Prototypes', icon: <PenTool /> },
    { name: 'ChatGPT', kind: 'AI / Ideation', detail: 'Prompt Crafting & Logic', icon: <Cpu /> },
    { name: 'Gemini', kind: 'Multimodal AI', detail: 'Deep Research & Vision', icon: <Sparkles /> },
    { name: 'Google Stitch', kind: 'AI Design Tool', detail: 'Generative UI Architecture', icon: <MousePointerClick /> },
    { name: 'Adobe Illustrator', kind: 'Vector Craft', detail: 'Vector & Precision Assets', icon: <Brush /> },
    { name: 'Antigravity', kind: 'Agentic AI IDE / Dev', detail: 'Autonomous Workflows & Coding', icon: <Orbit /> },
    { name: 'Vercel', kind: 'Cloud Edge & Deploy', detail: 'Zero-Config CI/CD & Edge Hosting', icon: <Triangle fill="currentColor" stroke="none" /> },
    { name: 'GitHub', kind: 'Version Control & Git', detail: 'Branching, Repos & Open Source', icon: <Github /> },
  ];

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const },
    },
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.93]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.75, 1], [1, 0.9, 0.3]);
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 70]);

  const portraitMouseX = useMotionValue(0);
  const portraitMouseY = useMotionValue(0);
  const portraitRotateX = useSpring(useTransform(portraitMouseY, [-100, 100], [10, -10]), { stiffness: 240, damping: 20 });
  const portraitRotateY = useSpring(useTransform(portraitMouseX, [-100, 100], [-10, 10]), { stiffness: 240, damping: 20 });

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    portraitMouseX.set(e.clientX - centerX);
    portraitMouseY.set(e.clientY - centerY);
  };

  const handlePortraitMouseLeave = () => {
    portraitMouseX.set(0);
    portraitMouseY.set(0);
  };

  return (
    <SiteFrame page="home" className="home-page">
      <div className="home-content">
        <motion.section
          ref={heroRef}
          className="home-hero"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        >
          <ThreeBackgroundScene />
          <motion.div
            className="portrait-frame ink-border shadow-note"
            variants={heroItemVariants}
            style={{ rotateX: portraitRotateX, rotateY: portraitRotateY, transformPerspective: 800 }}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeave}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <motion.div
              className="tape-tab"
              whileHover={{ rotate: -8, scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
            <img src={portraitSrc} alt="Pixel portrait of Tanshir" />
          </motion.div>
          <div className="hero-copy">
            <div style={{ overflow: 'hidden' }}>
              <motion.p
                className="eyebrow typewriter"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' as const }}
              >
                • Page 01 • Cover Sheet
              </motion.p>
            </div>
            <h1 className="hero-title handwritten" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {['Hello,', "I'm", 'Tanshir'].map((word, i) => (
                <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '120%', opacity: 0, rotate: i % 2 === 0 ? 3 : -3 }}
                    animate={{ y: '0%', opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: 'easeOut' as const }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <motion.span
                className="hero-star-interactive"
                aria-hidden="true"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 280, damping: 12 }}
                whileHover={{ rotate: 180, scale: 1.4 }}
                whileTap={{ scale: 0.85 }}
              >
                ✩
              </motion.span>
            </h1>
            <motion.p className="hero-description" variants={heroItemVariants}>
              Translating complex systems into intuitive tactile digital crafts. I bridge thoughtful UX research, delightful frontend interactions, and tangible paper prototyping to deliver software people genuinely fall in love with.
            </motion.p>
            <motion.div className="hero-actions" variants={heroItemVariants}>
              <motion.a
                className="ink-button handwritten"
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                Flip through my works{' '}
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  style={{ display: 'inline-flex' }}
                >
                  <ArrowDown aria-hidden="true" />
                </motion.span>
              </motion.a>
              <motion.a
                className="dashed-button handwritten"
                href="#contact"
                whileHover={{ scale: 1.03, y: -2, backgroundColor: 'rgba(26,26,26,0.06)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <motion.span
                  whileHover={{ rotate: [0, -15, 10, 0] }}
                  transition={{ duration: 0.4 }}
                  style={{ display: 'inline-flex' }}
                >
                  <Pencil aria-hidden="true" />
                </motion.span>{' '}
                Pass a Note
              </motion.a>
            </motion.div>
            <motion.div className="home-aside handwritten" variants={heroItemVariants}>
              <ArrowRight aria-hidden="true" /> homework inside!
            </motion.div>
          </div>
          <motion.div className="home-stats" variants={heroItemVariants} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            <Interactive3DBox className="note-card cream-note" maxTilt={8} depth={16}>
              <div className="typewriter note-kicker">Field Metrics</div>
              <p className="handwritten">nothing but a lot of self teaching which worked out pretty well</p>
            </Interactive3DBox>
            <Interactive3DBox className="note-card white-note" maxTilt={8} depth={16}>
              <div className="typewriter note-kicker">
                <motion.span
                  animate={{ rotate: [0, -6, 6, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 4, duration: 1 }}
                  style={{ display: 'inline-flex' }}
                >
                  <BookOpen aria-hidden="true" />
                </motion.span>{' '}
                Currently Reading
              </div>
              <p className="handwritten">Harry Potter</p>
              <span className="typewriter">by J.K. Rowling • Ch. 4 (Notes taken)</span>
            </Interactive3DBox>
            <Interactive3DBox className="note-card yellow-note" maxTilt={8} depth={16}>
              <div className="typewriter note-kicker">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 3, duration: 1.2 }}
                  style={{ display: 'inline-flex' }}
                >
                  <Sparkles aria-hidden="true" />
                </motion.span>{' '}
                3D Geometric Space
              </div>
              <p className="handwritten">Live WebGL geometric desk universe covering the page</p>
              <span className="typewriter" style={{ fontSize: '10px', opacity: 0.7 }}>Move cursor anywhere to tilt &amp; orbit</span>
            </Interactive3DBox>
          </motion.div>
          <ScrollDownIndicator targetId="projects" />
        </motion.section>

        <motion.section
          id="projects"
          className="home-section anchor-offset"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <p className="section-kicker typewriter red-kicker">Assignment Log // Index 02</p>
          <h2 className="home-section-title handwritten">Demo Projects</h2>

          <div className="demo-projects-notice typewriter">
            <span className="notice-badge">📌 NOTE</span>
            <p className="notice-text">
              Please note: These showcase projects are <strong>fictional demo concepts</strong> created to demonstrate UI/UX architectures and creative engineering. Real production projects are currently being thought out and developed, and will be published here as soon as possible.
            </p>
          </div>

          <div className="filter-row typewriter" role="tablist" aria-label="Project filter">
            {(
              [
                ['all', `All (${allProjects.length})`],
                ['ux', 'UX Research'],
                ['web', 'Next.js & Web'],
                ['code', 'Creative Coding'],
              ] as const
            ).map(([filterKey, label]) => (
              <motion.button
                key={filterKey}
                type="button"
                role="tab"
                aria-selected={activeFilter === filterKey}
                className={`filter-chip${activeFilter === filterKey ? ' selected' : ''}`}
                onClick={() => setActiveFilter(filterKey)}
                whileTap={{ scale: 0.94 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <Interactive3DProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        <motion.section
          id="toolkit"
          className="home-section anchor-offset"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <p className="section-kicker typewriter">
            <PenTool aria-hidden="true" /> Field Gear • Daily Arsenal
          </p>
          <h2 className="home-section-title handwritten">My Sketchbook &amp; Engineering Toolkit</h2>
          <p className="section-subtitle handwritten">tested &amp; coffee-approved everyday carry</p>
          <div className="toolkit-grid">
            {toolkit.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' as const }}
                style={{ height: '100%' }}
              >
                <Interactive3DBox
                  className="toolkit-card ink-border shadow-note"
                  maxTilt={12}
                  depth={20}
                  style={{ height: '100%' }}
                >
                  <div className="toolkit-name">
                    <motion.span
                      className="toolkit-icon"
                      whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      {tool.icon}
                    </motion.span>
                    <span className="handwritten">{tool.name}</span>
                  </div>
                  <p className="typewriter">{tool.kind}</p>
                  <div className="handwritten">{tool.detail}</div>
                </Interactive3DBox>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="home-section anchor-offset contact-section"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <p className="section-kicker typewriter">
            <Send aria-hidden="true" /> Pass a Note in Class
          </p>
          <h2 className="home-section-title handwritten">Got a project in mind? Drop a note.</h2>
          <svg
            className="squiggle"
            viewBox="0 0 420 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ width: '100%', maxWidth: '420px', height: '14px', margin: '10px 0 18px' }}
          >
            <motion.path
              d="M 2 7 Q 105 14, 210 7 T 418 7"
              stroke="rgba(26,26,26,0.3)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>
          <Interactive3DBox className="contact-card-wrap" maxTilt={5} depth={14} glare={false}>
            <form
              className="contact-form ink-border shadow-note"
              onSubmit={submitNote}
              ref={formRef}
            >
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
                <label>
                  <input type="checkbox" name="ux" /> Full UI/UX Sprint
                </label>
                <label>
                  <input type="checkbox" name="code" /> Code / Frontend
                </label>
              </div>
              <motion.button
                className="ink-button handwritten"
                type="submit"
                disabled={formStatus === 'sending'}
                style={{ opacity: formStatus === 'sending' ? 0.65 : 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  animate={formStatus === 'sending' ? { x: [0, 8, -4, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  style={{ display: 'inline-flex' }}
                >
                  <Send aria-hidden="true" />
                </motion.span>
                {formStatus === 'sending' ? 'Folding & Sending…' : 'Fold & Send Note'}
              </motion.button>
              {formStatus === 'success' && (
                <motion.p
                  className="sent-note typewriter"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Note folded and sent! I&apos;ll reply within 24h of a fresh cup of coffee.
                </motion.p>
              )}
              {formStatus === 'error' && (
                <motion.p
                  className="sent-note typewriter"
                  style={{ color: 'var(--note-accent)' }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✗ {formError}
                </motion.p>
              )}
              <div className="contact-links typewriter">
                <div>
                  {[
                    { label: 'GitHub', href: 'https://github.com/yaboistellar', icon: <Github aria-hidden="true" /> },
                    { label: 'Instagram', href: 'https://www.instagram.com/curtainsyh/', icon: <Instagram aria-hidden="true" /> },
                    { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61590300914480', icon: <Facebook aria-hidden="true" /> },
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanshir-al-musnad-020914424/', icon: <Linkedin aria-hidden="true" /> },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {social.icon} {social.label}
                    </motion.a>
                  ))}
                </div>
                <span>schedule: Usually replies within 24h of fresh brewed coffee</span>
              </div>
            </form>
          </Interactive3DBox>
        </motion.section>
      </div>
    </SiteFrame>
  );
}

type TicTacToeMark = 'X' | 'O' | null;

interface WinResult {
  winner: TicTacToeMark;
  line: number[];
}

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

function getTicTacToeWinner(board: TicTacToeMark[]): WinResult | null {
  for (const line of ticTacToeLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

function isTicTacToeTie(board: TicTacToeMark[]) {
  return board.every((cell) => cell !== null) && !getTicTacToeWinner(board);
}

function minimax(board: TicTacToeMark[], depth: number, isMaximizing: boolean): number {
  const winInfo = getTicTacToeWinner(board);
  if (winInfo?.winner === 'O') return 10 - depth;
  if (winInfo?.winner === 'X') return depth - 10;
  if (isTicTacToeTie(board)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
}

function findPaperAiMove(currentBoard: TicTacToeMark[]): number {
  const boardCopy = [...currentBoard];
  let bestScore = -Infinity;
  let bestMove = -1;
  const availableMoves: number[] = [];

  for (let i = 0; i < 9; i++) {
    if (boardCopy[i] === null) {
      availableMoves.push(i);
      boardCopy[i] = 'O';
      const score = minimax(boardCopy, 0, false);
      boardCopy[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  if (bestMove === -1 && availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  return bestMove;
}

function DoodlePadWidget() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#1d4ed8'); // Blue Ballpoint
  const [penWidth, setPenWidth] = useState(2.5);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  return (
    <Interactive3DBox className="game-note yellow-note ink-border shadow-note" maxTilt={8} depth={16}>
      <div className="typewriter note-kicker">
        <StickyNote aria-hidden="true" /> Free Space Scribble Pad
      </div>
      <p className="handwritten" style={{ fontSize: '18px', marginBottom: '4px' }}>
        Jot a sketch or math doodle:
      </p>
      <div className="doodle-canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="doodle-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="doodle-toolbar">
        <div className="doodle-colors">
          {[
            { color: '#1d4ed8', label: 'Blue Pen' },
            { color: '#dc2626', label: 'Red Pencil' },
            { color: '#252621', label: 'Graphite' },
          ].map(({ color, label }) => (
            <button
              key={color}
              type="button"
              className={`doodle-color-btn${penColor === color ? ' selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => {
                setPenColor(color);
                setPenWidth(2.5);
              }}
              title={label}
              aria-label={label}
            />
          ))}
        </div>
        <button type="button" className="doodle-action-btn typewriter" onClick={clearCanvas}>
          <Eraser aria-hidden="true" style={{ width: 10, height: 10, display: 'inline', marginRight: 2 }} /> Clear
        </button>
      </div>
    </Interactive3DBox>
  );
}

function PencilSharpenerWidget() {
  const [shavings, setShavings] = useState(0);
  const [isCranking, setIsCranking] = useState(false);

  const sharpenPencil = () => {
    setIsCranking(true);
    setShavings((prev) => prev + 1);
    setTimeout(() => setIsCranking(false), 300);
  };

  const getBadge = () => {
    if (shavings >= 50) return '🏆 Master Draftsman';
    if (shavings >= 25) return '🎖️ Golden Chalk Badge';
    if (shavings >= 15) return '🥈 Silver Graphite';
    if (shavings >= 5) return '✏️ Bronze Lead';
    return null;
  };

  const activeBadge = getBadge();
  const progressPercent = Math.min(100, Math.round(((shavings % 25) / 25) * 100));

  return (
    <Interactive3DBox className="game-note ink-border shadow-note" maxTilt={8} depth={16}>
      <div className="typewriter note-kicker">
        <Award aria-hidden="true" /> {shavings} Shavings Collected
      </div>
      <div className="shavings-bar">
        <span style={{ width: `${progressPercent}%`, transition: 'width 0.2s ease' }} />
      </div>
      <p className="typewriter" style={{ fontSize: '11px', color: 'var(--note-muted)', margin: '4px 0' }}>
        Sharpen to unlock study hall stationery badges (25 per tier).
      </p>
      {activeBadge && (
        <div className="badge-unlocked-banner">
          <Sparkles aria-hidden="true" style={{ width: 12, height: 12 }} /> {activeBadge}
        </div>
      )}
      <motion.button
        type="button"
        className="sharpener-btn"
        onClick={sharpenPencil}
        animate={isCranking ? { rotate: [0, 180, 360] } : {}}
        transition={{ duration: 0.3 }}
      >
        <RotateCcw aria-hidden="true" style={{ width: 14, height: 14 }} /> Sharpen Pencil
      </motion.button>
    </Interactive3DBox>
  );
}

const HANGMAN_WORDS = [
  { word: 'GRAPHITE', hint: 'Core writing mineral inside pencils' },
  { word: 'BLUEPRINT', hint: 'Architectural schematic drawing' },
  { word: 'PROTRACTOR', hint: 'Semi-circle tool for measuring angles' },
  { word: 'SKETCHBOOK', hint: 'Bound notebook where ideas start' },
  { word: 'ALGEBRA', hint: 'Equations and formulas in period 3' },
  { word: 'NOTEBOOK', hint: 'Ruled journal for margin scribbles' },
  { word: 'CALCULATOR', hint: 'Solar-powered number cruncher' },
  { word: 'GEOMETRY', hint: 'Shapes, polygons, and proofs' },
  { word: 'DRAFTSMAN', hint: 'Skilled technical illustrator' },
  { word: 'ORIGAMI', hint: 'The Japanese craft of folding paper' },
  { word: 'INKWELL', hint: 'Reservoir for dipping fountain pens' },
];

function HangmanGame() {
  const [wordIndex, setWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [score, setScore] = useState({ won: 0, lost: 0 });
  const [hintUsed, setHintUsed] = useState(false);

  const currentItem = HANGMAN_WORDS[wordIndex % HANGMAN_WORDS.length];
  const word = currentItem.word;
  const hint = currentItem.hint;

  const mistakes = Array.from(guessedLetters).filter((letter) => !word.includes(letter)).length;
  const isWon = word.split('').every((letter) => guessedLetters.has(letter));
  const isLost = mistakes >= 6;
  const isOver = isWon || isLost;

  const handleGuess = (letter: string) => {
    if (isOver || guessedLetters.has(letter)) return;
    const next = new Set(guessedLetters);
    next.add(letter);
    setGuessedLetters(next);

    const nextMistakes = Array.from(next).filter((l) => !word.includes(l)).length;
    const nextWon = word.split('').every((l) => next.has(l));

    if (nextWon) {
      setScore((s) => ({ ...s, won: s.won + 1 }));
    } else if (nextMistakes >= 6) {
      setScore((s) => ({ ...s, lost: s.lost + 1 }));
    }
  };

  const useHint = () => {
    if (hintUsed || isOver) return;
    const unrevealed = word.split('').find((l) => !guessedLetters.has(l));
    if (unrevealed) {
      handleGuess(unrevealed);
      setHintUsed(true);
    }
  };

  const nextWord = () => {
    setWordIndex((prev) => prev + 1);
    setGuessedLetters(new Set());
    setHintUsed(false);
  };

  return (
    <div className="hangman-container">
      <h2 className="handwritten" style={{ margin: 0, fontSize: '27px' }}>
        Hangman Doodle Word • Vocabulary Survival
      </h2>
      <p className="typewriter muted-copy" style={{ margin: '4px 0 10px' }}>
        Guess the study hall vocabulary word one letter at a time before the stickman is fully sketched!
      </p>

      <div className="game-controls typewriter">
        <button className="dark-control" type="button" onClick={nextWord}>
          <RotateCcw aria-hidden="true" /> Next Word
        </button>
        <button type="button" onClick={useHint} disabled={hintUsed || isOver}>
          <HelpCircle aria-hidden="true" /> Hint: {hintUsed ? hint : 'Reveal Letter'}
        </button>
      </div>

      <div className="typewriter game-turn">
        {isWon && '🎉 Victory! You sketched the word without losing your notes!'}
        {isLost && `💀 Out of chalk strokes! The word was: ${word}`}
        {!isOver && `Chances left: ${6 - mistakes} / 6 • Topic Hint: ${hint}`}
      </div>

      <div className="typewriter game-score">
        Words Solved: {score.won} | Failed: {score.lost} | Accuracy:{' '}
        {score.won + score.lost > 0 ? Math.round((score.won / (score.won + score.lost)) * 100) : 100}%
      </div>

      <div className="hangman-stage">
        <svg className="hangman-svg" viewBox="0 0 100 100" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round">
          {/* Base Stand */}
          <line x1="10" y1="90" x2="50" y2="90" />
          {/* Gallows Pole */}
          <line x1="30" y1="90" x2="30" y2="15" />
          {/* Beam & Support */}
          <line x1="30" y1="15" x2="70" y2="15" />
          <line x1="30" y1="30" x2="45" y2="15" />
          {/* Rope */}
          <line x1="70" y1="15" x2="70" y2="28" strokeDasharray="2 2" />

          {/* Stick Figure Parts */}
          {mistakes >= 1 && <circle cx="70" cy="36" r="8" stroke="#dc2626" />}
          {mistakes >= 2 && <line x1="70" y1="44" x2="70" y2="65" stroke="#dc2626" />}
          {mistakes >= 3 && <line x1="70" y1="50" x2="56" y2="58" stroke="#dc2626" />}
          {mistakes >= 4 && <line x1="70" y1="50" x2="84" y2="58" stroke="#dc2626" />}
          {mistakes >= 5 && <line x1="70" y1="65" x2="58" y2="82" stroke="#dc2626" />}
          {mistakes >= 6 && <line x1="70" y1="65" x2="82" y2="82" stroke="#dc2626" />}
        </svg>

        <div className="hangman-details">
          <div className="hangman-slots">
            {word.split('').map((letter, idx) => {
              const isRevealed = guessedLetters.has(letter) || isLost;
              return (
                <div key={idx} className="hangman-slot">
                  {isRevealed ? letter : ''}
                </div>
              );
            })}
          </div>

          <div className="hangman-keyboard">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => {
              const isGuessed = guessedLetters.has(char);
              const isCorrect = isGuessed && word.includes(char);
              const isWrong = isGuessed && !word.includes(char);
              let btnClass = 'hangman-key';
              if (isCorrect) btnClass += ' key-correct';
              if (isWrong) btnClass += ' key-wrong';

              return (
                <button
                  key={char}
                  type="button"
                  className={btnClass}
                  onClick={() => handleGuess(char)}
                  disabled={isGuessed || isOver}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaperBallGame() {
  const [angle, setAngle] = useState(55);
  const [power, setPower] = useState(65);
  const [wind, setWind] = useState(1.5);
  const [isFlying, setIsFlying] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [score, setScore] = useState({ pts: 0, streak: 0, best: 0 });
  const [ballPos, setBallPos] = useState({ x: 30, y: 160 });

  const randomizeWind = () => {
    const newWind = parseFloat(((Math.random() - 0.5) * 6).toFixed(1));
    setWind(newWind);
  };

  const tossPaper = () => {
    if (isFlying) return;
    setIsFlying(true);
    setResultMessage(null);

    const rad = (angle * Math.PI) / 180;
    const velocity = power * 1.8;
    const gravity = 250;
    let t = 0;
    const interval = 20;

    const startX = 30;
    const startY = 160;

    const flightTimer = setInterval(() => {
      t += interval / 1000;
      const x = startX + velocity * Math.cos(rad) * t + 0.5 * wind * 30 * t * t;
      const y = startY - (velocity * Math.sin(rad) * t - 0.5 * gravity * t * t);

      setBallPos({ x, y });

      // Target bin position around x: 260-290, y: 130-160
      if (y >= 165 || x >= 320) {
        clearInterval(flightTimer);
        setIsFlying(false);

        // Check if landed in bin
        if (x >= 250 && x <= 295 && y >= 120 && y <= 168) {
          const newStreak = score.streak + 1;
          const pointsEarned = 100 * newStreak;
          const newPts = score.pts + pointsEarned;
          setResultMessage(`🗑️ SWISH! Clean shot into the recycling bin! (+${pointsEarned} pts, x${newStreak} Streak)`);
          setScore((s) => ({
            pts: newPts,
            streak: newStreak,
            best: Math.max(s.best, newPts),
          }));
        } else if (x >= 235 && x <= 310) {
          setResultMessage('💥 CLANK! Hit the metal rim of the bin! (+25 pts)');
          setScore((s) => ({ ...s, pts: s.pts + 25 }));
        } else {
          setResultMessage('💨 Missed the bin! Paper ball rolled across the classroom floor.');
          setScore((s) => ({ ...s, streak: 0 }));
        }

        randomizeWind();
      }
    }, interval);
  };

  const resetGame = () => {
    setBallPos({ x: 30, y: 160 });
    setResultMessage(null);
    randomizeWind();
  };

  return (
    <div className="paperball-container">
      <h2 className="handwritten" style={{ margin: 0, fontSize: '27px' }}>
        Physics Paper Ball • Crumpled Paper Toss
      </h2>
      <p className="typewriter muted-copy" style={{ margin: '4px 0 10px' }}>
        Calculate your launch trajectory, adjust for open-window breeze, and flick your paper ball into the bin!
      </p>

      <div className="game-controls typewriter">
        <button className="dark-control" type="button" onClick={tossPaper} disabled={isFlying}>
          <Target aria-hidden="true" /> Toss Paper Ball
        </button>
        <button type="button" onClick={resetGame} disabled={isFlying}>
          <RotateCcw aria-hidden="true" /> Reset Position
        </button>
      </div>

      <div className="typewriter game-turn">
        {resultMessage ?? `Wind Drift: ${wind > 0 ? `+${wind} m/s East 💨` : `${wind} m/s West 🌬️`}`}
      </div>

      <div className="typewriter game-score">
        Score: {score.pts} | Streak: x{score.streak} | High Score: {score.best}
      </div>

      <div className="paperball-arena">
        <div className="paperball-ground" />
        <div className="paperball-bin" />

        {/* Paper Ball */}
        <div
          style={{
            position: 'absolute',
            left: `${ballPos.x}px`,
            top: `${ballPos.y}px`,
            width: '18px',
            height: '18px',
            fontSize: '16px',
            lineHeight: 1,
            pointerEvents: 'none',
            transform: `translate(-50%, -50%) rotate(${ballPos.x * 4}deg)`,
            transition: isFlying ? 'none' : 'left 0.2s ease, top 0.2s ease',
          }}
        >
          📄
        </div>
      </div>

      <div className="paperball-controls-panel">
        <div className="paperball-slider-group">
          <label>
            <span>Launch Angle</span>
            <span>{angle}°</span>
          </label>
          <input
            type="range"
            min="20"
            max="85"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            disabled={isFlying}
          />
        </div>

        <div className="paperball-slider-group">
          <label>
            <span>Throw Power</span>
            <span>{power}%</span>
          </label>
          <input
            type="range"
            min="30"
            max="100"
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
            disabled={isFlying}
          />
        </div>
      </div>
    </div>
  );
}

function BattleshipGame() {
  const [playerGrid, setPlayerGrid] = useState<string[]>(() => {
    const grid = Array(25).fill('empty');
    // Place 3 player ships (e.g. cells 0, 1, 6, 12, 13, 14)
    [0, 1, 6, 12, 13, 14].forEach((idx) => (grid[idx] = 'ship'));
    return grid;
  });

  const [enemyGrid, setEnemyGrid] = useState<string[]>(() => {
    const grid = Array(25).fill('empty');
    // Hidden enemy fleet (3-cell carrier, 2-cell cruiser, 1-cell patrol)
    [3, 8, 13, 16, 17, 24].forEach((idx) => (grid[idx] = 'ship'));
    return grid;
  });

  const [radarHits, setRadarHits] = useState<{ [index: number]: 'hit' | 'miss' }>({});
  const [playerDamage, setPlayerDamage] = useState<{ [index: number]: 'hit' | 'miss' }>({});
  const [statusMsg, setStatusMsg] = useState('Call coordinates on Enemy Radar (Grid A1 to E5)!');
  const [isGameOver, setIsGameOver] = useState(false);

  const enemyShipIndices = [3, 8, 13, 16, 17, 24];
  const playerShipIndices = [0, 1, 6, 12, 13, 14];

  const enemyHitsCount = Object.keys(radarHits).filter(
    (idx) => radarHits[Number(idx)] === 'hit'
  ).length;

  const playerHitsCount = Object.keys(playerDamage).filter(
    (idx) => playerDamage[Number(idx)] === 'hit'
  ).length;

  const attackCoord = (index: number) => {
    if (isGameOver || radarHits[index]) return;

    const isHit = enemyGrid[index] === 'ship';
    const nextRadar = { ...radarHits, [index]: isHit ? ('hit' as const) : ('miss' as const) };
    setRadarHits(nextRadar);

    if (isHit) {
      const nextTotalHits = Object.values(nextRadar).filter((v) => v === 'hit').length;
      if (nextTotalHits >= enemyShipIndices.length) {
        setStatusMsg('🏆 FLEET VICTORY! All enemy paper battleships have been sunk!');
        setIsGameOver(true);
        return;
      } else {
        setStatusMsg('💥 DIRECT HIT on enemy ship! Paper Admiral is scrambling!');
      }
    } else {
      setStatusMsg('• Water Splash. Coordinate missed.');
    }

    // AI Counter Attack
    setTimeout(() => {
      const availablePlayerCoords = Array.from({ length: 25 }, (_, i) => i).filter(
        (i) => !playerDamage[i]
      );
      if (availablePlayerCoords.length === 0) return;

      const aiTarget = availablePlayerCoords[Math.floor(Math.random() * availablePlayerCoords.length)];
      const aiHit = playerGrid[aiTarget] === 'ship';
      setPlayerDamage((prev) => {
        const updated = { ...prev, [aiTarget]: aiHit ? ('hit' as const) : ('miss' as const) };
        const totalPlayerLost = Object.values(updated).filter((v) => v === 'hit').length;
        if (totalPlayerLost >= playerShipIndices.length) {
          setStatusMsg('💀 FLEET LOST! Paper Admiral sunk your defensive flotilla.');
          setIsGameOver(true);
        }
        return updated;
      });
    }, 450);
  };

  const restartBattleship = () => {
    setRadarHits({});
    setPlayerDamage({});
    setIsGameOver(false);
    setStatusMsg('New radar duel initiated. Select coordinate to fire!');
  };

  return (
    <div className="battleship-container">
      <h2 className="handwritten" style={{ margin: 0, fontSize: '27px' }}>
        Notebook Battleship • Graph Paper Sea Warfare
      </h2>
      <p className="typewriter muted-copy" style={{ margin: '4px 0 10px' }}>
        Target coordinates on the 5x5 graph paper grid and sink the hidden Paper Fleet before they counter-attack!
      </p>

      <div className="game-controls typewriter">
        <button className="dark-control" type="button" onClick={restartBattleship}>
          <RotateCcw aria-hidden="true" /> Reset Naval Fleet
        </button>
      </div>

      <div className="typewriter game-turn">{statusMsg}</div>

      <div className="typewriter game-score">
        Enemy Ships Sunk: {enemyHitsCount} / {enemyShipIndices.length} | Fleet Health:{' '}
        {playerShipIndices.length - playerHitsCount} / {playerShipIndices.length}
      </div>

      <div className="battleship-grids">
        <div className="battleship-grid-card">
          <div className="battleship-grid-title">🎯 Enemy Radar Target</div>
          <div className="battleship-grid-board">
            {Array.from({ length: 25 }).map((_, idx) => {
              const state = radarHits[idx];
              let cellClass = 'battleship-cell';
              if (state === 'hit') cellClass += ' cell-hit';
              if (state === 'miss') cellClass += ' cell-miss';

              return (
                <button
                  key={idx}
                  type="button"
                  className={cellClass}
                  onClick={() => attackCoord(idx)}
                  disabled={isGameOver || !!state}
                >
                  {state === 'hit' && '💥'}
                  {state === 'miss' && '•'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="battleship-grid-card">
          <div className="battleship-grid-title">🛡️ Your Paper Defense Fleet</div>
          <div className="battleship-grid-board">
            {Array.from({ length: 25 }).map((_, idx) => {
              const hasShip = playerGrid[idx] === 'ship';
              const state = playerDamage[idx];
              let cellClass = 'battleship-cell';
              if (hasShip) cellClass += ' cell-ship';
              if (state === 'hit') cellClass += ' cell-hit';
              if (state === 'miss') cellClass += ' cell-miss';

              return (
                <div key={idx} className={cellClass}>
                  {state === 'hit' ? '💥' : state === 'miss' ? '•' : hasShip ? '🚢' : ''}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SnakeGame() {
  const [snake, setSnake] = useState<number[]>([45, 44, 43]);
  const [food, setFood] = useState<number>(50);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const GRID_SIZE = 14;

  const resetSnake = () => {
    setSnake([45, 44, 43]);
    setFood(Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead = head;

        if (direction === 'RIGHT') {
          if (head % GRID_SIZE === GRID_SIZE - 1) {
            setIsGameOver(true);
            return prevSnake;
          }
          newHead = head + 1;
        } else if (direction === 'LEFT') {
          if (head % GRID_SIZE === 0) {
            setIsGameOver(true);
            return prevSnake;
          }
          newHead = head - 1;
        } else if (direction === 'UP') {
          if (head < GRID_SIZE) {
            setIsGameOver(true);
            return prevSnake;
          }
          newHead = head - GRID_SIZE;
        } else if (direction === 'DOWN') {
          if (head >= GRID_SIZE * (GRID_SIZE - 1)) {
            setIsGameOver(true);
            return prevSnake;
          }
          newHead = head + GRID_SIZE;
        }

        if (prevSnake.includes(newHead)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead === food) {
          setScore((s) => {
            const next = s + 10;
            setBestScore((b) => Math.max(b, next));
            return next;
          });
          setFood(Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 160);

    return () => clearInterval(gameLoop);
  }, [direction, food, isGameOver, isRunning]);

  return (
    <div className="snake-container">
      <h2 className="handwritten" style={{ margin: 0, fontSize: '27px' }}>
        Pencil Snake Grid • Nibble the Eraser Crumbs
      </h2>
      <p className="typewriter muted-copy" style={{ margin: '4px 0 10px', textAlign: 'center' }}>
        Guide the penciled line snake along the notebook rules. Nibble eraser crumbs to extend your graphite stroke!
      </p>

      <div className="game-controls typewriter">
        <button className="dark-control" type="button" onClick={resetSnake}>
          <Play aria-hidden="true" /> {isRunning ? 'Restart Snake' : 'Start Game'}
        </button>
      </div>

      <div className="typewriter game-turn">
        {isGameOver ? '💀 Graphite snapped on the notebook edge!' : isRunning ? 'Crawling along the grid lines…' : 'Press Start Game to play!'}
      </div>

      <div className="typewriter game-score">
        Score: {score} | High Score: {bestScore}
      </div>

      <div className="snake-arena">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const isHead = snake[0] === idx;
          const isBody = snake.slice(1).includes(idx);
          const isFoodCell = food === idx;

          let cellClass = 'snake-cell';
          if (isHead) cellClass += ' snake-head';
          else if (isBody) cellClass += ' snake-body';
          else if (isFoodCell) cellClass += ' snake-food';

          return <div key={idx} className={cellClass} />;
        })}
      </div>

      <div className="snake-dpad">
        <div />
        <button type="button" onClick={() => direction !== 'DOWN' && setDirection('UP')}>
          ▲
        </button>
        <div />
        <button type="button" onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}>
          ◀
        </button>
        <button type="button" onClick={() => direction !== 'UP' && setDirection('DOWN')}>
          ▼
        </button>
        <button type="button" onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}>
          ▶
        </button>
      </div>
    </div>
  );
}

type VoxelBlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'leaves' | 'brick' | 'glass' | 'gold' | 'tnt';

interface VoxelData {
  type: VoxelBlockType;
  mesh: THREE.Mesh;
  edges: THREE.LineSegments;
  pos: [number, number, number];
}

const VOXEL_BLOCKS: Array<{
  id: VoxelBlockType;
  name: string;
  key: string;
  previewColor: string;
  topColor: number;
  sideColor: number;
  bottomColor: number;
  transparent?: boolean;
  opacity?: number;
}> = [
  { id: 'grass', name: 'Grass', key: '1', previewColor: '#4ade80', topColor: 0x56a644, sideColor: 0x866043, bottomColor: 0x866043 },
  { id: 'dirt', name: 'Dirt', key: '2', previewColor: '#92400e', topColor: 0x866043, sideColor: 0x866043, bottomColor: 0x866043 },
  { id: 'stone', name: 'Stone', key: '3', previewColor: '#64748b', topColor: 0x7b838a, sideColor: 0x7b838a, bottomColor: 0x7b838a },
  { id: 'wood', name: 'Oak Log', key: '4', previewColor: '#b45309', topColor: 0xc4975e, sideColor: 0x6b4423, bottomColor: 0xc4975e },
  { id: 'leaves', name: 'Leaves', key: '5', previewColor: '#16a34a', topColor: 0x3b8526, sideColor: 0x3b8526, bottomColor: 0x3b8526 },
  { id: 'brick', name: 'Brick', key: '6', previewColor: '#dc2626', topColor: 0x9b3b30, sideColor: 0x9b3b30, bottomColor: 0x9b3b30 },
  { id: 'glass', name: 'Glass', key: '7', previewColor: '#38bdf8', topColor: 0x7dd3fc, sideColor: 0x7dd3fc, bottomColor: 0x7dd3fc, transparent: true, opacity: 0.55 },
  { id: 'gold', name: 'Gold Ore', key: '8', previewColor: '#facc15', topColor: 0xfacc15, sideColor: 0x85734e, bottomColor: 0x85734e },
  { id: 'tnt', name: 'TNT', key: '9', previewColor: '#ef4444', topColor: 0xcc3333, sideColor: 0xd94436, bottomColor: 0xcc3333 },
];

function playVoxelSynth(type: 'dig' | 'place' | 'explode') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'dig') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'place') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.06);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'explode') {
      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, now);
      filter.frequency.linearRampToValueAtTime(60, now + 0.45);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    }
  } catch {
    // Audio context suppressed or blocked
  }
}

function MinecraftVoxelGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedBlock, setSelectedBlock] = useState<VoxelBlockType>('grass');
  const [mode, setMode] = useState<'mine' | 'place' | 'tnt'>('place');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [minedCount, setMinedCount] = useState(0);
  const [placedCount, setPlacedCount] = useState(0);
  const [blockCount, setBlockCount] = useState(0);

  const voxelsRef = useRef<Map<string, VoxelData>>(new Map());
  const sceneRef = useRef<THREE.Scene | null>(null);
  const worldGroupRef = useRef<THREE.Group | null>(null);
  const highlightMeshRef = useRef<THREE.LineSegments | null>(null);
  const particlesRef = useRef<Array<{ mesh: THREE.Mesh; vel: THREE.Vector3; life: number }>>([]);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const zoomControlRef = useRef<((delta: number, reset?: boolean) => void) | null>(null);

  // Voxel key helper
  const getKey = (x: number, y: number, z: number) => `${Math.round(x)},${Math.round(y)},${Math.round(z)}`;

  // Create voxel mesh
  const createVoxelMesh = useCallback((type: VoxelBlockType, x: number, y: number, z: number) => {
    const blockDef = VOXEL_BLOCKS.find((b) => b.id === type) || VOXEL_BLOCKS[0];
    const geom = new THREE.BoxGeometry(1, 1, 1);

    // Multi-face materials for voxel styling
    const materials = [
      new THREE.MeshLambertMaterial({ color: blockDef.sideColor, transparent: !!blockDef.transparent, opacity: blockDef.opacity ?? 1 }),
      new THREE.MeshLambertMaterial({ color: blockDef.sideColor, transparent: !!blockDef.transparent, opacity: blockDef.opacity ?? 1 }),
      new THREE.MeshLambertMaterial({ color: blockDef.topColor, transparent: !!blockDef.transparent, opacity: blockDef.opacity ?? 1 }),
      new THREE.MeshLambertMaterial({ color: blockDef.bottomColor, transparent: !!blockDef.transparent, opacity: blockDef.opacity ?? 1 }),
      new THREE.MeshLambertMaterial({ color: blockDef.sideColor, transparent: !!blockDef.transparent, opacity: blockDef.opacity ?? 1 }),
      new THREE.MeshLambertMaterial({ color: blockDef.sideColor, transparent: !!blockDef.transparent, opacity: blockDef.opacity ?? 1 }),
    ];

    const mesh = new THREE.Mesh(geom, materials);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { isVoxel: true, voxelType: type, voxelPos: [x, y, z] };

    // Black ink block edges
    const edgesGeom = new THREE.EdgesGeometry(geom);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x111827,
      transparent: true,
      opacity: 0.35,
    });
    const edges = new THREE.LineSegments(edgesGeom, edgesMat);
    mesh.add(edges);

    return { mesh, edges, type, pos: [x, y, z] as [number, number, number] };
  }, []);

  // Spawn break debris particles
  const spawnDebris = useCallback((x: number, y: number, z: number, color: number) => {
    if (!sceneRef.current) return;
    const count = 10;
    for (let i = 0; i < count; i++) {
      const pGeom = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const pMat = new THREE.MeshBasicMaterial({ color });
      const pMesh = new THREE.Mesh(pGeom, pMat);
      pMesh.position.set(
        x + (Math.random() - 0.5) * 0.6,
        y + (Math.random() - 0.5) * 0.6,
        z + (Math.random() - 0.5) * 0.6
      );
      sceneRef.current.add(pMesh);
      particlesRef.current.push({
        mesh: pMesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 4.5,
          Math.random() * 4 + 1.5,
          (Math.random() - 0.5) * 4.5
        ),
        life: 1.0,
      });
    }
  }, []);

  // Place block action
  const addBlock = useCallback((type: VoxelBlockType, x: number, y: number, z: number, playAudio = true) => {
    const key = getKey(x, y, z);
    if (voxelsRef.current.has(key)) return;
    if (!worldGroupRef.current) return;

    const voxel = createVoxelMesh(type, x, y, z);
    worldGroupRef.current.add(voxel.mesh);
    voxelsRef.current.set(key, voxel);
    setBlockCount(voxelsRef.current.size);

    if (playAudio) {
      playVoxelSynth('place');
      setPlacedCount((c) => c + 1);
    }
  }, [createVoxelMesh]);

  // Remove block action
  const removeBlock = useCallback((x: number, y: number, z: number, playAudio = true) => {
    const key = getKey(x, y, z);
    const voxel = voxelsRef.current.get(key);
    if (!voxel || !worldGroupRef.current || !sceneRef.current) return;

    const blockDef = VOXEL_BLOCKS.find((b) => b.id === voxel.type);
    spawnDebris(x, y, z, blockDef?.topColor ?? 0x55aa44);

    worldGroupRef.current.remove(voxel.mesh);
    voxel.mesh.geometry.dispose();
    if (Array.isArray(voxel.mesh.material)) {
      voxel.mesh.material.forEach((m) => m.dispose());
    } else {
      voxel.mesh.material.dispose();
    }
    voxelsRef.current.delete(key);
    setBlockCount(voxelsRef.current.size);

    if (playAudio) {
      playVoxelSynth('dig');
      setMinedCount((c) => c + 1);
    }
  }, [spawnDebris]);

  // Explode TNT action
  const explodeAt = useCallback((centerX: number, centerY: number, centerZ: number) => {
    playVoxelSynth('explode');
    const radius = 2.5;
    const toRemove: [number, number, number][] = [];

    voxelsRef.current.forEach((voxel) => {
      const [vx, vy, vz] = voxel.pos;
      const dist = Math.sqrt((vx - centerX) ** 2 + (vy - centerY) ** 2 + (vz - centerZ) ** 2);
      if (dist <= radius) {
        toRemove.push([vx, vy, vz]);
      }
    });

    toRemove.forEach(([rx, ry, rz]) => {
      removeBlock(rx, ry, rz, false);
    });

    // Big fiery flash explosion
    if (sceneRef.current) {
      for (let i = 0; i < 24; i++) {
        const pGeom = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const pMat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.4 ? 0xef4444 : 0xfacc15,
        });
        const pMesh = new THREE.Mesh(pGeom, pMat);
        pMesh.position.set(centerX, centerY, centerZ);
        sceneRef.current.add(pMesh);
        particlesRef.current.push({
          mesh: pMesh,
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 8,
            Math.random() * 6 + 2,
            (Math.random() - 0.5) * 8
          ),
          life: 1.2,
        });
      }
    }
  }, [removeBlock]);

  // Clear all voxels
  const clearWorld = useCallback(() => {
    if (!worldGroupRef.current) return;
    voxelsRef.current.forEach((voxel) => {
      worldGroupRef.current?.remove(voxel.mesh);
      voxel.mesh.geometry.dispose();
    });
    voxelsRef.current.clear();
    setBlockCount(0);
  }, []);

  // Plant a tree preset
  const plantTree = useCallback((baseX: number, baseY: number, baseZ: number) => {
    // Trunk
    for (let dy = 0; dy < 4; dy++) {
      addBlock('wood', baseX, baseY + dy, baseZ, false);
    }
    // Leaves crown
    for (let lx = -2; lx <= 2; lx++) {
      for (let lz = -2; lz <= 2; lz++) {
        for (let ly = 2; ly <= 4; ly++) {
          if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && ly === 4) continue;
          if (lx === 0 && lz === 0 && ly <= 3) continue;
          addBlock('leaves', baseX + lx, baseY + ly, baseZ + lz, false);
        }
      }
    }
    addBlock('leaves', baseX, baseY + 5, baseZ, false);
  }, [addBlock]);

  // Generate Default Island
  const generateIsland = useCallback(() => {
    clearWorld();
    const size = 10;
    const half = Math.floor(size / 2);

    for (let x = -half; x <= half; x++) {
      for (let z = -half; z <= half; z++) {
        const distFromCenter = Math.sqrt(x * x + z * z);
        if (distFromCenter > half + 0.5) continue;

        // Elevation formula
        let height = Math.floor(Math.sin(x * 0.4) * Math.cos(z * 0.4) * 1.5 + 1.2);
        if (x === 0 && z === 0) height = 0; // Mini center pond

        // Stone bedrock layer
        addBlock('stone', x, -2, z, false);
        addBlock('stone', x, -1, z, false);

        // Dirt layers
        for (let y = 0; y < height; y++) {
          addBlock('dirt', x, y, z, false);
        }

        // Top layer (Grass or Gold ore secret)
        if (x === 2 && z === -2) {
          addBlock('gold', x, height, z, false);
        } else {
          addBlock('grass', x, height, z, false);
        }
      }
    }

    // Plant an oak tree on the island hill
    plantTree(2, 3, 2);

    // Brick campfire / structure corner
    addBlock('brick', -2, 2, -2, false);
    addBlock('brick', -2, 3, -2, false);
    addBlock('tnt', -3, 2, 2, false);
  }, [clearWorld, addBlock, plantTree]);

  // Generate Flat World
  const generateFlat = useCallback(() => {
    clearWorld();
    for (let x = -4; x <= 4; x++) {
      for (let z = -4; z <= 4; z++) {
        addBlock('stone', x, -1, z, false);
        addBlock('grass', x, 0, z, false);
      }
    }
  }, [clearWorld, addBlock]);

  // Main Three.js setup effect
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || (isFullscreen ? window.innerWidth : 600);
    let height = container.clientHeight || (isFullscreen ? window.innerHeight : 420);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 14, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.75);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfffaed, 0.95);
    dirLight.position.set(18, 26, 12);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // World group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);
    worldGroupRef.current = worldGroup;

    // Highlight wireframe box
    const highlightGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.02, 1.02, 1.02));
    const highlightMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const highlightMesh = new THREE.LineSegments(highlightGeom, highlightMat);
    highlightMesh.visible = false;
    scene.add(highlightMesh);
    highlightMeshRef.current = highlightMesh;

    // Grid Floor
    const grid = new THREE.GridHelper(24, 24, 0x000000, 0x000000);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.12;
    grid.position.y = -2.51;
    scene.add(grid);

    // Orbit Camera spherical state
    const target = new THREE.Vector3(0, 1.5, 0);
    let radius = 22;
    let theta = Math.PI / 4;
    let phi = Math.PI / 3.2;

    const updateCamera = () => {
      phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, phi));
      radius = Math.max(5, Math.min(48, radius));
      camera.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = target.y + radius * Math.cos(phi);
      camera.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(target);
    };
    updateCamera();

    // Hook zoom controls
    zoomControlRef.current = (delta: number, reset?: boolean) => {
      if (reset) {
        radius = 22;
      } else {
        radius += delta;
      }
      updateCamera();
    };

    // Mouse / Touch interaction handlers
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let hasMoved = false;

    const getRaycastHits = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const voxelMeshes: THREE.Mesh[] = [];
      voxelsRef.current.forEach((v) => voxelMeshes.push(v.mesh));
      return raycaster.intersectObjects(voxelMeshes, false);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      hasMoved = false;
      dragStart = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          hasMoved = true;
          theta -= dx * 0.007;
          phi -= dy * 0.007;
          updateCamera();
          dragStart = { x: e.clientX, y: e.clientY };
        }
      }

      // Hover Raycast for block highlight
      const hits = getRaycastHits(e.clientX, e.clientY);
      const hit = hits[0];
      if (hit && hit.face) {
        const hitMesh = hit.object as THREE.Mesh;
        const [hx, hy, hz] = hitMesh.userData.voxelPos as [number, number, number];

        if (mode === 'mine' || mode === 'tnt') {
          highlightMesh.position.set(hx, hy, hz);
          highlightMat.color.setHex(mode === 'tnt' ? 0xef4444 : 0xf87171);
          highlightMesh.visible = true;
        } else {
          const norm = hit.face.normal;
          highlightMesh.position.set(hx + norm.x, hy + norm.y, hz + norm.z);
          highlightMat.color.setHex(0x38bdf8);
          highlightMesh.visible = true;
        }
      } else {
        highlightMesh.visible = false;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!hasMoved) {
        // Registered a clean block click
        const hits = getRaycastHits(e.clientX, e.clientY);
        const hit = hits[0];
        if (hit && hit.face) {
          const hitMesh = hit.object as THREE.Mesh;
          const [hx, hy, hz] = hitMesh.userData.voxelPos as [number, number, number];
          const isRightClick = e.button === 2 || e.shiftKey;

          if (mode === 'tnt' || hitMesh.userData.voxelType === 'tnt') {
            explodeAt(hx, hy, hz);
          } else if (mode === 'mine' || isRightClick) {
            removeBlock(hx, hy, hz);
          } else {
            const norm = hit.face.normal;
            addBlock(selectedBlock, hx + norm.x, hy + norm.y, hz + norm.z);
          }
        }
      }
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      radius += e.deltaY * 0.02;
      updateCamera();
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());

    // Generate initial terrain
    generateIsland();

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vel.y -= 9.8 * delta;
        p.mesh.position.addScaledVector(p.vel, delta);
        p.life -= delta * 1.5;
        p.mesh.scale.setScalar(Math.max(0.01, p.life));
        if (p.life <= 0) {
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          particlesRef.current.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      width = isFullscreen ? window.innerWidth : container.clientWidth;
      height = isFullscreen ? window.innerHeight : container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [addBlock, removeBlock, explodeAt, generateIsland, mode, selectedBlock, isFullscreen]);

  // Keybindings 1-9 and Escape for Fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        return;
      }
      const block = VOXEL_BLOCKS.find((b) => b.key === e.key);
      if (block) {
        setSelectedBlock(block.id);
        setMode('place');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Lock body scroll when in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Update sky / lighting based on time of day
  useEffect(() => {
    if (hemiLightRef.current && dirLightRef.current) {
      if (timeOfDay === 'day') {
        hemiLightRef.current.color.setHex(0xffffff);
        hemiLightRef.current.intensity = 0.75;
        dirLightRef.current.color.setHex(0xfffaed);
        dirLightRef.current.intensity = 0.95;
      } else if (timeOfDay === 'sunset') {
        hemiLightRef.current.color.setHex(0xfb923c);
        hemiLightRef.current.intensity = 0.65;
        dirLightRef.current.color.setHex(0xf97316);
        dirLightRef.current.intensity = 0.85;
      } else {
        hemiLightRef.current.color.setHex(0x38bdf8);
        hemiLightRef.current.intensity = 0.35;
        dirLightRef.current.color.setHex(0x818cf8);
        dirLightRef.current.intensity = 0.45;
      }
    }
  }, [timeOfDay]);

  const arenaContent = (
    <div className={`voxel-arena-wrapper time-${timeOfDay}${isFullscreen ? ' voxel-arena-fullscreen' : ''}`}>
      <div ref={mountRef} className="voxel-canvas-mount" />
      <div className="voxel-crosshair" aria-hidden="true" />

      {/* Exit fullscreen floating button */}
      {isFullscreen && (
        <button
          type="button"
          className="voxel-exit-fullscreen typewriter"
          onClick={() => setIsFullscreen(false)}
        >
          <Minimize2 style={{ width: 14, height: 14 }} /> Exit Fullscreen (Esc)
        </button>
      )}

      <div className="voxel-hud-top">
        <div className="voxel-hud-pill">
          🎮 Drag: Orbit • Wheel/Pinch: Zoom • Click: {mode === 'mine' ? 'Mine' : mode === 'tnt' ? 'Detonate' : 'Place'} • Keys 1-9
        </div>
        <div className="voxel-hud-actions">
          <button
            type="button"
            className="voxel-zoom-btn"
            onClick={() => zoomControlRef.current?.(-3)}
            title="Zoom In"
          >
            <ZoomIn style={{ width: 13, height: 13 }} />
          </button>
          <button
            type="button"
            className="voxel-zoom-btn"
            onClick={() => zoomControlRef.current?.(3)}
            title="Zoom Out"
          >
            <ZoomOut style={{ width: 13, height: 13 }} />
          </button>
          <button
            type="button"
            className="voxel-zoom-btn"
            onClick={() => setIsFullscreen((f) => !f)}
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen Mode'}
          >
            {isFullscreen ? <Minimize2 style={{ width: 13, height: 13 }} /> : <Maximize2 style={{ width: 13, height: 13 }} />}
          </button>
        </div>
      </div>

      {/* Bottom Control Dock: Always visible in normal & fullscreen */}
      <div className="voxel-bottom-dock">
        {/* Action Tools Row */}
        <div className="voxel-toolbar-dock typewriter">
          <button
            type="button"
            className={`voxel-dock-btn${mode === 'place' ? ' active' : ''}`}
            onClick={() => setMode('place')}
          >
            <Box aria-hidden="true" style={{ width: 12, height: 12 }} /> Build (Place)
          </button>
          <button
            type="button"
            className={`voxel-dock-btn${mode === 'mine' ? ' active' : ''}`}
            onClick={() => setMode('mine')}
          >
            <Hammer aria-hidden="true" style={{ width: 12, height: 12 }} /> Mine (Break)
          </button>
          <button
            type="button"
            className={`voxel-dock-btn${mode === 'tnt' ? ' active' : ''}`}
            onClick={() => setMode('tnt')}
          >
            <Flame aria-hidden="true" style={{ width: 12, height: 12 }} /> Detonate TNT
          </button>
          <button
            type="button"
            className="voxel-dock-btn"
            onClick={() => plantTree(Math.floor(Math.random() * 4 - 2), 2, Math.floor(Math.random() * 4 - 2))}
          >
            🌳 Plant Tree
          </button>
          <button
            type="button"
            className="voxel-dock-btn"
            onClick={() => setTimeOfDay((t) => (t === 'day' ? 'sunset' : t === 'sunset' ? 'night' : 'day'))}
          >
            {timeOfDay === 'day' ? '☀️ Day' : timeOfDay === 'sunset' ? '🌅 Sunset' : '🌙 Night'}
          </button>
          <button
            type="button"
            className="voxel-dock-btn"
            onClick={generateIsland}
          >
            <RotateCcw aria-hidden="true" style={{ width: 12, height: 12 }} /> Reset Island
          </button>
          <button
            type="button"
            className="voxel-dock-btn"
            onClick={generateFlat}
          >
            🧹 Flat World
          </button>
        </div>

        {/* 9-Slot Minecraft Hotbar */}
        <div className="voxel-hotbar">
          {VOXEL_BLOCKS.map((block) => (
            <button
              key={block.id}
              type="button"
              className={`voxel-hotbar-slot${selectedBlock === block.id && mode === 'place' ? ' selected' : ''}`}
              onClick={() => {
                setSelectedBlock(block.id);
                setMode('place');
              }}
              title={`${block.name} (Key ${block.key})`}
            >
              <div className="voxel-block-preview" style={{ backgroundColor: block.previewColor }} />
              <span className="voxel-slot-key">{block.key}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="voxel-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 className="handwritten" style={{ margin: 0, fontSize: '27px' }}>
            Notebook VoxelCraft 3D • Graph Paper Sandbox
          </h2>
          <p className="typewriter muted-copy" style={{ margin: '4px 0 8px' }}>
            Mine, build, place blocks &amp; detonate TNT in a real-time 3D voxel sandbox scribbled onto your notebook!
          </p>
        </div>
        <div className="typewriter game-score" style={{ margin: 0, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Mined: {minedCount} | Placed: {placedCount} | Blocks: {blockCount}</span>
          <button
            type="button"
            className="voxel-zoom-btn"
            style={{ width: 'auto', padding: '2px 8px', fontSize: '11px' }}
            onClick={() => setIsFullscreen((f) => !f)}
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen View (Scroll to Zoom freely)'}
          >
            {isFullscreen ? <Minimize2 style={{ width: 12, height: 12 }} /> : <Maximize2 style={{ width: 12, height: 12 }} />}
            <span style={{ marginLeft: 4 }}>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {isFullscreen ? (
        <>
          <div className="voxel-arena-placeholder typewriter">
            🎮 Playing in Fullscreen Mode • Press [Esc] or click Exit Fullscreen in top right.
          </div>
          {createPortal(arenaContent, document.body)}
        </>
      ) : (
        arenaContent
      )}
    </div>
  );
}

function TicTacToeGame() {
  const [board, setBoard] = useState<TicTacToeMark[]>(Array(9).fill(null));
  const [aiThinking, setAiThinking] = useState(false);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0, ties: 0 });

  function checkGameStatus(nextBoard: TicTacToeMark[]) {
    const winInfo = getTicTacToeWinner(nextBoard);
    if (winInfo) {
      setWinningLine(winInfo.line);
      setRoundResult(`${winInfo.winner === 'X' ? 'You win' : 'Paper AI wins'}!`);
      setScore((prev) => ({
        ...prev,
        [winInfo.winner!]: prev[winInfo.winner!] + 1,
      }));
      setAiThinking(false);
      return true;
    }
    if (isTicTacToeTie(nextBoard)) {
      setWinningLine(null);
      setRoundResult('A tidy little tie.');
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
      setAiThinking(false);
      return true;
    }
    return false;
  }

  function markSquare(index: number) {
    if (aiThinking || roundResult || board[index] !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = 'X';
    setBoard(nextBoard);

    const isFinished = checkGameStatus(nextBoard);
    if (!isFinished) {
      setAiThinking(true);
    }
  }

  useEffect(() => {
    if (!aiThinking || roundResult) return;

    const aiTimer = window.setTimeout(() => {
      setBoard((currentBoard) => {
        const move = findPaperAiMove(currentBoard);
        if (move === -1) {
          setAiThinking(false);
          return currentBoard;
        }

        const nextBoard = [...currentBoard];
        nextBoard[move] = 'O';
        checkGameStatus(nextBoard);
        setAiThinking(false);
        return nextBoard;
      });
    }, 450);

    return () => window.clearTimeout(aiTimer);
  }, [aiThinking, roundResult]);

  function eraseBoard() {
    setBoard(Array(9).fill(null));
    setAiThinking(false);
    setRoundResult(null);
    setWinningLine(null);
  }

  return (
    <>
      <h2 className="handwritten">Ink Duel • Tic-Tac-Toe (X&apos;s &amp; O&apos;s)</h2>
      <p className="typewriter muted-copy">Blue Ballpoint vs Crimson Pencil margin classic.</p>
      <div className="game-controls typewriter">
        <button className="dark-control" type="button" disabled>
          <Cpu aria-hidden="true" /> VS Paper AI
        </button>
        <motion.button
          type="button"
          onClick={eraseBoard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Eraser aria-hidden="true" /> Erase Board
        </motion.button>
      </div>
      <div className="typewriter game-turn" style={{ minHeight: '20px' }}>
        {roundResult ?? (aiThinking ? 'Paper AI is thinking…' : 'Your turn (Player X)!')}
      </div>
      <div className="typewriter game-score">
        X Wins: {score.X} | O Wins: {score.O} | Ties: {score.ties}
      </div>
      <div className="tic-tac-toe">
        {board.map((mark, index) => {
          const isWinningSquare = winningLine?.includes(index);
          return (
            <button
              key={index}
              type="button"
              className={`tic-tac-toe-square${isWinningSquare ? ' winning-square' : ''}`}
              onClick={() => markSquare(index)}
              disabled={aiThinking || roundResult !== null || mark !== null}
              aria-label={`Square ${index + 1}`}
            >
              <AnimatePresence mode="wait">
                {mark && (
                  <motion.span
                    key={mark}
                    className={mark === 'O' ? 'red-mark' : ''}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                  >
                    {mark}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
      <div className="typewriter board-tip">
        X: Ballpoint Ink • O: Red Pencil Sketch — Tip: The paper AI never sleeps in math class.
      </div>
    </>
  );
}

function GamesPage() {
  const [activeGameTab, setActiveGameTab] = useState<'tictactoe' | 'hangman' | 'paperball' | 'battleship' | 'snake' | 'minecraft'>('tictactoe');

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const scrollToArcade = (tabKey: 'tictactoe' | 'hangman' | 'paperball' | 'battleship' | 'snake' | 'minecraft') => {
    setActiveGameTab(tabKey);
    const elem = document.getElementById('arcade-arena');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <SiteFrame page="games">
      <div className="games-content">
        <motion.header
          className="page-intro home-hero"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ gridTemplateColumns: '1fr', minHeight: 'auto', paddingTop: 0 }}
        >
          <ThreeBackgroundScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.p className="eyebrow typewriter" variants={heroItemVariants}>
              • Page 12 • Arcade Edition
            </motion.p>
            <motion.div
              className="yellow-sticker typewriter"
              variants={heroItemVariants}
              whileHover={{ scale: 1.04, rotate: -1 }}
            >
              Study Break • Period 4 Free Time
            </motion.div>
            <h1 className="page-title handwritten" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {['Doodle', 'Arcade', '&', 'Playground'].map((word, i) => (
                <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '120%', opacity: 0, rotate: i % 2 === 0 ? 3 : -3 }}
                    animate={{ y: '0%', opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' as const }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 4, duration: 1.2 }}
                style={{ display: 'inline-flex' }}
              >
                <Pencil aria-hidden="true" />
              </motion.span>
            </h1>
            <motion.p className="page-description" variants={heroItemVariants}>
              Handcrafted notebook mini-games scribbled during study hall. Grab your pen, choose any game, and play directly on the graph paper with full real-time interactive physics!
            </motion.p>
            <motion.div className="mobile-notice-banner typewriter" variants={heroItemVariants}>
              <Smartphone aria-hidden="true" />
              <span>
                <strong>Desk Note:</strong> Best experienced on desktop / laptop screens. Touch gestures and mobile layouts for arcade games are still being tuned and don&apos;t work properly on mobile devices yet.
              </span>
            </motion.div>
          </div>
        </motion.header>

        <div className="game-tabs typewriter" id="arcade-arena">
          <button
            type="button"
            className={`game-tab-btn${activeGameTab === 'tictactoe' ? ' selected' : ''}`}
            onClick={() => setActiveGameTab('tictactoe')}
          >
            <Pencil aria-hidden="true" style={{ width: 14, height: 14 }} /> 1. Tic-Tac-Toe Ink
          </button>
          <button
            type="button"
            className={`game-tab-btn${activeGameTab === 'hangman' ? ' selected' : ''}`}
            onClick={() => setActiveGameTab('hangman')}
          >
            <HelpCircle aria-hidden="true" style={{ width: 14, height: 14 }} /> 2. Hangman Doodle Word
          </button>
          <button
            type="button"
            className={`game-tab-btn${activeGameTab === 'paperball' ? ' selected' : ''}`}
            onClick={() => setActiveGameTab('paperball')}
          >
            <Target aria-hidden="true" style={{ width: 14, height: 14 }} /> 3. Physics Paper Ball
          </button>
          <button
            type="button"
            className={`game-tab-btn${activeGameTab === 'battleship' ? ' selected' : ''}`}
            onClick={() => setActiveGameTab('battleship')}
          >
            <Ship aria-hidden="true" style={{ width: 14, height: 14 }} /> 4. Notebook Battleship
          </button>
          <button
            type="button"
            className={`game-tab-btn${activeGameTab === 'snake' ? ' selected' : ''}`}
            onClick={() => setActiveGameTab('snake')}
          >
            <Gamepad2 aria-hidden="true" style={{ width: 14, height: 14 }} /> 5. Pencil Snake Grid
          </button>
          <button
            type="button"
            className={`game-tab-btn${activeGameTab === 'minecraft' ? ' selected' : ''}`}
            onClick={() => setActiveGameTab('minecraft')}
          >
            <Box aria-hidden="true" style={{ width: 14, height: 14 }} /> 6. VoxelCraft 3D
          </button>
        </div>

        <div className="games-layout">
          <div className="game-board-card ink-border shadow-note" style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGameTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {activeGameTab === 'tictactoe' && <TicTacToeGame />}
                {activeGameTab === 'hangman' && <HangmanGame />}
                {activeGameTab === 'paperball' && <PaperBallGame />}
                {activeGameTab === 'battleship' && <BattleshipGame />}
                {activeGameTab === 'snake' && <SnakeGame />}
                {activeGameTab === 'minecraft' && <MinecraftVoxelGame />}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="game-aside" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DoodlePadWidget />
            <PencilSharpenerWidget />
            <Interactive3DBox className="game-note peach-note ink-border shadow-note" maxTilt={8} depth={16}>
              <div className="typewriter note-kicker">Quick Memo</div>
              <p className="handwritten">
                Remember to close the notebook before Teacher Davies walks down row 3! Keep margins clean for algebra notes.
              </p>
            </Interactive3DBox>
          </aside>
        </div>

        <section className="draft-section">
          <p className="section-kicker typewriter">
            <Pencil aria-hidden="true" /> Playable Notebook Arcades • Click To Launch Game
          </p>
          <h2 className="home-section-title handwritten">All Games Now Fully Playable</h2>
          <div className="draft-grid">
            {[
              {
                id: 'minecraft' as const,
                title: 'Notebook VoxelCraft 3D',
                kicker: '3D Voxel Sandbox Island',
                copy: 'Mine, place blocks, plant trees, and detonate TNT on a real-time 3D Minecraft-like voxel canvas with full orbital camera controls.',
                badge: 'Playable Now',
                footer: 'Three.js Voxel Engine',
              },
              {
                id: 'battleship' as const,
                title: 'Notebook Battleship',
                kicker: 'Grid Coordinates: A1 to E5',
                copy: 'Graph paper sea warfare — call out radar coordinates and sink the enemy paper flotilla before the bell rings.',
                badge: 'Playable Now',
                footer: '5x5 Radar Grid',
              },
              {
                id: 'hangman' as const,
                title: 'Hangman Doodle Word',
                kicker: 'Vocabulary test survival',
                copy: 'Guess vocabulary words one letter at a time. Each wrong guess adds a stroke to the doodled stick figure.',
                badge: 'Playable Now',
                footer: 'Study Hall Vocab',
              },
              {
                id: 'paperball' as const,
                title: 'Physics Paper Ball',
                kicker: 'Crumpled Paper Toss',
                copy: 'Aim your flick shot into the recycling bin across the room. Wind from the open window changes the trajectory.',
                badge: 'Playable Now',
                footer: 'Ballistic Physics',
              },
            ].map(({ id, title, kicker, copy, badge, footer }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' as const }}
                style={{ height: '100%' }}
              >
                <Interactive3DBox
                  className="draft-card ink-border shadow-note"
                  maxTilt={10}
                  depth={20}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <span className="draft-badge typewriter">{badge}</span>
                    <h3 className="handwritten">{title}</h3>
                    <p className="typewriter draft-kicker">{kicker}</p>
                    <p>{copy}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="play-draft-btn"
                      onClick={() => scrollToArcade(id)}
                    >
                      <Play aria-hidden="true" style={{ width: 12, height: 12 }} /> Play {title.split(' ')[1] || 'Game'}
                    </button>
                    <div className="typewriter draft-footer" style={{ marginTop: '8px' }}>
                      <Check aria-hidden="true" style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} /> {footer}
                    </div>
                  </div>
                </Interactive3DBox>
              </motion.div>
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
    <Interactive3DBox
      className={`reading-card ink-border shadow-note${cover === 'black-cover' ? ' black-beauty-card' : ''}`}
      maxTilt={12}
      depth={24}
    >
      <p className="typewriter reading-kicker">{kicker}</p>
      <div className="book-details" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        <motion.div
          className={`book-cover ${cover}`}
          whileHover={{ scale: 1.08, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <img src={coverSrc} alt={`Cover of ${title}`} />
        </motion.div>
        <div className="book-info">
          <h3 className="handwritten">{title}</h3>
          <p className="typewriter">by {author}</p>
          <div className="progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <small className="typewriter">{progressLabel}</small>
        </div>
      </div>
      <div className="book-note handwritten" style={{ transform: 'translateZ(22px)' }}>
        {note}
      </div>
    </Interactive3DBox>
  );
}

function BookshelfPage() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(15 * 60);
  const bookCoverBase = `${import.meta.env.BASE_URL}images/`;

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

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
        <motion.header
          className="bookshelf-intro home-hero"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ gridTemplateColumns: 'minmax(0, 1fr) 280px', minHeight: 'auto', paddingTop: 0 }}
        >
          <ThreeBackgroundScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.p className="eyebrow typewriter" variants={heroItemVariants}>
              • Page 38 • Study Hall Reading Nook
            </motion.p>
            <h1 className="page-title handwritten bookshelf-title" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {["Books", "I'm", 'Reading', '&', 'Studying'].map((word, i) => (
                <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '120%', opacity: 0, rotate: i % 2 === 0 ? 3 : -3 }}
                    animate={{ y: '0%', opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' as const }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 5, duration: 1.2 }}
                style={{ display: 'inline-flex' }}
              >
                <BookOpen aria-hidden="true" />
              </motion.span>
            </h1>
            <motion.p className="hero-description" variants={heroItemVariants} style={{ margin: '12px 0 0' }}>
              Curated readings on cognitive psychology, typography, interaction systems, and stories that spark imagination.
            </motion.p>
            <motion.div className="mobile-notice-banner typewriter" variants={heroItemVariants}>
              <Smartphone aria-hidden="true" />
              <span>
                <strong>Desk Note:</strong> The 3D interactive bookshelf layout is best viewed on desktop. A dedicated mobile reading layout is still under development and doesn&apos;t display properly on mobile screens yet.
              </span>
            </motion.div>
          </div>
          <Interactive3DBox className="desk-stats dashed-ink typewriter" maxTilt={8} depth={16}>
            <strong>Desk Stats // 2024</strong>
            <ul>
              <li>Total Books Read: 14 vols</li>
              <li>Current Pace: 34 pgs / night</li>
              <li>Favorite Realm: Magic Realism &amp; HCI</li>
              <li>Bookmarks In Play: 12 dog-eared</li>
            </ul>
            <span>Updated: Oct 28 • Status: On Track</span>
          </Interactive3DBox>
        </motion.header>

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
            {finishedBooks.map(([title, copy, meta], idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' as const }}
                style={{ height: '100%' }}
              >
                <Interactive3DBox
                  className="finished-card ink-border shadow-note"
                  maxTilt={10}
                  depth={20}
                  style={{ height: '100%' }}
                >
                  <div className="stars" aria-label="5 stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} />
                    ))}
                  </div>
                  <h3 className="handwritten">{title}</h3>
                  <p>{copy}</p>
                  <span className="typewriter">{meta}</span>
                </Interactive3DBox>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="shelf-tools">
          <Interactive3DBox className="to-read ink-border shadow-note" maxTilt={8} depth={16}>
            <div className="typewriter tools-kicker">
              <BookOpen aria-hidden="true" /> Shelf • The To-Read Stack (Drafting Shelf)
            </div>
            <ul>
              {['Diary of a Wimpy Kid', 'Sprint', 'The Shape of Design', 'Gödel, Escher, Bach', 'Invisible Cities'].map(
                (book) => (
                  <li className="handwritten" key={book}>
                    <input type="checkbox" /> {book}
                  </li>
                )
              )}
            </ul>
          </Interactive3DBox>
          <div className="study-tools" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Interactive3DBox className="sprint-card ink-border shadow-note" maxTilt={10} depth={18}>
              <div className="typewriter tools-kicker">
                <Timer aria-hidden="true" /> Study Sprint
              </div>
              <div className="timer handwritten">{timerLabel}</div>
              <p className="typewriter">Study Hall Countdown</p>
              <motion.button
                type="button"
                onClick={() => setRunning((value) => !value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
              >
                <Play aria-hidden="true" /> {running ? 'Pause Pencil Sprint' : 'Start Pencil Sprint'}
              </motion.button>
            </Interactive3DBox>
            <Interactive3DBox className="quote-card shadow-note" maxTilt={8} depth={16}>
              <Quote aria-hidden="true" />
              <p className="handwritten">
                “It is our choices, Harry, that show what we truly are, far more than our abilities.”
              </p>
              <span className="typewriter">— Albus Dumbledore</span>
            </Interactive3DBox>
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
          <Interactive3DBox className="current-school ink-border shadow-note" maxTilt={8} depth={18}>
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
          </Interactive3DBox>
          <div>
            <p className="previous-title typewriter" style={{ margin: '14px 0 8px' }}>Previous Foundations</p>
            <div className="previous-grid">
              {[
                ['Playpen School', 'Local Foundation', 'Grades 4–5'],
                ['Al-Hidaayah', 'Islamic Studies', 'Grade 3'],
                ['CIDER', 'Inclusive Ed.', 'Kindergarten – Grade 2'],
                ['Bangladesh Elementary', 'National Curriculum', 'Playgroup'],
              ].map(([name, kind, stage], idx) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                >
                  <Interactive3DBox className="previous-card ink-border shadow-note" maxTilt={10} depth={16}>
                    <h4 className="handwritten">{name}</h4>
                    <p className="typewriter">{kind}</p>
                    <p className="typewriter">{stage}</p>
                  </Interactive3DBox>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <Interactive3DBox className="milestone ink-border shadow-note" maxTilt={8} depth={18}>
          <p className="milestone-kicker typewriter">Milestone • Secondary Target</p>
          <h3 className="handwritten">Approaching O-Levels</h3>
          <p className="milestone-target typewriter">Target: Cambridge IGCSE / O-Levels</p>
          <p className="milestone-copy">
            Started with HTML on a borrowed laptop, then Pascal, then C — each one felt like a secret handshake with the machine. The graph paper and physics notebooks came right after.
          </p>
          <div className="milestone-note handwritten">&quot;Pencils, graph papers, and physics notebooks.&quot;</div>
        </Interactive3DBox>
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
    {
      title: 'Cool Bababoey UI/UX Design',
      status: 'Completed & Certified Pro',
      copy: 'Hundreds of hours sketching wireframes, breaking grids, and rebuilding them until the affordances felt obvious. The certificate is just paper; the muscle memory is the real diploma.',
      tags: ['rectangle pusher', 'figma auto-layout sorcery', 'vibes & affordances', 'certified pixel perfectionist'],
      source: 'Curated through: Refactoring UI, Nielsen Norman, 3am Reddit rabbit holes • Self-Guided',
    },
    {
      title: 'Ilm Enslavement',
      status: 'Ongoing',
      copy: 'AI-assisted coding adventures — where the GPU fan screams, the model apologizes, and the div still won’t center. A loving, slightly unhinged partnership with the machine.',
      tags: ['gpu fan screaming', 'emotional manipulation (prompts)', 'apology accepted now fix the div', 'vibe coder supreme', 'jailbreak engineer'],
      source: 'Source: ChatGPT apology logs, 4am stackoverflow hallucinations • Ongoing',
    },
  ];
  return (
    <section className="specializations">
      <div className="section-label typewriter">Section B // Self-Taught Curriculum &amp; Specializations</div>
      <div className="specialization-grid">
        {cards.map(({ title, status, copy, tags, source }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
          >
            <Interactive3DBox className="specialization-card ink-border shadow-note" maxTilt={8} depth={18}>
              <div className="card-heading">
                <h3 className="card-title handwritten">{title}</h3>
                <span className="small-label status-certified ink-border typewriter">{status}</span>
              </div>
              <p className="specialization-copy">{copy}</p>
              <div className="skill-row">
                {tags.map((tag) => (
                  <span className="skill typewriter" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="source-line typewriter">{source}</div>
            </Interactive3DBox>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EducationPage() {
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <SiteFrame page="education">
      <div className="page-content">
        <motion.header
          className="intro home-hero"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ gridTemplateColumns: 'minmax(0, 1fr) auto', minHeight: 'auto', paddingTop: 0 }}
        >
          <ThreeBackgroundScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.p className="eyebrow typewriter" variants={heroItemVariants}>
              • Page 04 • Academic &amp; Self-Directed
            </motion.p>
            <h1 className="intro-title handwritten" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {['Education', '&', 'Learning', 'Log'].map((word, i) => (
                <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '120%', opacity: 0, rotate: i % 2 === 0 ? 3 : -3 }}
                    animate={{ y: '0%', opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' as const }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <motion.span
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 4, duration: 1.2 }}
                style={{ display: 'inline-flex' }}
              >
                <GraduationCap aria-hidden="true" />
              </motion.span>
            </h1>
            <motion.p className="intro-copy" variants={heroItemVariants}>
              honestly, nothing beats an obsession with curiosity — chasing the next thing that makes the brain itch until it&apos;s scratched.
            </motion.p>
          </div>
          <div className="intro-tags typewriter" style={{ position: 'relative', zIndex: 1 }}>
            <motion.span className="tag tag-yellow ink-border" whileHover={{ scale: 1.05 }}>
              Major Path: CS &amp; Interaction
            </motion.span>
            <motion.span className="tag tag-peach ink-border" whileHover={{ scale: 1.05 }}>
              Focus: Interactive Systems
            </motion.span>
            <motion.span className="tag tag-green ink-border" whileHover={{ scale: 1.05 }}>
              Self-Taught: Countless hrs
            </motion.span>
          </div>
        </motion.header>
        <FormalFoundations />
        <Specializations />
        <Interactive3DBox className="always-learning ink-border shadow-note" maxTilt={6} depth={16}>
          <div className="learning-heading typewriter">
            <Pencil aria-hidden="true" />
            <span>Always Learning</span>
          </div>
          <p className="learning-quote handwritten">
            &quot;Always learning, sketching, and breaking production to see how it works.&quot;
          </p>
          <p className="learning-detail typewriter">Currently reading: Meme design papers &amp; WebGL shaders at 3am.</p>
          <p className="learning-signature handwritten">— Tanshir Al Musnad (TAM)</p>
        </Interactive3DBox>
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