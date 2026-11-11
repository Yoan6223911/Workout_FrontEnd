import { describe, it, expect, vi } from "vitest";
import { createRepository } from "../../src/services/api/workoutRepository";
describe("API repository", () => {
  it("uses the remote API by default", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { workouts: [] } }),
    });
    await createRepository(undefined, fetcher).workouts();
    expect(fetcher.mock.calls[0][0]).toBe(
      "https://workout-api-eqyt.kennhosting.app/workouts",
    );
  });

  it("filters exercises with the backend contract", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          exercices: [
            {
              id: "e1",
            },
          ],
        },
      }),
    });
    expect(await createRepository("/api", fetcher).exercises("LEGS")).toEqual([
      {
        id: "e1",
      },
    ]);
    expect(fetcher.mock.calls[0][0]).toBe("/api/exercices?muscleGroup=LEGS");
  });
  it("preserves server validation errors", async () => {
    const repo = createRepository("/api", async () => ({
      ok: false,
      status: 409,
      json: async () => ({
        error: "Duplicate",
      }),
    }));
    await expect(
      repo.save("workouts", null, {
        name: "Test",
      }),
    ).rejects.toThrow("Duplicate");
  });
  it("restores association on failed update", async () => {
    const repo = createRepository();
    repo.unlink = vi.fn().mockResolvedValue();
    repo.add = vi
      .fn()
      .mockRejectedValueOnce(new Error("Conflict"))
      .mockResolvedValueOnce();
    await expect(
      repo.updateAssociation(
        "w1",
        {
          sets: 3,
          repetitions: 10,
        },
        {
          exerciceId: "e1",
          sets: 4,
          repetitions: 12,
        },
      ),
    ).rejects.toThrow("Conflict");
    expect(repo.add).toHaveBeenLastCalledWith("w1", {
      exerciceId: "e1",
      sets: 3,
      repetitions: 10,
    });
  });
});
