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
