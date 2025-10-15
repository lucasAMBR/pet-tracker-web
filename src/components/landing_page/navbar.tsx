"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full flex justify-center z-50">
      <div className="bg-neutral-100 max-w-[1280px] w-full py-4 px-8 rounded-b-2xl shadow-lg shadow-black/35 flex justify-between items-center">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => router.push("/")}
        >
          <Image width={40} height={40} alt="logo" src={"/images/logo_2.png"} />
          <h1 className="text-2xl font-bold text-cyan-600">Pet Tracker</h1>
        </div>

        {/* BOTÕES */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="cursor-pointer hover:bg-white text-black bg-neutral-300"
            onClick={() => router.push("/dashboard")}
          >
            Profile
          </Button>

          <Button
            variant="secondary"
            className="cursor-pointer hover:bg-white text-black bg-neutral-300"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>

          <Button
            className="cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
