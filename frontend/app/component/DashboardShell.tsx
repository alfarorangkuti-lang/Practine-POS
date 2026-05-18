"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { PanelLeftOpen ,LogOut, Box, ChartArea,FilePlusCorner , Clock3, Menu, Wallet, Bolt, PanelRightOpen } from "lucide-react";

const navItems = [
  { id: "add", label: "Tambah Transaksi", icon: FilePlusCorner, href: "/pages/tambahTransaksi" },
  { id: "stock", label: "Stock", icon: Box, href: "/pages/stock" },
  { id: "analytics", label: "Analytics", icon: ChartArea, href: "/pages/home" },
  { id: "history", label: "Riwayat Transaksi", icon: Clock3, href: "#" },
  { id: "financial", label: "Finansial", icon: Wallet, href: "#" },
];

type DashboardShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  badges?: string[];
};

export default function DashboardShell({ children, title, subtitle, badges = [] }: DashboardShellProps) {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const showSidebarLabels = expanded || mobileOpen;
  const pathname = usePathname();
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("token")
    router.push('/')
  }

  return (
    <div className=" bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex min-h-screen relative">
        <aside
          className={`${mobileOpen ? "fixed inset-y-0 left-0 z-40 flex w-72" : "hidden sm:flex"} h-screen sticky top-0 left-0 flex-col border-r border-slate-300 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 ${
            expanded ? "sm:w-60" : "sm:w-20"
          }`}
        >
          <div className="flex items-center gap-3 border-b border-dashed border-slate-300 px-3 py-3 dark:border-zinc-800">
            <div className={`flex items-center gap-3 ${expanded ? "" : "md:mx-auto"}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-sky-600 text-base font-semibold text-white">
                <Bolt className="h-5 w-5" />
              </div>
              <div className={`${showSidebarLabels ? "block" : "hidden"}`}>
                <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Practine POS</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Point of Sale</p>
              </div>
            </div>
          </div>

          <nav className={`flex flex-1 flex-col gap-4 py-4 ${expanded ? "px-4" : "md:mx-auto px-2"}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center gap-3 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-sky-100 dark:bg-sky-500/10"
                    : "text-zinc-700 hover:bg-sky-50 hover:text-sky-600 dark:text-zinc-300 dark:hover:bg-sky-500/10 dark:hover:text-sky-300"
                }`}
                aria-label={item.label}
              >
                <span className="flex py-3 sm:py-2 px-3 items-center justify-center rounded-md  text-zinc-900 dark:text-zinc-100 dark:">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className={`${showSidebarLabels ? "block" : "hidden"} truncate`}>{item.label}</span>
              </Link>
            )})}
          </nav>

          <div className="mt-auto px-4 py-4 sm:px-4 sm:py-5 gap-2 flex flex-row border-t border-slate-300 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => logout()}
              aria-expanded={expanded}
              aria-label={expanded ? "Sembunyikan sidebar" : "Perluas sidebar"}
              className={expanded ? "hidden h-10 w-1/3 cursor-pointer rotate-180 items-center justify-center rounded-md border  dark:bg-rose-500/30 border-slate-300 bg-white text-zinc-700 transition hover:bg-sky-50 hover:text-sky-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-rose-500/10 dark:hover:text-sky-300 sm:inline-flex" : "hidden"}
            ><LogOut className="h-5 w-5" /></button>
            
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              aria-label={expanded ? "Sembunyikan sidebar" : "Perluas sidebar"}
              className="hidden h-10 w-full items-center justify-center rounded-md border  dark:bg-zinc-800 border-slate-300 bg-white text-zinc-700 transition hover:bg-sky-50 hover:text-sky-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-sky-500/10 dark:hover:text-sky-300 sm:inline-flex"
            >
              {expanded ? <PanelRightOpen className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </button>
          </div>
        </aside>

        {mobileOpen ? <div className="fixed inset-0 z-30 bg-black/30 sm:hidden" onClick={() => setMobileOpen(false)} /> : null}

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-dashed border-b border-slate-300 bg-white/95 px-6 py-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen((current) => !current)}
                  aria-label={mobileOpen ? "Tutup sidebar" : "Buka sidebar"}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-zinc-700 transition hover:border-sky-500 hover:text-sky-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-sky-400 sm:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-lg font-semibold uppercase tracking-[0.25em] text-sky-600">{title}</p>
                </div>
              </div>

              {badges.length > 0 ? (
                <div className="hidden flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
                  {badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-slate-300 bg-zinc-100 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-800">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </header>

          <section className="px-6 py-6 ">{children}</section>
        </main>
      </div>
    </div>
  );
}
