"use client"

import { FieldErrors } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

interface FormErrorMessageProps{
    errors: FieldErrors;
}

const FormErrorMessage = ({ errors }: FormErrorMessageProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const errorMessages = useMemo(() => {
        return Object.values(errors)
            .map((error) => error?.message)
            .filter((message): message is string => !!message); // Garante que a lista só contenha strings
    }, [errors]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(errorMessages.length - 1, prev + 1));
    };

    useEffect(() => {
        setCurrentIndex(0);
    }, [errorMessages]);

    if (errorMessages.length === 0) {
        return null;
    }

    return(
        <Alert variant={'destructive'} role="alert">
            <AlertTriangle className="w-4 h-4" />
            <AlertTitle className="flex items-center justify-between mb-2">
                <div>
                Please fix the errors bellow:
                </div>
                <div>
                    {errorMessages.length > 1 && (
                        <div className="flex items-center justify-end w-full gap-2">
                            <Button 
                                type="button"
                                variant="ghost" 
                                size="sm" 
                                onClick={handlePrevious} 
                                disabled={currentIndex === 0}
                                className="p-0 w-fit h-fit bg-none"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <p>{currentIndex + 1} of {errorMessages.length}</p>
                            <Button
                                type="button"
                                variant="ghost" 
                                size="sm" 
                                onClick={handleNext} 
                                className="p-0 w-fit h-fit bg-none"
                                disabled={currentIndex === errorMessages.length - 1}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </AlertTitle>
            <AlertDescription>
                {errorMessages[currentIndex]}
            </AlertDescription>
        </Alert>
    );
}

export default FormErrorMessage;