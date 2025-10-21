"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, PawPrint } from "lucide-react";
import { useAuth } from "@/providers/UserProvider";

export default function ProfileSidebar() {

  const { user } = useAuth();
 
  return (
    <Card className="rounded-md bg-white shadow-md hover:shadow-lg transition dark:bg-neutral-800 dark:shadow-black/10">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-28 w-28 ring-2 ring-white dark:ring-neutral-800">
          <AvatarImage src="/images/profile.png" alt={user?.name} />
          <AvatarFallback>Kaua</AvatarFallback>{/* Só aparece se n tiver imagem */}
        </Avatar>

        <CardTitle className="mt-3 text-xl text-slate-900 dark:text-slate-100">
          {user?.name}
        </CardTitle>
        <p className="mt-1 text-center text-sm text-slate-600 dark:text-slate-300 max-w-[240px]">
          Bio qualquer
        </p>
      </CardHeader>

      {/* Conteúdo */}
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
          <MapPin className="h-4 w-4 mt-0.5 text-cyan-600 dark:text-cyan-400" />
          <span>Fatec Cruzeiro</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <span>(11) 1111-1111</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <span>{user?.email}</span>
        </div>

        <Separator className="dark:bg-neutral-700" />

        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <PawPrint className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <span>
            <strong>6</strong> cachorros registrados
          </span>
        </div>

        <Button
          variant="default"
          className="w-full mt-2 cursor-pointer"
        >
          Editar Perfil
        </Button>
      </CardContent>
    </Card>
  );
}
