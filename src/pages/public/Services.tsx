import { useAuth } from "../../auth/AuthContext";
import { usePageContent } from "../../hooks/usePageContent";
import EditableBlock from "../../cms/EditableBlock";

export default function Services() {
  const { role } = useAuth();
  const { data, loading, save } = usePageContent("services");

  if (loading || !data) return <div className="p-8">Loading…</div>;

  return (
    <section className="p-10 space-y-4">
      <h2 className="text-3xl font-semibold">
        <EditableBlock
          value={data.title}
          isAdmin={role === "admin"}
          onSave={(v) => save({ title: v })}
        />
      </h2>

      <p className="text-white/80">
        <EditableBlock
          value={data.body}
          isAdmin={role === "admin"}
          onSave={(v) => save({ body: v })}
        />
      </p>
    </section>
  );
}
