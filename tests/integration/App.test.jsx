import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { beforeEach, afterEach, it, expect, vi } from "vitest";
import App from "../../src/App";
import { API_BASE_URL } from "../../src/config/api";

// HTTP fixtures are confined to tests and never shipped with the application.
let fetcher;
let workouts;
let exercises;
let association;
beforeEach(() => {
  localStorage.clear();
  location.hash = "workouts";
  workouts = [{ id: "w1", name: "Séance test" }];
  exercises = [{ id: "e1", name: "Exercice test", muscleGroup: "CHEST" }];
  association = { id: "e1", sets: 3, repetitions: 10 };
  fetcher = vi.fn(async (url, options = {}) => {
    const path = new URL(url).pathname;
    const method = options.method || "GET";
    let data;
    if (path === "/workouts" && method === "POST") {
      workouts.push({ id: "w2", ...JSON.parse(options.body) });
      data = {};
    } else if (path === "/workouts/w1/exercices/e1" && method === "DELETE") {
      association = null;
      data = {};
    } else if (path === "/workouts/w1/exercices" && method === "POST") {
      const { exerciceId, ...values } = JSON.parse(options.body);
      association = { id: exerciceId, ...values };
      data = {};
    } else if (path === "/workouts" && method === "GET") {
      data = { workouts };
    } else if (path === "/exercices" && method === "GET") {
      data = { exercices: exercises };
    } else if (path === "/workouts/w1" && method === "GET") {
      data = {
        workout: {
          ...workouts[0],
          exercices: association ? [{ ...exercises[0], ...association }] : [],
        },
      };
    } else {
      throw new Error(`Unexpected request: ${method} ${url}`);
    }
    return { ok: true, json: async () => ({ data: structuredClone(data) }) };
  });
  vi.stubGlobal("fetch", fetcher);
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("loads API data and removes obsolete browser data", async () => {
  localStorage.setItem("workout-mode", "demo");
  localStorage.setItem("workout-demo-v1", '{"workouts":[]}');
  localStorage.setItem("workout-theme", "light");
  render(<App />);
  await screen.findByRole("link", { name: "Séance test", exact: true });
  expect(fetcher).toHaveBeenCalledWith(
    `${API_BASE_URL}/workouts`,
    expect.objectContaining({ method: "GET" }),
  );
  expect(localStorage.length).toBe(0);
  expect(screen.queryByRole("button", { name: /démo|Mode API/ })).toBeNull();
});

it("creates a workout through the API", async () => {
  render(<App />);
  await screen.findByRole("link", { name: "Séance test", exact: true });
  fireEvent.click(screen.getByRole("button", { name: "Nouvelle séance" }));
  fireEvent.change(screen.getByRole("textbox", { name: "Nom" }), {
    target: { value: "Nouvelle séance test" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));
  await screen.findByRole("link", {
    name: "Nouvelle séance test",
    exact: true,
  });
  expect(fetcher).toHaveBeenCalledWith(
    `${API_BASE_URL}/workouts`,
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ name: "Nouvelle séance test" }),
    }),
  );
});

it("edits sets and repetitions through API association requests", async () => {
  location.hash = "workouts/w1";
  render(<App />);
  fireEvent.click(
    await screen.findByRole("button", { name: "Modifier Exercice test" }),
  );
  fireEvent.change(screen.getByRole("spinbutton", { name: "Séries" }), {
    target: { value: "5" },
  });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Répétitions" }), {
    target: { value: "6" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));
  await waitFor(() =>
    expect(association).toEqual({ id: "e1", sets: 5, repetitions: 6 }),
  );
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(fetcher).toHaveBeenCalledWith(
    `${API_BASE_URL}/workouts/w1/exercices`,
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ exerciceId: "e1", sets: 5, repetitions: 6 }),
    }),
  );
});

it("removes an exercise from a workout through the API", async () => {
  location.hash = "workouts/w1";
  render(<App />);
  fireEvent.click(
    await screen.findByRole("button", { name: "Retirer Exercice test" }),
  );
  fireEvent.click(screen.getByRole("button", { name: "Confirmer" }));
  await waitFor(() =>
    expect(
      screen.queryByRole("button", { name: "Retirer Exercice test" }),
    ).toBeNull(),
  );
  expect(fetcher).toHaveBeenCalledWith(
    `${API_BASE_URL}/workouts/w1/exercices/e1`,
    expect.objectContaining({ method: "DELETE" }),
  );
});

it("shows an API failure without offering local data", async () => {
  fetcher.mockRejectedValue(new Error("API indisponible"));
  render(<App />);
  await screen.findByText("API indisponible");
  expect(screen.queryByRole("button", { name: /démo/ })).toBeNull();
  expect(screen.getByRole("button", { name: "Réessayer" })).toBeTruthy();
});
