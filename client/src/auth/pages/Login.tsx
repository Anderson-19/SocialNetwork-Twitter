import { useState } from 'react'
import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { logIn } from '../../api'
import { LoadingIcon } from '../../shared/LoadingIcon'
import { useUserStore } from '../../store'

type FormInputs = {
  email: string
  password: string
}

export const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const setUser = useUserStore(state => state.setUser);

  const nav = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    const { ok, ...rest } = await logIn(data);
    setLoading(ok!);

    if (!ok) { setErrorMessage(rest.message); return; }

    setUser({
      isLogged: true,
      ...rest
    });
    setLoading(ok);
    nav('/home');

  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Log In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">

            <label className="block text-gray-600">Email</label>
            <input
              className={
                clsx(
                  "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500",
                  { 'border-red-500': errors.email }
                )
              }
              type="email"
              {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ })}
              name="email"
            />
            {errors.email?.type === 'required' && <span style={{ color: "red" }}>This field is required</span>}
            {errors.email?.type === 'pattern' && <span style={{ color: "red" }}>Invalid email</span>}

          </div>

          <div className="mb-4">

            <label className="block text-gray-600">Password</label>
            <input
              className={
                clsx(
                  "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500",
                  { 'border-red-500': errors.password }
                )
              }
              type="password"
              {...register("password", { required: true, minLength: 5 })}
              name="password"
            />
            {errors.password && <span style={{ color: "red" }}>This field is required</span>}
            {errors.email?.type === 'minLength' && <span style={{ color: "red" }}>Invalid password, it is very weak</span>}

          </div>

          {errorMessage && <span className="text-red-500">{errorMessage}</span>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 mt-6 px-4 w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? <LoadingIcon /> : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-blue-500 text-center">
          <NavLink to={'/register'} className="hover:underline">Don't have an account? Register</NavLink>
        </div>

      </div>
    </div>
  )
}
