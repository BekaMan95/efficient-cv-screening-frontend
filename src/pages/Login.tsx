"use client"

import * as z from "zod"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const UserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type User = z.infer<typeof UserSchema>

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  })

  const onSubmit = async (data: User) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 to-gray-900 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white/95 shadow-xl p-6">
        <h1 className="text-lg font-semibold text-gray-800 mb-1">
          Sign in
        </h1>

        <p className="text-xs text-gray-500 mb-6">
          Enter your credentials to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
                ${
                  errors.email
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                }`}
            />

            {errors.email && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
                ${
                  errors.password
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                }`}
            />

            {errors.password && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-amber-700 hover:bg-amber-800 transition text-white text-sm font-medium py-2 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
