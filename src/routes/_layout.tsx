import { useState } from 'react'

import { createFileRoute, Outlet } from '@tanstack/react-router'
import { hapticFeedback } from '@telegram-apps/sdk-react'
import { motion } from 'framer-motion'

import { PlayIcon, ShopIcon, TasksIcon, UserIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_layout')({
    component: RouteComponent,
})

function BottomNavigationCurrentPageLight() {
    return (
        <motion.div layout layoutId='bottom-navigatio-current-page-light' className='pointer-events-none absolute inset-x-0 top-0 w-full'>
            <div
                className='aspect-square w-full -translate-y-1/2 scale-150'
                style={{
                    background: 'radial-gradient(closest-side, rgba(41,41,41,1), rgba(255,255,255,0))',
                }}
            ></div>
        </motion.div>
    )
}

function RouteComponent() {
    const [current, setCurrent] = useState('play')
    return (
        <div className='relative h-svh pt-(--content-safe-inset-top)'>
            <div
                className='h-full overflow-hidden'
                style={{
                    paddingBottom: 'calc(var(--content-safe-inset-bottom) + 4.75rem + 1px)',
                }}
            >
                <Outlet />
            </div>

            <div className='bg-dark-elevated absolute inset-x-0 bottom-0 overflow-hidden rounded-t-3xl border border-b-0 border-[#292929] text-xs text-[#e6e6e6]'>
                <div className='flex items-baseline justify-center leading-none'>
                    <div className='relative flex-1 text-center'>
                        {current === 'play' && <BottomNavigationCurrentPageLight />}
                        <div
                            className={cn('relative z-10 py-4 opacity-50 transition-opacity', current === 'play' && 'opacity-100')}
                            onClick={() => {
                                hapticFeedback.selectionChanged()
                                setCurrent('play')
                            }}
                        >
                            <PlayIcon className='mx-auto mb-2 h-6' />
                            Play
                        </div>
                    </div>
                    <div className='relative flex-1 text-center'>
                        {current === 'shop' && <BottomNavigationCurrentPageLight />}
                        <div
                            className={cn('relative z-10 py-4 opacity-50 transition-opacity', current === 'shop' && 'opacity-100')}
                            onClick={() => {
                                hapticFeedback.selectionChanged()
                                setCurrent('shop')
                            }}
                        >
                            <ShopIcon className='mx-auto mb-2 h-6' />
                            Shop
                        </div>
                    </div>
                    <div className='relative flex-1 text-center'>
                        {current === 'tasks' && <BottomNavigationCurrentPageLight />}
                        <div
                            className={cn('relative z-10 py-4 opacity-50 transition-opacity', current === 'tasks' && 'opacity-100')}
                            onClick={() => {
                                hapticFeedback.selectionChanged()
                                setCurrent('tasks')
                            }}
                        >
                            <TasksIcon className='mx-auto mb-2 h-6' />
                            Tasks
                        </div>
                    </div>
                    <div className='relative flex-1 text-center'>
                        {current === 'profile' && <BottomNavigationCurrentPageLight />}
                        <div
                            className={cn('relative z-10 py-4 opacity-50 transition-opacity', current === 'profile' && 'opacity-100')}
                            onClick={() => {
                                hapticFeedback.selectionChanged()
                                setCurrent('profile')
                            }}
                        >
                            <UserIcon className='mx-auto mb-2 h-6' />
                            Profile
                        </div>
                    </div>
                </div>
                <div className='h-(--content-safe-inset-bottom)'></div>
            </div>
        </div>
    )
}
