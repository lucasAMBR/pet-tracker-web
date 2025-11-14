"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Syringe, BadgeInfo, MapPin, Phone, Mail, Dog, Cat, EllipsisVertical, Plus, ScanHeart, ArrowUpRightIcon, Ellipsis, Search, Minus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useState } from "react";
import { usefindPetDetails } from "@/hooks/Pets/useFindPetDetails";
import { calculateAge } from "@/lib/Calculator";
import { Badge } from "../ui/badge";
import { usePetChronicDiseases } from "@/hooks/PetDisease/UsePetChronicDiseases";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import UpdateDiseaseModal from "../PetDetails/UpdateDiseaseModal";
import DeleteDiseaseModal from "../PetDetails/DeleteDiseaseModal";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { usePetNormalDisease } from "@/hooks/PetDisease/usePetNormalDiseases";
import { Spinner } from "../ui/spinner";
import { CreateDiseaseModal } from "../PetDetails/CreateDiseasesModal";
import { Pet } from "@/types/Pets/Pet";
import { Textarea } from "../ui/textarea";
import { useCreatePetObservation } from "@/hooks/PetObservations/useCreatePetObservation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePetObservationSchema, CreatePetObservationSchemaType } from "@/schemas/petObservations/CreatePetObservationSchema";
import { PetObservation } from "@/types/petObservations/PetObservations";
import { usePetObservations } from "@/hooks/PetObservations/UsePetObservations";
import ErrorBox from "../global/error-advertise";
import DeletePetObservationModal from "../PetDetails/DeletePetObservation";
import UpdatePetObservationModal from "../PetDetails/UpdatePetObservationModal";


export default function PetDetails() {
  const [diseaseSection, setDiseaseSection] = useState<'chronic' | 'normal'>('chronic');

  const [selectedDisease, setSelectedDisease] = useState<PetDisease | undefined>(undefined);
  const [selectedObservation, setSelectedObservation] = useState<PetObservation | undefined>(undefined);

  const [ createDiseaseModalIsOpen, setCreateDiseaseModalIsOpen ] = useState<boolean>(false);

  const [ newObservationIsOpen, setNewObservationIsOpen ] = useState<boolean>(false);

  const handleOpenCreateDisease = () => {
    setCreateDiseaseModalIsOpen(true);
  }

  const handleCreateDisaeseOpenChange = (open: boolean) => {
    setCreateDiseaseModalIsOpen(open);
  }

  const [ updateDiseaseIsOpen, setUpdateDiseaseIsOpen ] = useState<boolean>(false);

  const handleOpenUpdateDisease = (disease: PetDisease) => {
    setSelectedDisease(disease);
    setUpdateDiseaseIsOpen(true);
  }

  const handleUpdateDiseaseOpenChange = (open: boolean) => {
    setUpdateDiseaseIsOpen(open);
    if(!open){
      setSelectedDisease(undefined);
    }
  }

  const [ deleteDiseaseModalIsOpen, setDeleteDiseaseModalIsOpen ] = useState<boolean>(false);

  const handleOpenDeleteDisease = (disease: PetDisease) => {
    setSelectedDisease(disease);
    setDeleteDiseaseModalIsOpen(true);
  }

  const handleDeleteDiseaseIsOpen = (open: boolean) => {
    setDeleteDiseaseModalIsOpen(open);
    if(!open){
      setSelectedDisease(undefined);
    }
  }

  const [ deleteObservationModalIsOpen, setDeleteObservationModalIsOpen ] = useState<boolean>(false);

  const handleOpenDeleteObservation = (observation: PetObservation) => {
    setSelectedObservation(observation);
    setDeleteObservationModalIsOpen(true);
  }

  const handleDeleteObservationIsOpen = (open: boolean) => {
    setDeleteObservationModalIsOpen(open);
    if(!open){
      setSelectedObservation(undefined);
    }
  }

  const [ updatePetObservationModalIsOpen, setUpdatePetObservationModalIsOpen ] = useState<boolean>(false);

    const handleOpenUpdateObservation = (observation: PetObservation) => {
    setSelectedObservation(observation);
    setUpdatePetObservationModalIsOpen(true);
  }

  const handleUpdateObservationIsOpen = (open: boolean) => {
    setUpdatePetObservationModalIsOpen(open);
    if(!open){
      setSelectedObservation(undefined);
    }
  }

  const {
    data: petData,
    isLoading: petIsLoading,
    isError: petIsError,
    error: petErrors,
    isSuccess: petIsSuccess
  } = usefindPetDetails();

  const {
    data: petChronicDiseases,
    isLoading: petChronicDiseasesIsLoading,
    isError: petChronicDiseasesIsError,
  } = usePetChronicDiseases(petData?.data.id as number);

  const {
    data: petNormalDiseases,
    isLoading: petNormalDiseasesIsLoading,
    isError: petNormalDiseasesIsError
  } = usePetNormalDisease(petData?.data.id as number);

  const {
    mutate: createObservation,
    isPending: observationIsPending,
    error: observationIsError
  } = useCreatePetObservation();

  const {
    register: registerObservation,
    handleSubmit: observationSubmit,
    formState: {errors: observationValidationErrors, isSubmitting: observationIsSubmitting},
    reset: resetObservation
  } = useForm({
    resolver: zodResolver(CreatePetObservationSchema),
    defaultValues: {
      'description': ''
    }
  });

  const sendObeservationToApi: SubmitHandler<CreatePetObservationSchemaType> = (data) => {
    try{
      createObservation({pet_id: petData?.data.id as number, observation_data: data});
      resetObservation();
    }catch(error){
      console.log(error);
    }
  }

  const {
    data: petObservations,
    isFetching: observationsIsFetching,
    error: observationsError
  } = usePetObservations(petData?.data.id as number);

  const customBadgeColorForDiseaseStatus = (diseaseStatus: string) => {
    switch (diseaseStatus){
      case "confirmed":
        return "bg-red-500"
      case "suspected":
        return "bg-indigo-500"
      case "resolved": 
        return "bg-green-500"
      case "monitoring":
        return "bg-gray-400"
    }
  }

  const age = calculateAge(petData?.data.birthday.toString() as string);
  console.log(age);
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Pet Details</h1>
      <Card className="w-full rounded-md bg-white shadow-md dark:bg-neutral-800 dark:shadow-black/10">
        <CardContent className="flex flex-col gap-6">

          <div className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-[200px] w-[200px] ring-2 ring-gray-500">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_BACKEND_URL}storage/${petData?.data.image}`} alt="Photo Pet" />
                <AvatarFallback className="bg-neutral-900">{petData?.data.specie.name === "Cão" ? <Dog className="w-32 h-32 text-neutral-600"/> : <Cat className="w-32 h-32 text-neutral-600" />}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <h2 className="text-5xl font-semibold leading-none padding">{petData?.data.name}</h2>
                <div className="flex text-sm text-slate-600 dark:text-slate-300 gap-2">
                  <Badge>
                    {petData?.data.specie.name}
                  </Badge>
                  <Badge className="">
                    {age.years == 0 ? "" : age.years}
                    {" "}
                    {age.years > 1 ? "years" : ""}
                    {" "}
                    {age.months > 0 ? age.months : ""}
                    {" "}
                    {age.months > 1 ? "months" : "month"}
                  </Badge>
                  <Badge className="bg-blue-400">
                    {petData?.data.sex}
                  </Badge>
                </div>
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
              <div className="flex flex-1 items-center mb-2">
                <div className="flex flex-1">
                  <div className={`cursor-pointer hover:bg-neutral-600 h-full p-2 ${diseaseSection === 'chronic' ? "border-b-2 border-b-cyan-500 font-bold" : ""}`} onClick={() => setDiseaseSection('chronic')}>
                    Chronic Diseases
                  </div>
                  <div className={`cursor-pointer hover:bg-neutral-600 h-full p-2 ${diseaseSection === 'normal' ? "border-b-2 border-b-cyan-500 font-bold" : ""}`} onClick={() => setDiseaseSection('normal')}>
                    Normal Diseases
                  </div>
                </div>
                <Button size={"sm"} variant={'outline'} className="text-xs" onClick={handleOpenCreateDisease}><Plus /> Register new disease</Button>
              </div>
              {diseaseSection === "chronic" ? (
                <div className="flex flex-col gap-1">
                  {petChronicDiseasesIsLoading && <Spinner />}
                  {petChronicDiseases?.data.length === 0 && (
                    <Empty className="gap-2">
                      <EmptyHeader className="gap-0">
                        <EmptyMedia variant="icon">
                          <ScanHeart />
                        </EmptyMedia>
                        <EmptyTitle className="my-0">No chronic diseases registered</EmptyTitle>
                      </EmptyHeader>
                      <EmptyContent>
                        <div className="flex gap-2">
                          <Button onClick={handleOpenCreateDisease}>Register</Button>
                        </div>
                      </EmptyContent>
                    </Empty>
                  )}
                  {petChronicDiseases?.data.map((disease, index) => (
                    <div key={disease.id} className="flex items-center border p-3 rounded-md dark:bg-neutral-900/40 dark:border-neutral-700">
                      <div className="flex">
                        <span className="font-semibold">{disease.name}</span>
                        <Badge className={`mx-2 ${customBadgeColorForDiseaseStatus(disease.diagnosis_status)}`}>{disease.diagnosis_status}</Badge>
                      </div>
                      <p className="flex-1 text-center text-sm"><span className="font-semibold">Type:</span> {disease.is_chronic ? "Chronic" : "Normal"}</p>
                      <p className="flex-1 text-center text-sm"><span className="font-semibold">Diagnosed at:</span> {disease.diagnosis_date.toString()}</p>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="dark:bg-neutral-900 bg-gray-300 p-1 rounded-md cursor-pointer"><EllipsisVertical className="h-4 w-4" /></DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => handleOpenUpdateDisease(disease)}>Update</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => handleOpenDeleteDisease(disease)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {petNormalDiseasesIsLoading && <Spinner />}
                  {petNormalDiseases?.data.length === 0 && (
                    <Empty className="gap-2">
                      <EmptyHeader className="gap-0">
                        <EmptyMedia variant="icon">
                          <ScanHeart />
                        </EmptyMedia>
                        <EmptyTitle className="my-0">No normal diseases registered</EmptyTitle>
                      </EmptyHeader>
                      <EmptyContent>
                        <div className="flex gap-2">
                          <Button onClick={handleOpenCreateDisease}>Register</Button>
                        </div>
                      </EmptyContent>
                    </Empty>
                  )}
                  {petNormalDiseases?.data.map((disease, index) => (
                    <div key={disease.id} className="flex items-center border p-3 rounded-md dark:bg-neutral-900/40 dark:border-neutral-700">
                      <div className="flex">
                        <span className="font-semibold">{disease.name}</span>
                        <Badge className={`mx-2 ${customBadgeColorForDiseaseStatus(disease.diagnosis_status)}`}>{disease.diagnosis_status}</Badge>
                      </div>
                      <p className="flex-1 text-center text-sm"><span className="font-semibold">Type:</span> {disease.is_chronic ? "Chronic" : "Normal"}</p>
                      <p className="flex-1 text-center text-sm"><span className="font-semibold">Diagnosed at:</span> {disease.diagnosis_date.toString()}</p>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="dark:bg-neutral-900 bg-gray-300 p-1 rounded-md cursor-pointer"><EllipsisVertical className="h-4 w-4" /></DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => handleOpenUpdateDisease(disease)}>Update</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => handleOpenDeleteDisease(disease)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}

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
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">Observations</h3>
                <Button variant={'outline'} size={'sm'} onClick={() => setNewObservationIsOpen(!newObservationIsOpen)}>{newObservationIsOpen ? <><Minus />Close add observation</> : <><Plus />Add Observation</>}</Button>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {petObservations?.data.length === 0 && (
                    <Empty className="gap-2">
                      <EmptyHeader className="gap-0">
                        <EmptyMedia variant="icon">
                          <Search />
                        </EmptyMedia>
                        <EmptyTitle className="my-0">No observations registered yet</EmptyTitle>
                      </EmptyHeader>
                    </Empty>
                )}
                {petObservations?.data.map((observation, index) => (
                  <div className="border border-slate-200 dark:border-neutral-700 rounded-md p-3 bg-slate-50 dark:bg-neutral-900/40">
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-bold text-lg mb-4">Observation #{index + 1}</h2>
                      <DropdownMenu>
                          <DropdownMenuTrigger className="dark:bg-neutral-900 bg-gray-300 rounded-md cursor-pointer p-0 h-6 w-6 flex items-center justify-center"><Ellipsis className="h-4 w-4" /></DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => handleOpenUpdateObservation(observation)}>Update</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => handleOpenDeleteObservation(observation)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200">{observation.description}</p>
                  </div>
                ))}
                {newObservationIsOpen &&
                  <>
                    <Separator />
                    <ErrorBox errors={observationValidationErrors} />
                    <form onSubmit={observationSubmit(sendObeservationToApi)} className="flex flex-col gap-2">
                      <Textarea
                        {...registerObservation('description')}
                        placeholder="insert the observation here" />
                      <Button type="submit">Add</Button>
                    </form>
                  </>
                }
              </div>
            </div>

            <Separator className="dark:bg-neutral-700"/>

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
      <Dialog open={updateDiseaseIsOpen} onOpenChange={handleUpdateDiseaseOpenChange}>
        <DialogContent>
          {selectedDisease && <UpdateDiseaseModal petDisease={selectedDisease} handleOpen={handleUpdateDiseaseOpenChange}/>}
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDiseaseModalIsOpen} onOpenChange={handleDeleteDiseaseIsOpen}>
        <DialogContent>
          {selectedDisease && <DeleteDiseaseModal handleOpen={handleDeleteDiseaseIsOpen} selectedDisease={selectedDisease}/>}
        </DialogContent>
      </Dialog>
      <Dialog open={createDiseaseModalIsOpen} onOpenChange={handleCreateDisaeseOpenChange}>
        <DialogContent>
          <CreateDiseaseModal handleOpen={handleCreateDisaeseOpenChange} pet={petData?.data as Pet}/>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteObservationModalIsOpen} onOpenChange={handleDeleteObservationIsOpen}>
          {selectedObservation && <DeletePetObservationModal observation={selectedObservation} openChange={handleDeleteObservationIsOpen}/>}
      </Dialog>
      <Dialog open={updatePetObservationModalIsOpen} onOpenChange={handleUpdateObservationIsOpen}>
          {selectedObservation && <UpdatePetObservationModal observation={selectedObservation} openChange={handleUpdateObservationIsOpen} />}
      </Dialog>
    </div>
  );
}
