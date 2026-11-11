import { ChevronRight, Dumbbell, Trash2, Pencil, X } from "lucide-react";
import { groups } from "../../constants/muscleGroups";
export default function EntityDetails({ detail, isExercise, open }) {
  return (
    <>
      <div className="detail-actions">
        <button
          className="secondary"
          onClick={() =>
            open({
              kind: "entity",
              item: detail,
            })
          }
        >
          <Pencil size={15} /> Modifier le nom
          {isExercise ? " et le groupe" : ""}
        </button>
        <button
          className="danger-text"
          onClick={() =>
            open({
              kind: "delete",
              item: detail,
            })
          }
        >
          <Trash2 size={15} /> Supprimer
        </button>
      </div>
      <div className="detail-list">
        {(isExercise ? detail?.workouts : detail?.exercices)?.map(
          (item, index) => (
            <div className="detail-row" key={item.id}>
              <span className="row-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <a
                  href={`#${isExercise ? "workouts" : "exercises"}/${item.id}`}
                >
                  {item.name} <ChevronRight size={15} />
                </a>
                <span>
                  {isExercise
                    ? "Voir cet entraînement"
                    : groups[item.muscleGroup]}
                </span>
              </div>
              {!isExercise && (
                <>
                  <div className="prescription">
                    <strong>{item.sets}</strong> séries <span>×</span>{" "}
                    <strong>{item.repetitions}</strong> répétitions
                  </div>
                  <button
                    className="icon-button"
                    aria-label={`Modifier ${item.name}`}
                    onClick={() =>
                      open({
                        kind: "association",
                        item,
                      })
                    }
                  >
                    <Pencil size={17} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Retirer ${item.name}`}
                    onClick={() =>
                      open({
                        kind: "unlink",
                        item,
                      })
                    }
                  >
                    <X size={18} />
                  </button>
                </>
              )}
            </div>
          ),
        )}
      </div>
      {!(isExercise ? detail?.workouts : detail?.exercices)?.length && (
        <div className="empty">
          <Dumbbell />
          <h3>
            {isExercise ? "Aucune séance associée" : "Votre séance prend forme"}
          </h3>
          <p>
            {isExercise
              ? "Ajoutez cet exercice à un entraînement."
              : "Ajoutez un premier exercice pour commencer."}
          </p>
        </div>
      )}
    </>
  );
}
