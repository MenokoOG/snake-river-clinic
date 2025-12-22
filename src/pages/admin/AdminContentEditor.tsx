import { useEffect, useMemo, useState } from "react";
import { pageSchemas } from "../../data/pageSchemas";
import { usePageContent } from "../../cms/usePageContent";
import {
  useLocalStorage,
  useStateWithHistory,
  useUpdateEffect,
} from "../../hooks";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function AdminContentEditor() {
  // usePageMeta({
  //   title: "Edit Website Content | Admin | Snake River Adult Medicine",
  //   description:
  //     "Admin content editor for updating all public pages. Autosave and undo/redo supported.",
  //   canonicalPath: "/admin/content",
  // });

  const pageIds = Object.keys(pageSchemas);
  const [selectedPage, setSelectedPage] = useLocalStorage<string>(
    "srams_admin_page",
    pageIds[0]
  );

  const { data, loading, save } = usePageContent(selectedPage);

  const initialDraft = useMemo(
    () => (data ?? pageSchemas[selectedPage]) as Record<string, string>,
    [data, selectedPage]
  );

  const [draft, setDraft, history] =
    useStateWithHistory<Record<string, string>>(initialDraft);

  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMsg, setSaveMsg] = useState<string>("");

  useEffect(() => {
    if (!data) return;
    setDraft(data as Record<string, string>);
    setSaveState("idle");
    setSaveMsg("");
  }, [selectedPage, data]);

  const debouncedDraft = useDebounce(draft, 650);

  useUpdateEffect(() => {
    const run = async () => {
      try {
        setSaveState("saving");
        setSaveMsg("Saving…");
        await save(debouncedDraft);
        setSaveState("saved");
        setSaveMsg("Saved");
      } catch {
        setSaveState("error");
        setSaveMsg("Save failed. Check connection and try again.");
      }
    };

    if (!data) return;
    run();
  }, [debouncedDraft]);

  if (loading || !data) {
    return <div className="p-8">Loading content…</div>;
  }

  const setField = (key: string, value: string) => {
    setDraft({
      ...draft,
      [key]: value,
    });
  };

  return (
    <section className="space-y-6 max-w-3xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Edit Site Content</h1>
        <p className="text-sm text-white/75">
          Changes autosave. Use Undo/Redo if you make a mistake.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-3 items-end">
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm text-white/80">Select page</label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="input"
          >
            {pageIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 md:justify-end">
          <button
            type="button"
            className="btn-hero"
            onClick={history.back}
            disabled={history.pointer <= 0}
            aria-disabled={history.pointer <= 0}
          >
            Undo
          </button>
          <button
            type="button"
            className="btn-hero"
            onClick={history.forward}
            disabled={history.pointer >= history.history.length - 1}
            aria-disabled={history.pointer >= history.history.length - 1}
          >
            Redo
          </button>
        </div>
      </div>

      <div role="status" className="text-sm">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 border ${
            saveState === "saved"
              ? "border-emerald-400/40 bg-emerald-400/10 text-white"
              : saveState === "saving"
              ? "border-amber-300/40 bg-amber-300/10 text-white"
              : saveState === "error"
              ? "border-red-400/40 bg-red-400/10 text-white"
              : "border-white/10 bg-white/5 text-white/80"
          }`}
        >
          {saveMsg || "Ready"}
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(draft).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <label className="text-sm text-white/80">{key}</label>
            <textarea
              className="input"
              value={value}
              onChange={(e) => setField(key, e.target.value)}
              rows={key.toLowerCase().includes("body") ? 6 : 3}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="btn-hero"
          onClick={async () => {
            try {
              setSaveState("saving");
              setSaveMsg("Saving…");
              await save(draft);
              setSaveState("saved");
              setSaveMsg("Saved");
            } catch {
              setSaveState("error");
              setSaveMsg("Save failed. Check connection and try again.");
            }
          }}
        >
          Save Now
        </button>

        <button
          type="button"
          className="btn-hero"
          onClick={() => {
            setDraft(data as Record<string, string>);
            setSaveState("idle");
            setSaveMsg("Reverted to last saved");
          }}
        >
          Revert
        </button>
      </div>
    </section>
  );
}
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

