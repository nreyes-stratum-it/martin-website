"use client";

import * as React from "react";
import {motion, useMotionValue, useMotionTemplate} from "framer-motion"; // Asegurate de tener "framer-motion"
import {cn} from "@/lib/utils/cn";

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: { value: string; label: string }[];
    placeholder: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({className, options, placeholder, ...props}, ref) => {
        const radius = 100;
        const [visible, setVisible] = React.useState(false);
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({
                                     currentTarget,
                                     clientX,
                                     clientY,
                                 }: React.MouseEvent) {
            const {left, top} = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`radial-gradient(${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,#3b82f6,transparent 80%)`,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="!group/select !rounded-lg !p-[2px] !transition !duration-300"
            >
                <select
                    className={cn(
                        "!appearance-none !text-sm !text-gray-500 !h-10 !w-full !rounded-md !px-3 !py-2 !border-none !transition !duration-300 dark:bg-[#1f2937]",
                        className
                    )}
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {options?.map((option, i) => (
                        <option
                            key={i}
                            value={option.value}
                            className="text-white !text-lg dark:text-white !p-4"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </motion.div>
        );
    }
);

Select.displayName = "Select";

export {Select};
