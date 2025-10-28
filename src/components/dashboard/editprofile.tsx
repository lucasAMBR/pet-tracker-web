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
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useLoggedUserPhones } from "@/hooks/Phone/useLoggedUserPhone";
import { useLoggedUserAddress } from "@/hooks/Address/useLoggedUserAddress";
import { Spinner } from "../ui/spinner";
import { useLoggedUserProfile } from "@/hooks/Authentication/useRefetchUserData";
import { useUpdateUserData } from "@/hooks/Authentication/useUpdateUserData";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserSchema, UpdateUserSchemaType } from "@/schemas/user/UpdateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ErrorBox from "../global/error-advertise";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useState } from "react";
import { usePasswordChange } from "@/hooks/Authentication/usePasswordChange";
import { ChangePasswordSchema, ChangePasswordSchemaType } from "@/schemas/user/ChangePasswordSchema";

export function SheetDemo() {

  const queryClient = useQueryClient();

  const { 
    data: loggedUserProfile,
    isFetching: UserProfileIsFetching,
    error: userProfileError
    } = useLoggedUserProfile();

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

  const {
    mutateAsync: updateUserData,
    isPending: userUpdateIsPending,
    error: updateUserError
  } = useUpdateUserData();

  const {
    register: registerUpdateData,
    handleSubmit: handleSubmitUserUpdate,
    formState: {errors: userUpdatedErrors, isSubmitting: userUpdateIsSubmitting},
    reset: resetUpdateUserForm
  } = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(UpdateUserSchema)
  })

  const {
    mutateAsync: passwordChange,
    isPending: passwordChangeIsPending,
    error: passwordChangeError
  } = usePasswordChange();

  const {
    register: registerPasswordChange,
    handleSubmit: handleSubmitPasswordChange,
    formState: {errors: passwordChangeFormErrors, isSubmitting: passwordChangeIsSubmitting},
    reset: resetPasswordChangeForm
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema)
  })

  const [updateUserApiValidationErrors, setUpdateUserApiValidationErrors] =
    useState<ValidationErrors | null>();

  const [passwordChangeApiValidationErrors, setPasswordChangeApiValidationError] = useState<ValidationErrors | null>();

  const sendUserUpdateToApi: SubmitHandler<UpdateUserSchemaType> = async (formData) => {
    
    const changedData: Partial<UpdateUserSchemaType> = {};

    const textFields: Array<'name' | 'email' | 'cpf'> = ['name', 'email', 'cpf']; 

    textFields.forEach(key => {
        const newValue = formData[key];

        const oldValue = loggedUserProfile?.data?.[key]; 

        if (newValue !== oldValue) {
            changedData[key] = newValue;
        }
    });

    if (formData.image && formData.image.length > 0) {
        changedData.image = formData.image;
    }

    if (Object.keys(changedData).length === 0) {
        toast.info("Nenhuma alteração detectada.");
        return;
    }

    try {
        const newUserData = await updateUserData(changedData as UpdateUserSchemaType, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['loggedUserProfile']
                });
            }
        });

        if (!newUserData.success) {
				  throw new Error(newUserData.message);
			  }

        toast.success(newUserData.message);

        resetUpdateUserForm();
    } catch (errors: any) {
			if (axios.isAxiosError<ApiResponse<ValidationErrors>>(errors)) {
				const errorMessage = errors.response?.data?.message || errors.message;
				if (errors.status == 422) {
					setUpdateUserApiValidationErrors(errors.response?.data.data);
				}

				toast.error(errorMessage);
			} else {
				toast.error(errors.message);
			}
		}
  }

  const sendPasswordChangeToApi: SubmitHandler<ChangePasswordSchemaType> = async(data) => {
    setPasswordChangeApiValidationError(undefined);
    try{
      const response = await passwordChange(data);

      if (!response.success) {
				  throw new Error(response.message);
			}

      toast.success(response.message);
      resetPasswordChangeForm();
    }catch(error: any){
      if (axios.isAxiosError<ApiResponse<ValidationErrors>>(error)) {
				const errorMessage = error.response?.data?.message || error.message;
				if (error.status == 422) {
					setPasswordChangeApiValidationError(error.response?.data.data);
				}

				toast.error(errorMessage);
			} else {
				toast.error(error.message);
			}
    }
  }

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
              {UserProfileIsFetching && (
                <Spinner />
              )}
              {!UserProfileIsFetching && !userProfileError && (
                <form onSubmit={handleSubmitUserUpdate(sendUserUpdateToApi)} className="flex-1 auto-rows-min gap-6">
                  <ErrorBox errors={userUpdatedErrors} apiErrors={updateUserApiValidationErrors}/>
                  <div className="my-3 gap-3">
                    <Label className="mb-2">Profile Pic</Label>
                    <Input 
                      {...registerUpdateData('image')}
                      type="file"
                      id="profile-pic"
                    />
                  </div>

                  <div className="my-3 gap-3">
                    <Label className="mb-2">Name</Label>
                    <Input 
                      {...registerUpdateData('name')} 
                      type="text"
                      id="name"
                      defaultValue={loggedUserProfile?.data.name}
                    />
                  </div>

                  <div className="my-3 gap-3">
                    <Label className="mb-2">E-mail</Label>
                    <Input 
                      {...registerUpdateData('email')}
                      type="email"
                      id="email"
                      defaultValue={loggedUserProfile?.data.email}
                    />
                  </div>

                  <div className="my-3 gap-3">
                    <Label htmlFor="sheet-demo-username" className="mb-2">CPF</Label>
                    <Input 
                      {...registerUpdateData('cpf')}
                      type="text"
                      id="cpf"
                      defaultValue={loggedUserProfile?.data.cpf}
                    />
                  </div>
                  <Button type="submit" variant={"default"} className="w-full my-3">{userUpdateIsSubmitting ? "Updating..." : "Edit"}Edit</Button>
                </form>
              )}
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
                <form onSubmit={handleSubmitPasswordChange(sendPasswordChangeToApi)}>
                  <ErrorBox errors={passwordChangeFormErrors} apiErrors={passwordChangeApiValidationErrors}/>
                  <div className="flex flex-col w-full gap-2 mt-4">
                    <Label>Actual password</Label>
                    <Input
                      {...registerPasswordChange('old_password')} 
                      className="mb-3"  
                      type="password" 
                      placeholder="Insert here..."
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label>New password</Label>
                    <Input 
                      {...registerPasswordChange('new_password')}
                      className="mb-3" 
                      type="password" 
                      placeholder="Insert here..."
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label>Confirm new password</Label>
                    <Input 
                      {...registerPasswordChange('new_password_confirmation')}
                      className="mb-3" 
                      type="password" 
                      placeholder="Insert here..."
                    />
                  </div>
                  <Button type="submit" variant={"default"} className="w-full">Change</Button>
                </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="cursor-pointer">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
