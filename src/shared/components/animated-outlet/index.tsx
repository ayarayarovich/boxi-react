import { forwardRef, useContext, useRef } from 'react'

import { getRouterContext, Outlet, useMatch, useMatches } from '@tanstack/react-router'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import { cloneDeep } from 'radashi'

const _AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
    const RouterContext = getRouterContext()
    const routerContext = useContext(RouterContext)
    const renderedContext = useRef(routerContext)
    const isPresent = useIsPresent()

    if (isPresent) {
        renderedContext.current = cloneDeep(routerContext)
    }

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-full grow overflow-hidden'
        >
            <RouterContext.Provider value={renderedContext.current}>
                <Outlet />
            </RouterContext.Provider>
        </motion.div>
    )
})

export default function AnimatedOutlet() {
    const matches = useMatches()
    const match = useMatch({ strict: false })
    const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1
    const nextMatch = matches[nextMatchIndex]
    return (
        <AnimatePresence mode='popLayout'>
            <_AnimatedOutlet key={nextMatch.id} />
        </AnimatePresence>
    )
}
