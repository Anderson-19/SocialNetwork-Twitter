import clsx from 'clsx'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { register as registerUser } from '../../api';
import { LoadingIcon } from '../../shared/LoadingIcon';

type FormInputs = {
    name: string
    lastname: string
    username: string
    email: string
    password: string
}

export const Register = () => {

    const { handleSubmit, formState: { errors }, register } = useForm<FormInputs>();
    const [errorMessage, setErrorMessage] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const nav = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const { ok, message } = await registerUser(data);
        setLoading(ok!);

        if (!ok) { setErrorMessage(message); return; }

        setLoading(ok);
        nav('/');

    }

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">

            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="block text-gray-600">Name</label>
                        <input
                            className={
                                clsx(
                                    "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500",
                                    { 'border-red-500': errors.name }
                                )
                            }
                            type="text"
                            {...register("name", { minLength: 5 })}
                            name="name"
                        />
                        {errors.name?.type === 'minLength' && <span style={{ color: "red" }}>Very short name, minimum 5 letters</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Lastname</label>
                        <input
                            className={
                                clsx(
                                    "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500",
                                    { 'border-red-500': errors.lastname }
                                )
                            }
                            type="text"
                            {...register("lastname", { minLength: 5 })}
                            name="lastname"
                        />
                        {errors.lastname?.type === 'minLength' && <span style={{ color: "red" }}>Very short name, minimum 5 letters</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Username</label>
                        <input
                            className={
                                clsx(
                                    "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500",
                                    { 'border-red-500': errors.username }
                                )
                            }
                            type="text"
                            {...register("username", { required: true, minLength: 5 })}
                            name="username"
                        />
                        {errors.username?.type === 'required' && <span style={{ color: "red" }}>This field is required</span>}
                        {errors.username?.type === 'minLength' && <span style={{ color: "red" }}>Very short name, minimum 5 letters</span>}
                    </div>

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
                            type="password"
                            className={
                                clsx(
                                    "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500",
                                    { 'border-red-500': errors.password }
                                )
                            }
                            {...register("password", { required: true, minLength: 5 })}
                            name="password"
                        />
                        {errors.password?.type === 'required' && <span style={{ color: "red" }}>This field is required</span>}
                        {errors.email?.type === 'minLength' && <span style={{ color: "red" }}>Invalid password, it is very weak</span>}
                    </div>

                    {errorMessage && <span className="text-red-500">{errorMessage}</span>}

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 mt-6 w-full cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? <LoadingIcon /> : 'Register'}
                    </button>
                </form>
                {/* <!-- Sign up  Link --> */}
                <div className="mt-6 text-blue-500 text-center">
                    <NavLink to={'/'} className="hover:underline">Don't have an account? Log In</NavLink>
                </div>

            </div>
        </div>
    )
}
