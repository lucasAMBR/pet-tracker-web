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
        <Button variant="default" className="w-full cursor-pointer">Editar Perfil</Button>
      </SheetTrigger>
      <SheetContent className="p-4 min-w-[550px]">
        <SheetHeader>
          <SheetTitle>Editar Perfil</SheetTitle>
          <SheetDescription>
            Faça as alterações desejadas em seu perfil. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 auto-rows-min gap-6 px-4">
          <div className="my-6 gap-3">
            <Label htmlFor="sheet-demo-username" className="mb-2">Nome</Label>
            <Input id="sheet-demo-username" defaultValue="Insira aqui" />
          </div>

          <div className="my-6 gap-3">
            <Label htmlFor="sheet-demo-username" className="mb-2">Bio</Label>
            <Input id="ssheet-demo-username" defaultValue="Bio qualquer" />
          </div>

          <div className="my-6 gap-3">
            <Label htmlFor="sheet-demo-username" className="mb-2">Localização</Label>
            <Input id="sheet-demo-username" defaultValue="Fatec Cruzeiro" />
          </div>

          <div className="my-6 gap-3">
            <Label htmlFor="sheet-demo-username" className="mb-2">Telefone</Label>
            <Input id="sheet-demo-username" defaultValue="(11) 1111-1111" />
          </div>

          <div className="my-6 gap-3">
            <Label htmlFor="sheet-demo-username" className="mb-2">Email</Label>
            <Input id="sheet-demo-username" defaultValue="exemplo@email.com" />
          </div>
        </div>

        <SheetFooter>
          <Button type="submit" className="cursor-pointer">Salvar Alterações</Button>
          <SheetClose asChild>
            <Button variant="outline" className="cursor-pointer">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
