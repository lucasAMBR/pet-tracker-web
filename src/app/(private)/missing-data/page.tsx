"use client"

import { useAuth } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RegisterAddressSchema, RegisterAddressSchemaType } from "@/schemas/addresses/RegisterAddressSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const MissingDataPage = () => {

    const router = useRouter();

    const { isAuthenticated, loading, user} = useAuth();
    
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated || user == null) {
        return null;
    }

    const [isFetchingCEP, setIsFetchingCEP] = useState<boolean>(false);

    const {
        register: registerAddress,
        handleSubmit: handleSubmitAddress,
        watch,
        setValue,
        setError,
        clearErrors,
        setFocus,
        formState: {errors: addressErrors, isSubmitting: addressIsSubmitting, isSubmitted: addressIsSubmitted}
    } = useForm<RegisterAddressSchemaType>({
        resolver: zodResolver(RegisterAddressSchema),
        defaultValues: {
            cep: '',
            street: '',
            district: '',
            city: '',
            state: '',
            number: '',
            complement: ''
        }
    })

    const cep = watch('cep');

    useEffect(() => {
        
        const cleanedCep = cep.replace(/\D/g, '');

        if(cleanedCep.length !== 8){
            return;
        }

        const fetchAddress = async () => {
            setIsFetchingCEP(true);
            try{
                const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);

                if(!response.ok){
                    throw new Error('Erro ao buscar CEP');
                }

                const data = await response.json();

                if(data.erro){
                    setError('cep', { type: 'manual', message: 'CEP não encontrado' });
                    setValue('street', '');
                    setValue('district', '');
                    setValue('city', '');
                    setValue('state', '');
                }else{
                    setValue('street', data.logradouro);
                    setValue('district', data.bairro);
                    setValue('city', data.localidade);
                    setValue('state', data.uf);

                    clearErrors('cep');

                    setFocus('number');
                }
            }catch{
                setError('cep', { type: 'manual', message: 'Failed to connect with CEP API' })
            }finally{
                setIsFetchingCEP(false);
            }
        }

        fetchAddress();
    }, [cep, setValue, setError, clearErrors, setFocus])

    return(
        <div className="w-screen h-screen flex items-center justify-center flex-col dark:bg-neutral-900">
            <div className="flex gap-4">
                <motion.div
                    initial={{opacity: 0}} 
                    animate={{opacity: 1}} 
                    transition={{duration: 1}}
                    className="max-w-[550px] border-1 flex flex-col border-neutral-200 dark:border-neutral-800 p-6 rounded-md"
                >
                    <motion.h1 
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{duration: 1}}
                        className="text-3xl text-cyan-700 font-bold"
                    >
                        Welcome {user.name}!
                    </motion.h1>
                    <motion.p
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{duration: 1}}
                        className="my-3"
                    >
                        It seems that this is your first login to our platform, so we need 
                        some essential data for the perfect functioning of the system, but 
                        rest assured that we guarantee total confidentiality of your personal information.
                    </motion.p>
                    <div className="flex flex-col items-center border border-neutral-200 dark:border-neutral-800 p-6 rounded-md">
                        <div className="w-24 h-24 flex items-center justify-center flex-col rounded-full border-2 border-cyan-700 my-3">
                            <h3 className="font-bold text-xl">1º</h3>
                            <p>Step</p>
                        </div>
                        <form className="w-full">
                            <h2 className="text-xl text-cyan-700 font-semibold mb-2">The address</h2>
                            <p className="mb-4">
                                The address is essential to us on the pet recovery, and allow to see 
                                where that lost pet lives and where to leave them in safety
                            </p>
                            <div className="flex gap-2 w-full">
                                <div className="flex flex-col w-full">
                                    <Label>CEP</Label>
                                    <Input 
                                        {...registerAddress('cep')}
                                        className="mb-3" 
                                        placeholder="CEP" 
                                        type="text" 
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <Label>Street</Label>
                                    <Input 
                                        {...registerAddress('street')}
                                        className="mb-3" 
                                        placeholder="Street" 
                                        type="text" 
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col w-full">
                                    <Label>District</Label>
                                    <Input 
                                        {...registerAddress('district')}
                                        className="mb-3" 
                                        placeholder="District" 
                                        type="text" 
                                        disabled
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Label>State</Label>
                                    <Input 
                                        {...registerAddress('state')}
                                        className="mb-3" 
                                        placeholder="State" 
                                        type="text" 
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col">
                                    <Label>Number</Label>
                                    <Input 
                                        {...registerAddress('number')}
                                        className="mb-3" 
                                        placeholder="Number" 
                                        type="text" 
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <Label>Complement</Label>
                                    <Input 
                                        {...registerAddress('complement')}
                                        className="mb-3" 
                                        placeholder="Complement" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="cursor-pointer w-full my-2">
                                Next step
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default MissingDataPage;