"use client";

import { useState } from "react";
import { Cat, CircleQuestionMark, Dog, Info, Mars, Plus, Venus } from "lucide-react";
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
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Switch } from "../ui/switch";

export function DialogDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 cursor-pointer">
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
        <form>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Ex: Rex" />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="specie">Specie</Label>
                <Select>
                  <SelectTrigger id="specie" className="w-full">
                    <SelectValue placeholder="Select the pet specie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cão"><Dog /> Dog</SelectItem>
                    <SelectItem value="Gato"><Cat /> Cat</SelectItem>
                    <SelectItem value="Other"><CircleQuestionMark /> Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="specie">Sex</Label>
                <Select>
                  <SelectTrigger id="specie" className="w-full">
                    <SelectValue placeholder="Select the pet sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cão"><Mars /> Male</SelectItem>
                    <SelectItem value="Gato"><Venus />Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="color">Breed</Label>
                <Input id="color" placeholder="Golden Retirever, Siamese, SRD" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="specie">Size</Label>
                <Select>
                  <SelectTrigger id="specie" className="w-full">
                    <SelectValue placeholder="Select the pet size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cão">Small</SelectItem>
                    <SelectItem value="Gato">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <div className='w-full max-w-xs space-y-3'>
                  <Label>Weight</Label>
                  <div className='flex rounded-md shadow-xs'>
                    <Input type='number'  placeholder='ex: 20.5' className='-me-px rounded-r-none shadow-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' />
                    <span className='border-input bg-background text-muted-foreground -z-1 inline-flex items-center rounded-r-md border px-3 text-sm'>
                      KG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="name">Color</Label>
                <Input id="name" placeholder="Ex: black and white" />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <DatepickerInput
						      value={date}
						      onChange={(date) => {}}
					      />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="name">
                  Pet picture 
                  <Tooltip>
                    <TooltipTrigger>
                      <Info width={15} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">A photo is not mandatory, However in case your pet goes missing, a photo helps identification, facilitating the rescue process</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input type="file" placeholder="Ex: black and white" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Switch />
              <Label>Is neutred</Label>
            </div>
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="observation">Observations</Label>
              <Textarea
                id="observation"
                placeholder="Ex: Alergia à ração X, dócil, precisa de coleira reforçada..."
                className="min-h-[96px]"
              />
            </div>
          </div>
        </form>
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
