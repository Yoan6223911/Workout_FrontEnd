import { ArrowRight, Check, Plus } from "lucide-react";
export default function Hero({ isExercise, open }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span /> UN PEU PLUS FORT, CHAQUE JOUR
          </span>
          <h1>
            Votre prochain progrès
            <br />
            commence <em>ici.</em>
          </h1>
          <p>
            Moins d’improvisation. Plus de progression.
            <br />
            Construisez vos séances, à votre rythme.
          </p>
          <button
            className="primary"
            onClick={() =>
              open({
                kind: "entity",
              })
            }
          >
            <Plus size={18} />
            {isExercise ? "Créer un exercice" : "Créer un entraînement"}
            <ArrowRight size={17} />
          </button>
          <div className="hero-note">
            <Check size={14} /> Votre routine. Vos objectifs. Votre évolution.
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-grid" />
          <div className="floating-label">
            <span className="status-dot" /> FAITES PLACE AU PROGRÈS
          </div>
          <div className="dumbbell-art">
            <div className="bar" />
            <div className="plate p1" />
            <div className="plate p2" />
            <div className="plate p3" />
            <div className="plate p4" />
            <div className="cap c1" />
            <div className="cap c2" />
          </div>
          <div className="art-caption">
            <span>
              CONSISTANCE <ArrowRight size={13} /> PROGRESSION
            </span>
            <span>01 — ∞</span>
          </div>
        </div>
      </section>
    </>
  );
}
