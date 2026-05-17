'use client';

import { useState } from "react";
import { use } from 'react'
import type { SubmitEvent } from 'react'
import Link from "next/link";
import { createProduct, Products } from "@/app/services/products";
import { useEffect } from "react";
import { getCategories } from "@/app/services/categories";
import type { Category } from "@/app/services/categories";
import { getProductById } from "@/app/services/products";
import { ChevronLeft, Upload } from "lucide-react";
import DashboardShell from '../../../../component/DashboardShell';
import { useRouter } from "next/navigation";

export default function EditMenu({params} : {params: Promise<{id: string}>}) {
  const [imageName, setImageName] = useState("");
  const [categories, setCategories] = useState<Category[]>([])
  const [productData, setProductData] = useState<Products>()
  const router = useRouter()
  const { id } = use(params)
  useEffect(() => {
    const fetchCategories = async() => {
      const res = await getCategories()
      setCategories(res)
    }

    const fetchProduct = async() => {
      const data = await getProductById(id)
      console.log(data)
      setProductData(data[0])
      setImageName(data[0].image)
    }

    fetchProduct()
    fetchCategories()

  }, [])


  const onSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        const res = await createProduct(formData)
        router.push('/pages/stock')
    } catch (error) {
        console.log(error)
    }
    
  }

  return (
    <DashboardShell title="Tambah Menu">
      <div className="space-y-6 p-4">
        <div className="flex flex-col gap-4 rounded-md border border-zinc-200 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/pages/stock"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Tambah Menu Baru</h1>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
              <div className="space-y-4 rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Nama Menu
                  </label>
                  <input
                    id="name"
                    required
                    name="name"
                    value={productData?.name || ""}
                    type="text"
                    onChange={(e) => e.target.value}
                    placeholder="Contoh: Nasi Goreng Spesial"
                    className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Kategori
                    </label>
                    <select
                      id="category_id"
                      required
                      name="category_id"
                      className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Harga
                    </label>
                    <input
                      id="price"
                      required
                      name="price"
                      type="number"
                      placeholder="Rp30.000"
                      className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="stock" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Stok
                    </label>
                    <input
                      id="stock"
                      required
                      name="stock"
                      type="number"
                      min="0"
                      placeholder="10"
                      className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Deskripsi Menu
                  </label>
                  <textarea
                    id="description"
                    required
                    name="description"
                    rows={4}
                    placeholder="Contoh: Nasi goreng spesial dengan ayam suwir dan telur mata sapi."
                    className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-0 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="space-y-3">
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Detail Gambar</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Unggah foto menu agar lebih mudah dikenali di daftar stock.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Unggah Gambar
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                    <span className="inline-flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      {imageName || "Pilih file gambar..."}
                    </span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setImageName(file?.name || "");
                      }}
                    />
                  </label>
                </div>

                <div className="rounded-md bg-white/80 p-4 text-sm text-zinc-600 shadow-sm shadow-slate-200/50 dark:bg-zinc-950 dark:text-zinc-400 dark:shadow-none">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">Tips UI/UX</p>
                  <p className="mt-1 leading-6">
                    Gunakan nama menu yang singkat namun jelas, lengkapi kategori dan deskripsi untuk memudahkan pencarian.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/stock"
                className="inline-flex justify-center rounded-md border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Simpan Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
