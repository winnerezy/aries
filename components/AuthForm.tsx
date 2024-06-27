"use client";

import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import AuthButton from "./AuthButton";
import { authFormSchema } from "../lib/utils/authFormSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function AuthForm({ type }: { type: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(null)
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (type === "sign-in") {
        try {
          setIsLoading(true)
                  const options = {
                    method: 'POST',
                    body: JSON.stringify({
                      username: data.username,
                      password: data.password
                    })
                   
                  };
                  const res = await fetch('api/login', options)
                  const { message } = await res.json()
                if(res.status === 200){
                  router.push("/discover");
                }
                console.log(message)
                setError(message)
        } catch (error: any) {
            setError(error.message)
        } finally {
          setIsLoading(false)
        }

    } 
    if(type === 'sign-up'){
         try {
          setIsLoading(true)
           const body = JSON.stringify(
            {
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.username,
              email: data.email,
              password: data.password,
            }
           )
           const res = await fetch('/api/register', { method: 'POST', body })
          if(res.status === 200){
            router.push("/discover");
          }
         } catch (error: any) {
           console.error({ message: error.message });
         } finally {
           setIsLoading(false);
         }
    }
  }

  return (
    <section className="relative flex flex-col gap-1 w-[500px] min-h-[600px] items-center justify-center py-10 px-2">
      <header className="flex flex-col absolute top-8 left-2 gap-y-2">
        <p className="text-3xl font-bold text-[var(--global-secondary-text)]">
          Aries
        </p>
        <h1 className="font-bold text-2xl tracking-wide self-start">
          {type === "sign-in" ? "Login" : "Register"}
        </h1>
        <p>Please enter your details below</p>
      </header>
      <>
         <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col w-full p-2"
          >
            {type === "sign-up" ? (
              <main className="space-y-6 mt-36">
                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem className="w-full flex-grow space-y-2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                            className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem className="w-full flex-grow space-y-2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                            className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow space-y-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          className={`p-2 rounded-[10px] w-full flex-grow outline-none text-black`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow space-y-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                          className={`p-2 rounded-[10px] w-full flex-grow outline-none`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          className={`p-2 rounded-[10px] w-full flex-grow outline-none`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </main>
            ) : (
              <main className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow space-y-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          className={`p-2 rounded-[10px] w-full flex-grow outline-none`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                          className={`p-2 rounded-[10px] w-full flex-grow outline-none`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-red-600 text-sm text-center">{ error }</p>
              </main>
            )}

            <AuthButton type={type} isLoading={isLoading} />
          </form>
        </Form>
      </>
      <p>
        {type === "sign-in" ? "Don't have an account ?" : "Have an account ?"}{" "}
        <Link
          href={type === "sign-in" ? "register" : "login"}
          className="text-[var(--global-secondary-text)] hover:text[--tetiary-text]"
        >
          {type === "sign-in" ? "Sign up" : "Sign In"}
        </Link>
      </p>
    </section>
  );
}