import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLogs() {
  const prisma = getPrisma();
  const logs = prisma
    ? await prisma.apiLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 }).catch(() => [])
    : [];

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Logs</h1>
      {logs.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No log entries (or no database connected).</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {logs.map((l) => (
            <li key={l.id} className="rounded-xl border border-line bg-white p-4 text-sm">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    l.level === "error"
                      ? "bg-red-50 text-red-700"
                      : l.level === "warn"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-line/60"
                  }`}
                >
                  {l.level}
                </span>
                <span className="font-mono">{l.source}</span>
                <span>{l.createdAt.toISOString().replace("T", " ").slice(0, 19)}</span>
              </div>
              <p className="mt-2">{l.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
