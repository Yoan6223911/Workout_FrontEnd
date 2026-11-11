import {
  ArrowRight,
  Dumbbell,
  Flame,
  Layers,
  Trash2,
  Pencil,
} from "lucide-react";
import { groups } from "../../constants/muscleGroups";
export default function EntityCard({ item, index, isExercise, open }) {
  return (
    <article className={`card card-${index % 3}`}>
      <div className="card-top">
        <span className="card-icon">
          {isExercise ? (
            <Dumbbell size={23} />
          ) : index % 3 === 1 ? (
            <Flame size={23} />
          ) : (
            <Layers size={23} />
          )}
        </span>
        <span className="card-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="card-tools">
          <button
            aria-label={`Modifier ${item.name}`}
            onClick={() =>
              open({
                kind: "entity",
                item,
              })
            }
          >
            <Pencil size={15} />
          </button>
          <button
            aria-label={`Supprimer ${item.name}`}
            onClick={() =>
              open({
                kind: "delete",
                item,
              })
            }
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <span className="tag">
        {isExercise ? groups[item.muscleGroup] : "ENTRAÎNEMENT PERSONNALISÉ"}
      </span>
      <h3>
        <a href={`#${isExercise ? "exercises" : "workouts"}/${item.id}`}>
          {item.name}
        </a>
      </h3>
      <p>
        {isExercise
          ? "Un mouvement de plus vers votre objectif."
          : "Une séance à façonner selon vos objectifs."}
      </p>
      <div className="card-bottom">
        <span>
          <span className="tiny-dot" />
          {isExercise ? "Dans votre bibliothèque" : "Prêt à personnaliser"}
        </span>
        <a
          href={`#${isExercise ? "exercises" : "workouts"}/${item.id}`}
          aria-label={`Voir ${item.name}`}
        >
          <ArrowRight size={19} />
        </a>
      </div>
    </article>
  );
}
