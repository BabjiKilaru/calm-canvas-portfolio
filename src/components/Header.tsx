import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Home,
  User,
  Wrench,
  Briefcase,
  GraduationCap,
  Folder,
  FileText,
  Phone,
} from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type NavItem = {
  id: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAVBAR_HEIGHT = 88;

const navItems: NavItem[] = [
  { id: 'about', label: 'About', Icon: User },
  { id: 'skills', label: 'Skills', Icon: Wrench },
  { id: 'experience', label: 'Experience', Icon: Briefcase },
  { id: 'education', label: 'Education', Icon: GraduationCap },
  { id: 'projects', label: 'Projects', Icon: Folder },
  { id: 'resume', label: 'Resume', Icon: FileText },
  { id: 'contact', label: 'Contact', Icon: Phone },
];

const Header = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string>('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observedIds = useMemo(() => ['home', ...navItems.map((item) => item.id)], []);

  useEffect(() => {
    const handleHash = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash) setActiveId(currentHash);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) setActiveId(id);
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: `-${NAVBAR_HEIGHT + 8}px 0px -35% 0px`,
      },
    );
    observerRef.current = observer;

    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [observedIds]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const target = rect.top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({
      top: target,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:px-5 md:px-6">
      <div className="flex items-center justify-between gap-3 w-full max-w-6xl rounded-full bg-white border border-border shadow-[0_12px_28px_-18px_rgba(0,0,0,0.35)] px-4 py-2">
        <button
          type="button"
          onClick={() => scrollToId('home')}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background font-semibold text-sm hover:scale-105 transition"
          aria-label="Go to home"
        >
          KB
        </button>

        <nav className="flex-1 overflow-hidden flex justify-end" aria-label="Primary">
          <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-white border border-border px-2 py-1 shadow-[0_10px_26px_-18px_rgba(0,0,0,0.35)] overflow-x-auto">
            {navItems.map(({ id, label, Icon }) => {
              const active = activeId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToId(id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    active ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  } hover:text-foreground`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon
                    className={`h-5 w-5 ${active ? 'text-foreground' : 'text-muted-foreground'}`}
                    aria-hidden
                  />
                  <span className="hidden sm:inline text-sm">{label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
