import { forwardRef, useCallback, type ButtonHTMLAttributes, type MouseEventHandler } from 'react'

import { hapticFeedback } from '@telegram-apps/sdk-react'

import { CLICK_SOUND } from '@/shared/sounds'

import { cn } from '@/lib/utils'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, onClick, ...props }, ref) => {
    const wrappedOnClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            hapticFeedback.selectionChanged.ifAvailable()
            CLICK_SOUND.play()
            onClick?.(e)
        },
        [onClick],
    )
    return <button className={cn(className)} onClick={wrappedOnClick} ref={ref} {...props} />
})
Button.displayName = 'Button'

export default Button
