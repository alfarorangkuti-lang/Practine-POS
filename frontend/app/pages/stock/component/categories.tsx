import {
    createCategory,
    getCategories,
    Category,
    deleteCategory,
    updateCategory
} from "@/app/services/categories"

import { Edit3, Trash2, Check } from "lucide-react"
import { useEffect, useState } from "react"

export default function Categories(){

    const [data, setData] = useState<Category[]>([])
    const [insertInput, setInsertInput] = useState<string>('')

    const [editingId, setEditingId] = useState<number | null>(null)
    const [editInput, setEditInput] = useState<string>('')

    const [refresh, setRefresh] = useState(false)

    const get = async() => {
        try {
            const res = await getCategories()
            setData(res)
        } catch (error) {
            console.log(error)
        }
    }

    const post = async() => {
        try {
            await createCategory(insertInput)

            setRefresh((prev) => !prev)
            setInsertInput('')

        } catch (error) {
            console.log(error)
        }
    }

    const destroy = async(id:number) => {
        try {

            await deleteCategory(id)

            setRefresh((prev) => !prev)

        } catch (error: unknown) {
            console.log(error)
        }
    }

    const edit = async(category:Category) => {
        try {

            // save update
            if(editingId === category.id){

                await updateCategory(
                    category.id,
                    editInput
                )

                setEditingId(null)
                setEditInput('')

                setRefresh((prev) => !prev)

                return
            }

            // mulai edit
            setEditingId(category.id)
            setEditInput(category.name)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get()
    }, [refresh])

    return (
        <aside className="order-1 sm:order-2 space-y-6">

            <section className="rounded-md border border-slate-300 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 h-full">

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                            Kategori
                        </h3>

                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Klik untuk memilih kategori
                        </p>
                    </div>
                </div>

                <div className="mt-5 space-y-3">

                    {data.map((category) => (

                        <div key={category.id} className="flex justify-between items-center rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">

                            { editingId === category.id ? 
                                <input value={editInput} onChange={(e) => setEditInput(e.target.value)} className="bg-transparent outline-0 border-b border-zinc-500" />
                                    :
                                <p>{category.name}</p>
                            }

                            <div className="flex items-center gap-2">

                                <button
                                    onClick={() => edit(category)}
                                    className="px-2 py-2 rounded-md border border-slate-500"
                                >

                                    {
                                        editingId === category.id
                                        ?
                                            <Check className="h-3.5 w-3.5"/>
                                        :
                                            <Edit3 className="h-3.5 w-3.5"/>
                                    }

                                </button>

                                <button
                                    onClick={() => destroy(category.id)}
                                    className="inline-flex items-center gap-2 rounded-md border border-rose-300 bg-rose-50 p-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-700/40 dark:bg-rose-900 dark:text-rose-200 dark:hover:bg-rose-800"
                                >
                                    <Trash2 className="h-3.5 w-3.5"/>
                                </button>

                            </div>

                        </div>

                    ))}

                    <div className="flex">

                        <input
                            value={insertInput}
                            onChange={(e) => setInsertInput(e.target.value)}
                            type="text"
                            placeholder="Tambah Kategori"
                            className="rounded-l-md w-full outline-0 border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        />

                        <button
                            onClick={post}
                            type="button"
                            className="rounded-r-md w-1/3 outline-0 border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                        >
                            Tambah
                        </button>

                    </div>

                </div>

            </section>

        </aside>
    )
}