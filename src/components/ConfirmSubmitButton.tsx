'use client'

import { ButtonHTMLAttributes, useRef, useState } from "react"

type ConfirmSubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    danger?: boolean
}
export function ConfirmSubmitButton({ title, description, confirmText = '确认', cancelText = '取消', danger = false, className, children, ...props }: ConfirmSubmitButtonProps) {
    const [open, setOpen] = useState(false)
    const submitButtonRef = useRef<HTMLButtonElement>(null)
    return (
        <>
            <button {...props} type="button" className={className} onClick={() => { setOpen(true) }}>
                {children}
            </button>
            {open ?
                (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
                        <div className="w-full max-w-sm rounded border border-neutral-300 bg-white p-5 shadow-lg">
                            <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
                            <div className="mt-6 flex justify-end gap-3">
                                <button type="button" className="rounded border border-neutral-300 bg-white px-4 py-2 text-sm hover:border-neutral-950" onClick={() => setOpen(false)}>{cancelText}</button>
                                <button type="button" className={danger ?
                                    "rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                    :
                                    "rounded bg-neutral-950 px-4 py-2 text-sm text-white"
                                } onClick={() => {
                                    setOpen(false)
                                    submitButtonRef.current?.click()
                                }}>{confirmText}</button>
                            </div>
                        </div>
                    </div>
                )
                : null}
            <button {...props} ref={submitButtonRef} type="submit" className="hidden" aria-hidden="true" tabIndex={-1}></button>
        </>
    )
}