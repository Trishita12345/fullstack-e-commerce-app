import { useEffect, useState } from "react";

export const useResendTimer = (initialTime = 30) => {
    const [timer, setTimer] = useState(initialTime);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const resetTimer = () => {
        setTimer(initialTime);
        setCanResend(false);
    };

    return { timer, canResend, resetTimer };
};