import { Activity, Dumbbell, LayoutGrid, Sun, Moon } from "lucide-react";
export default function Header({ isExercise, light, setLight }) {
  return (
    <>
      <header className="header">
        <a href="#workouts" className="brand" aria-label="Workout accueil">
          <span className="brand-symbol">
            <Activity size={25} />
          </span>
          workout<span className="brand-dot">.</span>
          <span className="brand-label">FITNESS</span>
        </a>
        <nav aria-label="Navigation principale">
          <a href="#workouts" className={!isExercise ? "active" : ""}>
            <LayoutGrid size={16} />
            Entraînements
          </a>
          <a href="#exercises" className={isExercise ? "active" : ""}>
            <Dumbbell size={17} />
            Exercices
          </a>
        </nav>
        <div className="header-end">
          <button
            className="theme"
            onClick={() => setLight(!light)}
            aria-label={
              light ? "Activer le thème sombre" : "Activer le thème clair"
            }
          >
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <span className="avatar">W</span>
        </div>
      </header>
    </>
  );
}
