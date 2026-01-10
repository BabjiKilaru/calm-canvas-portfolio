import { useEffect, useRef } from 'react';
import { Linkedin, Mail, Github } from 'lucide-react';

type SocialLinksProps = {
  onContainerMeasured?: (rect: DOMRect | null) => void;
};

const SocialLinks = ({ onContainerMeasured }: SocialLinksProps) => {
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!stackRef.current) {
      onContainerMeasured?.(null);
      return;
    }

    const measure = () => {
      const rect = stackRef.current?.getBoundingClientRect() || null;
      onContainerMeasured?.(rect);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stackRef.current);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [onContainerMeasured]);

  return (
    <>
      {/* Fixed vertical bar (desktop/tablet) */}
      <div ref={stackRef} className="hidden md:flex fixed left-4 lg:left-6 bottom-8 z-40 flex-col items-center gap-3">
        <a
          href="https://www.linkedin.com/in/babjikilaru"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon social-icon-fixed"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:hello@babjikilaru.com"
          className="social-icon social-icon-fixed"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/babjikilaru"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon social-icon-fixed"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>

      {/* Inline (mobile) */}
      <div className="flex md:hidden items-center gap-3">
        <a
          href="https://www.linkedin.com/in/babjikilaru"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:hello@babjikilaru.com"
          className="social-icon"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/babjikilaru"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </>
  );
};

export default SocialLinks;
