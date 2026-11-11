import AssociationFields from "./AssociationFields";
import EntityFields from "./EntityFields";
import { Check, LoaderCircle } from "lucide-react";
import Modal from "../ui/Modal";
export default function EntityModal({
  modal,
  isExercise,
  busy,
  setModal,
  formError,
  confirmDelete,
  submit,
  data,
  detail,
}) {
  return (
    <>
      {modal && (
        <Modal
          title={
            modal.kind === "delete"
              ? "Supprimer cet élément ?"
              : modal.kind === "unlink"
                ? "Retirer cet exercice ?"
                : modal.kind === "entity"
                  ? (modal.item ? "Modifier" : "Créer") +
                    (isExercise ? " un exercice" : " un entraînement")
                  : (modal.item ? "Modifier" : "Ajouter") + " un exercice"
          }
          onClose={() => {
            if (!busy) setModal(null);
          }}
        >
          {["delete", "unlink"].includes(modal.kind) ? (
            <>
              <p className="modal-description">
                {modal.kind === "delete"
                  ? `« ${modal.item.name} » sera supprimé ainsi que ses associations. Cette action est définitive.`
                  : `Retirer « ${modal.item.name} » de cette séance ? Il restera dans votre bibliothèque.`}
              </p>
              {formError && (
                <p role="alert" className="form-error">
                  {formError}
                </p>
              )}
              <div className="modal-footer">
                <button
                  className="secondary"
                  disabled={busy}
                  onClick={() => setModal(null)}
                >
                  Annuler
                </button>
                <button
                  className="danger"
                  disabled={busy}
                  onClick={confirmDelete}
                >
                  {busy ? "Suppression…" : "Confirmer"}
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={submit}>
              {modal.kind === "entity" ? (
                <EntityFields modal={modal} isExercise={isExercise} />
              ) : (
                <AssociationFields modal={modal} data={data} detail={detail} />
              )}
              {formError && (
                <p role="alert" className="form-error">
                  {formError}
                </p>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="secondary"
                  disabled={busy}
                  onClick={() => setModal(null)}
                >
                  Annuler
                </button>
                <button className="primary" disabled={busy}>
                  {busy ? (
                    <LoaderCircle size={16} className="spin" />
                  ) : (
                    <Check size={16} />
                  )}
                  Enregistrer
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
