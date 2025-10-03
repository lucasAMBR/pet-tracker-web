import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {

    return (
        <nav className="fixed top-0 w-full flex justify-center">
            <div className="bg-neutral-100 max-w-[1280px] w-full py-4 px-8 rounded-b-2xl shadow-lg shadow-black/35 flex justify-between">
                <div className="flex items-center gap-2">
                    <Image width={40} height={40} alt="logo" src={"/images/logo_2.png"} />
                    <h1 className="text-2xl font-bold text-cyan-600">Pet Tracker</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant={'outline'} className="cursor-pointer">Login</Button>
                    <Button className="cursor-pointer">Register</Button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;