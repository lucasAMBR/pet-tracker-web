"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Syringe, BadgeInfo, MapPin, Phone, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useState } from "react";

export default function PetDetails() {
  const [secaoDoencas, setSecaoDoencas] = useState<'cronicas' | 'enfermidades'>('cronicas');

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Pet Details</h1>
      <Card className="w-full rounded-md bg-white shadow-md dark:bg-neutral-800 dark:shadow-black/10">
        <CardContent className="flex flex-col gap-6">

          <div className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-[200px] w-[200px] ring-2 ring-gray-500">
                <AvatarImage src="/images/Dogan.png" alt="Photo Pet" />
                <AvatarFallback></AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <h2 className="text-5xl font-semibold leading-none padding">nome pet</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">puxar infos pet</p>
              </div>
            </div>
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, velit tempore cum quasi libero molestiae maiores vel repellendus?
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-700 dark:text-slate-200">Observações:</span>
                <span className="text-slate-600 dark:text-slate-300 text-right">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, nisi sed? At eaque fuga, eius rem excepturi libero eligendi tempora quidem ipsa laboriosam voluptatem quasi dolorum placeat quae distinctio sunt!
                </span>
              </div>
            </div>  
          </div>

          <Separator className="dark:bg-neutral-700" />

          <div className="flex flex-col gap-8 mb-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ToggleGroup
                    type="single"
                    value={secaoDoencas}
                    onValueChange={(val) => { if (val) setSecaoDoencas(val as 'cronicas' | 'enfermidades'); }}
                    className="flex"
                  >
                    <ToggleGroupItem value="cronicas" className="px-3 py-1 h-[32px]">
                      Doenças crônicas
                    </ToggleGroupItem>
                    <ToggleGroupItem value="enfermidades" className="px-3 py-1 h-[32px]">
                      Enfermidades atuais
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              {secaoDoencas === 'cronicas' ? (
                <div className="flex flex-col gap-2 text-sm border border-slate-200 dark:border-neutral-700 rounded-md p-3 bg-slate-50 dark:bg-neutral-900/40">
                  <p className="text-slate-700 dark:text-slate-200">- Exemplo AISDIUASHD </p>
                  <p className="text-slate-700 dark:text-slate-200">- Exemplo AISDIUASHD</p>
                  <p className="text-slate-600 dark:text-slate-400">Última atualização 03/08/2025</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 text-sm border border-slate-200 dark:border-neutral-700 rounded-md p-3 bg-slate-50 dark:bg-neutral-900/40">
                  <p className="text-slate-700 dark:text-slate-200">- Exemplo: AAAAAAAAAAAAAA</p>
                  <p className="text-slate-700 dark:text-slate-200">- Exemplo: BBBBBBBBBBBBB</p>
                  <p className="text-slate-600 dark:text-slate-400">Reavaliar em 12/11/2025</p>
                </div>
              )}
            </div>

            <Separator className="dark:bg-neutral-700" />
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold">Tratamentos de remédios</h3>
              <div className="flex flex-col gap-2 text-sm border border-slate-200 dark:border-neutral-700 rounded-md p-3 bg-slate-50 dark:bg-neutral-900/40">
                <p className="text-slate-700 dark:text-slate-200">- Antibiótico: tadafila — 250mg (2x ao dia)</p>
                <p className="text-slate-700 dark:text-slate-200">- Anti-inflamatório: viagra — 5mg (1x ao dia)</p>
                <p className="text-slate-600 dark:text-slate-400 italic">Duração prevista até 12/11/2025</p>
              </div>
            </div>

            <Separator className="dark:bg-neutral-700" />
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold">Histórico médico</h3>
              <div className="flex flex-col gap-2 text-sm border border-slate-200 dark:border-neutral-700 rounded-md p-3 bg-slate-50 dark:bg-neutral-900/40">
                <p className="text-slate-700 dark:text-slate-200">Castração — 2022</p>
                <p className="text-slate-700 dark:text-slate-200">Cirurgia de fimose — 2023</p>
                <p className="text-slate-700 dark:text-slate-200">Vacinas completas — 2024</p>
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
                  <span>Mapa do último ponto conhecido</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm h-[28px]">
              <span className="text-slate-700 dark:text-slate-200">Última localização</span>
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
                <span className="text-slate-700 dark:text-slate-200">Última sincronização</span>
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
    </div>
  );
}
