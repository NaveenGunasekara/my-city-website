import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

const categories = [
  {
    path: '/history',
    emoji: '📜',
    label: 'History & Heritage',
    desc: 'City origins, population milestones & cultural legacy',
    tag: 'Heritage',
    color: '#0f766e',
    img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=90',
  },
  {
    path: '/map',
    emoji: '🗺️',
    label: 'Explore the Map',
    desc: 'Navigate streets, landmarks & hidden gems',
    tag: 'Navigate',
    color: '#2563eb',
    img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=90',
  },
  {
    path: '/shops',
    emoji: '🛍️',
    label: 'Shops & Markets',
    desc: 'Grocery, pharmacy, clothing & local crafts',
    tag: 'Shopping',
    color: '#db2777',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=90',
  },
  {
    path: '/fun-activities',
    emoji: '⚽',
    label: 'Fun & Activities',
    desc: 'Sports grounds, clubs & recreational venues',
    tag: 'Recreation',
    color: '#1d4ed8',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90',
  },
  {
    path: '/government-places',
    emoji: '🏛️',
    label: 'Civic & Government',
    desc: 'Post office, GN offices & railway station',
    tag: 'Civic',
    color: '#0f766e',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=90',
  },
  {
    path: '/temples',
    emoji: '🛕',
    label: 'Temples & Worship',
    desc: '12+ sacred places with ancient architecture',
    tag: 'Spiritual',
    color: '#c2410c',
    img: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200&q=90',
  },
  {
    path: '/companies',
    emoji: '🏭',
    label: 'Local Industries',
    desc: 'Businesses, factories & economic backbone',
    tag: 'Business',
    color: '#7c3aed',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=90',
  },
]

const stats = [
  { n: '~15k', l: 'Residents', icon: '👥' },
  { n: '12+', l: 'Temples', icon: '🛕' },
  { n: '50+', l: 'Shops', icon: '🛍️' },
  { n: '5+', l: 'Grounds', icon: '⚽' },
  { n: 'WP', l: 'Province', icon: '📍' },
]

export default function Home() {
  const [hover, setHover] = useState(null)
  const [hoverBtn, setHoverBtn] = useState(null)
  const [scroll, setScroll] = useState(0)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const [cursorBig, setCursorBig] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const heroRef = useRef(null)

  useEffect(() => {
    if (document.getElementById('lux-home-style')) return

    const style = document.createElement('style')
    style.id = 'lux-home-style'

    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

      *{
        box-sizing:border-box;
      }

      html{
        scroll-behavior:smooth;
      }

      body{
        margin:0;
        cursor:none !important;
        background:#f7f7f5;
      }

      a,button{
        cursor:none !important;
      }

      ::selection{
        background:#0f766e;
        color:white;
      }

      .lux-card{
        position:relative;
        overflow:hidden;
        border-radius:28px;
        background:rgba(255,255,255,0.75);
        backdrop-filter:blur(18px);
        -webkit-backdrop-filter:blur(18px);
        border:1px solid rgba(255,255,255,0.8);
        box-shadow:
          0 10px 30px rgba(0,0,0,0.04),
          0 30px 80px rgba(0,0,0,0.06);
        transition:
          transform .8s cubic-bezier(.19,1,.22,1),
          box-shadow .8s cubic-bezier(.19,1,.22,1),
          border .5s ease;
      }

      .lux-card:hover{
        transform:translateY(-14px) scale(1.02);
        box-shadow:
          0 20px 50px rgba(0,0,0,0.06),
          0 40px 100px rgba(0,0,0,0.08);
      }

      .lux-card img{
        transition:
          transform 1.4s cubic-bezier(.19,1,.22,1),
          filter .8s ease;
      }

      .lux-card:hover img{
        transform:scale(1.08);
        filter:saturate(1.1) brightness(1.05);
      }

      .shine{
        position:absolute;
        inset:0;
        background:
          linear-gradient(
            120deg,
            transparent 20%,
            rgba(255,255,255,.45) 50%,
            transparent 80%
          );
        transform:translateX(-120%);
      }

      .lux-card:hover .shine{
        transform:translateX(120%);
        transition:1.5s;
      }

      .section-reveal{
        opacity:0;
        transform:translateY(60px);
        transition:
          opacity 1s cubic-bezier(.16,1,.3,1),
          transform 1s cubic-bezier(.16,1,.3,1);
      }

      .section-reveal.visible{
        opacity:1;
        transform:translateY(0);
      }

      .hero-word{
        opacity:0;
        transform:translateY(80px);
        animation:heroReveal 1s cubic-bezier(.16,1,.3,1) forwards;
      }

      @keyframes heroReveal{
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      @keyframes floaty{
        0%,100%{
          transform:translateY(0px);
        }
        50%{
          transform:translateY(-16px);
        }
      }

      @keyframes grain{
        0%,100%{transform:translate(0,0)}
        20%{transform:translate(-3%,-2%)}
        40%{transform:translate(2%,4%)}
        60%{transform:translate(-2%,2%)}
        80%{transform:translate(3%,-3%)}
      }

      .lux-cursor{
        position:fixed;
        z-index:99999;
        pointer-events:none;
        width:10px;
        height:10px;
        border-radius:50%;
        background:#0f766e;
        transform:translate(-50%,-50%);
        transition:
          width .3s ease,
          height .3s ease,
          opacity .3s ease;
        mix-blend-mode:multiply;
      }

      .lux-cursor-ring{
        position:fixed;
        z-index:99998;
        pointer-events:none;
        width:40px;
        height:40px;
        border-radius:50%;
        border:1.5px solid rgba(15,118,110,.35);
        transform:translate(-50%,-50%);
        transition:
          width .45s cubic-bezier(.16,1,.3,1),
          height .45s cubic-bezier(.16,1,.3,1),
          border .3s ease;
      }

      .lux-cursor-ring.big{
        width:70px;
        height:70px;
        border-color:rgba(15,118,110,.25);
      }
    `

    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    const move = e => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY)

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.section-reveal').forEach(el => {
      io.observe(el)
    })

    return () => io.disconnect()
  }, [])

  const serif = "'Outfit', sans-serif"
  const sans = "'Manrope', sans-serif"

  const parallax = scroll * 0.22
  const progress =
    (scroll /
      (document.body.scrollHeight - window.innerHeight || 1)) *
    100

  return (
    <div
      style={{
        background: '#f7f7f5',
        color: '#111827',
        overflowX: 'hidden',
        position: 'relative',
        fontFamily: sans,
      }}
    >
      {/* CURSOR */}
      <div
        className="lux-cursor"
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      />

      <div
        className={`lux-cursor-ring ${cursorBig ? 'big' : ''}`}
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      />

      {/* SCROLL PROGRESS */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 3,
          width: `${progress}%`,
          background: '#0f766e',
          zIndex: 999999,
          transition: 'width .1s linear',
        }}
      />

      {/* GRAIN */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9990,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 1.2s steps(2) infinite',
        }}
      />

      {/* BACKGROUND ORBS */}
      <div
        style={{
          position: 'fixed',
          top: -200,
          left: -150,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: '#d1fae5',
          filter: 'blur(140px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'fixed',
          right: -150,
          top: '35%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: '#dbeafe',
          filter: 'blur(140px)',
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '0 6vw',
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=2000&q=95"
            alt=""
            style={{
              width: '100%',
              height: '110%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: `translateY(${parallax}px) scale(${
                1 + scroll * 0.00015
              })`,
              filter:
                'brightness(1.08) saturate(1.08) contrast(1.02)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(247,247,245,.96) 0%, rgba(247,247,245,.88) 40%, rgba(247,247,245,.35) 100%)',
            }}
          />
        </div>

        {/* CONTENT */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            maxWidth: 760,
            opacity: loaded ? 1 : 0,
            transition: 'opacity .5s ease',
          }}
        >
          <div
            className="hero-word"
            style={{
              animationDelay: '.1s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                width: 50,
                height: 1,
                background: '#0f766e',
              }}
            />

            <span
              style={{
                fontSize: '.72rem',
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                color: '#0f766e',
                fontWeight: 600,
              }}
            >
              Sri Lanka • Western Province
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              lineHeight: 0.95,
              fontFamily: serif,
              letterSpacing: '-0.05em',
            }}
          >
            <div
              className="hero-word"
              style={{
                animationDelay: '.2s',
                fontSize: 'clamp(4rem,8vw,7rem)',
                fontWeight: 700,
                color: '#111827',
              }}
            >
              Discover
            </div>

            <div
              className="hero-word"
              style={{
                animationDelay: '.35s',
                fontSize: 'clamp(5rem,10vw,8.5rem)',
                fontWeight: 800,
                color: '#0f766e',
              }}
            >
              Watareka
            </div>

            <div
              className="hero-word"
              style={{
                animationDelay: '.5s',
                marginTop: '1.2rem',
                fontSize: 'clamp(1.2rem,2vw,1.8rem)',
                color: '#6b7280',
                fontWeight: 400,
                letterSpacing: '.01em',
              }}
            >
              the soul of Western Province
            </div>
          </h1>

          <p
            className="hero-word"
            style={{
              animationDelay: '.7s',
              marginTop: '2.5rem',
              maxWidth: 560,
              fontSize: '1.05rem',
              lineHeight: 1.9,
              color: '#6b7280',
              fontWeight: 400,
            }}
          >
            Temples that whisper centuries of faith. Markets
            buzzing with life. A community that opens its arms
            to every visitor.
          </p>

          {/* BUTTONS */}
          <div
            className="hero-word"
            style={{
              animationDelay: '.9s',
              display: 'flex',
              gap: '1.2rem',
              flexWrap: 'wrap',
              marginTop: '3rem',
            }}
          >
            <Link
              to="/map"
              onMouseEnter={() => {
                setHoverBtn('map')
                setCursorBig(true)
              }}
              onMouseLeave={() => {
                setHoverBtn(null)
                setCursorBig(false)
              }}
              style={{
                textDecoration: 'none',
                padding: '1rem 2.2rem',
                borderRadius: 18,
                background:
                  hoverBtn === 'map'
                    ? '#0b625b'
                    : '#0f766e',
                color: '#fff',
                fontWeight: 600,
                fontSize: '.9rem',
                letterSpacing: '.05em',
                transform:
                  hoverBtn === 'map'
                    ? 'translateY(-4px)'
                    : 'translateY(0)',
                transition:
                  'all .6s cubic-bezier(.19,1,.22,1)',
                boxShadow:
                  '0 20px 50px rgba(15,118,110,.2)',
              }}
            >
              Explore the Map →
            </Link>

            <Link
              to="/history"
              onMouseEnter={() => {
                setHoverBtn('history')
                setCursorBig(true)
              }}
              onMouseLeave={() => {
                setHoverBtn(null)
                setCursorBig(false)
              }}
              style={{
                textDecoration: 'none',
                padding: '1rem 2.2rem',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border:
                  '1px solid rgba(255,255,255,.9)',
                color: '#111827',
                fontWeight: 600,
                fontSize: '.9rem',
                transform:
                  hoverBtn === 'history'
                    ? 'translateY(-4px)'
                    : 'translateY(0)',
                transition:
                  'all .6s cubic-bezier(.19,1,.22,1)',
                boxShadow:
                  '0 10px 40px rgba(0,0,0,.06)',
              }}
            >
              Our History
            </Link>
          </div>
        </div>

        {/* FLOAT CARD */}
        <div
          style={{
            position: 'absolute',
            right: '6vw',
            bottom: '8vh',
            zIndex: 10,
            animation: 'floaty 7s ease-in-out infinite',
          }}
        >
          <div
            style={{
              width: 280,
              borderRadius: 30,
              background: 'rgba(255,255,255,0.68)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border:
                '1px solid rgba(255,255,255,0.9)',
              padding: '2rem',
              boxShadow:
                '0 30px 80px rgba(0,0,0,.08)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#10b981',
                }}
              />

              <span
                style={{
                  fontSize: '.72rem',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  fontWeight: 700,
                }}
              >
                City Overview
              </span>
            </div>

            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#111827',
                fontFamily: serif,
              }}
            >
              Watareka
            </div>

            <div
              style={{
                marginTop: '.3rem',
                color: '#6b7280',
                fontSize: '.85rem',
              }}
            >
              Western Province • Sri Lanka 🇱🇰
            </div>

            <div
              style={{
                marginTop: '1.8rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '.8rem',
              }}
            >
              {[
                ['~15k', 'People'],
                ['12+', 'Temples'],
                ['50+', 'Shops'],
                ['5+', 'Grounds'],
              ].map(([n, l]) => (
                <div
                  key={l}
                  style={{
                    background:
                      'rgba(255,255,255,0.6)',
                    borderRadius: 18,
                    padding: '.9rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#0f766e',
                    }}
                  >
                    {n}
                  </div>

                  <div
                    style={{
                      marginTop: '.2rem',
                      fontSize: '.65rem',
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: '#9ca3af',
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="section-reveal"
        style={{
          padding: '2rem 5vw',
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: 34,
            backdropFilter: 'blur(18px)',
            border:
              '1px solid rgba(255,255,255,.9)',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(180px,1fr))',
            gap: '1rem',
            boxShadow:
              '0 20px 60px rgba(0,0,0,.05)',
          }}
        >
          {stats.map(item => (
            <div
              key={item.l}
              style={{
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <div
                style={{
                  fontSize: '1.8rem',
                  marginBottom: '.6rem',
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  color: '#111827',
                }}
              >
                {item.n}
              </div>

              <div
                style={{
                  marginTop: '.2rem',
                  fontSize: '.72rem',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#9ca3af',
                }}
              >
                {item.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        style={{
          padding: '10rem 6vw',
        }}
      >
        <div
          style={{
            maxWidth: 1350,
            margin: '0 auto',
          }}
        >
          <div
            className="section-reveal"
            style={{
              marginBottom: '5rem',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 1,
                  background: '#0f766e',
                }}
              />

              <span
                style={{
                  fontSize: '.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '.2em',
                  color: '#0f766e',
                  fontWeight: 700,
                }}
              >
                Explore Watareka
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.8rem,5vw,5rem)',
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: '#111827',
                maxWidth: 760,
                margin: 0,
                fontFamily: serif,
              }}
            >
              Discover every part of the city through
              beautifully curated experiences
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill,minmax(320px,1fr))',
              gap: '2rem',
            }}
          >
            {categories.map((cat, i) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="lux-card section-reveal"
                onMouseEnter={() => {
                  setHover(cat.path)
                  setCursorBig(true)
                }}
                onMouseLeave={() => {
                  setHover(null)
                  setCursorBig(false)
                }}
                style={{
                  textDecoration: 'none',
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    height: 260,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={cat.img}
                    alt={cat.label}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,.45), transparent)',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: 18,
                      left: 18,
                      background:
                        'rgba(255,255,255,.75)',
                      backdropFilter: 'blur(10px)',
                      padding: '.5rem .9rem',
                      borderRadius: 999,
                      fontSize: '.68rem',
                      fontWeight: 700,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: cat.color,
                    }}
                  >
                    {cat.tag}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      right: 18,
                      bottom: 18,
                      fontSize: '2rem',
                    }}
                  >
                    {cat.emoji}
                  </div>
                </div>

                <div className="shine" />

                <div
                  style={{
                    padding: '1.8rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '.6rem',
                    }}
                  >
                    {cat.label}
                  </div>

                  <div
                    style={{
                      color: '#6b7280',
                      lineHeight: 1.8,
                      fontSize: '.95rem',
                    }}
                  >
                    {cat.desc}
                  </div>

                  <div
                    style={{
                      marginTop: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      color: cat.color,
                      fontWeight: 700,
                      fontSize: '.9rem',
                    }}
                  >
                    Explore

                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        background:
                          'rgba(255,255,255,.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform:
                          hover === cat.path
                            ? 'translateX(6px)'
                            : 'translateX(0)',
                        transition:
                          'all .6s cubic-bezier(.19,1,.22,1)',
                      }}
                    >
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}