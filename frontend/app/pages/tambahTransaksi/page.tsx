'use client'
import DashboardShell from "../../component/DashboardShell";
import TransactioConfirmModal from "@/app/component/TransactionConfirmModal";
import { Search } from "lucide-react";
import { getAllProducts, Products } from "@/app/services/products";
import { getCategories, Category } from "@/app/services/categories";
import { useEffect, useState } from "react";
import type { Cart } from "@/app/services/types"

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState<Cart[]>([])
  const [menuItems, setMenuItems] = useState<Products[]>([])
  const [filteredItems, setFilteredItems] = useState<Products[]>(menuItems)
  const [categories, setCategories] = useState<Category[]>([])
  const [total, setTotal] = useState(0)
  const [method, setMethod] = useState("Metode Pembayaran")
  const [priceInput, setPriceInput] = useState(0)

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchProducts = async() => {  
      const resProducts = await getAllProducts()
      const resCategories = await getCategories()
      setMenuItems(resProducts)
      setFilteredItems(resProducts)
      setCategories(resCategories)
    }
    fetchProducts()
  }, [])

  const addItem = (id: number, price: number, qty: number, name: string) => {
    const subtotal = price * qty
    const newItem = {name: name, id: id, qty: qty, subtotal: subtotal}
    const exist = cart.find((item) => item.name === newItem.name)
    if (exist) {
      const updatedCart = cart.map((item) =>
        item.name === newItem.name
          ? {
              ...item,
              qty: item.qty + newItem.qty,
              subtotal: item.subtotal + newItem.subtotal,
            }
          : item
      );
      setTotal(total+newItem.subtotal)
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
      setTotal(total+newItem.subtotal)
    }
  }

  const removeItem = (id: number) => {
    setCart((prev) => {
      
      const exist = prev.find((item) => item.id === id)
      
      if (!exist) {
        return prev
      }

      setTotal(() => total - exist.subtotal / exist.qty)

      if (exist.qty === 1) {
        return prev.filter((item) => item.id !== id)
      }

      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty - 1,
              subtotal: item.subtotal / item.qty * (item.qty - 1),
            }
          : item
      )
    })
  }

  const addItemCart = (id: number) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id == id)

      if (!exist) {
        return prev
      }
      setTotal(() => total + exist.subtotal / exist.qty)

      return prev.map((item) => 
        item.id === id ? {...item, qty: item.qty + 1, subtotal: item.subtotal /item.qty * (item.qty + 1)} : item
      )
    })
  }
  
  return (
    <DashboardShell title="Buat Transaksi">
      
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] p-4 relative">
        <TransactioConfirmModal  
          items={cart} 
          method={method} 
          onClose={onClose} 
          isOpen={isOpen} 
          jumlahPembayaran={priceInput}
          kembalian={priceInput - total}
        />  
        {/* LEFT CONTENT */}
        <section className="rounded-md bg-white p-3 shadow-sm shadow-slate-200/40 transition hover:shadow-slate-300/40 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none dark:hover:shadow-zinc-800/30">
        <div className="relative my-3">
          <input
            onChange={(e) => { const filtered = menuItems.filter((item) => item.name.toLowerCase().includes( e.target.value.toLowerCase() )); setFilteredItems(filtered)}}
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

        <div className="flex gap-2 mb-2">
          <button onClick={() => { const filtered = menuItems.filter((item) => item.category_name !== ''); setFilteredItems(filtered)}} className="rounded-md dark:text-zinc-100 border border-zinc-200 bg-white text-center shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300  hover:shadow-md hover:shadow-sky-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-500 dark:hover:shadow-sky-500/20 px-2 py-1">Semua</button>
          {categories.map((category)=> (
            <button onClick={() => { const filtered = menuItems.filter((item) => item.category_name == category.name); setFilteredItems(filtered)}} key={category.id} className="rounded-md dark:text-zinc-100 border border-zinc-200 bg-white text-center shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300  hover:shadow-md hover:shadow-sky-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-500 dark:hover:shadow-sky-500/20 px-2 py-1">{category.name}</button>
          ))}
        </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <button
                onClick={() => addItem(item.id, item.price, 1, item.name)}
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

          <div className="mt-6 ">
            

            {/* CART */}
            <div className=" rounded border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 max-h-50 overflow-auto">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className={`flex rounded items-center justify-between px-4 py-3 ${
                    index !== cart.length - 1
                      ? "rounded border-b border-zinc-200 dark:border-zinc-800"
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

                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Rp. {item.subtotal.toLocaleString("id-ID")}
                    </p>
                    <button onClick={() => removeItem(item.id)} className="px-2 rounded bg-sky-400"><p className="w-2">-</p></button>
                    <button onClick={() => addItemCart(item.id)} className="px-2 rounded bg-rose-400/50"><p className="w-2">+</p></button>
                  </div>

                </div>
              ))}
            </div>

            {/* PAYMENT */}
            <div>
              <label className="my-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Metode Pembayaran
              </label>

              <select
              onChange={(e) => {setMethod(e.target.value)}}
                className="w-full rounded-t-md border-b border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-700"
              >
                <option disabled>{method}</option>
                <option value="Tunai">Tunai</option>
                <option value="QRIS">QRIS</option>
              </select>
            </div>

            {/* TOTAL */}
            <div className=" bg-zinc-50 border-b border-zinc-200 dark:border-zinc-800 p-4 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total
                </p>

                <p className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  Rp. {total.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className=" bg-zinc-50 p-4 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Jumlah Bayar
                </p>

                <input type="number" inputMode="numeric" pattern="[0-9]*" value={priceInput} onChange={(e) => {setPriceInput(e.target.value)}} className=" w-1/2 focus:border-slate-300 focus:text-left border-slate-600 border-b text-right outline-none text-xl font-bold text-zinc-950 dark:text-zinc-50"/>

              </div>
            </div>

            <div className=" bg-zinc-50 p-4 rounded-b-md mb-6 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Kembalian
                </p>

                <p className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  Rp. {priceInput - total}
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => { setIsOpen(true) }}
              disabled={cart.length < 1}
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