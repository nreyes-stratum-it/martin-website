"use client"
import React, {useState} from 'react'
import Headline from "@/components/ui/headline/headline";
import {useForm} from "react-hook-form";
import {FormData} from "@/lib/types/form/form";
import dynamic from "next/dynamic";
import {Select} from "@/components/internal/ui/select/select";
import {generateName} from "@/lib/helpers/form/generate-name";

const Confetti = dynamic(() => import('@/components/internal/confetti/confetti'), {ssr: false});
const Label = dynamic(() => import('@/components/internal/ui/label/label').then(mod => mod.Label), {ssr: false});
const Textarea = dynamic(() => import('@/components/internal/ui/textarea/textarea').then(mod => mod.Textarea), {ssr: false});
const Input = dynamic(() => import('@/components/internal/ui/input/input').then(mod => mod.Input), {ssr: false});

type ContactFormV1Props = {
    data: FormData
}
const ContactFormV1 = ({data}: ContactFormV1Props) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Record<string, string>>();

    if (!data) return null;

    const {title, formFields} = data;

    const onSubmit = (data: Record<string, string>) => {
        console.log(data)
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);
        reset();
    };

    return (
        <div
            className="!border !border-[#374151] w-[90%] !mx-auto !p-5 lg:!p-10 !bg-[#1f2937] !rounded-xl  !shadow-lg ">
            <Headline
                classNames={"lg:!text-2xl !text-xl !font-mono !text-center !mb-8  !font-normal"}
                data={title}></Headline>

            <form
                suppressHydrationWarning
                onSubmit={handleSubmit(onSubmit)}
                className="grid !mb-0 grid-cols-1   md:grid-cols-2 !gap-x-10 !gap-y-8">
                {formFields.map((field, index) => {
                    const fieldName = generateName(field.label);
                    const isRequired = field.required;
                    const isTextarea = field.type === "textarea";
                    const isSelect = field.type === "select";
                    const hasOptions = Array.isArray(field.options) && field.options.length > 0;

                    const registerProps = register(fieldName, {
                        required: isRequired,
                        validate: (value) => {
                            if (isSelect && isRequired) {
                                return value !== "";
                            }
                            return true;
                        },
                    });

                    const baseClasses =
                        "!w-full !rounded-md !text !border !placeholder:!text-sm !h-12 !placeholder-gray-500 !border-[#4C5664] !bg-[#374151] !p-3";

                    const fieldClass = `${baseClasses} ${isTextarea ? "!h-40 !resize-none" : ""}`;

                    const commonProps = {
                        placeholder: field.placeholder || '',
                        className: baseClasses,
                    };
                    return (
                        <div
                            key={index}
                            className={`flex flex-col ${isTextarea || isSelect ? "md:col-span-2" : ""}`}
                        >
                            <Label
                                htmlFor={fieldName} className="!mb-2 !font-semibold !text-gray-100"
                                suppressHydrationWarning>
                                {field.label} {isRequired && <span className="text-red-400">*</span>}
                            </Label>

                            {isSelect && hasOptions ? (
                                <Select
                                    {...commonProps} {...registerProps}

                                    {...register(field.label, {required: field.required})}
                                    options={field.options}
                                    placeholder={field.placeholder || "Select an option"}
                                />
                            ) : isTextarea ? (
                                <Textarea
                                    {...commonProps} {...registerProps} className={fieldClass} rows={10}
                                    suppressHydrationWarning
                                />
                            ) : (
                                <Input
                                    {...commonProps} {...registerProps} type={field.type} suppressHydrationWarning
                                />
                            )}

                            {errors[fieldName] && (
                                <span className="!text-red-500 !text-sm !italic !mt-1">
                                 {field.label} is required
                                </span>
                            )}
                        </div>
                    );
                })}

                <div className="md:col-span-2 text-center mt-4">
                    <button type="submit">Submit</button>
                </div>

            </form>

            {
                showConfetti && <Confetti/>
            }
        </div>
    )
}
export default ContactFormV1
