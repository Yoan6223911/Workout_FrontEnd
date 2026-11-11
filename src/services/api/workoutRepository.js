import { API_BASE_URL } from "../../config/api";
import { createHttpClient } from "./httpClient";

// Endpoint paths follow the backend contract: /workouts and /exercices.
export function createRepository(base = API_BASE_URL, fetcher = fetch) {
  const request = createHttpClient(base, fetcher);
  const id = encodeURIComponent;
  return {
    exercises: async (group = "") =>
      (await request(`/exercices${group ? `?muscleGroup=${id(group)}` : ""}`))
        .exercices,
    workouts: async () => (await request("/workouts")).workouts,
    exercise: async (key) => (await request(`/exercices/${id(key)}`)).exercice,
    workout: async (key) => (await request(`/workouts/${id(key)}`)).workout,
    save: (type, key, data) =>
      request(
        `/${type}${key ? `/${id(key)}` : ""}`,
        key ? "PATCH" : "POST",
        data,
      ),
    remove: (type, key) => request(`/${type}/${id(key)}`, "DELETE"),
    add: (key, data) => request(`/workouts/${id(key)}/exercices`, "POST", data),
    unlink: (key, exerciseId) =>
      request(`/workouts/${id(key)}/exercices/${id(exerciseId)}`, "DELETE"),
    async updateAssociation(key, previous, data) {
      await this.unlink(key, data.exerciceId);
      try {
        await this.add(key, data);
      } catch (error) {
        try {
          await this.add(key, {
            exerciceId: data.exerciceId,
            sets: previous.sets,
            repetitions: previous.repetitions,
          });
        } catch {
          throw new Error(
            "Modification et restauration échouées. Rechargez la séance pour vérifier son contenu.",
          );
        }
        throw error;
      }
    },
  };
}
