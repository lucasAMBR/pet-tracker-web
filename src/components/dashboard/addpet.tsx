"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatepickerInput } from "@/components/ui/date-input";

export function DialogDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors">
          <Plus className="h-4 w-4" />
          Adicionar Pet
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Pet</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo pet.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Ex: Dogan" />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <DatepickerInput value={date} onChange={setDate} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="specie">Espécie</Label>
              <Select>
                <SelectTrigger id="specie">
                  <SelectValue placeholder="Selecione a espécie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cão">Dog</SelectItem>
                  <SelectItem value="Gato">Cat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="color">Cor</Label>
              <Input id="color" placeholder="Ex: Branco e preto" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="collarId">ID</Label>
            <Input id="collarId" placeholder="Ex: CL-ABC123" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="observation">Observações</Label>
            <Textarea
              id="observation"
              placeholder="Ex: Alergia à ração X, dócil, precisa de coleira reforçada..."
              className="min-h-[96px]"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-3 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button className="flex items-center gap-2">Salvar Pet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
