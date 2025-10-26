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
import { DatepickerInput } from "../ui/date-input";
import { useForm } from "react-hook-form";
import { RegisterFormSchema, RegisterFormSchemaType } from "@/schemas/register/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/providers/UserProvider";
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useLoggedUserPhones } from "@/hooks/Phone/useLoggedUserPhone";
import { useLoggedUserAddress } from "@/hooks/Address/useLoggedUserAddress";
import { Spinner } from "../ui/spinner";

export function SheetDemo() {
  
    const {
      user
    } = useAuth();

    const {
      data: loggedUserPhones,
      isFetching: phonesIsFetching,
      error: phonesError
    } = useLoggedUserPhones();
  
    const {
      data: loggedUserAddress,
      isFetching: addressIsFetching,
      error: addressError
    } = useLoggedUserAddress();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="w-full cursor-pointer">Editar Perfil</Button>
      </SheetTrigger>
      <SheetContent className="p-4 min-w-[550px]">
        <SheetHeader>
          <SheetTitle>Edit your personal information</SheetTitle>

        </SheetHeader>
        
        <Accordion type="single" collapsible className="w-full p-4">
          <AccordionItem value="profile-infos">
            <AccordionTrigger>Edit your profile data</AccordionTrigger>
            <AccordionContent className="p-1">
              <form className="flex-1 auto-rows-min gap-6">
                <div className="my-3 gap-3">
                  <Label className="mb-2">Profile Pic</Label>
                  <Input type="file"/>
                </div>

                <div className="my-3 gap-3">
                  <Label className="mb-2">Name</Label>
                  <Input defaultValue={user?.name} />
                </div>

                <div className="my-3 gap-3">
                  <Label className="mb-2">E-mail</Label>
                  <Input defaultValue={user?.email} />
                </div>

                <div className="my-3 gap-3">
                  <Label htmlFor="sheet-demo-username" className="mb-2">CPF</Label>
                  <Input defaultValue={user?.cpf} />
                </div>
                <Button type="submit" variant={"default"} className="w-full my-3">Edit</Button>
              </form>
            </AccordionContent>
          </AccordionItem>
          <hr />
          <AccordionItem value="address-infos">
            <AccordionTrigger>Change your address</AccordionTrigger>
            <AccordionContent className="p-1">
              {addressIsFetching && (
                <Spinner />
              )}
              {!addressIsFetching && !addressError && (
                <form className="flex-1 auto-rows-min gap-6">
                  <div className="flex gap-2 w-full mt-2">
                      <div className="flex flex-col w-full gap-2">
                          <Label>CEP</Label>
                          <Input 
                              className="mb-3" 
                              placeholder="CEP" 
                              type="text" 
                              defaultValue={loggedUserAddress?.data.cep}
                          />
                      </div>
                      <div className="flex flex-col w-full gap-2">
                          <Label>Street</Label>
                          <Input 
                              className="mb-3" 
                              placeholder="Street" 
                              type="text" 
                              disabled
                              defaultValue={loggedUserAddress?.data.street}
                          />
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <div className="flex flex-col w-full gap-2">
                          <Label>District</Label>
                          <Input
                              className="mb-3" 
                              placeholder="District" 
                              type="text" 
                              disabled
                              defaultValue={loggedUserAddress?.data.district}
                          />
                      </div>
                      <div className="flex flex-col gap-2">
                          <Label>State</Label>
                          <Input 
                              className="mb-3" 
                              placeholder="State" 
                              type="text" 
                              disabled
                              defaultValue={loggedUserAddress?.data.state}
                          />
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <div className="flex flex-col gap-2">
                          <Label>Number</Label>
                          <Input 
                              className="mb-3" 
                              placeholder="Number" 
                              type="text" 
                              defaultValue={loggedUserAddress?.data.number}
                          />
                      </div>
                      <div className="flex flex-col w-full gap-2">
                          <Label>Complement</Label>
                          <Input 
                              className="mb-3" 
                              placeholder="Complement" 
                              type="text" 
                              defaultValue={loggedUserAddress?.data.complement}
                          />
                      </div>
                  </div>
                  <Button type="submit" variant={"default"} className="w-full my-3">Edit</Button>
                </form>
              )}
            </AccordionContent>
          </AccordionItem>
          <hr />
          <AccordionItem value="phone-infos">
            <AccordionTrigger>Edit your phone numbers</AccordionTrigger>
            <AccordionContent className="p-1">
              {phonesIsFetching && (
                <Spinner />
              )}
              {!phonesIsFetching && !phonesError && (
                <>
                  {loggedUserPhones?.data.map((phone, index) => (
                    <form key={phone.id}>
                      <div className="flex flex-col w-full gap-2">
                        <Label>Phone nº{index + 1}</Label>
                        <Input className="hidden" disabled defaultValue={phone.id}/>
                        <div className="flex gap-2">
                          <Input 
                              className="mb-3" 
                              placeholder="Complement" 
                              type="text" 
                              defaultValue={phone.number}
                          />
                          <Button variant={"outline"}>Edit</Button>
                        </div>
                      </div>
                    </form>   
                  ))}
                </>
              )}
            </AccordionContent>
          </AccordionItem>
          <hr />
          <AccordionItem value="password-infos">
            <AccordionTrigger>Password change</AccordionTrigger>
            <AccordionContent className="p-1">
                <form>
                  <div className="flex flex-col w-full gap-2">
                    <Label>Actual passowrd</Label>
                    <Input 
                      className="mb-3"  
                      type="text" 
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label>New passowrd</Label>
                    <Input 
                      className="mb-3" 
                      type="text" 
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label>Confirm new passowrd</Label>
                    <Input 
                      className="mb-3" 
                      type="text" 
                    />
                  </div>
                  <Button type="submit" variant={"default"} className="w-full">Change</Button>
                </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="cursor-pointer">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
