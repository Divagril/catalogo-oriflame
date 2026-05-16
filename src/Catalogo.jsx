import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import './Catalogo.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pagina = React.forwardRef(({ pageNumber, width, height }, ref) => {
  return (
    <div ref={ref} className="pagina-pdf">
      <Page 
        pageNumber={pageNumber} 
        width={width}
        height={height}
        renderTextLayer={false} 
        renderAnnotationLayer={false}
      />
    </div>
  );
});

export default function Catalogo() {
  const [numPages, setNumPages] = useState(null);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const calc = () => {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const móvil = winW < 1024;
      setIsMobile(móvil);

      let h, w;
      if (móvil) {
        w = winW * 0.95; 
        h = w / 0.707;
        if (h > winH * 0.6) {
          h = winH * 0.6;
          w = h * 0.707;
        }
      } else {
        h = winH * 0.85;
        w = h * 0.707;
      }
      setDim({ w, h });
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const link = "https://wa.me/51931940598?text=Hola! Quiero hacer un pedido del catálogo Oriflame 🌸";

  return (
    <div className={`viewport-catalogo ${isMobile ? 'mobile-theme' : 'pc-theme'}`}>
      
      {isMobile && (
        <header className="mobile-header">
          <div className="menu-icon">☰</div>
          <div className="logo-oriflame">ORIFLAME <span>SWEDEN</span></div>
          <a href={link} className="header-wa-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" />
          </a>
        </header>
      )}

      {!isMobile && (
        <aside className="sidebar side-left">
          <div className="promo-box">
            <span className="emoji">💄</span>
            <p>Belleza <br/><span>QUE ENAMORA</span></p>
          </div>
          <div className="promo-box">
            <span className="emoji">📦</span>
            <p>Envíos a <br/><span>TODO PERÚ 🇵🇪</span></p>
          </div>
          <div className="wa-number-box">931 940 598</div>
        </aside>
      )}

      <main className="area-principal">
        <div className="libro-container">
          <Document file="/catalogo.pdf" onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {numPages && dim.w > 0 && (
              <HTMLFlipBook 
                width={dim.w} 
                height={dim.h} 
                size="fixed"
                showCover={!isMobile} 
                usePortrait={isMobile}
                drawShadow={true}
                className="flipbook-real"
                startPage={0}
              >
                {Array.from(new Array(numPages), (e, i) => (
                  <Pagina key={i} pageNumber={i + 1} width={dim.w} height={dim.h} />
                ))}
              </HTMLFlipBook>
            )}
          </Document>
        </div>

        {isMobile && (
          <section className="mobile-extra">
            <div className="grid-beneficios">
              <div className="b-item"><span>🍃</span><b>INGREDIENTES</b><p>Fórmulas seguras</p></div>
              <div className="b-item"><span>🔬</span><b>CIENCIA</b><p>Y Naturaleza</p></div>
              <div className="b-item"><span>❤️</span><b>PROPÓSITO</b><p>Empoderamos</p></div>
              <div className="b-item"><span>🎁</span><b>REGALOS</b><p>Para mamá</p></div>
            </div>
            
            <div className="cta-mobile">
              <h3>Encuentra el regalo perfecto</h3>
              <p>Explora y elige lo que más le hará sonreír.</p>
            </div>

            <div className="footer-actions-mobile">
              <a href={link} className="pink-btn">ESCRÍBEME AHORA</a>
            </div>
          </section>
        )}
      </main>

      {!isMobile && (
        <aside className="sidebar side-right">
          <div className="promo-box">
            <span className="emoji">🔥</span>
            <p>OFERTA <br/><span>LIMITADA</span></p>
          </div>
          <div className="promo-box">
            <span className="emoji">🎁</span>
            <p>Descuento <br/><span>POR INBOX</span></p>
          </div>
          <a href={link} className="btn-glossy-pc pink">ESCRÍBEME AHORA</a>
        </aside>
      )}
    </div>
  );
}
