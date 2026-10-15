import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react';
import clsx from 'clsx';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { Seo } from '@/components/ui/Seo';
import { ServiceModal } from '@/components/ui/ServiceModal';
import { services, work } from '@/data/services';
import { clients, contact, site } from '@/data/siteConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrambleText } from '@/hooks/useScrambleText';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description: site.description,
  url: site.url,
  email: contact.email,
  areaServed: 'Worldwide',
  knowsAbout: [
    'User experience design',
    'Product design',
    'Design systems',
    'Accessibility',
    'Behavioural design',
  ],
};

const HERO_ROTATING_WORDS = [
  'Revenue Increase',
  'Customer Conversion',
  'Growth & Scale',
];

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={jsonLd} />

      <Hero />
      <ServicesPreview />
      <SelectedWork />
      <InHouseProducts />
    </>
  );
}

/* -------------------------------------------------------------------------- */

const HERO_WORDS = ['DESIGN', 'THAT', 'DECODES'];
const HERO_LETTER_COUNT = HERO_WORDS.join('').length;

// The share of the pinned scroll range spent writing the title. The rest
// is dwell, so the finished headline holds for a beat before the page
// moves on.
const WRITE_START = 0.02;
const WRITE_END = 0.72;

/**
 * The hero pins while the visitor scrolls through it, and that scroll
 * writes "DESIGN THAT DECODES" one letter at a time: each glyph is wiped
 * in left-to-right behind a pen caret, over a faint ghost of itself, so
 * it reads as being drawn rather than faded.
 *
 * Under reduced motion the section stops pinning and the title renders
 * whole — the clip styles are simply not applied.
 */
function Hero() {
  const heroRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // A function transform on purpose: Motion hands a range-mapped opacity
  // straight to a native ScrollTimeline, which mis-reads this pinned
  // section's offsets and ran the fade backwards.
  const cueOpacity = useTransform(scrollYProgress, (v) =>
    Math.max(0, 1 - v / 0.06),
  );

  let letterIndex = 0;

  return (
    <section
      ref={heroRef}
      className={clsx('hero', reduced && 'hero--static')}
    >
      <div className="hero__pin">
        <Container>
          <h1 className="hero__title" aria-label="Design that decodes">
            {HERO_WORDS.map((word) => (
              <span key={word} className="hero__word" aria-hidden="true">
                {[...word].map((char) => {
                  const i = letterIndex++;
                  return (
                    <WrittenLetter
                      key={i}
                      char={char}
                      index={i}
                      progress={scrollYProgress}
                      reduced={reduced}
                    />
                  );
                })}
              </span>
            ))}
          </h1>

          <p className="t-h2 hero__outcome">
            Built for <HeroRotatingWord />.
          </p>

          <Reveal index={2} className="hero__actions">
            <Button variant="primary" to="/contact" arrow>
              Connect for Business Growth
            </Button>
          </Reveal>
        </Container>

        {reduced ? null : (
          <motion.p
            className="t-mono subtle hero__cue"
            style={{ opacity: cueOpacity }}
            aria-hidden="true"
          >
            Scroll to write ↓
          </motion.p>
        )}
      </div>
    </section>
  );
}

/** One glyph of the hero title. Slices are back to back, so exactly one
 * letter — and one pen caret — is mid-stroke at any moment. */
function WrittenLetter({ char, index, progress, reduced }) {
  const step = (WRITE_END - WRITE_START) / HERO_LETTER_COUNT;
  const start = WRITE_START + index * step;
  const end = start + step;

  // Negative insets leave room for glyph overhang; only the right edge
  // moves, which is what makes it a left-to-right stroke.
  const clipRight = useTransform(progress, [start, end], [100, -10]);
  const clipPath = useMotionTemplate`inset(-20% ${clipRight}% -20% -10%)`;
  const caretLeft = useTransform(progress, [start, end], ['0%', '100%']);
  // Function transform for the same ScrollTimeline reason as the cue.
  const caretOpacity = useTransform(progress, (v) =>
    v > start && v < end ? 1 : 0,
  );

  return (
    <span className="hero__letter">
      <span className="hero__letter-ghost">{char}</span>
      <motion.span
        className="hero__letter-ink"
        style={reduced ? undefined : { clipPath }}
      >
        {char}
      </motion.span>
      {reduced ? null : (
        <motion.span
          className="hero__caret"
          style={{ left: caretLeft, opacity: caretOpacity }}
        />
      )}
    </span>
  );
}

/** Cycles the hero's outcome word so the headline reads as one claim
 * applied to several results, instead of committing to just one. Each
 * change decodes in via useScrambleText rather than sliding. */
function HeroRotatingWord() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  const word = HERO_ROTATING_WORDS[index];
  const display = useScrambleText(word, { skip: reduced });

  return <span className="hero__rotating-word">{display}</span>;
}

function ServicesPreview() {
  return (
    <section className="section" id="services">
      <Container>
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>

        <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-8)' }}>
          <Col span={{ base: 12, lg: 5 }} className="services-preview__intro">
            <h2 className="t-h1">Design solutions that put people first.</h2>
            <Reveal>
              <p className="t-body muted" style={{ marginTop: 'var(--s-6)' }}>
                Every engagement is fixed-scope and fixed-price. You know
                what you are getting and when, before anything is signed —
                built around the people who will actually use it.
              </p>
              <div style={{ marginTop: 'var(--s-7)' }}>
                <Button variant="primary" to="/services" arrow>
                  Make humanized design solutions
                </Button>
              </div>
            </Reveal>
          </Col>

          <Col span={{ base: 12, lg: 7 }}>
            <Reveal index={1}>
              <ServicesStack />
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}

// Three back-to-back copies of the list, so there's always a full cycle
// of cards to scroll into on either side — see the recentring effect
// below for how this reads as an endless loop rather than three laps.
const STACK_COPIES = 3;
const stackItems = Array.from({ length: STACK_COPIES }, (_, copy) =>
  services.map((service, i) => ({
    ...service,
    key: `${copy}-${service.slug}`,
    index: copy * services.length + i,
  })),
).flat();

/** A vertical, scroll-snapped card stack: whichever card sits at the
 * centre is sharp, everything above and below is blurred back — a sense
 * of depth instead of a flat scrolling row. Loops endlessly in both
 * directions: three copies of the list are rendered, and whenever the
 * active card drifts into the first or last copy, the scroll position is
 * silently jumped back by one cycle onto the identical card in the middle
 * copy — imperceptible, since the content either side is the same. */
function ServicesStack() {
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(services.length);
  const [openService, setOpenService] = useState(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    // Start centred in the middle copy, so there's room to scroll both
    // up and down before ever touching a real edge.
    const first = cardRefs.current[0];
    const middle = cardRefs.current[services.length];
    if (first && middle) {
      const cycleHeight =
        middle.getBoundingClientRect().top - first.getBoundingClientRect().top;
      stack.scrollTop += cycleHeight;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio <= 0.6) return;

          const index = Number(entry.target.dataset.index);
          const copy = Math.floor(index / services.length);
          setActiveIndex(index);

          if (copy === 0 || copy === STACK_COPIES - 1) {
            const twin = cardRefs.current[index + (copy === 0 ? services.length : -services.length)];
            if (!twin) return;
            const cycleHeight =
              twin.getBoundingClientRect().top - entry.target.getBoundingClientRect().top;
            // Runs after the browser's own snap settles, so the jump
            // lands on a clean, un-animated scrollTop write.
            requestAnimationFrame(() => {
              stack.scrollTop += cycleHeight;
              setActiveIndex((i) => (i === index ? index + (copy === 0 ? services.length : -services.length) : i));
            });
          }
        });
      },
      { root: stack, threshold: [0.6] },
    );

    stack
      .querySelectorAll('[data-index]')
      .forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div
      ref={stackRef}
      className="services-stack"
      role="region"
      aria-label="Services, scroll vertically"
      tabIndex={0}
      data-lenis-prevent
    >
      {stackItems.map((service) => (
        <button
          type="button"
          key={service.key}
          ref={(el) => {
            cardRefs.current[service.index] = el;
          }}
          onClick={() =>
            setOpenService(services.find((s) => s.slug === service.slug))
          }
          data-index={service.index}
          aria-hidden={service.index !== activeIndex || undefined}
          tabIndex={service.index === activeIndex ? 0 : -1}
          className={clsx(
            'services-stack__card',
            service.index === activeIndex && 'is-active',
          )}
        >
          <Placeholder ratio="16 / 9" className="services-stack__image" />
          <div className="services-stack__overlay">
            <h3 className="t-h3">{service.title}</h3>
            <p className="t-small">{service.outcome}</p>
          </div>
        </button>
      ))}
    </div>

    <ServiceModal service={openService} onClose={() => setOpenService(null)} />
    </>
  );
}

function SelectedWork() {
  return (
    <section className="section section--flush-top rule-t">
      <Reveal className="work-treemap" style={{ marginTop: 0 }}>
        {work.map((item) => (
          <div key={item.slug} className="work-treemap__cell">
            {item.image ? (
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="work-treemap__image"
              />
            ) : (
              <Placeholder ratio="auto" className="work-treemap__image" />
            )}
            <div className="work-treemap__overlay">
              <h3 className="t-h3 work-treemap__title">{item.title}</h3>
            </div>
          </div>
        ))}
      </Reveal>

      <Container>
        <Reveal index={1} style={{ marginTop: 'var(--s-8)' }}>
          {/* TODO: point at a real case-studies page once one exists. */}
          <Button variant="secondary" href="#" arrow>
            Read case studies
          </Button>
        </Reveal>

        <Reveal
          className="marquee client-marquee"
          index={3}
          style={{ marginTop: 'var(--s-8)' }}
        >
          <ul className="marquee__track" aria-label="Selected clients">
            {[...clients, ...clients].map((client, i) => (
              <li
                key={`${client}-${i}`}
                className="t-h3 subtle"
                aria-hidden={i >= clients.length}
              >
                {client}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/** Full-bleed media banner, edge to edge — same 100vw trick as the work
 * treemap. Empty for now; drop a video or GIF into
 * .product-video__media once the asset is ready. */
function InHouseProducts() {
  return (
    <section className="section rule-t">
      <Container>
        <Reveal>
          <Eyebrow>In house Products</Eyebrow>
        </Reveal>
      </Container>

      <Reveal index={1} className="product-video" style={{ marginTop: 'var(--s-8)' }}>
        <div className="product-video__media" />
      </Reveal>
    </section>
  );
}

