'use client'
import { login } from '@/app/services/auth'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter()
  const[message, setMessage] = useState("")
  const[passwordInput, setPasswordInput] = useState("")
  const[usernameInput, setUsernameInput] = useState("")
  const handleLogin = async() => {
    try {
      await login(usernameInput, passwordInput)
      router.push('/pages/home')
    } catch (error: any) {
      setMessage(error.message)
    }
  }
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 dark:bg-zinc-950 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-md flex-col rounded-md border border-zinc-200 bg-white p-10 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 text-center">
          <h1 className="mt-4 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
            Login
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Masukkan username dan kata sandi untuk mengakses dashboard dan mulai berjualan.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); handleLogin()}}>
          <label className="block">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Username</span>
            <input
              onChange={(e) => setUsernameInput(e.target.value)}
              type="text"
              placeholder="username"
              className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              aria-label="Username"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Kata Sandi</span>
            <input
              onChange={(e) => setPasswordInput(e.target.value)}
              type="password"
              placeholder="Masukkan kata sandi"
              className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              aria-label="Kata Sandi"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          >
            Masuk
          </button>
          <p className='text-center text-red-500'>{message}</p>
        </form>
      </div>
    </div>
  );
}
