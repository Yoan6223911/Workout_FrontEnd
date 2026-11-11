import { ArrowLeft, LoaderCircle, Plus } from "lucide-react";
import { groups } from "../../constants/muscleGroups";
import LibraryToolbar from "./LibraryToolbar";
import EntityList from "./EntityList";
import EntityDetails from "./EntityDetails";
export default function Library({
  entityId,
  detail,
  isExercise,
  loading,
  error,
  open,
  data,
  search,
  setSearch,
  group,
  setGroup,
  reload,
  filtered,
}) {
  return (
    <>
      <section className="library">
        <div className="section-title">
          <div>
            {entityId && (
              <a
                className="back"
                href={isExercise ? "#exercises" : "#workouts"}
              >
                <ArrowLeft size={15} /> Retour aux{" "}
                {isExercise ? "exercices" : "entraînements"}
              </a>
            )}
            <span className="eyebrow">
              {entityId
                ? "LES DÉTAILS FONT LA DIFFÉRENCE"
                : "VOTRE BIBLIOTHÈQUE"}
            </span>
            <h2>
              {entityId
                ? detail?.name || "Détails"
                : isExercise
                  ? "Les bons mouvements."
                  : "À chaque objectif, sa séance."}
              <span className="mint">{!entityId && " ↗"}</span>
            </h2>
            <p>
              {entityId
                ? isExercise
                  ? `${groups[detail?.muscleGroup] || "Exercice"} · Retrouvez les séances qui utilisent ce mouvement.`
                  : "Personnalisez les exercices, les séries et les répétitions de votre séance."
                : isExercise
                  ? "Trouvez votre mouvement et composez une routine équilibrée."
                  : "Des séances pensées par vous, pour vous. À vous de jouer."}
            </p>
          </div>
          {!(entityId && isExercise) && (
            <button
              className="secondary"
              disabled={loading || !!error}
              onClick={() =>
                open({
                  kind: entityId ? "association" : "entity",
                })
              }
            >
              <Plus size={17} />
              {entityId
                ? "Ajouter un exercice"
                : isExercise
                  ? "Nouvel exercice"
                  : "Nouvelle séance"}
            </button>
          )}
        </div>
        {!entityId && (
          <LibraryToolbar
            {...{
              isExercise,
              data,
              search,
              setSearch,
              group,
              setGroup,
            }}
          />
        )}
        {loading ? (
          <div className="empty">
            <LoaderCircle className="spin" />
            <h3>On prépare votre espace…</h3>
          </div>
        ) : error ? (
          <div className="empty error">
            <h3>Connexion à l’API indisponible</h3>
            <p>{error}</p>
            <p>
              Vérifiez votre connexion et la disponibilité de l’API, puis
              réessayez.
            </p>
            <div className="button-row">
              <button className="secondary" onClick={reload}>
                Réessayer
              </button>
            </div>
          </div>
        ) : entityId ? (
          <>
            <EntityDetails
              {...{
                detail,
                isExercise,
                open,
              }}
            />
          </>
        ) : (
          <>
            <EntityList
              {...{
                filtered,
                isExercise,
                open,
                search,
                group,
              }}
            />
          </>
        )}
      </section>
    </>
  );
}
