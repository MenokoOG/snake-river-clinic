import { useAuth } from "../../auth/AuthContext";
import { usePageContent } from "../../hooks/index";
import EditableBlock from "../../cms/EditableBlock";

export default function Home() {
  const { role } = useAuth();
  const { data, loading, save } = usePageContent("home");

  if (loading || !data) return <div className="p-8">Loading…</div>;

  return (
    <section className="p-10 space-y-6">
      <h1 className="text-4xl font-bold">
        <EditableBlock
          value={data.heroTitle}
          isAdmin={role === "admin"}
          onSave={(v) => save({ heroTitle: v })}
        />
      </h1>

      <p className="text-white/80">
        <EditableBlock
          value={data.heroSubtitle}
          isAdmin={role === "admin"}
          onSave={(v) => save({ heroSubtitle: v })}
        />
      </p>

      <a href="/contact" className="btn-hero inline-block">
        <EditableBlock
          value={data.ctaText}
          isAdmin={role === "admin"}
          onSave={(v) => save({ ctaText: v })}
        />
      </a>
    </section>
  );
}
