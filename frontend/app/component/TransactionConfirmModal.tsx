import type { Cart } from "@/app/services/types"
import { createTransaction } from "../services/transaction"
import { CartBackend } from "../services/transaction"

type TransactionProps = {
    isOpen: boolean,
    onClose: () => void
    items: Cart[]
    method:string
    jumlahPembayaran: number
    kembalian: number
}


export default function TransactioConfirmModal({
    isOpen = false,onClose, items, method, jumlahPembayaran, kembalian
}: TransactionProps) {

    const cart: CartBackend[] = items.map((item) => ({
        id_product: item.id,
        qty: item.qty
    }))

    const handleConfirm = async() => {
        // try {
            
        // } catch (error) {
        //     console.log(error)
        // }

        const res = await createTransaction(cart, jumlahPembayaran)
            console.log(res)
    }

    const total = items.reduce((acc, item) => acc + item.subtotal, 0)

    return (
        <div className={`${isOpen ? "" : "hidden"} fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm`}>
            
            <div className="w-full max-w-2xl rounded-md border border-slate-700 bg-[#111827] p-6 shadow-2xl">
                
                {/* Header */}
                <div className="mb-5 flex items-center justify-between border-b border-slate-700 pb-3">
                    <h1 className="text-xl font-bold text-white">
                        Konfirmasi Transaksi
                    </h1>

                    <button onClick={onClose} className="text-slate-400 transition hover:text-white">
                        ✕
                    </button>
                </div>

                {/* List Item */}
                <div className="max-h-[350px] space-y-3 overflow-y-auto pr-2">

                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between rounded-md border border-slate-700 bg-slate-800/60 p-4 transition hover:bg-slate-800"
                        >

                            <div>
                                <p className="text-sm text-slate-400">
                                    ID #{item.id}
                                </p>

                                <h2 className="font-semibold text-white">
                                    {item.name}
                                </h2>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-slate-400">
                                    Qty: {item.qty}
                                </p>

                                <p className="font-bold text-sky-400">
                                    Rp {item.subtotal.toLocaleString("id-ID")}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>

                {/* Footer */}
                <div className="mt-5 border-t border-slate-700 pt-4">

                    <div className="mb-1 flex items-center justify-between">
                        <p className="text-slate-400">
                            Total
                        </p>

                        <h2 className="text-2xl font-bold text-sky-400">
                            Rp {total.toLocaleString("id-ID")}
                        </h2>
                    </div>

                    <div className="mb-1 flex items-center justify-between">
                        <p className="text-slate-400">
                            Metode Pembayaran
                        </p>

                        <h2 className="text-md text-slate-400">
                            {method}
                        </h2>
                    </div>

                    <div className="mb-1 flex items-center justify-between">
                        <p className="text-slate-400">
                            Jumlah Pembayaran
                        </p>

                        <h2 className="text-md text-slate-400">
                            Rp {jumlahPembayaran.toLocaleString("id-ID")}
                        </h2>
                    </div>

                    <div className="mb-1 flex items-center justify-between">
                        <p className="text-slate-400">
                            Kembalian
                        </p>

                        <h2 className="text-2xl text-sky-400">
                            Rp {kembalian.toLocaleString("id-ID")}
                        </h2>
                    </div>

                    <div className="flex gap-3">
                        
                        <button onClick={onClose} className="flex-1 rounded-md border border-slate-600 py-3 font-medium text-white transition hover:bg-slate-700">
                            Batal
                        </button>

                        <button onClick={handleConfirm} className="flex-1 rounded-md bg-sky-500 py-3 font-semibold text-black transition hover:bg-sky-400">
                            Konfirmasi
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}