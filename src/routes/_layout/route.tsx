import { useId, useMemo } from 'react'
import ReactHowler from 'react-howler'

import { createFileRoute, Link } from '@tanstack/react-router'
import { hapticFeedback } from '@telegram-apps/sdk-react'
import { useAtomValue } from 'jotai'
import { motion } from 'motion/react'

import { backgroundMusicAtom } from '@/shared/atoms'
import AnimatedOutlet from '@/shared/components/animated-outlet'
import Queries from '@/shared/queries'

import { PlayIcon, ShopIcon, UserIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_layout')({
    component: RouteComponent,
    loader: async ({ context }) => {
        await Promise.all([context.qc.prefetchQuery(Queries.me.self)])
    },
})

function RouteComponent() {
    const id = useId()
    const currentPageLight = useMemo(
        () => (
            <motion.div layout layoutId={id} className='pointer-events-none absolute inset-x-0 top-0 w-full'>
                <div
                    className='aspect-square w-full -translate-y-1/2 scale-150'
                    style={{
                        background: 'radial-gradient(closest-side, rgba(41,41,41,1), rgba(255,255,255,0))',
                    }}
                ></div>
            </motion.div>
        ),
        [id],
    )

    const backgroundMusicPlaying = useAtomValue(backgroundMusicAtom)

    return (
        <div className='relative h-svh pt-(--content-safe-inset-top)'>
            <ReactHowler src='/bg.mp3' loop volume={0.1} playing={backgroundMusicPlaying} />
            <div
                className='h-full overflow-hidden'
                style={{
                    paddingBottom: 'calc(var(--content-safe-inset-bottom) + 4.75rem + 1px)',
                }}
            >
                <AnimatedOutlet />
            </div>

            <div className='bg-dark-elevated absolute inset-x-0 bottom-0 overflow-hidden rounded-t-3xl border border-b-0 border-[#292929] text-xs text-[#e6e6e6]'>
                <div className='flex items-baseline justify-center leading-none'>
                    <Link to='/' className='relative flex-1 text-center' onClick={() => hapticFeedback.selectionChanged()}>
                        {({ isActive }) => (
                            <>
                                {isActive && currentPageLight}
                                <div className={cn('relative z-10 py-4 opacity-50 transition-opacity', isActive && 'opacity-100')}>
                                    <PlayIcon className='mx-auto mb-2 h-6' />
                                    Play
                                </div>
                            </>
                        )}
                    </Link>
                    <Link to='/shop' className='relative flex-1 text-center' onClick={() => hapticFeedback.selectionChanged()}>
                        {({ isActive }) => (
                            <>
                                {isActive && currentPageLight}
                                <div className={cn('relative z-10 py-4 opacity-50 transition-opacity', isActive && 'opacity-100')}>
                                    <ShopIcon className='mx-auto mb-2 h-6' />
                                    Shop
                                </div>
                            </>
                        )}
                    </Link>
                    <Link to='/profile' className='relative flex-1 text-center' onClick={() => hapticFeedback.selectionChanged()}>
                        {({ isActive }) => (
                            <>
                                {isActive && currentPageLight}
                                <div className={cn('relative z-10 py-4 opacity-50 transition-opacity', isActive && 'opacity-100')}>
                                    <UserIcon className='mx-auto mb-2 h-6' />
                                    Profile
                                </div>
                            </>
                        )}
                    </Link>
                </div>
                <div className='h-(--content-safe-inset-bottom)'></div>
            </div>
        </div>
    )
}
