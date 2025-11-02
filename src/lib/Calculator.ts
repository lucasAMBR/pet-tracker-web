import { intervalToDuration, parseISO } from "date-fns";

export function calculateAge(birthdayString: string): { years: number; months: number } {
  try {
    const birthday = parseISO(birthdayString);
    
    const today = new Date();

    const duration = intervalToDuration({
      start: birthday,
      end: today
    });

    return {
      years: duration.years ?? 0,
      months: duration.months ?? 0
    };

  } catch (error) {
    console.error("Data de nascimento inválida:", birthdayString, error);
    return { years: 0, months: 0 };
  }
}