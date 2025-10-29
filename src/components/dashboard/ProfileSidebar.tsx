"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, PawPrint } from "lucide-react";
import { useAuth } from "@/providers/UserProvider";
import { SheetDemo } from "../dashboard/editprofile";
import { formatPhone } from "@/lib/formatter";
import { useLoggedUserPhones } from "@/hooks/Phone/useLoggedUserPhone";
import { useLoggedUserAddress } from "@/hooks/Address/useLoggedUserAddress";
import { useLoggedUserProfile } from "@/hooks/Authentication/useRefetchUserData";

export default function ProfileSidebar() {
	const {
		data: loggedUserProfile,
		isFetching: UserProfileIsFetching,
		error: userProfileError,
	} = useLoggedUserProfile();

	const {
		data: loggedUserPhones,
		isFetching: phonesIsFetching,
		error: phonesError,
	} = useLoggedUserPhones();

	const {
		data: loggedUserAddress,
		isFetching: addressIsFetching,
		error: addressError,
	} = useLoggedUserAddress();

	return (
		<Card className="rounded-md bg-white shadow-md hover:shadow-lg transition dark:bg-neutral-800 dark:shadow-black/10">
			<CardHeader className="flex flex-col items-center">
				<Avatar className="h-28 w-28 hover:ring-cyan-500 ring-none hover:ring-4 cursor-pointer hover:brightness-70 transition-all delay-100">
					<AvatarImage
						src={`${process.env.NEXT_PUBLIC_BACKEND_URL}storage/${loggedUserProfile?.data.image}`}
						alt={loggedUserProfile?.data.name}
					/>
					<AvatarFallback className="bg-cyan-600 text-4xl font-bold">
						{loggedUserProfile?.data.name.charAt(0)}
					</AvatarFallback>
				</Avatar>

				<CardTitle className="mt-3 text-xl text-slate-900 dark:text-slate-100">
					<p>{loggedUserProfile?.data.name}</p>
				</CardTitle>
				<p className="mt-1 text-center text-sm text-slate-600 dark:text-slate-300 max-w-[240px]">
					Bio qualquer
				</p>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
					<MapPin className="min-h-4 min-w-4 mt-0.5 text-cyan-600 dark:text-cyan-400" />
					{addressIsFetching && <span>loading address...</span>}
					{!addressIsFetching && !addressError && (
						<span>
							{loggedUserAddress?.data.street},{" "}
							{loggedUserAddress?.data.district},{" "}
							{loggedUserAddress?.data.number}, {loggedUserAddress?.data.city} -{" "}
							{loggedUserAddress?.data.state}
						</span>
					)}
					<span></span>
				</div>
				{!phonesIsFetching && !phonesError && (
					<>
						{loggedUserPhones?.data.map((phone) => (
							<div
								key={phone.id}
								className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"
							>
								<Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
								<span>{formatPhone(phone.number)}</span>
							</div>
						))}
					</>
				)}
				<div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
					<Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
					<span>{loggedUserProfile?.data.email}</span>
				</div>

				<Separator className="dark:bg-neutral-700" />

				<div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
					<PawPrint className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
					<span>
						<strong>6</strong> cachorros registrados
					</span>
				</div>

				<div className="mt-2">
					<SheetDemo />
				</div>
			</CardContent>
		</Card>
	);
}
