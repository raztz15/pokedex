import { useEffect, useState } from "react";

export const useDebounce = (query: string, time: number) => {
    const [value, setValue] = useState(query);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setValue(query)
        }, time);

        return () => clearTimeout(timeoutId)
    }, [query, time])

    return value
}