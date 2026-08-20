import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Disclosure list built on the native pattern: a real <button> carrying
 * aria-expanded and aria-controls, and a region labelled by that button.
 * Keyboard operation therefore comes for free.
 */
export function Accordion({ items, defaultOpen = null, headingLevel = 3 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();
  const reduced = usePrefersReducedMotion();
  const Heading = `h${headingLevel}`;

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.q ?? item.title ?? i} className="accordion__item">
            <Heading className="t-h3">
              <button
                type="button"
                id={triggerId}
                className="accordion__trigger t-h3"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q ?? item.title}</span>
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  className="accordion__icon"
                  aria-hidden="true"
                />
              </button>
            </Heading>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.24,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <AccordionBody item={item} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function AccordionBody({ item }) {
  if (item.a) {
    return (
      <p
        className="t-body muted measure"
        style={{ paddingBottom: 'var(--s-5)' }}
      >
        {item.a}
      </p>
    );
  }

  return (
    <ul
      className="t-body muted"
      style={{
        paddingBottom: 'var(--s-5)',
        display: 'grid',
        gap: 'var(--s-2)',
      }}
    >
      {item.lessons?.map((lesson) => (
        <li
          key={lesson}
          style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'baseline' }}
        >
          <span aria-hidden="true" className="subtle">
            —
          </span>
          <span>{lesson}</span>
        </li>
      ))}
    </ul>
  );
}
