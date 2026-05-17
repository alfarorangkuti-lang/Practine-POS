'use client'
import DashboardShell from "../../component/DashboardShell";
import { Search } from "lucide-react";
import { getAllProducts, Products } from "@/app/services/products";
import { useEffect, useState } from "react";


const cartItems = [
  {
    name: "Samsung A15",
    qty: 1,
    price: "Rp2.500.000",
  },
  {
    name: "Redmi Note 13",
    qty: 2,
    price: "Rp4.200.000",
  },
];

export default function DashboardPage() {
  const [menuItems, setMenuItems] = useState<Products[]>([])

  useEffect(() => {
    const fetchProducts = async() => {  
      const res = await getAllProducts()
      setMenuItems(res)
    }
    fetchProducts()
  }, [])

  return (
    <DashboardShell title="Buat Transaksi">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] p-4">
        
        {/* LEFT CONTENT */}
        <section className="rounded-md bg-white p-3 shadow-sm shadow-slate-200/40 transition hover:shadow-slate-300/40 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none dark:hover:shadow-zinc-800/30">
        <div className="relative my-3">
          <input
            type="search"
            placeholder="Cari barang..."
            className="
              w-full rounded-xl border border-zinc-200
              bg-white px-4 py-3 pl-11
              text-sm text-zinc-900
              outline-none transition

              placeholder:text-zinc-400

              focus:border-sky-500
              focus:ring-4 focus:ring-sky-500/10

              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-zinc-100
              dark:placeholder:text-zinc-500
            "
          />

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="group overflow-hidden rounded-md border border-zinc-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md hover:shadow-sky-200/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500 dark:hover:shadow-sky-500/20"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                  <img
                    src={`http://localhost:8000/uploads/${item.image}`}
                    alt={item.name}
                    onError={(e) => {
                              e.currentTarget.src =
                                "https://arthurmillerfoundation.org/wp-content/uploads/2018/06/default-placeholder.png";
                            }}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-linear-to-b from-black/40 to-transparent px-4 py-3 text-white">
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                      {item.category_name}
                    </span>
                    <span className="rounded-md bg-sky-600/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                      {item.price}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {item.deskripsi}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                      Tambah
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">Klik untuk pilih</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="sticky top-20 h-fit rounded-md border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Buat Transaksi
              </h3>

              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Tambahkan barang dan pilih metode pembayaran.
              </p>
            </div>

            <div className="rounded-md bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              POS
            </div>
          </div>

          <div className="mt-6 space-y-4">
            
            {/* SEARCH */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Cari Barang
              </label>

              <input
                type="text"
                placeholder="Masukkan nama atau barcode..."
                className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-700"
              />
            </div>

            {/* CART */}
            <div className="rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-4 py-3 ${
                    index !== cartItems.length - 1
                      ? "border-b border-zinc-200 dark:border-zinc-800"
                      : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Qty {item.qty}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* PAYMENT */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Metode Pembayaran
              </label>

              <select
                className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-700"
              >
                <option>Tunai</option>
                <option>QRIS</option>
                <option>Transfer Bank</option>
                <option>E-Wallet</option>
              </select>
            </div>

            {/* TOTAL */}
            <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total
                </p>

                <p className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  Rp6.700.000
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="w-full rounded-md bg-sky-600 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[0.99] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
            >
              Simpan Transaksi
            </button>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}