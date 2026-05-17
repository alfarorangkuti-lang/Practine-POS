"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Edit3, Trash2 } from "lucide-react";
import DashboardShell from "../../component/DashboardShell";
import Categories from "./component/categories";
import { destroyProduct, getAllProducts, Products } from "@/app/services/products";

const PAGE_SIZE = 8;

export default function Stock() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Products[]>([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const handleDelete = async(id:string) => {
    const res = await destroyProduct(id)
    setRefresh((prev) => !prev)
  }

  const pagedProducts = useMemo(
    () => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [products,page]
  );
  
  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await getAllProducts();
          setProducts(res);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [refresh]);

  return (
    <DashboardShell
      title="Manajemen Stok"
    >
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          <div className="rounded-md border border-slate-300 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Item</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">{products.length}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Jumlah produk aktif dalam stok.</p>
          </div>
          <div className="rounded-md border border-slate-300 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Kategori</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">12</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Pengelompokan menu untuk kemudahan pencarian.</p>
          </div>
          <div className="rounded-md border border-slate-300 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Jenis Menu</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">8</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Jenis menu seperti minuman, makanan, dan paket.</p>
          </div>
          <div className="rounded-md border border-slate-300 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Stok Rendah</p>
            <p className="mt-3 text-3xl font-semibold text-amber-600 dark:text-amber-400">1</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Produk yang perlu segera diisi ulang.</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
          <section className=" order-2 sm:order-1 min-w-0 rounded-md border border-slate-300 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Daftar Stok</h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Periksa ketersediaan produk dan status stok saat ini.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="search"
                  placeholder="Cari produk..."
                  className="w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20 sm:w-auto"
                />
                <Link
                  href="/pages/stock/addMenu"
                  className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Tambah Item
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-md border border-slate-300 dark:border-zinc-800 h-120 overflow-scroll md:overflow-auto">
              <table className="min-w-full text-left text-sm text-zinc-700 dark:text-zinc-300 relative">
                <thead className="bg-slate-50 sticky top-0 z-10 text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-zinc-900 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 w-14">No</th>
                    <th className="px-4 py-3">Produk</th>
                    <th className="px-4 py-3">Harga</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
                  {pagedProducts.map((item, index) => (
                    <tr key={item.stock}>
                      <td className="px-4 py-4 font-medium text-zinc-950 dark:text-zinc-50">{(page - 1) * PAGE_SIZE + index + 1}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800">

                            <img src={`http://localhost:8000/uploads/${item.image}`} alt={item.name} 
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://arthurmillerfoundation.org/wp-content/uploads/2018/06/default-placeholder.png";
                            }}
                            className="md:h-full md:w-full object-cover" />

                          </div>
                          <div>
                            <p className="font-medium text-zinc-950 dark:text-zinc-50">{item.name}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden md:block">{item.deskripsi}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">{item.price}</td>
                      <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">{item.category_name}</td>
                      <td className="px-4 py-4">{item.stock}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Link href={`/pages/stock/editMenu/${item.id}`} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800">
                            <Edit3 className="h-3.5 w-3.5" />
                          </Link>
                          <button onClick={() => handleDelete(item.id.toString())} className="inline-flex items-center gap-2 rounded-md border border-rose-300 bg-rose-50 p-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-700/40 dark:bg-rose-900 dark:text-rose-200 dark:hover:bg-rose-800">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-300 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Menampilkan {pagedProducts.length} dari {products.length} produk
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Sebelumnya
                </button>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Halaman {page} dari {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page === totalPages}
                  className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          </section>
          
          <Categories/>

        </div>
      </div>
    </DashboardShell>
  );
}
