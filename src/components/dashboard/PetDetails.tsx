"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Syringe, BadgeInfo, Footprints, PawPrint, MapPin, Phone, Mail } from "lucide-react";
import { EditPetButton } from "@/components/dashboard/editpet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; 
export default function PetDetails() {
  return (
    
    <Card className="w-full rounded-md bg-white shadow-md dark:bg-neutral-800 dark:shadow-black/10">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Details pet</CardTitle>
        </div>
        <Separator className="dark:bg-neutral-700 my-4" />
      </CardHeader>

      <CardContent className="flex flex-col gap-6">

        <div className="flex items-center justify-between gap-4 h-[100px]">
          
          <div className="flex items-center gap-4 py-4">
            <Avatar className="h-[140px] w-[140px] ring-2 ring-gray-500">
              <AvatarImage src="/images/Dogan.png" alt="Photo Pet" />
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold leading-none padding">nome pet</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">puxar infos pet</p>
            </div>
          </div>

          <EditPetButton />
        </div>

        <Separator className="dark:bg-neutral-700 my-4" />

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between h-[28px]">
            <div className="flex items-center gap-2">
              <Syringe className="h-4 w-4 text-emerald-600" />
              <span>Status de vacine</span>
            </div>
            <span className="text-slate-600 dark:text-slate-300">Em dia</span>
          </div>

          <div className="flex items-center justify-between h-[28px]">
            <div className="flex items-center gap-2">
              <BadgeInfo className="h-4 w-4 text-cyan-600" />
              <span>Microchip</span>
            </div>
            <span className="text-slate-600 dark:text-slate-300">#1945</span>
          </div>
        </div>

        <Separator className="dark:bg-neutral-700" />

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold">Alergias</h3>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-start justify-between">
              <span className="text-slate-700 dark:text-slate-200">Alergias registradas:</span>
              <span className="text-slate-600 dark:text-slate-300 text-right">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, velit tempore cum quasi libero molestiae maiores vel repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis esse explicabo, repellendus reprehenderit exercitationem corrupti amet architecto vero enim non sed aperiam mollitia beatae voluptates vitae? Eveniet voluptatem laudantium corporis. Perspiciatis et consequatur aperiam quidem consequuntur debitis quas sed atque voluptate maiores.
              </span>
            </div>
            <div className="flex items-start justify-between">
              <span className="text-slate-700 dark:text-slate-200">Observações:</span>
              <span className="text-slate-600 dark:text-slate-300 text-right">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, nisi sed? At eaque fuga, eius rem excepturi libero eligendi tempora quidem ipsa laboriosam voluptatem quasi dolorum placeat quae distinctio sunt!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis odit atque, delectus fugiat aperiam est iure reiciendis magni repellat labore dolorum perferendis qui, alias vel error doloribus nihil ullam incidunt.
              </span>
            </div>
          </div>
        </div>

        <Separator className="dark:bg-neutral-700" />

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold">Map</h3>
          <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-slate-200 dark:border-neutral-700 bg-slate-100 dark:bg-neutral-900">
            <div className="flex items-center justify-center w-full h-[180px]">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Mapa do ultimo ponto conhecido</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm h-[28px]">
            <span className="text-slate-700 dark:text-slate-200">Ultima localização</span>
            <span className="text-slate-600 dark:text-slate-300">Cruzeiro - SP</span>
          </div>
        </div>

        <Separator className="dark:bg-neutral-700" />
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold">Informações da Coleira</h3>
          <div className="flex flex-col gap-2 text-sm">

            <div className="flex items-center justify-between h-[28px]">
              <span className="text-slate-700 dark:text-slate-200">ID da Coleira</span>
              <span className="text-slate-600 dark:text-slate-300">ka-1945</span>
            </div>

            <div className="flex items-center justify-between h-[28px]">
              <span className="text-slate-700 dark:text-slate-200">Ultima sincronização</span>
              <span className="text-slate-600 dark:text-slate-300">Hoje - 14:20</span>
            </div>
          </div>
        </div>

        <Separator className="dark:bg-neutral-700" />

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold">Informações do Dono</h3>

          <div className="flex items-center justify-between h-[28px] text-sm">
            <span className="text-slate-700 dark:text-slate-200">Nome</span>
            <span className="text-slate-600 dark:text-slate-300">Carlos</span>
          </div>

          <div className="flex items-center justify-between h-[28px] text-sm">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Phone className="h-4 w-4 text-cyan-600" /> Telefone
            </span>
            <span className="text-slate-600 dark:text-slate-300">(12) 99640-3670</span>
          </div>

          <div className="flex items-center justify-between h-[28px] text-sm">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Mail className="h-4 w-4 text-cyan-600" /> e-mail
            </span>
            <span className="text-slate-600 dark:text-slate-300">powers@gmail.com</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
