export type Pet = {
    id: number,
    name: string,
    birthday: Date,
    specie: PetSpecie,
    color: string,
    sex: "male" | "female",
    size: "small" | "medium" | "large",
    status: "safe" | "deceased" | "lost",
    breed: string,
    weight: number,
    is_neutred: boolean,
    image: string | null,
    collar: Collar | null,
    created_at: Date,
    updated_at: Date 
}

type PetSpecie = {
    id: number,
    name: string
}

type Collar = {
    id: string,
    pet_id: number,
    created_at: Date,
    update_at: Date
}