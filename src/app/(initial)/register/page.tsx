"use client"

import CarrouselBanner from "@/components/register/carrousel-banner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatepickerInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";

const RegisterPage = () => {

    return (
        <div className="w-screen h-screen flex p-6 bg-neutral-100 dark:bg-neutral-900">
            <div className="h-full flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    <Image src={"/images/logo_2.png"} alt="logo" width={100} height={100} />
                    <h2 className="text-3xl text-cyan-600 font-bold my-2">Pet Tracker</h2>
                    <p className="my-6 font-bold text-xl">Welcome!</p>
                </div>
                <form className="flex flex-col gap-3 w-auto">
                    <div className="">
                        <Label className="mb-2">Name</Label>
                        <Input placeholder="Full name" className="w-full" />
                    </div>
                    <div className="">
                        <Label className="mb-2">Email</Label>
                        <Input placeholder="Your E-mail" className="w-full" />
                    </div>
                    <div className="">
                        <Label className="mb-2">CPF</Label>
                        <Input placeholder="CPF" className="w-full" />
                    </div>
                    <div className="">
                        <Label className="mb-2">Password</Label>
                        <Input placeholder="Password" className="w-full" />
                    </div>
                    <DatepickerInput />
                    <div className="flex items-start gap-3 my-4">
                        <Checkbox id="terms-2" />
                        <div className="grid gap-2">
                            <Label htmlFor="terms-2">Accept terms and conditions</Label>
                            <p className="text-muted-foreground text-sm">
                                By clicking this checkbox, you agree to the <span className="font-bold hover:underline hover:text-black cursor-pointer dark:hover:text-white">terms and conditions</span>.
                            </p>
                        </div>
                    </div>
                    <Button className="cursor-pointer">Register</Button>
                </form>
            </div>
            <CarrouselBanner />
        </div>
    );
}

export default RegisterPage;