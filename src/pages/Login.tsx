import * as z from "zod";
import React from 'react'
import { useForm } from 'react-hook-form'

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type User = z.infer<typeof UserSchema>

const Login = () => {
   const {
    register,
    handleSubmit,
    formState: { errors },
   } = useForm<User>()
   const onSubmit = (data: User) => {

   }
  return (
    <div className='bg-amber-900 text-red-500'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register("email")} />
            <input type="password" {...register("password")} />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login