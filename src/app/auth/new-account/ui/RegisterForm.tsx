"use client";

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";

type FormInput = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { email, name, password } = data;

    // Server action
    const registerResp = await registerUser(email, name, password);
    if (!registerResp.ok) {
      setErrorMessage(registerResp.message ?? "");
      return;
    }

    const loginResp = await login(email.toLowerCase(), password);

    if (!loginResp.ok) {
      setErrorMessage(loginResp.message ?? "");
      return;
    }

    // router.replace('/')
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
          {
            "focus:ring-red-500": errors.name,
            "focus:border-red-500": errors.name,
            "border-red-500": errors.name,
          }
        )}
        type="text"
        {...register("name", { required: true })}
      />
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
          {
            "focus:ring-red-500": errors.email,
            "focus:border-red-500": errors.email,
            "border-red-500": errors.email,
          }
        )}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
          {
            "focus:ring-red-500": errors.password,
            "focus:border-red-500": errors.password,
            "border-red-500": errors.password,
          }
        )}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      {/* Errors List*/}
      {Object.entries(errors).find(
        ([prop, value]) => value.type === "required"
      ) && (
        <div className="flex items-center mb-5">
          <IoAlertCircleOutline className="mr-1 h-5 w-5 text-red-500" />
          <span className="text-red-500 ">
            Revise los campos obligatorios *
          </span>
        </div>
      )}
      {errors.password?.type === "minLength" && (
        <div className="flex items-center mb-5">
          <IoAlertCircleOutline className="mr-1 h-5 w-5 text-red-500" />
          <span className="text-red-500 ">
            Longitud mínima de la contraseña 6 caracteres
          </span>
        </div>
      )}
      {errors.email?.type === "pattern" && (
        <div className="flex items-center mb-5">
          <IoAlertCircleOutline className="mr-1 h-5 w-5 text-red-500" />
          <span className="text-red-500 ">Email no válido</span>
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center mb-5">
          <IoAlertCircleOutline className="mr-1 h-5 w-5 text-red-500" />
          <span className="text-red-500 ">{errorMessage}</span>
        </div>
      )}

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
