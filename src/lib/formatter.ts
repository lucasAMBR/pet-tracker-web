import { format, parseISO } from "date-fns";

export const formatPhone = (rawPhone: string | undefined) => {
	if (!rawPhone) {
		return "";
	}

	const digits = rawPhone.replace(/\D/g, "");
	const { length } = digits;

	if (length === 11) {
		return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
	}

	if (length === 10) {
		return `(${digits.substring(0, 2)}) ${digits.substring(2, 6)}-${digits.substring(6)}`;
	}

	return rawPhone;
};

export function capitalizeFirstLetter(str: string): string {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatReadableDate(isoString: string): string {
  try {
    // 1. Converte a string ISO para um objeto Date.
    const date = parseISO(isoString);

    // 2. Formata a data para um padrão legível, usando o locale pt-BR.
    // O 'format' automaticamente converte do UTC (Z) para o fuso local.
    return format(date, "dd/MM/yyyy, HH:mm");
  } catch (error) {
    console.error("Data inválida para formatação:", isoString, error);
    return "Data inválida";
  }
}
