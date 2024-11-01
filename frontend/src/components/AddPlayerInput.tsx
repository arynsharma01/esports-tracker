import { useEffect, useState } from "react";

interface Props {
    label: string
    placeholder: string
    onChange: (value: string) => void
    condition: boolean
}

export default function AddPlayerInput({ label, placeholder, condition, onChange }: Props) {
    const [input, setInput] = useState("")
    const [valid, setValid] = useState(true)

    useEffect(() => {
        
        const handler = setTimeout(() => {
            onChange(input)
        }, 1000);

        
        return () => clearTimeout(handler)
    }, [input, onChange]);

    useEffect(() => {
        // Validation logic
        if (input.length < 3 && condition) {
            setValid(false)
        } else {
            setValid(true)
        }
    }, [input, condition])

    return (
        <div className="flex flex-col justify-center">
            <div className="font-semibold p-1">{label}</div>
            <input
                type="text"
                className={`p-2 border border-slate-500 w-60 h-12 rounded-md focus:ring-2 ${valid ? "ring-green-500" : "ring-red-500"}`}
                onChange={(e) => setInput(e.target.value.trim())}
                placeholder={placeholder}
            />
        </div>
    );
}
