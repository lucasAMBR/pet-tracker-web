"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined): string {
	// A verificação crucial:
	// Só prossegue se 'date' for um objeto Date e não for uma "Data Inválida".
	if (date instanceof Date && !isNaN(date.getTime())) {
		return date.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	}

	// Para qualquer outro caso (undefined, null, data inválida), retorna uma string vazia.
	return "";
}

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false;
	}
	return !isNaN(date.getTime());
}

export function DatepickerInput({
	value,
	onChange,
}: {
	value: Date | undefined;
	onChange: (date: Date | undefined) => void;
}) {
	const [open, setOpen] = React.useState(false);
	const [month, setMonth] = React.useState<Date | undefined>(value);
	const [textValue, setTextValue] = React.useState(formatDate(value));

	React.useEffect(() => {
		setTextValue(formatDate(value));
	}, [value]);

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				Birthdate
			</Label>
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={textValue}
					placeholder="June 01, 2025"
					className="bg-background pr-10"
					onChange={(e) => {
						const parsedDate = new Date(e.target.value);
						setTextValue(e.target.value);
						if (isValidDate(parsedDate)) {
							onChange(parsedDate);
							setMonth(parsedDate);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setOpen(true);
						}
					}}
				/>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date-picker"
							variant="ghost"
							className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
						>
							<CalendarIcon className="size-3.5" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto overflow-hidden p-0"
						align="end"
						alignOffset={-8}
						sideOffset={10}
					>
						<Calendar
							mode="single"
							selected={value}
							captionLayout="dropdown"
							month={month}
							onMonthChange={setMonth}
							onSelect={(date) => {
								onChange(date);
								setTextValue(formatDate(date));
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
