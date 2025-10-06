"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatepickerInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";

const RegisterPage = () => {

    const images = [
        '/images/register_banner.jpg',
        '/images/register_banner_2.jpg',
        '/images/register_banner_3.jpg',
    ]

    const [currentImage, setCurrentimage] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentimage(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [])

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
            <div
                className="h-full flex-1 bg-cover bg-center rounded-3xl overflow-hidden"
                style={{ backgroundImage: `url(${images[currentImage]})`, transition: 'background-image 1s ease-in-out' }}
            >
                <div className="w-full h-full bg-gradient-to-t from-black to-transparent flex items-end p-16">
                    <div className="border-l border-white pl-3">
                        <h3 className="text-3xl mb-4">Lorem Ipsum</h3>
                        <p className="max-w-[400px] font-thin">blabla bla blabla, blablabla blabla blablabla, blabla bla blabla, blablabla blabla blablabla, blabla bla blabla, blablabla blabla blablabla</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;