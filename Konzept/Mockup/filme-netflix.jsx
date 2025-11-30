import React, { useState, useRef } from 'react';

const filme = [
  {
    id: 1,
    titel: "Midnight Echo",
    genre: "Thriller",
    dauer: "127 Min",
    fsk: "16",
    rating: "9.4",
    jahr: "2024",
    featured: true,
    zeiten: ["14:30", "17:15", "20:00", "22:45"],
    beschreibung: "Ein brillanter Detektiv wird in einen Albtraum gezogen, als er einen Serienmörder verfolgt, dessen verstörende Muster auf seine eigene verdrängte Vergangenheit weisen. Ein nervenaufreibender Thriller, der Sie bis zur letzten Minute in Atem hält.",
    farbe: "#1a1a1a"
  },
  {
    id: 2,
    titel: "Sternenstaub",
    genre: "Sci-Fi",
    dauer: "142 Min",
    fsk: "12",
    rating: "9.1",
    jahr: "2024",
    zeiten: ["15:00", "18:30", "21:30"],
    beschreibung: "Die erste bemannte Mission zum Mars entdeckt Spuren einer längst vergessenen Zivilisation.",
    farbe: "#0a3d62"
  },
  {
    id: 3,
    titel: "Herzklopfen",
    genre: "Romanze",
    dauer: "98 Min",
    fsk: "0",
    rating: "7.8",
    jahr: "2024",
    zeiten: ["14:00", "16:30", "19:00", "21:15"],
    beschreibung: "Zwei Fremde verlieben sich während einer Zugfahrt quer durch Europa.",
    farbe: "#c44569"
  },
  {
    id: 4,
    titel: "Der letzte König",
    genre: "Action",
    dauer: "156 Min",
    fsk: "16",
    rating: "8.7",
    jahr: "2024",
    zeiten: ["17:00", "20:30"],
    beschreibung: "Ein gestürzter Monarch kämpft sich durch feindliches Territorium zurück zu seinem Thron.",
    farbe: "#e55039"
  },
  {
    id: 5,
    titel: "Traumfänger",
    genre: "Fantasy",
    dauer: "118 Min",
    fsk: "6",
    rating: "8.2",
    jahr: "2024",
    zeiten: ["13:30", "16:00", "18:45", "21:00"],
    beschreibung: "Ein junges Mädchen entdeckt, dass sie in die Träume anderer Menschen reisen kann.",
    farbe: "#6c5ce7"
  },
  {
    id: 6,
    titel: "Schatten der Vergangenheit",
    genre: "Drama",
    dauer: "134 Min",
    fsk: "12",
    rating: "9.0",
    jahr: "2024",
    zeiten: ["15:30", "19:15", "22:00"],
    beschreibung: "Eine Familiengeschichte über drei Generationen, die dunkle Geheimnisse ans Licht bringt.",
    farbe: "#2c3e50"
  },
  {
    id: 7,
    titel: "Lachflash",
    genre: "Komödie",
    dauer: "95 Min",
    fsk: "6",
    rating: "7.5",
    jahr: "2024",
    zeiten: ["14:15", "16:45", "19:30", "21:45"],
    beschreibung: "Ein Comedian mit Lampenfieber muss die Show seines Lebens abliefern.",
    farbe: "#e17055"
  },
  {
    id: 8,
    titel: "Ozean der Stille",
    genre: "Horror",
    dauer: "109 Min",
    fsk: "18",
    rating: "8.0",
    jahr: "2023",
    zeiten: ["22:30", "00:15"],
    beschreibung: "Eine Forschungsstation am Meeresgrund wird von etwas Unbekanntem heimgesucht.",
    farbe: "#2d3436"
  },
  {
    id: 9,
    titel: "Neonlichter",
    genre: "Thriller",
    dauer: "121 Min",
    fsk: "16",
    rating: "8.5",
    jahr: "2024",
    zeiten: ["19:00", "21:45"],
    beschreibung: "In den neonbeleuchteten Straßen Tokios jagt eine Hackerin einen gefährlichen Kriminellen.",
    farbe: "#d63031"
  },
  {
    id: 10,
    titel: "Galaxie 7",
    genre: "Sci-Fi",
    dauer: "138 Min",
    fsk: "12",
    rating: "8.8",
    jahr: "2024",
    zeiten: ["16:00", "19:30", "22:15"],
    beschreibung: "Eine Raumstation am Rand des bekannten Universums empfängt ein mysteriöses Signal.",
    farbe: "#00cec9"
  },
  {
    id: 11,
    titel: "Ewige Flamme",
    genre: "Romanze",
    dauer: "112 Min",
    fsk: "6",
    rating: "8.1",
    jahr: "2024",
    zeiten: ["14:30", "17:00", "19:45"],
    beschreibung: "Nach 30 Jahren treffen sich zwei ehemalige Liebende zufällig in Paris wieder.",
    farbe: "#fd79a8"
  },
  {
    id: 12,
    titel: "Donnergrollen",
    genre: "Action",
    dauer: "144 Min",
    fsk: "16",
    rating: "8.4",
    jahr: "2024",
    zeiten: ["15:30", "18:45", "21:30"],
    beschreibung: "Ein Ex-Soldat muss seine Familie vor einer internationalen Verbrecherorganisation retten.",
    farbe: "#636e72"
  },
  {
    id: 13,
    titel: "Der Zauberlehrling",
    genre: "Fantasy",
    dauer: "126 Min",
    fsk: "6",
    rating: "8.6",
    jahr: "2024",
    zeiten: ["13:00", "15:45", "18:30"],
    beschreibung: "Ein junger Waise entdeckt, dass er magische Kräfte besitzt und wird an einer geheimen Akademie aufgenommen.",
    farbe: "#a29bfe"
  },
  {
    id: 14,
    titel: "Stille Wasser",
    genre: "Drama",
    dauer: "148 Min",
    fsk: "12",
    rating: "9.2",
    jahr: "2024",
    zeiten: ["16:30", "20:00"],
    beschreibung: "Ein Fischer kämpft mit den Folgen einer Umweltkatastrophe, die sein Dorf zerstört hat.",
    farbe: "#74b9ff"
  },
  {
    id: 15,
    titel: "Chaos pur",
    genre: "Komödie",
    dauer: "102 Min",
    fsk: "12",
    rating: "7.9",
    jahr: "2024",
    zeiten: ["14:00", "16:30", "19:00", "21:30"],
    beschreibung: "Drei völlig unterschiedliche WG-Mitbewohner müssen zusammen ein Restaurant retten.",
    farbe: "#fdcb6e"
  },
  {
    id: 16,
    titel: "Der Fluch",
    genre: "Horror",
    dauer: "98 Min",
    fsk: "18",
    rating: "7.7",
    jahr: "2024",
    zeiten: ["22:00", "00:30"],
    beschreibung: "Eine Familie zieht in ein altes Herrenhaus, ohne zu wissen, welches Grauen dort lauert.",
    farbe: "#1e272e"
  }
];

const kategorien = [
  { name: "Beliebt bei unseren Gästen", filter: (f) => parseFloat(f.rating) >= 8.5 },
  { name: "Action & Abenteuer", filter: (f) => f.genre === "Action" || f.genre === "Fantasy" },
  { name: "Thriller & Horror", filter: (f) => f.genre === "Thriller" || f.genre === "Horror" },
  { name: "Sci-Fi & Fantasy", filter: (f) => f.genre === "Sci-Fi" || f.genre === "Fantasy" },
  { name: "Romantik & Drama", filter: (f) => f.genre === "Romanze" || f.genre === "Drama" },
  { name: "Zum Lachen", filter: (f) => f.genre === "Komödie" },
  { name: "Neu im Programm", filter: (f) => f.jahr === "2024" }
];

const genreIcons = {
  "Thriller": "🔍",
  "Sci-Fi": "🚀",
  "Romanze": "💕",
  "Action": "💥",
  "Fantasy": "✨",
  "Drama": "🎭",
  "Komödie": "😂",
  "Horror": "👻"
};

// Poster Placeholder Component
function PosterPlaceholder({ film, height = "300px", width = "100%" }) {
  return (
    <div style={{
      width: width,
      height: height,
      background: `linear-gradient(145deg, ${film.farbe} 0%, ${film.farbe}dd 50%, ${film.farbe}99 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.1)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.1)'
      }} />
      
      {/* Film Reel Icon */}
      <div style={{
        fontSize: '50px',
        marginBottom: '15px',
        opacity: 0.9
      }}>
        {genreIcons[film.genre] || "🎬"}
      </div>
      
      {/* Film Title */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '22px',
        color: '#fff',
        textAlign: 'center',
        padding: '0 15px',
        letterSpacing: '2px',
        lineHeight: '1.2',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        {film.titel}
      </div>
      
      {/* Genre */}
      <div style={{
        marginTop: '10px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.7)',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        {film.genre}
      </div>

      {/* Film Strip Decoration */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '20px',
        background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 10px, transparent 10px, transparent 20px)'
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '20px',
        background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 10px, transparent 10px, transparent 20px)'
      }} />
    </div>
  );
}

// Hero Backdrop Placeholder
function HeroPlaceholder({ film }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(135deg, ${film.farbe} 0%, #1a1a1a 100%)`,
      overflow: 'hidden'
    }}>
      {/* Large decorative circles */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '4px solid rgba(253,205,31,0.2)'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        border: '4px solid rgba(253,205,31,0.15)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '25%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(253,205,31,0.1)'
      }} />
      
      {/* Large Icon */}
      <div style={{
        position: 'absolute',
        right: '15%',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '180px',
        opacity: 0.15
      }}>
        {genreIcons[film.genre] || "🎬"}
      </div>
      
      {/* Film strip patterns */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '40%',
        width: '60px',
        height: '100%',
        background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 30px, transparent 30px, transparent 60px)',
        transform: 'skewX(-15deg)'
      }} />
    </div>
  );
}

function FilmRow({ titel, filme, onFilmClick }) {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 800;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeft(rowRef.current.scrollLeft > 0);
      setShowRight(
        rowRef.current.scrollLeft < rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
      );
    }
  };

  return (
    <div style={{ marginBottom: '50px', position: 'relative' }}>
      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '22px',
        fontWeight: '700',
        color: '#1a1a1a',
        margin: '0 0 20px 60px',
        letterSpacing: '0.5px'
      }}>
        {titel}
      </h3>
      
      <div style={{ position: 'relative' }}>
        {/* Scroll Left Button */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="scroll-btn"
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#1a1a1a',
              color: '#FDCD1F',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            ‹
          </button>
        )}
        
        {/* Scroll Right Button */}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="scroll-btn"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#1a1a1a',
              color: '#FDCD1F',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            ›
          </button>
        )}

        {/* Film Row */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            gap: '15px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '10px 60px',
            scrollSnapType: 'x mandatory'
          }}
        >
          {filme.map((film, index) => (
            <div
              key={film.id}
              className="film-card"
              onClick={() => onFilmClick(film)}
              style={{
                flexShrink: 0,
                width: '200px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                scrollSnapAlign: 'start',
                animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`,
                opacity: 0
              }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}>
                <PosterPlaceholder film={film} height="300px" />
                
                <div className="card-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '15px'
                }}>
                  <p style={{
                    color: '#fff',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    margin: '0 0 10px 0',
                    lineHeight: '1.4'
                  }}>
                    {film.beschreibung.substring(0, 80)}...
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    {film.zeiten.slice(0, 3).map(zeit => (
                      <span key={zeit} style={{
                        background: '#FDCD1F',
                        color: '#1a1a1a',
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        borderRadius: '4px'
                      }}>
                        {zeit}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Rating Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#FDCD1F',
                  color: '#1a1a1a',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '700',
                  fontFamily: "'Outfit', sans-serif",
                  zIndex: 2
                }}>
                  ★ {film.rating}
                </div>
              </div>
              
              <h4 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: '12px 0 4px 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {film.titel}
              </h4>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '12px',
                color: '#666',
                margin: 0
              }}>
                {film.genre} · {film.dauer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FilmeNetflix() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const featuredFilm = filme.find(f => f.featured);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FDCD1F',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        ::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .film-card:hover {
          transform: scale(1.08);
          z-index: 5;
        }
        
        .film-card:hover .card-overlay {
          opacity: 1;
        }
        
        .scroll-btn:hover {
          transform: translateY(-50%) scale(1.1);
          background: #FDCD1F;
          color: #1a1a1a;
        }
        
        .hero-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        
        .modal-zeit:hover {
          background: #1a1a1a !important;
          color: #FDCD1F !important;
        }
      `}</style>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'linear-gradient(to bottom, rgba(253,205,31,1) 0%, rgba(253,205,31,0) 100%)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            width: '45px',
            height: '45px',
            background: '#1a1a1a',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            🎬
          </div>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '32px',
            letterSpacing: '3px',
            color: '#1a1a1a'
          }}>
            KINO CENTRAL
          </span>
        </div>
        <nav style={{
          display: 'flex',
          gap: '35px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', borderBottom: '2px solid #1a1a1a', paddingBottom: '4px' }}>Filme</a>
          <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', opacity: 0.7 }}>Programm</a>
          <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', opacity: 0.7 }}>Events</a>
          <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', opacity: 0.7 }}>Kontakt</a>
        </nav>
      </header>

      {/* Hero Section - Featured Film */}
      <section style={{
        height: '85vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Placeholder */}
        <HeroPlaceholder film={featuredFilm} />
        
        {/* Yellow Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(253,205,31,0.95) 0%, rgba(253,205,31,0.7) 40%, rgba(253,205,31,0.3) 70%, transparent 100%)'
        }} />
        
        {/* Bottom Gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, #FDCD1F 0%, transparent 100%)'
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 60px',
          paddingTop: '80px'
        }}>
          <div style={{
            maxWidth: '650px',
            animation: 'slideUp 1s ease-out'
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#1a1a1a',
              color: '#FDCD1F',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '25px'
            }}>
              <span style={{ fontSize: '14px' }}>🏆</span>
              Top Empfehlung der Woche
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '90px',
              color: '#1a1a1a',
              lineHeight: '0.95',
              letterSpacing: '4px',
              marginBottom: '20px',
              textShadow: '4px 4px 0 rgba(255,255,255,0.3)'
            }}>
              {featuredFilm.titel}
            </h1>

            {/* Meta Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '25px',
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a1a1a'
            }}>
              <span style={{
                background: '#1a1a1a',
                color: '#FDCD1F',
                padding: '4px 10px',
                borderRadius: '4px',
                fontWeight: '700'
              }}>
                ★ {featuredFilm.rating}
              </span>
              <span>{featuredFilm.jahr}</span>
              <span>{featuredFilm.dauer}</span>
              <span style={{
                border: '2px solid #1a1a1a',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                FSK {featuredFilm.fsk}
              </span>
              <span style={{
                background: 'rgba(0,0,0,0.15)',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                {featuredFilm.genre}
              </span>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#1a1a1a',
              marginBottom: '35px',
              maxWidth: '550px'
            }}>
              {featuredFilm.beschreibung}
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              <button
                className="hero-btn"
                onClick={() => setSelectedFilm(featuredFilm)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '18px 35px',
                  background: '#1a1a1a',
                  color: '#FDCD1F',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>▶</span>
                Tickets buchen
              </button>
              <button
                className="hero-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '18px 35px',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#1a1a1a',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '18px' }}>ℹ</span>
                Mehr Infos
              </button>
            </div>

            {/* Spielzeiten Preview */}
            <div style={{ marginTop: '35px' }}>
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.6)',
                marginBottom: '12px'
              }}>
                Heute im Programm
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {featuredFilm.zeiten.map(zeit => (
                  <span key={zeit} style={{
                    background: 'rgba(0,0,0,0.15)',
                    padding: '10px 18px',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: '600'
                  }}>
                    {zeit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Film Categories */}
      <section style={{ paddingTop: '30px', paddingBottom: '80px' }}>
        {kategorien.map((kategorie, idx) => {
          const kategorieFilme = filme.filter(kategorie.filter);
          if (kategorieFilme.length === 0) return null;
          return (
            <FilmRow
              key={idx}
              titel={kategorie.name}
              filme={kategorieFilme}
              onFilmClick={setSelectedFilm}
            />
          );
        })}
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        padding: '50px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: '#FDCD1F' }}>
          <h4 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '28px',
            letterSpacing: '3px',
            marginBottom: '8px'
          }}>
            KINO CENTRAL
          </h4>
          <p style={{ fontSize: '14px', opacity: 0.7 }}>
            Musterstraße 123 · 12345 Berlin
          </p>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px' }}>
          <a href="#" style={{ color: '#FDCD1F', textDecoration: 'none', opacity: 0.7 }}>Impressum</a>
          <a href="#" style={{ color: '#FDCD1F', textDecoration: 'none', opacity: 0.7 }}>Datenschutz</a>
          <a href="#" style={{ color: '#FDCD1F', textDecoration: 'none', opacity: 0.7 }}>Kontakt</a>
        </div>
      </footer>

      {/* Film Detail Modal */}
      {selectedFilm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '40px',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => setSelectedFilm(null)}
        >
          <div
            style={{
              background: '#FDCD1F',
              borderRadius: '16px',
              maxWidth: '950px',
              width: '100%',
              display: 'flex',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Poster Placeholder */}
            <div style={{ width: '350px', flexShrink: 0 }}>
              <PosterPlaceholder film={selectedFilm} height="520px" />
            </div>
            
            {/* Content */}
            <div style={{ padding: '40px', flex: 1, position: 'relative' }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedFilm(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0,0,0,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {/* Genre Badge */}
              <span style={{
                display: 'inline-block',
                background: '#1a1a1a',
                color: '#FDCD1F',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}>
                {selectedFilm.genre}
              </span>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '56px',
                color: '#1a1a1a',
                lineHeight: '1',
                letterSpacing: '2px',
                marginBottom: '15px'
              }}>
                {selectedFilm.titel}
              </h2>

              {/* Meta */}
              <div style={{
                display: 'flex',
                gap: '20px',
                fontSize: '14px',
                color: '#333',
                marginBottom: '25px'
              }}>
                <span style={{
                  background: '#1a1a1a',
                  color: '#FDCD1F',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontWeight: '700'
                }}>
                  ★ {selectedFilm.rating}
                </span>
                <span>{selectedFilm.jahr}</span>
                <span>{selectedFilm.dauer}</span>
                <span>FSK {selectedFilm.fsk}</span>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#1a1a1a',
                marginBottom: '35px'
              }}>
                {selectedFilm.beschreibung}
              </p>

              {/* Spielzeiten */}
              <div>
                <p style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#666',
                  marginBottom: '15px'
                }}>
                  Vorstellungen heute
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {selectedFilm.zeiten.map(zeit => (
                    <button
                      key={zeit}
                      className="modal-zeit"
                      style={{
                        padding: '14px 24px',
                        background: 'rgba(0,0,0,0.1)',
                        border: '2px solid #1a1a1a',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {zeit} Uhr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
