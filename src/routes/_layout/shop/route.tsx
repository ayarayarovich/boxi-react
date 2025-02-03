import { useId, useMemo } from 'react'

import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_layout/shop')({
    component: RouteComponent,
})

function RouteComponent() {
    const id = useId()
    const navigationUnderline = useMemo(
        () => (
            <motion.div layout layoutId={id} className='relative -z-10 h-1 w-full bg-white'>
                <div className='absolute top-0 left-1/2 aspect-square w-full -translate-x-1/2 -translate-y-full overflow-hidden'>
                    <div className='absolute bottom-0 left-1/2 aspect-square w-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/20 blur-lg'></div>
                </div>
            </motion.div>
        ),
        [id],
    )

    return (
        <div className='relative flex h-full flex-col items-stretch pt-2 pb-5'>
            <h1 className='text-center text-xl font-semibold'>Shop</h1>
            <div className={cn('mb-5 flex items-baseline px-5', '*:flex-1 *:text-center')}>
                <Link to='/shop' activeOptions={{ exact: true }}>
                    {({ isActive }) => (
                        <div>
                            <div className={cn('py-4 opacity-30 transition-all', isActive && 'font-semibold opacity-100')}>Perks</div>
                            {isActive && navigationUnderline}
                        </div>
                    )}
                </Link>
                <Link to='/shop/consumables' activeOptions={{ exact: true }}>
                    {({ isActive }) => (
                        <div>
                            <div className={cn('py-4 opacity-30 transition-all', isActive && 'font-semibold opacity-100')}>Consumables</div>
                            {isActive && navigationUnderline}
                        </div>
                    )}
                </Link>
            </div>
            <Outlet />
        </div>
    )
}
