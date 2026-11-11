import { groups } from "../../constants/muscleGroups";
export default function AssociationFields({ modal, data, detail }) {
  return (
    <>
      <label>
        Exercice
        <select name="exerciceId" defaultValue={modal.item?.id} required>
          {(modal.item
            ? [modal.item]
            : (data?.exercises || []).filter(
                (e) => !detail?.exercices.some((x) => x.id === e.id),
              )
          ).map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} — {groups[e.muscleGroup]}
            </option>
          ))}
        </select>
      </label>
      <div className="form-columns">
        <label>
          Séries
          <input
            name="sets"
            type="number"
            required
            min="1"
            max="100"
            defaultValue={modal.item?.sets || 3}
          />
        </label>
        <label>
          Répétitions
          <input
            name="repetitions"
            type="number"
            required
            min="1"
            max="100"
            defaultValue={modal.item?.repetitions || 10}
          />
        </label>
      </div>
      {!modal.item &&
        !(data?.exercises || []).some(
          (e) => !detail?.exercices.some((x) => x.id === e.id),
        ) && (
          <p>
            Créez un nouvel exercice dans la bibliothèque pour l’ajouter ici.
          </p>
        )}
    </>
  );
}
