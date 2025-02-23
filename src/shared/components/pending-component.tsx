import { useMemo } from 'react'
import { useStopwatch } from 'react-timer-hook'

import { AnimatePresence, motion, Variants } from 'motion/react'

const variants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 0.75,
    },
}

export default function PendingComponent() {
    const sw = useStopwatch({ autoStart: true })
    const message = useMemo(() => {
        if (sw.totalSeconds >= 30) {
            return 'for some reason takes too long...'
        }
        if (sw.totalSeconds >= 10) {
            return 'something looks off...'
        }
        if (sw.totalSeconds >= 5) {
            return 'just a little bit...'
        }
        if (sw.totalSeconds >= 1) {
            return 'will be ready soon...'
        }
        return ''
    }, [sw.totalSeconds])

    return (
        <div className='flex h-screen max-h-full flex-col items-center justify-center p-16'>
            <div className='mb-3 size-8 animate-spin rounded-full border-4 border-y-transparent'></div>
            <AnimatePresence mode='wait'>
                <motion.div variants={variants} className='text-sm' initial='hidden' animate='visible' exit='hidden' key={message}>
                    {message ? message : <>&nbsp;</>}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
