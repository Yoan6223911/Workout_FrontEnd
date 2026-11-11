import { Dumbbell, Flame, Layers } from "lucide-react";
export default function LibraryStats({ data }) {
  return (
    <>
      <section className="stats" aria-label="Votre bibliothèque">
        <div>
          <span className="stat-icon">
            <Layers />
          </span>
          <div>
            <strong>{data?.workouts.length ?? "—"}</strong>
            <span>Entraînements créés</span>
          </div>
          <small>Votre point de départ</small>
        </div>
        <div>
          <span className="stat-icon">
            <Dumbbell />
          </span>
          <div>
            <strong>{data?.exercises.length ?? "—"}</strong>
            <span>Exercices disponibles</span>
          </div>
          <small>Une routine qui vous ressemble</small>
        </div>
        <div>
          <span className="stat-icon">
            <Flame />
          </span>
          <div>
            <strong>
              {new Set(data?.exercises.map((e) => e.muscleGroup)).size || "—"}
              <i> / 7</i>
            </strong>
            <span>Groupes musculaires</span>
          </div>
          <small>Visez l’équilibre</small>
        </div>
      </section>
    </>
  );
}
