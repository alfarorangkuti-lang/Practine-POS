import DashboardShell from "../../component/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
        <section className="rounded-md border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Ringkasan Transaksi</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Mulai dengan menambahkan transaksi baru, lalu cek riwayat dan stok Anda secara cepat.
          </p>
        </section>

        <aside className="rounded-md border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Status Singkat</h3>
          <div className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Stok tersedia</p>
              <p className="mt-1">Semua produk kritis terpantau.</p>
            </div>
            <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Transaksi hari ini</p>
              <p className="mt-1">Cek performa hari ini secara real time.</p>
            </div>
          </div>
        </aside>
        
      </div>
    </DashboardShell>
  );
}
