import { useEffect } from "react"
import { useForm, useFieldArray, FieldErrors } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

import { TooltipSection } from "./TooltipSection"

type FormValues = {
    username: string
    email: string
    channel: string
    social: {
        twitter: string
        facebook: string
    }
    phoneNumbers: string[]
    phNumbers: {
        number: string
    }[]
    age: number
    dob: Date
}

export const YouTubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: async () => {
            // const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
            // const data = await response.json()

            return {
                username: "",
                // email: data.email,
                email: "",
                channel: "",
                social: {
                    twitter: "",
                    facebook: ""
                },
                phoneNumbers: ["", ""],
                phNumbers: [{ number: "" }],
                age: 0,
                dob: new Date()
            }
        },
        mode: "onSubmit"
    })
    // trigger - manually trigger validations for form fields
    const { register, control, handleSubmit, formState: { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount }, watch, getValues, setValue, reset, trigger } = form

    console.log("TouchedFields & DirtyFields: ", { touchedFields, dirtyFields })
    console.log("IsDirty: ", { isDirty })
    console.log("IsValid: ", { isValid })
    console.log("IsSubmitting: ", { isSubmitting })
    console.log("IsSubmitted: ", { isSubmitted })
    console.log("IsSubmitSuccessful: ", { isSubmitSuccessful })
    console.log("SubmitCount: ", { submitCount })

    const { fields, append, remove } = useFieldArray({
        name: "phNumbers",
        control
    })

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data)
    }

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log("OnError", errors)
    }

    const handleGetValues = () => {
        console.log("Get values: ", getValues("social.twitter"))
        console.log("Get values: ", getValues(["social.twitter", "social.facebook"]))
        const filledFormValues = getValues()
        const displayFormValuesSection = document.getElementById("display-form-values-section")
        if (displayFormValuesSection) {
            displayFormValuesSection.style.display = "block"
        }

        const displayFormValues = document.getElementById("display-form-values")
        if (displayFormValues) {
            displayFormValues.textContent = `Display form values using getValues: ${JSON.stringify(filledFormValues)}`
        }
    }

    const handleSetValue = () => {
        console.log("Set value - remove value from Age input field")
        setValue("age", Number(""), {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    // watch using with useEffect will prevent the re-rendering
    useEffect(() => {
        const subscription = watch((value) => {
            const displayContent = document.getElementById("watch-entire-form-values")
            if (displayContent) {
                displayContent.textContent = `Watched form values using watch and useEffect: 
                ${JSON.stringify(value)}`
            }
        })

        return () => subscription.unsubscribe()
    }, [watch])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    return (
        <section className="flex flex-col items-center mt-6">
            <h1 className="text-bold text-3xl"> YouTube Form </h1>

            <section className="flex items-center border-2 border-sky-400 rounded-2xl mt-6 p-4 w-full md:w-1/2">
                <h2 id="watch-entire-form-values" className="break-words min-w-52 md:w-1/2"></h2>
            </section>

            <form className="flex flex-col items-center mt-6 w-full" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="username" className="font-bold mb-2">Username</label>
                        {errors.username?.message && <p className="text-red-500 text-left text-md">{errors.username?.message}</p>}
                    </section>

                    <input type="text" id="username" {...register("username", { required: { value: true, message: "Username is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="email" className="font-bold mb-2">E-mail</label>
                        {errors.email?.message && <p className="text-red-500 text-left text-md">{errors.email?.message}</p>}
                    </section>

                    <input type="email" id="email" {...register("email", {
                        pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email format" }, validate: {
                            notAdmin: (fieldValue) => {
                                return (fieldValue !== "admin@example.com" || "Enter a different email address")
                            },
                            notBlackListed: (fieldValue) => {
                                return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                            },
                            emailAvailable: async (fieldValue) => {
                                const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`)
                                const data = await response.json()
                                return data.length == 0 || "Email already exists"
                            }
                        }
                    })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="channel" className="font-bold mb-2">Channel</label>
                        {errors.channel?.message && <p className="text-red-500 text-left text-md">{errors.channel?.message}</p>}
                    </section>

                    <input type="text" id="channel" {...register("channel", { required: { value: true, message: "Channel is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="twitter" className="font-bold mb-2">Twitter</label>
                        {errors.social?.twitter?.message && <p className="text-red-500 text-left text-md">{errors.social?.twitter?.message}</p>}
                    </section>

                    <input type="text" id="twitter" {...register("social.twitter", { required: { value: true, message: "Twitter handle is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="facebook" className="font-bold mb-2">Facebook</label>
                        {errors.social?.facebook?.message && <p className="text-red-500 text-left text-md">{errors.social?.facebook?.message}</p>}
                    </section>

                    <input type="text" id="facebook" {...register("social.facebook", { required: { value: true, message: "Facebook profile name is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="primary-phone" className="font-bold mb-2">Primary phone number</label>
                        {errors.phoneNumbers?.[0]?.message && <p className="text-red-500 text-left text-md">{errors.phoneNumbers?.[0]?.message}</p>}
                    </section>

                    <input type="text" id="primary-phone" {...register("phoneNumbers.0", { required: { value: true, message: "Primary phone number is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="secondary-phone" className="font-bold mb-2">Secondary phone number</label>
                        {errors.phoneNumbers?.[1]?.message && <p className="text-red-500 text-left text-md">{errors.phoneNumbers?.[1]?.message}</p>}
                    </section>

                    <input type="text" id="secondary-phone" {...register("phoneNumbers.1", { required: { value: true, message: "Secondary phone number is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label>List of phone numbers</label>
                    </section>

                    <section className="flex flex-col justify-between">
                        {
                            fields.map((field, index) => {
                                return (
                                    <section className="flex flex-col mb-4" key={field.id}>
                                        <input type="text" {...register(`phNumbers.${index}.number` as const)} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg first:mb-4" />

                                        {
                                            index > 0 && (
                                                <button type="button" className="self-center bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200 mt-2" onClick={() => remove(index)}>Remove phone number</button>
                                            )
                                        }
                                    </section>
                                )
                            })
                        }

                        <button type="button" className="self-center bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200" onClick={() => append({ number: "" })}>Add phone number</button>
                    </section>
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="age" className="font-bold mb-2">Age</label>
                        {errors.age?.message && <p className="text-red-500 text-left text-md">{errors.age?.message}</p>}
                    </section>

                    <input type="number" id="age" {...register("age", { valueAsNumber: true, required: { value: true, message: "Age is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-col mb-4 w-full md:w-1/2">
                    <section className="flex justify-between">
                        <label htmlFor="dob" className="font-bold mb-2">Date of birth</label>
                        {errors.dob?.message && <p className="text-red-500 text-left text-md">{errors.dob?.message}</p>}
                    </section>

                    <input type="date" id="dob" {...register("dob", { valueAsDate: true, required: { value: true, message: "Date of birth is required" } })} className="p-4 bg-gray-200 text-md leading-relaxed border-2 border-sky-300 rounded-lg" />
                </section>

                <section className="flex flex-wrap justify-center gap-2 w-full md:w-1/2">
                    <TooltipSection tooltipMessage={!isDirty || !isValid || isSubmitting ? "Please fill the form fields to enable Submit button" : "Submit form"}>
                        <button type="submit" className={`bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed`} disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
                    </TooltipSection>

                    <TooltipSection tooltipMessage={!isDirty || !isValid ? "Please fill all form fields to enable Get values button" : "Get all form values"}>
                        <button type="button" className="bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed" disabled={!isDirty || !isValid} onClick={handleGetValues}>Get values</button>
                    </TooltipSection>

                    <TooltipSection tooltipMessage={"Reset form fields with default values"}>
                        <button type="button" className="bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed" onClick={() => reset()}>Reset Form</button>
                    </TooltipSection>

                    <TooltipSection tooltipMessage={"Validate form fields - Manually"}>
                        <button type="button" className="bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed" onClick={() => trigger()}>Validate</button>
                    </TooltipSection>

                    <TooltipSection tooltipMessage={"Validate Channel field - Manually"}>
                        <button type="button" className="bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed" onClick={() => trigger("channel")}>Validate Channel field</button>
                    </TooltipSection>

                    <TooltipSection tooltipMessage="Set Age value from default 0 to empty">
                        <button type="button" className="bg-transparent text-gray-900 font-bold p-4 mt-4 border-2 border-sky-500 rounded-lg w-64 hover:border-sky-700 hover:text-sky-700 hover:bg-gray-200" content="Material Tailwind" onClick={handleSetValue}>Set Age value from default 0 to empty</button>
                    </TooltipSection>
                </section>

                <section id="display-form-values-section" className="hidden items-center border-2 border-sky-400 rounded-2xl mt-6 p-4 w-full md:w-1/2">
                    <h2 id="display-form-values"></h2>
                </section>
            </form>

            <DevTool control={control} />
        </section>
    )
}
