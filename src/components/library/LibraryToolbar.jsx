import { Search } from "lucide-react";
import { groups } from "../../constants/muscleGroups";
export default function LibraryToolbar({
  isExercise,
  data,
  search,
  setSearch,
  group,
  setGroup,
}) {
  return (
    <>
      {
        <div className="toolbar">
          <div className="tabs">
            <a className={!isExercise ? "selected" : ""} href="#workouts">
              Entraînements <span>{data?.workouts.length ?? 0}</span>
            </a>
            <a className={isExercise ? "selected" : ""} href="#exercises">
              Exercices <span>{data?.exercises.length ?? 0}</span>
            </a>
          </div>
          <label className="search">
            <Search size={17} />
            <input
              aria-label="Rechercher"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span>↵</span>
          </label>
        </div>
      }
      {isExercise && (
        <div className="filters">
          <button
            className={!group ? "selected" : ""}
            onClick={() => setGroup("")}
          >
            Tous les muscles
          </button>
          {Object.entries(groups).map(([value, label]) => (
            <button
              key={value}
              className={group === value ? "selected" : ""}
              onClick={() => setGroup(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
