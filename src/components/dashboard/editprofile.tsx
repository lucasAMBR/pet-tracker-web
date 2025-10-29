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
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { useLoggedUserPhones } from "@/hooks/Phone/useLoggedUserPhone";
import { useLoggedUserAddress } from "@/hooks/Address/useLoggedUserAddress";
import { Spinner } from "../ui/spinner";
import { useLoggedUserProfile } from "@/hooks/Authentication/useRefetchUserData";
import { useUpdateUserData } from "@/hooks/Authentication/useUpdateUserData";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
	UpdateUserSchema,
	UpdateUserSchemaType,
} from "@/schemas/user/UpdateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ErrorBox from "../global/error-advertise";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useEffect, useState } from "react";
import { usePasswordChange } from "@/hooks/Authentication/usePasswordChange";
import {
	ChangePasswordSchema,
	ChangePasswordSchemaType,
} from "@/schemas/user/ChangePasswordSchema";
import { useUpdatePhone } from "@/hooks/Phone/useUpdatePhone";
import {
	UpdatePhoneSchema,
	UpdatePhoneSchemaType,
} from "@/schemas/phones/UpdatePhoneSchema";
import { useUpdateAddress } from "@/hooks/Address/useUpdateAddress";
import {
	UpdateAddressSchema,
	UpdateAddressSchemaType,
} from "@/schemas/addresses/UpdateAddressSchema";

export function SheetDemo() {
	const queryClient = useQueryClient();

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

	const {
		mutateAsync: updateUserData,
		isPending: userUpdateIsPending,
		error: updateUserError,
	} = useUpdateUserData();

	const {
		register: registerUpdateData,
		handleSubmit: handleSubmitUserUpdate,
		formState: {
			errors: userUpdatedErrors,
			isSubmitting: userUpdateIsSubmitting,
		},
		reset: resetUpdateUserForm,
	} = useForm<UpdateUserSchemaType>({
		resolver: zodResolver(UpdateUserSchema),
	});

	const {
		mutateAsync: passwordChange,
		isPending: passwordChangeIsPending,
		error: passwordChangeError,
	} = usePasswordChange();

	const {
		register: registerPasswordChange,
		handleSubmit: handleSubmitPasswordChange,
		formState: {
			errors: passwordChangeFormErrors,
			isSubmitting: passwordChangeIsSubmitting,
		},
		reset: resetPasswordChangeForm,
	} = useForm<ChangePasswordSchemaType>({
		resolver: zodResolver(ChangePasswordSchema),
	});

	const {
		mutateAsync: updatePhones,
		isPending: updatePhonesIsPending,
		error: updatePhonesError,
	} = useUpdatePhone();

	const phoneListForm = useForm<UpdatePhoneSchemaType>({
		resolver: zodResolver(UpdatePhoneSchema),
		defaultValues: {
			phones: [],
		},
	});

	const { fields: phoneFields } = useFieldArray({
		control: phoneListForm.control,
		name: "phones",
		keyName: "rhf_id",
	});

	useEffect(() => {
		if (loggedUserPhones?.data) {
			phoneListForm.reset({ phones: loggedUserPhones.data });
		}
	}, [loggedUserPhones, phoneListForm.reset]);

	const {
		mutateAsync: updateAddress,
		isPending: updateAddressIsPending,
		error: updateAddressError,
	} = useUpdateAddress();

	const {
		register: registerUpdateAddress,
		handleSubmit: handleSubmitAddress,
		watch,
		setValue,
		setError,
		clearErrors,
		setFocus,
		formState: {
			errors: addressErrors,
			isSubmitting: addressIsSubmitting,
			isSubmitted: addressIsSubmitted,
		},
	} = useForm<UpdateAddressSchemaType>({
		resolver: zodResolver(UpdateAddressSchema),
		defaultValues: {
			cep: "",
			street: "",
			district: "",
			city: "",
			state: "",
			number: "",
			complement: "",
		},
	});

	const [isFetchingCEP, setIsFetchingCEP] = useState<boolean>(false);

	const cep = watch("cep");

	useEffect(() => {
		const cleanedCep = cep.replace(/\D/g, "");

		if (cleanedCep.length !== 8) {
			return;
		}

		const fetchAddress = async () => {
			setIsFetchingCEP(true);
			try {
				const response = await fetch(
					`https://viacep.com.br/ws/${cleanedCep}/json/`,
				);

				if (!response.ok) {
					throw new Error("Erro ao buscar CEP");
				}

				const data = await response.json();

				if (data.erro) {
					setError("cep", { type: "manual", message: "CEP não encontrado" });
					setValue("street", "");
					setValue("district", "");
					setValue("city", "");
					setValue("state", "");
				} else {
					setValue("street", data.logradouro);
					setValue("district", data.bairro);
					setValue("city", data.localidade);
					setValue("state", data.uf);

					clearErrors("cep");

					setFocus("number");
				}
			} catch {
				setError("cep", {
					type: "manual",
					message: "Failed to connect with CEP API",
				});
			} finally {
				setIsFetchingCEP(false);
			}
		};

		fetchAddress();
	}, [cep, setValue, setError, clearErrors, setFocus]);

	const [updateUserApiValidationErrors, setUpdateUserApiValidationErrors] =
		useState<ValidationErrors | null>();

	const [
		passwordChangeApiValidationErrors,
		setPasswordChangeApiValidationError,
	] = useState<ValidationErrors | null>();

	const [phoneUpdateApiValidationErrors, setPhoneUpdateApiValidationErrors] =
		useState<ValidationErrors | null>();

	const [
		addressUpdateApiValidationErrors,
		setAddressUpdateApiValidationErrors,
	] = useState<ValidationErrors | null>();

	const sendUserUpdateToApi: SubmitHandler<UpdateUserSchemaType> = async (
		formData,
	) => {
		const changedData: Partial<UpdateUserSchemaType> = {};

		const textFields: Array<"name" | "email" | "cpf"> = [
			"name",
			"email",
			"cpf",
		];

		textFields.forEach((key) => {
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
			const newUserData = await updateUserData(
				changedData as UpdateUserSchemaType,
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: ["loggedUserProfile"],
						});
					},
				},
			);

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
	};

	const sendPasswordChangeToApi: SubmitHandler<
		ChangePasswordSchemaType
	> = async (data) => {
		setPasswordChangeApiValidationError(undefined);
		try {
			const response = await passwordChange(data);

			if (!response.success) {
				throw new Error(response.message);
			}

			toast.success(response.message);
			resetPasswordChangeForm();
		} catch (error: any) {
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
	};

	const sendUpdatedAddressToApi: SubmitHandler<
		UpdateAddressSchemaType
	> = async (data) => {
		try {
			const newAddress = await updateAddress(
				{ id: loggedUserAddress?.data.id as number, updateData: data },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: ["loggedUserAddress"],
						});
					},
				},
			);

			if (!newAddress.success) {
				throw new Error(newAddress.message);
			}

			toast.success(newAddress.message);
		} catch (error: any) {
			if (axios.isAxiosError<ApiResponse<ValidationErrors>>(error)) {
				const errorMessage = error.response?.data?.message || error.message;
				if (error.status == 422) {
					setAddressUpdateApiValidationErrors(error.response?.data.data);
				}

				toast.error(errorMessage);
			} else {
				toast.error(error.message);
			}
		}
	};

	const sendPhoneUpdateToApi: SubmitHandler<UpdatePhoneSchemaType> = async (
		formData,
	) => {
		setPhoneUpdateApiValidationErrors(null);

		const originalPhones = loggedUserPhones?.data || [];
		const changedPhones = formData.phones.filter((newPhone) => {
			const oldPhone = originalPhones.find((p) => p.id === newPhone.id);
			return !oldPhone || oldPhone.number !== newPhone.number;
		});

		if (changedPhones.length === 0) {
			toast.info("Nenhum número de telefone foi alterado.");
			return;
		}

		try {
			const response = await updatePhones(formData, {
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["loggedUserPhones"],
					});
				},
			});

			if (!response.success) {
				throw new Error(response.message);
			}

			toast.success(response.message);
		} catch (error: any) {
			if (axios.isAxiosError<ApiResponse<ValidationErrors>>(error)) {
				const errorMessage = error.response?.data?.message || error.message;
				if (error.status == 422) {
					setPhoneUpdateApiValidationErrors(error.response?.data.data);

					const errors = error.response?.data.data;
					if (errors) {
						Object.keys(errors).forEach((key) => {
							if (key.startsWith("phones.")) {
								phoneListForm.setError(key as any, {
									type: "server",
									message: errors[key][0],
								});
							}
						});
					}
				}
				toast.error(errorMessage);
			} else {
				toast.error(error.message);
			}
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="default" className="w-full cursor-pointer">
					Editar Perfil
				</Button>
			</SheetTrigger>
			<SheetContent className="p-4 min-w-[550px]">
				<SheetHeader>
					<SheetTitle>Edit your personal information</SheetTitle>
				</SheetHeader>

				<Accordion type="single" collapsible className="w-full p-4">
					<AccordionItem value="profile-infos">
						<AccordionTrigger>Edit your profile data</AccordionTrigger>
						<AccordionContent className="p-1">
							{UserProfileIsFetching && <Spinner />}
							{!UserProfileIsFetching && !userProfileError && (
								<form
									onSubmit={handleSubmitUserUpdate(sendUserUpdateToApi)}
									className="flex-1 auto-rows-min gap-6"
								>
									<ErrorBox
										errors={userUpdatedErrors}
										apiErrors={updateUserApiValidationErrors}
									/>
									<div className="my-3 gap-3">
										<Label className="mb-2">Profile Pic</Label>
										<Input
											{...registerUpdateData("image")}
											type="file"
											id="profile-pic"
										/>
									</div>

									<div className="my-3 gap-3">
										<Label className="mb-2">Name</Label>
										<Input
											{...registerUpdateData("name")}
											type="text"
											id="name"
											defaultValue={loggedUserProfile?.data.name}
										/>
									</div>

									<div className="my-3 gap-3">
										<Label className="mb-2">E-mail</Label>
										<Input
											{...registerUpdateData("email")}
											type="email"
											id="email"
											defaultValue={loggedUserProfile?.data.email}
										/>
									</div>

									<div className="my-3 gap-3">
										<Label htmlFor="sheet-demo-username" className="mb-2">
											CPF
										</Label>
										<Input
											{...registerUpdateData("cpf")}
											type="text"
											id="cpf"
											defaultValue={loggedUserProfile?.data.cpf}
										/>
									</div>
									<Button
										type="submit"
										variant={"default"}
										className="w-full my-3"
									>
										{userUpdateIsSubmitting ? "Updating..." : "Edit"}Edit
									</Button>
								</form>
							)}
						</AccordionContent>
					</AccordionItem>
					<hr />
					<AccordionItem value="address-infos">
						<AccordionTrigger>Change your address</AccordionTrigger>
						<AccordionContent className="p-1">
							{addressIsFetching && <Spinner />}
							{!addressIsFetching && !addressError && (
								<form
									onSubmit={handleSubmitAddress(sendUpdatedAddressToApi)}
									className="flex-1 auto-rows-min gap-6"
								>
									<ErrorBox
										errors={addressErrors}
										apiErrors={addressUpdateApiValidationErrors}
									/>
									<div className="flex gap-2 w-full mt-2">
										<div className="flex flex-col w-full gap-2">
											<Label>CEP</Label>
											<Input
												{...registerUpdateAddress("cep")}
												className="mb-3"
												placeholder="CEP"
												type="text"
												defaultValue={loggedUserAddress?.data.cep}
											/>
										</div>
										<div className="flex flex-col w-full gap-2">
											<Label>Street</Label>
											<Input
												{...registerUpdateAddress("street")}
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
												{...registerUpdateAddress("district")}
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
												{...registerUpdateAddress("state")}
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
												{...registerUpdateAddress("number")}
												className="mb-3"
												placeholder="Number"
												type="text"
												defaultValue={loggedUserAddress?.data.number}
											/>
										</div>
										<div className="flex flex-col w-full gap-2">
											<Label>Complement</Label>
											<Input
												{...registerUpdateAddress("complement")}
												className="mb-3"
												placeholder="Complement"
												type="text"
												defaultValue={loggedUserAddress?.data.complement}
											/>
										</div>
									</div>
									<Button
										type="submit"
										variant={"default"}
										className="w-full my-3"
									>
										Edit
									</Button>
								</form>
							)}
						</AccordionContent>
					</AccordionItem>
					<hr />
					<AccordionItem value="phone-infos">
						<AccordionTrigger>Edit your phone numbers</AccordionTrigger>
						<AccordionContent className="p-1">
							{phonesIsFetching && <Spinner />}
							{!phonesIsFetching && phonesError && (
								<p className="text-red-500 text-sm p-2">
									Não foi possível carregar os telefones.
								</p>
							)}
							{!phonesIsFetching && !phonesError && (
								<form
									onSubmit={phoneListForm.handleSubmit(sendPhoneUpdateToApi)}
									className="space-y-4 pt-2"
								>
									<ErrorBox
										errors={phoneListForm.formState.errors}
										apiErrors={phoneUpdateApiValidationErrors}
									/>

									{phoneFields.map((field, index) => (
										<div key={field.rhf_id} className="space-y-2">
											<input
												type="hidden"
												{...phoneListForm.register(`phones.${index}.id`)}
											/>

											<Label>Phone nº{index + 1}</Label>

											<Input
												placeholder="Phone number"
												{...phoneListForm.register(`phones.${index}.number`)}
											/>

											{phoneListForm.formState.errors.phones?.[index]
												?.number && (
												<p className="text-sm font-medium text-destructive">
													{
														phoneListForm.formState.errors.phones[index].number
															.message
													}
												</p>
											)}
										</div>
									))}

									<Button
										type="submit"
										variant={"default"}
										className="w-full my-3"
										// [CORRIGIDO] - O nome da prop era 'updatePhonesIsPending'
										disabled={updatePhonesIsPending}
									>
										{updatePhonesIsPending
											? "Atualizando..."
											: "Salvar Telefones"}
									</Button>
								</form>
								// [REMOVIDO] - O </Form> de fechamento foi removido
							)}
						</AccordionContent>
					</AccordionItem>
					<hr />
					<AccordionItem value="password-infos">
						<AccordionTrigger>Password change</AccordionTrigger>
						<AccordionContent className="p-1">
							<form
								onSubmit={handleSubmitPasswordChange(sendPasswordChangeToApi)}
							>
								<ErrorBox
									errors={passwordChangeFormErrors}
									apiErrors={passwordChangeApiValidationErrors}
								/>
								<div className="flex flex-col w-full gap-2 mt-4">
									<Label>Actual password</Label>
									<Input
										{...registerPasswordChange("old_password")}
										className="mb-3"
										type="password"
										placeholder="Insert here..."
									/>
								</div>
								<div className="flex flex-col w-full gap-2">
									<Label>New password</Label>
									<Input
										{...registerPasswordChange("new_password")}
										className="mb-3"
										type="password"
										placeholder="Insert here..."
									/>
								</div>
								<div className="flex flex-col w-full gap-2">
									<Label>Confirm new password</Label>
									<Input
										{...registerPasswordChange("new_password_confirmation")}
										className="mb-3"
										type="password"
										placeholder="Insert here..."
									/>
								</div>
								<Button type="submit" variant={"default"} className="w-full">
									Change
								</Button>
							</form>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<SheetFooter>
					<SheetClose asChild>
						<Button variant="outline" className="cursor-pointer">
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
