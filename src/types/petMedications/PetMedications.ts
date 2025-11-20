type PetMedication = {
    id: number,
    name: string,
    type: string,
    treatment_type: string,
    dosage_form: string,
    dosing_interval: number | null,
    interval_unit: string | null,
    start_date: Date,
    pet_id: number,
    end_date: Date | null
    description: string | null,
    created_at: Date,
    updated_at: Date
}