import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Well-known section anchors on the home overview page
const HOME_SECTIONS = [
  'overview',
  'simulator',
  'architecture',
  'pipeline',
  'benchmarks',
  'integrity',
  'synthea',
  'problem'
];

export default function ScrollToTopAndHash() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '').toLowerCase();

      // Check if current page has the target element
      const targetElement = document.getElementById(targetId);

      // If user is on a secondary page (like /privacy#overview or /terms#simulator)
      // and the anchor belongs to the home page or is missing on the current page:
      if (!targetElement && pathname !== '/' && HOME_SECTIONS.includes(targetId)) {
        navigate(`/#${targetId}`, { replace: true });
        return;
      }

      // Scroll into view with retry to ensure dynamic or rendered elements are mounted
      const attemptScroll = (attemptsLeft = 5) => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attemptsLeft > 0) {
          setTimeout(() => attemptScroll(attemptsLeft - 1), 60);
        } else if (pathname !== '/' && HOME_SECTIONS.includes(targetId)) {
          navigate(`/#${targetId}`, { replace: true });
        }
      };

      // Slight tick to allow route transitions / DOM updates to complete
      const timer = setTimeout(() => attemptScroll(5), 50);
      return () => clearTimeout(timer);
    } else {
      // Standard page navigation without hash -> scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash, navigate]);

  return null;
}
