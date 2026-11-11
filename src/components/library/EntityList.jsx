import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import EntityCard from "./EntityCard";
export default function EntityList({
  filtered,
  isExercise,
  open,
  search,
  group,
}) {
  return (
    <>
      <div className="cards">
        {filtered.map((item, index) => (
          <EntityCard
            key={item.id}
            item={item}
            index={index}
            isExercise={isExercise}
            open={open}
          />
        ))}
        <button
          className="create-card"
          onClick={() =>
            open({
              kind: "entity",
            })
          }
        >
          <span>
            <Plus size={25} />
          </span>
          <strong>
            {isExercise
              ? "Un nouveau mouvement ?"
              : "Une nouvelle idée de séance ?"}
          </strong>
          <small>
            {isExercise
              ? "Enrichissez votre bibliothèque."
              : "Faites-en votre prochain entraînement."}
          </small>
          <b>
            {isExercise ? "Créer un exercice" : "Créer une séance"}{" "}
            <ArrowRight size={14} />
          </b>
        </button>
      </div>
      {!filtered.length && (
        <p className="no-results">
          {search || group
            ? "Aucun résultat pour ces filtres."
            : "Votre bibliothèque est vide. Créez votre premier élément."}
        </p>
      )}
      <div className="list-foot">
        <span>
          {filtered.length} {isExercise ? "exercice(s)" : "entraînement(s)"}
        </span>
        <span>
          Un objectif. Un mouvement. Un progrès. <ArrowDown size={13} />
        </span>
      </div>
    </>
  );
}
