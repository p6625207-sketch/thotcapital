import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SliderButton({ direction = "left", onClick, disabled }) {

    const isLeft = direction === "left";
    const Icon = isLeft ? ChevronLeft : ChevronRight;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                absolute top-1/2 -translate-y-1/2 z-20
                ${isLeft ? "left-3 md:left-0 -translate-x-1/2" : "right-3 md:right-0 translate-x-1/2"}
                
                bg-slate-900/80 backdrop-blur-md
                border border-slate-700
                
                p-3 rounded-full
                text-white
                
                hover:bg-purple-600 hover:border-purple-500
                transition-all duration-300
                
                shadow-xl
                
                disabled:opacity-30
                disabled:cursor-not-allowed
                disabled:hover:bg-slate-900/80
            `}
        >
            <Icon size={22} />
        </button>
    );
}