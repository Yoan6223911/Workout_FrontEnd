import { act, renderHook, waitFor, cleanup } from "@testing-library/react";
import { afterEach, it, expect, vi } from "vitest";
import { useResource } from "../../src/hooks/useResource";
afterEach(cleanup);
it("loads and reloads data", async () => {
  const loader = vi
    .fn()
    .mockResolvedValueOnce(["first"])
    .mockResolvedValueOnce(["second"]);
  const { result } = renderHook(() => useResource(loader));
  expect(result.current.loading).toBe(true);
  await waitFor(() => expect(result.current.data).toEqual(["first"]));
  await act(() => result.current.reload());
  expect(result.current.data).toEqual(["second"]);
});
it("exposes errors and permits retry", async () => {
  const loader = vi
    .fn()
    .mockRejectedValueOnce(new Error("Offline"))
    .mockResolvedValueOnce([]);
  const { result } = renderHook(() => useResource(loader));
  await waitFor(() => expect(result.current.error).toBe("Offline"));
  await act(() => result.current.reload());
  expect(result.current.error).toBe("");
});
it("ignores obsolete responses", async () => {
  let resolveOld;
  const old = () =>
    new Promise((resolve) => {
      resolveOld = resolve;
    });
  const current = async () => ["new"];
  const { result, rerender } = renderHook(({ loader }) => useResource(loader), {
    initialProps: {
      loader: old,
    },
  });
  rerender({
    loader: current,
  });
  await waitFor(() => expect(result.current.data).toEqual(["new"]));
  await act(async () => resolveOld(["old"]));
  expect(result.current.data).toEqual(["new"]);
});
