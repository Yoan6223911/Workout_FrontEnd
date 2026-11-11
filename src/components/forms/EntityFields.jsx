import { groups } from "../../constants/muscleGroups";
export default function EntityFields({ modal, isExercise }) {
  return (
    <>
      <label>
        Nom
        <input
          autoFocus
          name="name"
          required
          maxLength={120}
          placeholder={
            isExercise ? "Ex. Squat à la barre" : "Ex. Haut du corps"
          }
          defaultValue={modal.item?.name}
        />
      </label>
      {isExercise && (
        <label>
          Groupe musculaire
          <select
            name="muscleGroup"
            defaultValue={modal.item?.muscleGroup || "CHEST"}
          >
            {Object.entries(groups).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      )}
    </>
  );
}
