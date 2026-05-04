import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inversión en Dividendos - Presentación",
  description: "Presentación sobre inversión en dividendos como fuente de ingresos pasivos",
};

export default function PresentacionDividendos() {
  return (
    <div className="presentation-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .presentation-root {
          font-family: 'Inter', sans-serif;
          background: #0f0f0f;
          min-height: 100vh;
          color: #1a1a1a;
        }

        .print-hint {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #059669;
          color: white;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(5,150,105,0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .slide {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 80px;
          position: relative;
          overflow: hidden;
          page-break-after: always;
          break-after: page;
        }

        /* ─── SLIDE 1: Portada ─── */
        .slide-cover {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%);
          color: white;
          align-items: flex-start;
        }
        .slide-cover::before {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }
        .slide-cover::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
        }
        .cover-tag {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: #a7f3d0;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 32px;
          display: inline-block;
        }
        .cover-title {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 24px;
          letter-spacing: -1.5px;
        }
        .cover-title span { color: #6ee7b7; }
        .cover-subtitle {
          font-size: 20px;
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          max-width: 560px;
          line-height: 1.6;
          margin-bottom: 56px;
        }
        .cover-meta {
          display: flex;
          gap: 40px;
        }
        .cover-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cover-meta-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .cover-meta-value {
          font-size: 16px;
          font-weight: 600;
          color: #a7f3d0;
        }
        .cover-icon {
          position: absolute;
          right: 80px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 180px;
          opacity: 0.12;
        }

        /* ─── SLIDE 2: El Problema ─── */
        .slide-problem {
          background: #fafafa;
        }
        .slide-dark {
          background: #111827;
          color: white;
        }
        .slide-light { background: #f9fafb; }
        .slide-green { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); }
        .slide-blue { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); }
        .slide-amber { background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); }

        .section-tag {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 16px;
          padding: 5px 14px;
          border-radius: 20px;
          display: inline-block;
        }
        .tag-red { background: #fee2e2; color: #dc2626; }
        .tag-green { background: #d1fae5; color: #059669; }
        .tag-blue { background: #dbeafe; color: #2563eb; }
        .tag-amber { background: #fef3c7; color: #d97706; }
        .tag-purple { background: #ede9fe; color: #7c3aed; }
        .tag-white { background: rgba(255,255,255,0.15); color: #a7f3d0; }

        .slide-title {
          font-size: 44px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 40px;
        }
        .slide-title-sm {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.8px;
          margin-bottom: 32px;
        }

        /* Problem slide */
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .problem-card {
          background: white;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .problem-card-bad {
          border-left: 4px solid #ef4444;
        }
        .problem-card-good {
          border-left: 4px solid #10b981;
        }
        .problem-emoji { font-size: 32px; margin-bottom: 12px; }
        .problem-card-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #111827;
        }
        .problem-card-text {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }
        .problem-highlight {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .problem-highlight-text {
          font-size: 17px;
          font-weight: 600;
          color: #991b1b;
        }

        /* Comparison table */
        .comparison-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 8px;
        }
        .comp-card {
          border-radius: 20px;
          padding: 32px;
        }
        .comp-card-bad {
          background: #fff1f2;
          border: 2px solid #fecdd3;
        }
        .comp-card-good {
          background: #f0fdf4;
          border: 2px solid #bbf7d0;
        }
        .comp-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .comp-icon { font-size: 28px; }
        .comp-title {
          font-size: 22px;
          font-weight: 800;
        }
        .comp-title-bad { color: #be123c; }
        .comp-title-good { color: #15803d; }
        .comp-list { list-style: none; }
        .comp-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          font-size: 15px;
          color: #374151;
          line-height: 1.5;
        }
        .comp-list li:last-child { border-bottom: none; }
        .comp-check { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

        /* What are dividends */
        .definition-box {
          background: white;
          border-radius: 20px;
          padding: 36px;
          border: 2px solid #d1fae5;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(5,150,105,0.08);
        }
        .definition-text {
          font-size: 20px;
          line-height: 1.7;
          color: #1f2937;
        }
        .definition-text strong { color: #059669; }

        .how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .how-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .how-step {
          width: 40px; height: 40px;
          background: #059669;
          color: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 18px;
          margin: 0 auto 16px;
        }
        .how-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .how-card-text {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.55;
        }

        /* Metrics */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .metric-card {
          background: white;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .metric-name {
          font-size: 13px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
        .metric-value {
          font-size: 32px;
          font-weight: 900;
          color: #059669;
          margin-bottom: 8px;
        }
        .metric-label {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .metric-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.55;
        }
        .metric-example {
          margin-top: 12px;
          padding: 10px 14px;
          background: #f0fdf4;
          border-radius: 8px;
          font-size: 13px;
          color: #065f46;
          font-weight: 500;
        }

        /* Companies */
        .companies-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .company-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
          overflow: hidden;
        }
        .company-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
        }
        .accent-green::before { background: #059669; }
        .accent-blue::before { background: #2563eb; }
        .accent-purple::before { background: #7c3aed; }
        .accent-amber::before { background: #d97706; }
        .accent-red::before { background: #dc2626; }
        .accent-teal::before { background: #0891b2; }
        .company-ticker {
          font-size: 20px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 2px;
        }
        .company-name {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .company-sector {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 12px;
          background: #f3f4f6;
          color: #6b7280;
          display: inline-block;
          margin-bottom: 14px;
          font-weight: 600;
        }
        .company-yield {
          font-size: 28px;
          font-weight: 900;
          color: #059669;
        }
        .company-yield-label {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 500;
        }
        .company-note {
          font-size: 11px;
          color: #6b7280;
          margin-top: 8px;
          line-height: 1.4;
        }

        /* Simulation */
        .simulation-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .simulation-table {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .sim-table-header {
          background: #059669;
          color: white;
          padding: 16px 20px;
          font-weight: 700;
          font-size: 15px;
        }
        .sim-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 14px 20px;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
        }
        .sim-row:last-child { border-bottom: none; }
        .sim-row-header {
          background: #f9fafb;
          font-weight: 700;
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .sim-highlight {
          background: #f0fdf4;
          font-weight: 700;
        }
        .sim-col { }
        .sim-col-right { text-align: right; color: #059669; font-weight: 600; }
        .sim-col-center { text-align: center; }

        .result-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .result-card {
          border-radius: 16px;
          padding: 24px;
          text-align: center;
        }
        .result-card-monthly {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
        }
        .result-card-annual {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
        }
        .result-card-goal {
          background: white;
          border: 2px solid #d1fae5;
        }
        .result-amount {
          font-size: 42px;
          font-weight: 900;
          margin-bottom: 4px;
        }
        .result-label {
          font-size: 14px;
          opacity: 0.85;
          font-weight: 500;
        }
        .result-sublabel {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* Action Plan */
        .action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .action-phase {
          background: white;
          border-radius: 16px;
          padding: 28px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .phase-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .phase-number {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 16px;
          flex-shrink: 0;
        }
        .phase-n1 { background: #dcfce7; color: #15803d; }
        .phase-n2 { background: #dbeafe; color: #1d4ed8; }
        .phase-n3 { background: #fef3c7; color: #b45309; }
        .phase-n4 { background: #ede9fe; color: #6d28d9; }
        .phase-title { font-size: 16px; font-weight: 700; color: #111827; }
        .phase-time { font-size: 12px; color: #9ca3af; }
        .action-steps { list-style: none; }
        .action-steps li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
          font-size: 13px;
          color: #374151;
          line-height: 1.5;
        }
        .action-steps li:last-child { border-bottom: none; }
        .step-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #059669;
          margin-top: 6px;
          flex-shrink: 0;
        }

        /* Strategy */
        .strategy-wrapper {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 32px;
          align-items: start;
        }
        .criteria-list { list-style: none; }
        .criteria-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 18px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .criteria-item:last-child { border-bottom: none; }
        .criteria-icon {
          font-size: 24px;
          flex-shrink: 0;
        }
        .criteria-content { }
        .criteria-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 4px;
        }
        .criteria-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.55;
        }
        .avoid-box {
          background: #fef2f2;
          border: 2px solid #fecaca;
          border-radius: 16px;
          padding: 24px;
        }
        .avoid-title {
          font-size: 15px;
          font-weight: 700;
          color: #991b1b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .avoid-list { list-style: none; }
        .avoid-list li {
          display: flex;
          gap: 8px;
          padding: 8px 0;
          font-size: 13px;
          color: #7f1d1d;
          border-bottom: 1px solid #fee2e2;
          line-height: 1.45;
        }
        .avoid-list li:last-child { border-bottom: none; }

        /* Conclusion */
        .slide-conclusion {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
          color: white;
        }
        .conclusion-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 36px 0;
        }
        .conclusion-stat {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          padding: 28px 24px;
          text-align: center;
        }
        .conclusion-stat-value {
          font-size: 40px;
          font-weight: 900;
          color: #6ee7b7;
          margin-bottom: 8px;
        }
        .conclusion-stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          line-height: 1.4;
        }
        .conclusion-cta {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
          padding: 28px 36px;
          text-align: center;
        }
        .conclusion-cta-text {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }
        .conclusion-cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.65);
        }

        /* Page number */
        .page-num {
          position: absolute;
          bottom: 28px;
          right: 44px;
          font-size: 12px;
          color: rgba(0,0,0,0.25);
          font-weight: 500;
        }
        .page-num-light {
          color: rgba(255,255,255,0.3);
        }

        @media print {
          .print-hint { display: none !important; }
          .presentation-root { background: white; }
          .slide {
            page-break-after: always;
            break-after: page;
            min-height: 100vh;
          }
        }

        @page {
          size: A4 landscape;
          margin: 0;
        }
      `}</style>

      {/* Botón de impresión */}
      <button
        className="print-hint"
        onClick={() => window.print()}
      >
        <span>🖨️</span> Imprimir / Guardar PDF
      </button>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 1: PORTADA                           */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-cover">
        <div className="cover-icon">💸</div>
        <div className="cover-tag">📊 Presentación Financiera — 2025</div>
        <h1 className="cover-title">
          Inversión en<br /><span>Dividendos</span>
        </h1>
        <p className="cover-subtitle">
          Cómo construir una fuente de ingresos pasivos reales hoy,
          sin esperar 30 años a que madure un fondo indexado.
        </p>
        <div className="cover-meta">
          <div className="cover-meta-item">
            <span className="cover-meta-label">Objetivo</span>
            <span className="cover-meta-value">Ingresos pasivos YA</span>
          </div>
          <div className="cover-meta-item">
            <span className="cover-meta-label">Horizonte</span>
            <span className="cover-meta-value">Corto - medio plazo</span>
          </div>
          <div className="cover-meta-item">
            <span className="cover-meta-label">Perfil</span>
            <span className="cover-meta-value">30 años, motivados</span>
          </div>
        </div>
        <span className="page-num page-num-light">1 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 2: EL PROBLEMA                       */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-light">
        <div className="section-tag tag-red">El punto de partida</div>
        <h2 className="slide-title">¿Por qué NO nos vale un Fondo Indexado ahora mismo?</h2>
        <div className="problem-highlight">
          <span style={{ fontSize: 28 }}>⚠️</span>
          <p className="problem-highlight-text">
            Un fondo indexado tipo S&amp;P 500 necesita <strong>20-30 años</strong> para ver resultados realmente significativos.
            Con 30 años, queremos dinero trabajando <em>para nosotros hoy</em>, no a los 60.
          </p>
        </div>
        <div className="problem-grid">
          <div className="problem-card problem-card-bad">
            <div className="problem-emoji">📉</div>
            <div className="problem-card-title">Fondos indexados: lo que nadie te cuenta</div>
            <p className="problem-card-text">No recibes ningún ingreso durante los primeros 20 años. Todo el retorno está "atrapado" en el precio de la acción. Para sacar dinero tienes que <strong>vender</strong>, y si el mercado está bajo, vendes mal. Dependes 100% del timing del mercado.</p>
          </div>
          <div className="problem-card problem-card-bad">
            <div className="problem-emoji">⏳</div>
            <div className="problem-card-title">El problema del horizonte temporal</div>
            <p className="problem-card-text">Invertir en un índice a los 30 años está perfecto <em>si tu objetivo es la jubilación</em>. Pero si quieres libertad financiera antes, si quieres pagar la hipoteca, un viaje, o simplemente complementar tu sueldo en 5-10 años... los fondos indexados no son la herramienta.</p>
          </div>
          <div className="problem-card problem-card-good">
            <div className="problem-emoji">✅</div>
            <div className="problem-card-title">Lo que sí podemos hacer AHORA</div>
            <p className="problem-card-text">Construir una cartera de acciones que paguen dividendos regulares. Cada trimestre, dinero real entra en nuestra cuenta. Sin vender nada. Sin esperar décadas. El capital sigue creciendo <em>y</em> generamos ingresos al mismo tiempo.</p>
          </div>
          <div className="problem-card problem-card-good">
            <div className="problem-emoji">🎯</div>
            <div className="problem-card-title">Nuestro objetivo realista</div>
            <p className="problem-card-text">Con una inversión constante y disciplinada, en 5-8 años podemos tener una cartera que genere <strong>300-800€ al mes</strong> en dividendos. Ese dinero llega pase lo que pase en el mercado, sin vender ni una sola acción.</p>
          </div>
        </div>
        <span className="page-num">2 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 3: FONDOS vs DIVIDENDOS              */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide" style={{ background: '#f9fafb' }}>
        <div className="section-tag tag-blue">Comparativa</div>
        <h2 className="slide-title">Fondos Indexados vs Dividendos — Cara a cara</h2>
        <div className="comparison-wrapper">
          <div className="comp-card comp-card-bad">
            <div className="comp-header">
              <span className="comp-icon">📦</span>
              <div>
                <div className="comp-title comp-title-bad">Fondo Indexado</div>
                <div style={{ fontSize: 13, color: '#9f1239', marginTop: 2 }}>Ideal para jubilación a largo plazo</div>
              </div>
            </div>
            <ul className="comp-list">
              <li><span className="comp-check">❌</span>No recibes ingresos mientras mantienes la inversión</li>
              <li><span className="comp-check">❌</span>Para cobrar, tienes que vender participaciones</li>
              <li><span className="comp-check">❌</span>Si el mercado cae justo cuando necesitas el dinero, pierdes</li>
              <li><span className="comp-check">❌</span>Rentabilidad real visible solo a 15-30 años</li>
              <li><span className="comp-check">✅</span>Muy fácil y diversificado automáticamente</li>
              <li><span className="comp-check">✅</span>Comisiones muy bajas (0.05% - 0.20%)</li>
            </ul>
          </div>
          <div className="comp-card comp-card-good">
            <div className="comp-header">
              <span className="comp-icon">💰</span>
              <div>
                <div className="comp-title comp-title-good">Inversión en Dividendos</div>
                <div style={{ fontSize: 13, color: '#15803d', marginTop: 2 }}>Ingresos pasivos desde el primer año</div>
              </div>
            </div>
            <ul className="comp-list">
              <li><span className="comp-check">✅</span>Cobras dinero real cada trimestre / año</li>
              <li><span className="comp-check">✅</span>No tienes que vender nada para generar ingresos</li>
              <li><span className="comp-check">✅</span>Los dividendos se mantienen aunque el precio baje</li>
              <li><span className="comp-check">✅</span>Ingresos visibles y crecientes en 3-5 años</li>
              <li><span className="comp-check">✅</span>Empresas sólidas, maduras y estables</li>
              <li><span className="comp-check">⚠️</span>Requiere algo más de investigación y selección</li>
            </ul>
          </div>
        </div>
        <span className="page-num">3 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 4: QUÉ SON LOS DIVIDENDOS            */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-green">
        <div className="section-tag tag-green">Conceptos básicos</div>
        <h2 className="slide-title">¿Qué son los dividendos?</h2>
        <div className="definition-box">
          <p className="definition-text">
            Un dividendo es una <strong>parte del beneficio que una empresa reparte entre sus accionistas</strong>.
            Si eres dueño de acciones de esa empresa, recibes dinero en tu cuenta
            periódicamente (cada trimestre, semestre o año) <strong>solo por tener las acciones</strong>.
            No tienes que hacer nada más.
          </p>
        </div>
        <div className="how-grid">
          <div className="how-card">
            <div className="how-step">1</div>
            <div className="how-card-title">Compras acciones</div>
            <p className="how-card-text">Adquieres acciones de empresas sólidas que tienen un historial de pagar dividendos crecientes año tras año.</p>
          </div>
          <div className="how-card">
            <div className="how-step">2</div>
            <div className="how-card-title">La empresa gana dinero</div>
            <p className="how-card-text">La empresa hace su negocio normalmente. Cuando tiene beneficios, decide repartir una parte entre sus accionistas.</p>
          </div>
          <div className="how-card">
            <div className="how-step">3</div>
            <div className="how-card-title">Cobras tu parte</div>
            <p className="how-card-text">El dinero entra directamente en tu cuenta del bróker. Lo puedes reinvertir para comprar más acciones, o usarlo como quieras.</p>
          </div>
          <div className="how-card">
            <div className="how-step">4</div>
            <div className="how-card-title">Reinviertes (opcional)</div>
            <p className="how-card-text">Si reinviertes los dividendos compras más acciones → más dividendos el siguiente año. El efecto del interés compuesto se activa.</p>
          </div>
          <div className="how-card">
            <div className="how-step">5</div>
            <div className="how-card-title">La empresa sube el dividendo</div>
            <p className="how-card-text">Las mejores empresas suben su dividendo cada año durante décadas. Tu renta pasiva crece sola sin añadir más capital.</p>
          </div>
          <div className="how-card">
            <div className="how-step">6</div>
            <div className="how-card-title">Libertad financiera</div>
            <p className="how-card-text">En unos años, los dividendos cubren gastos reales: el seguro del coche, la compra, la hipoteca... sin trabajar para ello.</p>
          </div>
        </div>
        <span className="page-num">4 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 5: MÉTRICAS CLAVE                    */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-light">
        <div className="section-tag tag-purple">Lo que hay que mirar</div>
        <h2 className="slide-title">Las 4 métricas esenciales para elegir bien</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-name">Métrica #1</div>
            <div className="metric-value">4–6%</div>
            <div className="metric-label">Dividend Yield (Rentabilidad por dividendo)</div>
            <p className="metric-desc">Es el porcentaje que cobras al año sobre lo que inviertes. Un 5% significa que por cada 10.000€ invertidos cobras 500€/año solo en dividendos.</p>
            <div className="metric-example">⚠️ Evita yields &gt;8%: suelen ser trampas. La empresa puede estar en problemas.</div>
          </div>
          <div className="metric-card">
            <div className="metric-name">Métrica #2</div>
            <div className="metric-value">&lt;70%</div>
            <div className="metric-label">Payout Ratio (Ratio de pago)</div>
            <p className="metric-desc">Porcentaje del beneficio que la empresa dedica a pagar dividendos. Si es menor al 70% significa que la empresa gana mucho más de lo que paga, el dividendo es sostenible.</p>
            <div className="metric-example">✅ Ideal: entre 40% y 65%. Margen para crecer sin problemas.</div>
          </div>
          <div className="metric-card">
            <div className="metric-name">Métrica #3</div>
            <div className="metric-value">+5 años</div>
            <div className="metric-label">Historial de dividendos crecientes</div>
            <p className="metric-desc">Empresas que llevan años subiendo su dividendo demuestran estabilidad real. En EE.UU. existen los "Dividend Aristocrats": empresas que llevan +25 años subiéndolo cada año.</p>
            <div className="metric-example">🏆 Ejemplo: Coca-Cola lleva más de 60 años subiendo el dividendo.</div>
          </div>
          <div className="metric-card">
            <div className="metric-name">Métrica #4</div>
            <div className="metric-value">5–10%</div>
            <div className="metric-label">DGR — Dividend Growth Rate (Tasa de crecimiento)</div>
            <p className="metric-desc">A qué ritmo crece el dividendo cada año. Una empresa que sube un 7% anual dobla tu renta en 10 años sin que pongas un euro más. Esto es el secreto del largo plazo.</p>
            <div className="metric-example">📈 Con 7% de crecimiento: 300€/mes hoy → 590€/mes en 10 años.</div>
          </div>
        </div>
        <span className="page-num">5 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 6: EMPRESAS EJEMPLO                  */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-light">
        <div className="section-tag tag-blue">Referencias reales</div>
        <h2 className="slide-title">Empresas sólidas con dividendos históricos</h2>
        <div className="companies-grid">
          <div className="company-card accent-red">
            <div className="company-ticker">KO</div>
            <div className="company-name">The Coca-Cola Company</div>
            <div className="company-sector">Consumo básico</div>
            <div className="company-yield">~3.1%</div>
            <div className="company-yield-label">Dividend Yield actual</div>
            <p className="company-note">+62 años subiendo dividendo sin parar. El ejemplo definitivo de estabilidad. Buffett la tiene en cartera desde 1988.</p>
          </div>
          <div className="company-card accent-blue">
            <div className="company-ticker">JNJ</div>
            <div className="company-name">Johnson & Johnson</div>
            <div className="company-sector">Salud</div>
            <div className="company-yield">~3.3%</div>
            <div className="company-yield-label">Dividend Yield actual</div>
            <p className="company-note">+60 años aumentando el dividendo. Sector salud, prácticamente a prueba de crisis. Dividend King.</p>
          </div>
          <div className="company-card accent-purple">
            <div className="company-ticker">ABBV</div>
            <div className="company-name">AbbVie</div>
            <div className="company-sector">Farmacéutica</div>
            <div className="company-yield">~3.8%</div>
            <div className="company-yield-label">Dividend Yield actual</div>
            <p className="company-note">Alto yield con crecimiento sólido. Fuerte pipeline de productos. Payout sostenible y en crecimiento acelerado.</p>
          </div>
          <div className="company-card accent-amber">
            <div className="company-ticker">REP</div>
            <div className="company-name">Repsol</div>
            <div className="company-sector">Energía · España</div>
            <div className="company-yield">~7.5%</div>
            <div className="company-yield-label">Dividend Yield actual</div>
            <p className="company-note">Empresa española, sin retención adicional en dividendos. Alto yield con política de scrip dividend. Opción para inversores en España.</p>
          </div>
          <div className="company-card accent-teal">
            <div className="company-ticker">ITX</div>
            <div className="company-name">Inditex (Zara)</div>
            <div className="company-sector">Textil · España</div>
            <div className="company-yield">~3.5%</div>
            <div className="company-yield-label">Dividend Yield actual</div>
            <p className="company-note">La empresa más conocida en España. Dividendo creciente, balance impecable, sin deuda neta. Sin retención adicional para residentes en España.</p>
          </div>
          <div className="company-card accent-green">
            <div className="company-ticker">REALTY</div>
            <div className="company-name">Realty Income (O)</div>
            <div className="company-sector">REIT · Inmuebles</div>
            <div className="company-yield">~5.8%</div>
            <div className="company-yield-label">Dividend Yield actual</div>
            <p className="company-note">"The Monthly Dividend Company". Paga dividendo mensual, no trimestral. +25 años de aumentos consecutivos. Ideal para ver el ingreso mes a mes.</p>
          </div>
        </div>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 16, textAlign: 'center' }}>
          * Yields aproximados a 2025. Consulta siempre datos actualizados antes de invertir. Esto no es asesoramiento financiero.
        </p>
        <span className="page-num">6 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 7: ESTRATEGIA DE SELECCIÓN           */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-green">
        <div className="section-tag tag-green">Cómo elegir</div>
        <h2 className="slide-title-sm">¿Qué criterios seguimos para elegir las empresas?</h2>
        <div className="strategy-wrapper">
          <div>
            <ul className="criteria-list">
              <li className="criteria-item">
                <span className="criteria-icon">📈</span>
                <div className="criteria-content">
                  <div className="criteria-title">Historial mínimo de 5 años subiendo el dividendo</div>
                  <p className="criteria-desc">Una empresa que lleva 5 años o más subiendo el dividendo sin interrupciones demuestra que tiene un modelo de negocio estable y que la directiva tiene una política clara de remuneración al accionista.</p>
                </div>
              </li>
              <li className="criteria-item">
                <span className="criteria-icon">🛡️</span>
                <div className="criteria-content">
                  <div className="criteria-title">Payout ratio por debajo del 70%</div>
                  <p className="criteria-desc">Queremos que la empresa gane bastante más de lo que paga. Así el dividendo tiene margen para sostenerse incluso si los beneficios bajan un año puntual (crisis, pandemia, etc.).</p>
                </div>
              </li>
              <li className="criteria-item">
                <span className="criteria-icon">💵</span>
                <div className="criteria-content">
                  <div className="criteria-title">Yield entre 3% y 7%</div>
                  <p className="criteria-desc">Yields menores al 3% generan poco ingreso al principio. Yields mayores al 7-8% suelen ser señal de que el mercado desconfía y el dividendo puede recortarse. El punto dulce está en ese rango.</p>
                </div>
              </li>
              <li className="criteria-item">
                <span className="criteria-icon">🏗️</span>
                <div className="criteria-content">
                  <div className="criteria-title">Sectores resistentes a las crisis</div>
                  <p className="criteria-desc">Consumo básico, salud, utilities (agua, luz, gas), telecomunicaciones e inmobiliario (REITs). Son sectores donde la gente sigue gastando aunque la economía vaya mal.</p>
                </div>
              </li>
              <li className="criteria-item">
                <span className="criteria-icon">🌍</span>
                <div className="criteria-content">
                  <div className="criteria-title">Diversificación geográfica y sectorial</div>
                  <p className="criteria-desc">No poner todo en España ni en un solo sector. Mezclar empresas europeas, americanas, y de distintos sectores reduce el riesgo sin reducir la rentabilidad media.</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div className="avoid-box">
              <div className="avoid-title">⛔ Qué evitar</div>
              <ul className="avoid-list">
                <li><span>🚩</span>Yields superiores al 8-9% sin justificación clara</li>
                <li><span>🚩</span>Empresas que recortaron el dividendo en el pasado reciente sin causa mayor</li>
                <li><span>🚩</span>Payout ratio superior al 85-90%</li>
                <li><span>🚩</span>Deuda excesiva en balance (D/E &gt; 2x en sectores no financieros)</li>
                <li><span>🚩</span>Empresas sin beneficios reales sostenidos</li>
                <li><span>🚩</span>Concentrar más del 15% en una sola empresa</li>
              </ul>
            </div>
          </div>
        </div>
        <span className="page-num">7 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 8: SIMULACIÓN                        */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-light">
        <div className="section-tag tag-amber">Números reales</div>
        <h2 className="slide-title">¿Cuánto podemos generar? Simulación con 200€/mes</h2>
        <div className="simulation-wrapper">
          <div>
            <div className="simulation-table">
              <div className="sim-table-header">Reinvirtiendo dividendos · Yield medio: 4.5% · Crecimiento: 6%/año</div>
              <div className="sim-row sim-row-header">
                <span className="sim-col">Año</span>
                <span className="sim-col-center">Capital acumulado</span>
                <span className="sim-col-right">Dividendo anual</span>
              </div>
              <div className="sim-row">
                <span className="sim-col">Año 1</span>
                <span className="sim-col-center">2.400€</span>
                <span className="sim-col-right">108€</span>
              </div>
              <div className="sim-row">
                <span className="sim-col">Año 2</span>
                <span className="sim-col-center">4.908€</span>
                <span className="sim-col-right">230€</span>
              </div>
              <div className="sim-row">
                <span className="sim-col">Año 3</span>
                <span className="sim-col-center">7.546€</span>
                <span className="sim-col-right">363€</span>
              </div>
              <div className="sim-row">
                <span className="sim-col">Año 4</span>
                <span className="sim-col-center">10.321€</span>
                <span className="sim-col-right">509€</span>
              </div>
              <div className="sim-row">
                <span className="sim-col">Año 5</span>
                <span className="sim-col-center">13.242€</span>
                <span className="sim-col-right">667€</span>
              </div>
              <div className="sim-row sim-highlight">
                <span className="sim-col">Año 7</span>
                <span className="sim-col-center">19.680€</span>
                <span className="sim-col-right">1.024€</span>
              </div>
              <div className="sim-row sim-highlight">
                <span className="sim-col">Año 10</span>
                <span className="sim-col-center">31.200€</span>
                <span className="sim-col-right">1.830€</span>
              </div>
            </div>
            <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 12 }}>
              * Simulación orientativa. Reinvirtiendo dividendos y con crecimiento del dividendo del 6% anual. No incluye impuestos ni comisiones.
            </p>
          </div>
          <div className="result-cards">
            <div className="result-card result-card-monthly">
              <div className="result-amount">152€</div>
              <div className="result-label">al mes en dividendos en el Año 5</div>
            </div>
            <div className="result-card result-card-annual">
              <div className="result-amount">1.830€</div>
              <div className="result-label">al año en dividendos en el Año 10</div>
            </div>
            <div className="result-card result-card-goal" style={{ border: '2px solid #d1fae5', padding: '20px 24px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#065f46', marginBottom: 8 }}>🎯 La clave del plan</div>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                Con solo <strong>200€/mes</strong> de aportación, en 10 años generamos más de <strong>150€/mes en dividendos</strong>.
                Si en algún momento podemos subir a 400€/mes o reinvertir bonus, la curva se acelera exponencialmente.
              </p>
            </div>
          </div>
        </div>
        <span className="page-num">8 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 9: PLAN DE ACCIÓN                    */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-light">
        <div className="section-tag tag-green">Próximos pasos</div>
        <h2 className="slide-title">Plan de acción: ¿por dónde empezamos?</h2>
        <div className="action-grid">
          <div className="action-phase">
            <div className="phase-header">
              <div className="phase-number phase-n1">1</div>
              <div>
                <div className="phase-title">Preparar las herramientas</div>
                <div className="phase-time">Semanas 1-2</div>
              </div>
            </div>
            <ul className="action-steps">
              <li><span className="step-dot"></span>Abrir una cuenta en un bróker fiable: DEGIRO, Interactive Brokers o MyInvestor</li>
              <li><span className="step-dot"></span>Configurar la cuenta a nombre de ambos o estudiar opciones fiscales</li>
              <li><span className="step-dot"></span>Crear una hoja de cálculo para rastrear dividendos y rentabilidad</li>
              <li><span className="step-dot"></span>Definir qué cantidad mensual podemos aportar sin comprometer el día a día</li>
            </ul>
          </div>
          <div className="action-phase">
            <div className="phase-header">
              <div className="phase-number phase-n2">2</div>
              <div>
                <div className="phase-title">Primera cartera (arranque)</div>
                <div className="phase-time">Meses 1-3</div>
              </div>
            </div>
            <ul className="action-steps">
              <li><span className="step-dot"></span>Empezar con 3-5 empresas muy conocidas y sólidas (ej: KO, JNJ, ITX)</li>
              <li><span className="step-dot"></span>No meter más del 20-25% en una sola empresa al principio</li>
              <li><span className="step-dot"></span>Comprar en tramos, no de golpe (técnica DCA: dólar cost averaging)</li>
              <li><span className="step-dot"></span>Registrar cada compra: empresa, precio, número de acciones, dividendo esperado</li>
            </ul>
          </div>
          <div className="action-phase">
            <div className="phase-header">
              <div className="phase-number phase-n3">3</div>
              <div>
                <div className="phase-title">Construir y diversificar</div>
                <div className="phase-time">Meses 4-12</div>
              </div>
            </div>
            <ul className="action-steps">
              <li><span className="step-dot"></span>Ampliar a 8-12 empresas de distintos sectores y geografías</li>
              <li><span className="step-dot"></span>Incorporar al menos 1 REIT (Realty Income) para diversificar en inmobiliario</li>
              <li><span className="step-dot"></span>Reinvertir todos los dividendos recibidos comprando más acciones</li>
              <li><span className="step-dot"></span>Revisar el portfolio cada trimestre, no cada día</li>
            </ul>
          </div>
          <div className="action-phase">
            <div className="phase-header">
              <div className="phase-number phase-n4">4</div>
              <div>
                <div className="phase-title">Optimizar y escalar</div>
                <div className="phase-time">Año 2 en adelante</div>
              </div>
            </div>
            <ul className="action-steps">
              <li><span className="step-dot"></span>Incrementar la aportación mensual si los ingresos lo permiten</li>
              <li><span className="step-dot"></span>Revisar si las empresas siguen cumpliendo los criterios anualmente</li>
              <li><span className="step-dot"></span>Reemplazar empresas que recorten dividendo por mejores candidatas</li>
              <li><span className="step-dot"></span>Considerar diversificar parte en un ETF de dividendos (SCHD, VYM) para mayor comodidad</li>
            </ul>
          </div>
        </div>
        <span className="page-num">9 / 9</span>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDE 10: CONCLUSIÓN                       */}
      {/* ═══════════════════════════════════════════ */}
      <section className="slide slide-conclusion">
        <div className="section-tag tag-white">Resumen</div>
        <h2 className="slide-title" style={{ color: 'white', maxWidth: 700 }}>
          La libertad financiera no es un sueño a 30 años vista.<br />
          <span style={{ color: '#6ee7b7' }}>Es un plan que empieza hoy.</span>
        </h2>
        <div className="conclusion-grid">
          <div className="conclusion-stat">
            <div className="conclusion-stat-value">200€</div>
            <div className="conclusion-stat-label">al mes es suficiente para empezar a construir</div>
          </div>
          <div className="conclusion-stat">
            <div className="conclusion-stat-value">4-7%</div>
            <div className="conclusion-stat-label">rentabilidad anual en dividendos con empresas sólidas</div>
          </div>
          <div className="conclusion-stat">
            <div className="conclusion-stat-value">5 años</div>
            <div className="conclusion-stat-label">para ver ingresos pasivos tangibles y crecientes</div>
          </div>
        </div>
        <div className="conclusion-cta">
          <div className="conclusion-cta-text">
            No necesitamos ser expertos. Necesitamos disciplina, paciencia y un plan.
          </div>
          <div className="conclusion-cta-sub">
            Empezar hoy con poco es infinitamente mejor que esperar a tener "suficiente dinero". El tiempo es el activo más valioso.
          </div>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 24, textAlign: 'center' }}>
          Esta presentación es educativa y no constituye asesoramiento financiero. Consulta siempre con un asesor certificado antes de invertir.
        </p>
      </section>
    </div>
  );
}
