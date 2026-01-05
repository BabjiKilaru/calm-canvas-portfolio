import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aboutItems = ['Skills', 'Experience', 'Education', 'Certifications'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm hover:scale-105 transition-transform duration-200"
          >
            BK
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className="nav-link flex items-center gap-1">
                About
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="dropdown-menu animate-slide-down">
                    {aboutItems.map((item) => (
                      <a key={item} href={`#${item.toLowerCase()}`} className="dropdown-item">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#projects" className="nav-link">Projects</a>
            <a href="#resume" className="nav-link">Resume</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-down">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">About</p>
              {aboutItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block pl-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
            <a href="#projects" className="py-2 text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </a>
            <a href="#resume" className="py-2 text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>
              Resume
            </a>
            <a href="#contact" className="py-2 text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
