import { useRef, ReactNode, FC } from "react"

type TooltipProps = {
    children: ReactNode
    tooltipMessage?: string
}

export const TooltipSection: FC<TooltipProps> = ({ children, tooltipMessage }): JSX.Element => {
    const tooltipRef = useRef<HTMLSpanElement>(null)
    const containerSectionRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={containerSectionRef} onMouseEnter={({ clientX }) => {
            if (!tooltipRef.current || !containerSectionRef.current) return
            const { left } = containerSectionRef.current.getBoundingClientRect()
            tooltipRef.current.style.left = clientX - left + "px"
        }} className="group relative flex">
            {children}
            {tooltipMessage && <span ref={tooltipRef} className="absolute top-full mt-2 p-2 text-md leading-relaxed border-2 border-amber-700 bg-amber-200 rounded-lg whitespace-wrap transition invisible opacity-0 group-hover:visible group-hover:opacity-100 md:whitespace-nowrap">{tooltipMessage}</span>}
        </div>
    )
}