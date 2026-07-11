import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "../../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tulsi Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/logs", label: "Logs" },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen bg-background">
        <div className="flex min-h-screen">
          <aside className="w-56 shrink-0 border-r border-line px-6 py-8">
            <p className="text-sm font-semibold tracking-[0.25em]">TULSI</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">Admin</p>
            <nav className="mt-10 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-line/50 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 px-10 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
