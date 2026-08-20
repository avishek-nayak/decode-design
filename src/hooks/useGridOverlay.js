import { useEffect, useState } from 'react';

/**
 * Ctrl+G toggles a 12-column overlay. Development aid — it also happens to be
 * a decent thing for a prospect to stumble across on a design consultancy.
 */
export function useGridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.ctrlKey && !event.metaKey && event.key.toLowerCase() === 'g') {
        event.preventDefault();
        setVisible((v) => !v);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return visible;
}
