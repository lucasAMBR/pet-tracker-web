type PetDisease = {
    id: number,
    pet_id: number,
    name: string,
    diagnosis_date: Date,
    is_chronic: boolean,
    clinical_notes: string,
    diagnosis_status: 'suspected'| 'confirmed' | 'resolved' | 'monitoring',
    resolved_date: Date | null,
}