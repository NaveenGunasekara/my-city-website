import { Link } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'

const categories = [
  {
    path: '/history', emoji: '📜', label: 'History & Heritage',
    desc: 'City origins, population milestones & cultural legacy',
    tag: 'Heritage', color: '#7c5c3a',
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
    accent: 'rgba(124,92,58,0.12)',
  },
  {
    path: '/map', emoji: '🗺️', label: 'Explore the Map',
    desc: 'Navigate streets, landmarks & hidden gems',
    tag: 'Navigate', color: '#0d7c66',
    img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80',
    accent: 'rgba(13,124,102,0.12)',
  },
  {
    path: '/shops', emoji: '🛍️', label: 'Shops & Markets',
    desc: 'Grocery, pharmacy, clothing & local crafts',
    tag: 'Shopping', color: '#be185d',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    accent: 'rgba(190,24,93,0.10)',
  },
  {
    path: '/fun-activities', emoji: '⚽', label: 'Fun & Activities',
    desc: 'Sports grounds, clubs & recreational venues',
    tag: 'Recreation', color: '#1d4ed8',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    accent: 'rgba(29,78,216,0.10)',
  },
  {
    path: '/government-places', emoji: '🏛️', label: 'Civic & Government',
    desc: 'Post office, GN offices & railway station',
    tag: 'Civic', color: '#065f46',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
    accent: 'rgba(6,95,70,0.10)',
  },
  {
    path: '/temples', emoji: '🛕', label: 'Temples & Worship',
    desc: '12+ sacred places with ancient architecture',
    tag: 'Spiritual', color: '#92400e',
    img: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&q=80',
    accent: 'rgba(146,64,14,0.12)',
  },
  {
    path: '/companies', emoji: '🏭', label: 'Local Industries',
    desc: 'Businesses, factories & economic backbone',
    tag: 'Business', color: '#5b21b6',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    accent: 'rgba(91,33,182,0.10)',
  },
]

const stats = [
  { n: '~15k', l: 'Residents', icon: '👥' },
  { n: '12+',  l: 'Temples',   icon: '🛕' },
  { n: '50+',  l: 'Shops',     icon: '🛍️' },
  { n: '5+',   l: 'Grounds',   icon: '⚽' },
  { n: 'WP',   l: 'Province',  icon: '📍' },
]

export default function Home() {
  const [hov, setHov]         = useState(null)
  const [hovBtn, setHovBtn]   = useState(null)
  const [scroll, setScroll]   = useState(0)
  const [cursor, setCursor]   = useState({ x: -200, y: -200 })
  const [cursorBig, setCursorBig] = useState(false)
  const [loaded, setLoaded]   = useState(false)
  const heroRef               = useRef(null)
  const rafRef                = useRef(null)

  // Inject global styles
  useEffect(() => {
    if (document.getElementById('wt-cin')) return
    const s = document.createElement('style')
    s.id = 'wt-cin'
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:wght@200;300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { cursor: none !important; }
      a, button { cursor: none !important; }

      @keyframes cinReveal  { from{opacity:0;transform:translateY(40px) skewY(1deg)} to{opacity:1;transform:translateY(0) skewY(0)} }
      @keyframes cinSlide   { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
      @keyframes cinScale   { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
      @keyframes cinFade    { from{opacity:0} to{opacity:1} }
      @keyframes cinFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
      @keyframes cinFloat2  { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(10px) rotate(1deg)} }
      @keyframes cinPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
      @keyframes cinBlink   { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes cinLine    { from{scaleX:0} to{scaleX:1} }
      @keyframes grain      { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(-5%,2%)} 30%{transform:translate(3%,-4%)} 40%{transform:translate(-4%,6%)} 50%{transform:translate(-1%,-2%)} 60%{transform:translate(4%,2%)} 70%{transform:translate(-3%,4%)} 80%{transform:translate(5%,-2%)} 90%{transform:translate(-4%,3%)} }
      @keyframes shimmer    { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
      @keyframes countUp    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

      .wt-cursor {
        position: fixed; pointer-events: none; z-index: 9999;
        width: 10px; height: 10px; border-radius: 50%;
        background: #0d7c66;
        transform: translate(-50%,-50%);
        transition: width .25s, height .25s, background .25s, opacity .25s;
        mix-blend-mode: multiply;
      }
      .wt-cursor-ring {
        position: fixed; pointer-events: none; z-index: 9998;
        width: 36px; height: 36px; border-radius: 50%;
        border: 1.5px solid rgba(13,124,102,.5);
        transform: translate(-50%,-50%);
        transition: width .4s cubic-bezier(.16,1,.3,1), height .4s cubic-bezier(.16,1,.3,1), border-color .3s, transform .08s linear;
      }
      .wt-cursor-ring.big {
        width: 64px; height: 64px;
        border-color: rgba(13,124,102,.35);
      }

      .cat-card {
        position: relative; overflow: hidden; border-radius: 20px;
        background: #fff;
        box-shadow: 0 2px 20px rgba(0,0,0,.06);
        transition: transform .5s cubic-bezier(.34,1.56,.64,1), box-shadow .5s ease;
      }
      .cat-card:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 32px 64px rgba(0,0,0,.14);
      }
      .cat-card .img-wrap img {
        transition: transform .7s cubic-bezier(.25,.46,.45,.94), filter .5s;
      }
      .cat-card:hover .img-wrap img {
        transform: scale(1.1);
        filter: brightness(1.05) saturate(1.1);
      }
      .cat-card .shimmer-bar {
        position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.25) 50%, transparent 60%);
        transform: translateX(-100%);
        transition: none;
        pointer-events: none;
      }
      .cat-card:hover .shimmer-bar {
        animation: shimmer .7s ease forwards;
      }

      .stat-item {
        transition: transform .35s cubic-bezier(.34,1.56,.64,1);
      }
      .stat-item:hover { transform: translateY(-6px) scale(1.06); }

      .hero-title-word {
        display: inline-block;
        opacity: 0;
        animation: cinReveal .9s cubic-bezier(.16,1,.3,1) both;
      }

      .section-reveal {
        opacity: 0; transform: translateY(36px);
        transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
      }
      .section-reveal.visible { opacity: 1; transform: translateY(0); }
    `
    document.head.appendChild(s)
  }, [])

  // Cursor
  useEffect(() => {
    const move = e => { setCursor({ x: e.clientX, y: e.clientY }) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Scroll
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Load reveal
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Intersection observer for scroll reveals
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.section-reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const serif  = "'Playfair Display', serif"
  const serif2 = "'DM Serif Display', serif"
  const sans   = "'DM Sans', sans-serif"

  const parallaxY = scroll * 0.35

  return (
    <div style={{ fontFamily: sans, background: '#fff', color: '#1a1a1a', overflowX: 'hidden', position: 'relative' }}>

      {/* CUSTOM CURSOR */}
      <div className="wt-cursor" style={{ left: cursor.x, top: cursor.y }} />
      <div className={`wt-cursor-ring ${cursorBig ? 'big' : ''}`} style={{ left: cursor.x, top: cursor.y }} />

      {/* FILM GRAIN OVERLAY */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
        opacity: 0.45,
        animation: 'grain 1.2s steps(2) infinite',
      }} />

      {/* ════════════════ HERO ════════════════ */}
      <section ref={heroRef} style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        background: '#fafaf8',
      }}>
        {/* Background image with parallax */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          transform: `translateY(${parallaxY}px)`,
          willChange: 'transform',
        }}>
          <img
            src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1800&q=85"
            alt="Sri Lanka landscape"
            style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(250,250,248,0.97) 0%, rgba(250,250,248,0.88) 45%, rgba(250,250,248,0.2) 100%)' }} />
        </div>

        {/* Decorative vertical line */}
        <div style={{
          position: 'absolute', left: '5vw', top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(13,124,102,.25), transparent)',
          zIndex: 1,
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          padding: '0 6vw', maxWidth: 780,
          opacity: loaded ? 1 : 0,
          transition: 'opacity .3s',
        }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            marginBottom: '2rem',
            animation: 'cinSlide .8s .1s cubic-bezier(.16,1,.3,1) both',
          }}>
            <span style={{
              width: 32, height: 1, background: '#0d7c66', display: 'inline-block',
            }} />
            <span style={{
              fontSize: '.7rem', fontWeight: 400, letterSpacing: '.22em',
              textTransform: 'uppercase', color: '#0d7c66',
            }}>Sri Lanka · Western Province · Est. 2024</span>
          </div>

          {/* H1 */}
          <h1 style={{ margin: 0, lineHeight: 1.0, fontFamily: serif }}>
            <span className="hero-title-word" style={{ fontSize: 'clamp(4rem,8vw,7.5rem)', fontWeight: 400, color: '#1a1a1a', display: 'block', animationDelay: '.2s' }}>
              Discover
            </span>
            <span className="hero-title-word" style={{ fontSize: 'clamp(4.5rem,9vw,8.5rem)', fontWeight: 700, fontStyle: 'italic', color: '#0d7c66', display: 'block', animationDelay: '.35s', lineHeight: .95 }}>
              Watareka
            </span>
            <span className="hero-title-word" style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#6b7280', display: 'block', animationDelay: '.5s', marginTop: '1rem', letterSpacing: '.04em' }}>
              the soul of Western Province
            </span>
          </h1>

          {/* Tagline */}
          <p style={{
            margin: '2.5rem 0 3rem', fontSize: 'clamp(1rem,1.5vw,1.1rem)',
            color: '#6b7280', lineHeight: 1.9, maxWidth: 520,
            fontWeight: 300, letterSpacing: '.01em',
            animation: 'cinFade 1s .7s both',
          }}>
            Temples that whisper centuries of faith. Markets buzzing with life. A community that opens its arms to every visitor.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', animation: 'cinFade 1s .85s both' }}>
            <Link to="/map"
              onMouseEnter={() => { setHovBtn('map'); setCursorBig(true) }}
              onMouseLeave={() => { setHovBtn(null); setCursorBig(false) }}
              style={{
                padding: '.9rem 2.2rem', borderRadius: 4, fontSize: '.88rem',
                fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase',
                background: hovBtn === 'map' ? '#0a6655' : '#0d7c66',
                color: '#fff', border: '1.5px solid transparent',
                transform: hovBtn === 'map' ? 'translateY(-3px)' : 'none',
                boxShadow: hovBtn === 'map' ? '0 16px 40px rgba(13,124,102,.3)' : '0 4px 20px rgba(13,124,102,.2)',
                transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
              <span style={{ fontSize: '1rem' }}>→</span> Explore the Map
            </Link>
            <Link to="/history"
              onMouseEnter={() => { setHovBtn('hist'); setCursorBig(true) }}
              onMouseLeave={() => { setHovBtn(null); setCursorBig(false) }}
              style={{
                padding: '.9rem 2.2rem', borderRadius: 4, fontSize: '.88rem',
                fontWeight: 400, letterSpacing: '.06em', textTransform: 'uppercase',
                background: 'transparent', color: hovBtn === 'hist' ? '#0d7c66' : '#1a1a1a',
                border: `1.5px solid ${hovBtn === 'hist' ? '#0d7c66' : 'rgba(26,26,26,.25)'}`,
                transform: hovBtn === 'hist' ? 'translateY(-3px)' : 'none',
                transition: 'all .3s',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
              Our History
            </Link>
          </div>
        </div>

        {/* Floating stats card */}
        <div style={{
          position: 'absolute', right: '6vw', bottom: '8vh', zIndex: 2,
          animation: 'cinScale .9s .9s cubic-bezier(.16,1,.3,1) both, cinFloat 6s 2s ease-in-out infinite',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 16, padding: '1.75rem 2rem',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 20px 60px rgba(0,0,0,.1), 0 2px 8px rgba(0,0,0,.05)',
            minWidth: 240,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'cinPulse 2s infinite' }} />
              <span style={{ fontSize: '.7rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: '#6b7280' }}>City Overview</span>
            </div>
            <div style={{ fontFamily: serif, fontSize: '1.6rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '.2rem' }}>Watareka, LK 🇱🇰</div>
            <div style={{ fontSize: '.8rem', color: '#9ca3af', marginBottom: '1.25rem' }}>Western Province • 28°C Tropical</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
              {[['~15k','People'],['12+','Temples'],['50+','Shops'],['5+','Grounds']].map(([n,l]) => (
                <div key={l} style={{ textAlign: 'center', background: '#f9fafb', borderRadius: 10, padding: '.5rem' }}>
                  <span style={{ fontFamily: serif, fontSize: '1.3rem', fontWeight: 700, color: '#0d7c66', display: 'block' }}>{n}</span>
                  <small style={{ fontSize: '.65rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.08em' }}>{l}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '3vh', left: '50%', transform: 'translateX(-50%)',
          zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'cinFade 1s 1.4s both',
        }}>
          <span style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#9ca3af' }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #9ca3af, transparent)', animation: 'cinBlink 2s infinite' }} />
        </div>
      </section>

      {/* ════════════════ STATS BAR ════════════════ */}
      <div className="section-reveal" style={{ background: '#1a1a1a', padding: '0 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map(({ n, l, icon }, i) => (
            <div key={l} className="stat-item" style={{
              padding: '2rem 2.5rem', textAlign: 'center', flex: '1', minWidth: 120,
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none',
            }}>
              <span style={{ display: 'block', fontSize: '1.4rem', marginBottom: '.3rem' }}>{icon}</span>
              <span style={{ fontFamily: serif, fontSize: '2.2rem', fontWeight: 700, color: '#f0fdf4', display: 'block', lineHeight: 1 }}>{n}</span>
              <span style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.15em', marginTop: '.3rem', display: 'block' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════ CATEGORIES ════════════════ */}
      <section style={{ padding: '8rem 5vw', background: '#fafaf8' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>

          {/* Section header */}
          <div className="section-reveal" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                <div style={{ width: 40, height: 1, background: '#0d7c66' }} />
                <span style={{ fontSize: '.7rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: '#0d7c66' }}>What to Discover</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.4rem,4.5vw,4rem)', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.1, margin: 0 }}>
                Explore <em style={{ fontStyle: 'italic', color: '#0d7c66' }}>every corner</em><br />of Watareka
              </h2>
            </div>
            <p style={{ fontSize: '.95rem', color: '#9ca3af', maxWidth: 280, lineHeight: 1.75, fontWeight: 300 }}>
              Seven curated categories to help you navigate the best of our city.
            </p>
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {categories.map((cat, i) => (
              <Link
                key={cat.path} to={cat.path}
                className="cat-card section-reveal"
                onMouseEnter={() => { setHov(cat.path); setCursorBig(true) }}
                onMouseLeave={() => { setHov(null); setCursorBig(false) }}
                style={{
                  textDecoration: 'none', display: 'block',
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                {/* Image */}
                <div className="img-wrap" style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={cat.img} alt={cat.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)`,
                  }} />
                  {/* Tag */}
                  <div style={{
                    position: 'absolute', top: 14, left: 14,
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 4, padding: '.28rem .75rem',
                    fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em',
                    textTransform: 'uppercase', color: cat.color,
                  }}>{cat.tag}</div>
                  {/* Emoji badge */}
                  <div style={{ position: 'absolute', bottom: 14, right: 14, fontSize: '1.75rem' }}>
                    {cat.emoji}
                  </div>
                </div>
                {/* Shimmer */}
                <div className="shimmer-bar" />
                {/* Text */}
                <div style={{ padding: '1.4rem 1.5rem' }}>
                  <div style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '.4rem' }}>{cat.label}</div>
                  <div style={{ fontSize: '.8rem', color: '#9ca3af', lineHeight: 1.65, fontWeight: 300 }}>{cat.desc}</div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6, marginTop: '1.1rem',
                    fontSize: '.78rem', fontWeight: 500, color: cat.color,
                  }}>
                    <span>Explore</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: '50%',
                      background: cat.accent, fontSize: '.75rem',
                      transform: hov === cat.path ? 'translateX(5px)' : 'none',
                      transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
                    }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FULL-WIDTH IMAGE BREAK ════════════════ */}
      <div className="section-reveal" style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1800&q=85"
          alt="Sri Lanka temples"
          style={{
            width: '100%', height: '130%', objectFit: 'cover',
            objectPosition: 'center 60%', display: 'block',
            transform: `translateY(${Math.min(scroll * 0.2 - 60, 0)}px)`,
            willChange: 'transform',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.42)' }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', textAlign: 'center', padding: '0 5vw',
        }}>
          <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,.5)', marginBottom: '1.5rem' }} />
          <h3 style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2rem,5vw,4rem)', color: '#fff', margin: '0 0 1rem', lineHeight: 1.15 }}>
            "Where ancient faith meets<br />modern life"
          </h3>
          <div style={{ fontSize: '.8rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)' }}>
            Watareka, Sri Lanka
          </div>
        </div>
      </div>

      {/* ════════════════ ABOUT ════════════════ */}
      <section style={{ padding: '8rem 5vw', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '6rem', alignItems: 'center' }}>

          {/* Image collage */}
          <div className="section-reveal" style={{ position: 'relative', height: 500 }}>
            {/* Large */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: '65%', height: 320, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.1)', animation: 'cinFloat 7s 1s ease-in-out infinite' }}>
              <img src="https://images.unsplash.com/photo-1601827125587-64bfe0e6deab?w=600&q=80" alt="Watareka temple" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Small bottom right */}
            <div style={{ position: 'absolute', right: 0, bottom: 30, width: '52%', height: 240, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.1)', animation: 'cinFloat2 6s 1.5s ease-in-out infinite' }}>
              <img src="https://images.unsplash.com/photo-1573548842355-73bb50e50b72?w=500&q=80" alt="Sri Lanka market" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Accent label */}
            <div style={{
              position: 'absolute', bottom: 170, left: '45%', transform: 'translateX(-50%)',
              background: '#fff', borderRadius: 12, padding: '.9rem 1.25rem',
              boxShadow: '0 8px 32px rgba(0,0,0,.1)',
              whiteSpace: 'nowrap', zIndex: 5,
              border: '1px solid rgba(0,0,0,.05)',
            }}>
              <span style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 700, color: '#0d7c66' }}>12+ Temples</span>
              <div style={{ fontSize: '.7rem', color: '#9ca3af', marginTop: '.1rem' }}>Sacred & Ancient</div>
            </div>
          </div>

          {/* Text */}
          <div className="section-reveal" style={{ transitionDelay: '.15s' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
              <div style={{ width: 40, height: 1, background: '#0d7c66' }} />
              <span style={{ fontSize: '.7rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: '#0d7c66' }}>About the City</span>
            </div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.1, color: '#1a1a1a', marginBottom: '1.75rem' }}>
              A city shaped<br /><em style={{ fontStyle: 'italic', color: '#0d7c66' }}>by centuries</em><br />of tradition
            </h2>
            <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: 1.9, marginBottom: '1.25rem', fontWeight: 300 }}>
              Watareka is nestled in Sri Lanka's vibrant Western Province — where ancient temples stand as timeless guardians beside the rush of modern daily life.
            </p>
            <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: 1.9, fontWeight: 300 }}>
              With over 15,000 residents, a rich weave of culture, faith, and commerce, Watareka is a place that rewards the curious — and never lets go.
            </p>
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #f3f4f6', flexWrap: 'wrap' }}>
              {[['12+','Temples'],['50+','Shops'],['~15k','People'],['5+','Grounds']].map(([n,l]) => (
                <div key={l}>
                  <span style={{ fontFamily: serif, fontSize: '2.5rem', fontWeight: 700, color: '#1a1a1a', display: 'block', lineHeight: 1 }}>{n}</span>
                  <span style={{ fontSize: '.72rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.12em', marginTop: '.3rem', display: 'block' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ VISITING TIPS ════════════════ */}
      <section style={{ padding: '8rem 5vw', background: '#0d1117', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background texture */}
        <div style={{
          position: 'absolute', top: '-50%', right: '-10%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(13,124,102,.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30%', left: '5%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(180,83,9,.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div className="section-reveal">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
              <div style={{ width: 40, height: 1, background: '#14b8a6' }} />
              <span style={{ fontSize: '.7rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: '#14b8a6' }}>Good to Know</span>
            </div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.4rem,4.5vw,3.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '3.5rem' }}>
              Visiting <em style={{ fontStyle: 'italic', color: '#f59e0b' }}>Watareka?</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🛕', img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=500&q=80', title: 'Rich Temple Culture', desc: 'Over 12 temples to explore, each with unique architecture and centuries of history.' },
              { icon: '🛍️', img: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=500&q=80', title: 'Vibrant Local Markets', desc: 'Fresh produce, local crafts, and everyday essentials at 50+ shops and stalls.' },
              { icon: '⚽', img: 'https://images.unsplash.com/photo-1464719551390-2297dc679871?w=500&q=80', title: 'Sports & Recreation', desc: 'Open grounds, indoor sports, and active clubs for every age and interest.' },
              { icon: '🚂', img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80', title: 'Easily Accessible', desc: 'Railway station and government offices make Watareka remarkably well-connected.' },
            ].map((t, i) => (
              <div
                key={t.title}
                className="section-reveal"
                onMouseEnter={() => { setHov(`tip-${i}`); setCursorBig(true) }}
                onMouseLeave={() => { setHov(null); setCursorBig(false) }}
                style={{
                  borderRadius: 16, overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,.07)',
                  background: hov === `tip-${i}` ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.03)',
                  transform: hov === `tip-${i}` ? 'translateY(-8px)' : 'none',
                  transition: 'all .4s cubic-bezier(.34,1.56,.64,1)',
                  transitionDelay: `${i * 0.07}s`,
                  cursor: 'default',
                }}>
                {/* Image */}
                <div style={{ height: 160, overflow: 'hidden' }}>
                  <img src={t.img} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(.7) saturate(.8)', transition: 'transform .6s, filter .6s', transform: hov === `tip-${i}` ? 'scale(1.06)' : 'scale(1)' }} loading="lazy" />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '.75rem' }}>{t.icon}</div>
                  <div style={{ fontWeight: 500, color: '#f9fafb', fontSize: '.95rem', marginBottom: '.5rem' }}>{t.title}</div>
                  <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.7, fontWeight: 300 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section className="section-reveal" style={{ padding: '9rem 5vw', background: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Giant background text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          fontFamily: serif, fontSize: 'clamp(8rem,18vw,18rem)', fontWeight: 900,
          color: 'rgba(0,0,0,.025)', letterSpacing: '-.02em', whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>Watareka</div>

        <div style={{ position: 'relative' }}>
          <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, #d1d5db)', margin: '0 auto 2.5rem' }} />
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem,5.5vw,5rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem', lineHeight: 1.05 }}>
            Begin your<br /><em style={{ fontStyle: 'italic', color: '#0d7c66' }}>Watareka</em> journey
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#9ca3af', marginBottom: '3rem', maxWidth: 400, marginInline: 'auto', fontWeight: 300, lineHeight: 1.8 }}>
            Everything you need — temples, shops, people, maps — all in one complete city guide.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/map"
              onMouseEnter={() => { setHovBtn('cta-m'); setCursorBig(true) }}
              onMouseLeave={() => { setHovBtn(null); setCursorBig(false) }}
              style={{
                padding: '1rem 2.5rem', borderRadius: 4, fontSize: '.88rem',
                fontWeight: 500, letterSpacing: '.07em', textTransform: 'uppercase',
                background: hovBtn === 'cta-m' ? '#0a6655' : '#0d7c66', color: '#fff',
                transform: hovBtn === 'cta-m' ? 'translateY(-3px)' : 'none',
                boxShadow: hovBtn === 'cta-m' ? '0 20px 50px rgba(13,124,102,.32)' : '0 6px 24px rgba(13,124,102,.2)',
                transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
                textDecoration: 'none', display: 'inline-block',
              }}>Open the Map →</Link>
            <Link to="/shops"
              onMouseEnter={() => { setHovBtn('cta-s'); setCursorBig(true) }}
              onMouseLeave={() => { setHovBtn(null); setCursorBig(false) }}
              style={{
                padding: '1rem 2.5rem', borderRadius: 4, fontSize: '.88rem',
                fontWeight: 400, letterSpacing: '.07em', textTransform: 'uppercase',
                background: 'transparent', color: hovBtn === 'cta-s' ? '#0d7c66' : '#1a1a1a',
                border: `1.5px solid ${hovBtn === 'cta-s' ? '#0d7c66' : 'rgba(26,26,26,.2)'}`,
                transform: hovBtn === 'cta-s' ? 'translateY(-3px)' : 'none',
                transition: 'all .3s',
                textDecoration: 'none', display: 'inline-block',
              }}>Browse All Places</Link>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER BAR ════════════════ */}
      <div style={{ background: '#0d1117', padding: '1.75rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Watareka <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#14b8a6' }}>City Guide</span></span>
        <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', letterSpacing: '.1em' }}>WESTERN PROVINCE · SRI LANKA 🇱🇰</span>
      </div>

    </div>
  )
}