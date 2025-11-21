export type PetMedication = {
    id: number,
    name: string,
    type: MedicationType,
    treatment_type: TreatmentType,
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

export type TreatmentType = "continuous" | "periodic" | "unique";

export type MedicationType =   "Antibiotic" |
  "Analgesic" |
  "Anti-inflammatory" |
  "Antiparasitic" |
  "Dewormer" |
  "Supplement" |
  "Antifungal" |
  "Sedative" |
  "Anesthetic" |
  "Diuretic" |
  "Vitamin" |
  "Antihistamine" |
  "Hormone Therapy" |
  "Chemotherapy"