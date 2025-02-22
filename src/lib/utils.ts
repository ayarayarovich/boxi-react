import { clsx, type ClassValue } from 'clsx'
import gsap from 'gsap'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function preloadImage(src: string) {
    return new Promise((res, rej) => {
        const img = new Image()
        img.onload = res
        img.onerror = rej
        img.src = src
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stopOverscroll(element?: any) {
    element = gsap.utils.toArray(element)[0] || window
    if (element === document.body || element === document.documentElement) {
        element = window
    }
    let lastScroll = 0,
        lastTouch: number,
        forcing: boolean,
        forward = true,
        // eslint-disable-next-line prefer-const
        isRoot = element === window,
        // eslint-disable-next-line prefer-const
        scroller = isRoot ? document.scrollingElement : element,
        // eslint-disable-next-line prefer-const
        ua = window.navigator.userAgent + '',
        // eslint-disable-next-line prefer-const
        getMax = isRoot ? () => scroller.scrollHeight - window.innerHeight : () => scroller.scrollHeight - scroller.clientHeight,
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
        addListener = (type: any, func: any) => element.addEventListener(type, func, { passive: false }),
        // eslint-disable-next-line prefer-const
        revert = () => {
            scroller.style.overflowY = 'auto'
            forcing = false
        },
        // eslint-disable-next-line prefer-const
        kill = () => {
            forcing = true
            scroller.style.overflowY = 'hidden'
            if (!forward) {
                if (scroller.scrollTop < 1) {
                    scroller.scrollTop = 1
                } else {
                    scroller.scrollTop = getMax() - 1
                }
            }
            setTimeout(revert, 1)
        },
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
        handleTouch = (e: any) => {
            const evt = e.changedTouches ? e.changedTouches[0] : e,
                forward = evt.pageY <= lastTouch
            if (((!forward && scroller.scrollTop <= 1) || (forward && scroller.scrollTop >= getMax() - 1)) && e.type === 'touchmove') {
                e.preventDefault()
            } else {
                lastTouch = evt.pageY
            }
        },
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
        handleScroll = (e: any) => {
            if (!forcing) {
                // eslint-disable-next-line prefer-const
                let scrollTop = scroller.scrollTop
                forward = scrollTop > lastScroll
                if ((!forward && scrollTop < 1) || (forward && scrollTop >= getMax() - 1)) {
                    e.preventDefault()
                    kill()
                }
                lastScroll = scrollTop
            }
        }
    // eslint-disable-next-line no-useless-escape
    if ('ontouchend' in document && !!ua.match(/Version\/[\d\.]+.*Safari/)) {
        addListener('scroll', handleScroll)
        addListener('touchstart', handleTouch)
        addListener('touchmove', handleTouch)
    }
    scroller.style.overscrollBehavior = 'none'
}
