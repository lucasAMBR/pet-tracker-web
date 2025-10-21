import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar Perfil</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Perfil</SheetTitle>
          <SheetDescription>
            Faça as alterações desejadas em seu perfil. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Label htmlFor="sheet-demo-username"> Foto de Perfil</Label>

          <div className="flex justify-center">
            <Input id="sheet-demo-username" type="file" accept="image/*" className="hidden" />
            <Label
              htmlFor="sheet-demo-username"
              className="h-16 w-16 rounded-full border border-dashed border-neutral-400 dark:border-neutral-600 flex items-center justify-center cursor-pointer text-xs select-none">
              Upload
            </Label>
          </div>
        </div>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Nome</Label>
            <Input id="sheet-demo-username" defaultValue="Insira aqui" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Bio</Label>
            <Input id="ssheet-demo-username" defaultValue="Bio qualquer" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Localização</Label>
            <Input id="sheet-demo-username" defaultValue="Fatec Cruzeiro" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Telefone</Label>
            <Input id="sheet-demo-username" defaultValue="(11) 1111-1111" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Email</Label>
            <Input id="sheet-demo-username" defaultValue="exemplo@email.com" />
          </div>
        </div>

        <SheetFooter>
          <Button type="submit">Salvar Alterações</Button>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
