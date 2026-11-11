import { useCallback, useEffect, useMemo, useState } from "react";
import { createRepository } from "../services/api/workoutRepository";
import { useResource } from "./useResource";
export function useWorkoutApp() {
  const [light, setLight] = useState(false);
  // Remove data left by earlier versions of the application.
  useEffect(() => {
    for (const key of ["workout-demo-v1", "workout-mode", "workout-theme"]) {
      localStorage.removeItem(key);
    }
  }, []);
  const [route, setRoute] = useState(
    () => location.hash.slice(1) || "workouts",
  );
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [modal, setModal] = useState(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const change = () => {
      setRoute(location.hash.slice(1) || "workouts");
      setSearch("");
      setGroup("");
    };
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
  }, [light]);
  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(""), 4500);
      return () => clearTimeout(t);
    }
  }, [notice]);
  const repo = useMemo(() => createRepository(), []);
  const [section, key] = route.split("/");
  const type = section === "exercises" ? "exercices" : "workouts";
  const isExercise = type === "exercices";
  const loader = useCallback(async () => {
    const [exercises, workouts, detail] = await Promise.all([
      repo.exercises(),
      repo.workouts(),
      key ? (isExercise ? repo.exercise(key) : repo.workout(key)) : null,
    ]);
    return {
      exercises,
      workouts,
      detail,
    };
  }, [repo, key, isExercise]);
  const { data, loading, error, reload } = useResource(loader);
  const navigate = (path) => {
    location.hash = path;
  };
  const open = (value) => {
    setFormError("");
    setModal(value);
  };
  const action = async (fn, message) => {
    setBusy(true);
    setFormError("");
    try {
      await fn();
      setModal(null);
      setNotice(message);
      await reload();
    } catch (e) {
      setFormError(e.message);
    } finally {
      setBusy(false);
    }
  };
  const items = (isExercise ? data?.exercises : data?.workouts) || [];
  const filtered = items.filter(
    (x) =>
      x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
      (!isExercise || !group || x.muscleGroup === group),
  );
  const detail = data?.detail;
  const submit = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (modal.kind === "entity")
      action(
        () =>
          repo.save(type, modal.item?.id, {
            name: values.name.trim(),
            ...(isExercise
              ? {
                  muscleGroup: values.muscleGroup,
                }
              : {}),
          }),
        "Enregistré avec succès.",
      );
    else {
      const payload = {
        exerciceId: values.exerciceId,
        sets: Number(values.sets),
        repetitions: Number(values.repetitions),
      };
      action(
        () =>
          modal.item
            ? repo.updateAssociation(key, modal.item, payload)
            : repo.add(key, payload),
        "Séance mise à jour.",
      );
    }
  };
  const confirmDelete = () =>
    action(async () => {
      if (modal.kind === "unlink") {
        await repo.unlink(key, modal.item.id);
      } else {
        await repo.remove(type, modal.item.id);
        if (key) navigate(isExercise ? "exercises" : "workouts");
      }
    }, "Suppression effectuée.");

  return {
    light,
    setLight,
    entityId: key,
    search,
    setSearch,
    group,
    setGroup,
    modal,
    busy,
    formError,
    notice,
    confirmDelete,
    isExercise,
    data,
    loading,
    error,
    reload,
    open,
    filtered,
    detail,
    submit,
    setModal,
  };
}
