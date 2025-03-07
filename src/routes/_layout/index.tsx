import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { hapticFeedback } from '@telegram-apps/sdk-react'
import { TonConnectButton } from '@tonconnect/ui-react'
import { motion } from 'motion/react'

import { Button } from '@/shared/components/ui'
import { PlayModeInfoModal } from '@/shared/modals'
import Queries from '@/shared/queries'
import { CLICK_SOUND } from '@/shared/sounds'

import { FlashIcon, GloveIcon, InfoIcon, ShareIcon, TonIcon } from '@/lib/icons'
import { cn, preloadImages } from '@/lib/utils'

export const Route = createFileRoute('/_layout/')({
    component: RouteComponent,
    loader: async () => {
        await Promise.all([preloadImages(['/tyson-breathing.gif'])])
    },
})

function RouteComponent() {
    const playModeInfoModal = PlayModeInfoModal.use()
    const navigate = Route.useNavigate()

    const meQuery = useSuspenseQuery(Queries.me.self)

    return (
        <div className='relative flex h-full flex-col gap-4 pt-2 pb-5'>
            <div className='absolute top-[35%] right-0 -z-10 aspect-square w-full -translate-y-1/2 translate-x-2/5 rounded-full bg-white/5'></div>
            <img
                className='absolute top-2 right-0 -z-10 h-[80%] max-w-none translate-x-2/5'
                src='/tyson-breathing.gif'
                style={{
                    maskImage: 'linear-gradient(black 80%, transparent)',
                }}
                alt=''
            />

            <div className='px-5'>
                <TonConnectButton className='mb-6' />
                <div className='mb-4 flex items-center font-semibold'>
                    <GloveIcon className='mr-2 size-[1.25em]' />
                    <p>
                        {meQuery.data.boxi} $BOXI <span className='font-normal opacity-30'>≈ {meQuery.data.boxi_to_usdt} USDT</span>
                    </p>
                </div>
                <div className='mb-4 flex items-center font-semibold'>
                    <FlashIcon className='text-yellow mr-2 size-[1.25em]' />
                    <p>
                        {meQuery.data.energy} <span className='font-normal opacity-30'>Energy</span>
                    </p>
                </div>
                <div className='mb-4 flex items-center font-semibold'>
                    <TonIcon className='mr-2 size-[1.25em]' />
                    <p>
                        {meQuery.data.boxi_to_ton} <span className='font-normal opacity-30'>TON</span>
                    </p>
                </div>
            </div>

            <div className='grow'></div>
            <div className='px-5 text-5xl font-semibold'>
                CHOOSE <br /> MODE
            </div>
            <div
                className={cn(
                    'scrollbar-hide flex w-full snap-x snap-mandatory snap-always items-stretch overflow-x-auto',
                    '*:shrink-0 *:basis-[calc(70vw+1.25rem)] *:snap-start *:pl-5 *:last:pr-5',
                )}
            >
                <div>
                    <div className='flex h-full w-full flex-col items-stretch overflow-hidden rounded-2xl'>
                        <div className='bg-red flex-1 p-4'>
                            <div className='mb-6 flex items-start justify-between gap-5'>
                                <div className='text-xl leading-tight font-semibold uppercase'>
                                    High <br /> stake
                                </div>
                                <Button
                                    className='-translate-y-2 translate-x-2 p-2'
                                    type='button'
                                    onClick={() => {
                                        playModeInfoModal.open({ type: 'high-stake' })
                                    }}
                                >
                                    <InfoIcon className='h-5' />
                                </Button>
                            </div>
                            <div>
                                <div className='flex items-center gap-1.5 font-semibold'>
                                    <TonIcon className='h-[1.25em] shrink-0 grow-0' />
                                    <span>1.5</span>
                                </div>
                            </div>
                        </div>
                        <div className='text-dark flex items-stretch bg-white'>
                            <motion.button
                                className='flex flex-1 items-center justify-center p-4 font-semibold'
                                type='button'
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() => {
                                    CLICK_SOUND.play()
                                    hapticFeedback.impactOccurred('soft')
                                    navigate({ to: '/game' })
                                }}
                            >
                                <span className='mr-2'>Play</span>
                                <FlashIcon className='text-yellow mr-1 h-[1.5em]' />
                                <span>1</span>
                            </motion.button>
                            <div className='my-3 w-px shrink-0 grow-0 bg-black/10'></div>
                            <motion.button
                                className='flex flex-1 items-center justify-center p-4 font-semibold'
                                type='button'
                                whileTap={{
                                    scale: 0.9,
                                }}
                                onClick={() => {
                                    CLICK_SOUND.play()
                                    hapticFeedback.impactOccurred('soft')
                                }}
                            >
                                <span className='mr-2'>Invite</span>
                                <ShareIcon className='text-red h-[1.5em]' />
                            </motion.button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='bg-dark-elevated/50 flex h-full flex-col items-stretch overflow-hidden rounded-2xl border border-[#292929] backdrop-blur-xl'>
                        <div className='flex-1 p-4'>
                            <div className='flex items-start justify-between gap-5'>
                                <div className='text-xl leading-tight font-semibold uppercase'>
                                    Low <br /> stake
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
