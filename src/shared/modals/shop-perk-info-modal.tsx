import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

import { useSuspenseQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'motion/react'

import { useUpgradePerkAction } from '@/shared/actions'
import { Button } from '@/shared/components/ui'

import { useModalInstance } from '@/lib/ayarayarovich-modals'
import { CrossIcon, GloveIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

import Queries from '../queries'

const MotionModal = motion.create(Modal)
const MotionModalOverlay = motion.create(ModalOverlay)

export interface Data {
    type: 'damage' | 'health' | 'shield'
    previewImg: string
    title: string
    details: string
    progress: {
        current: number
        max: number
    }
    price: number
    currency: 'boxi'
    color: string
}

export default function ShopPerkInfoModalComponent() {
    const { isOpen, close, data } = useModalInstance<Data>()
    const perkQuery = useSuspenseQuery({
        ...Queries.me.perks,
        select: (v) => {
            if (data.type === 'health') {
                return {
                    price: v.health_price,
                    current: v.my_health,
                    max: v.max_health,
                }
            }
            if (data.type === 'damage') {
                return {
                    price: v.damage_price,
                    current: v.my_damage,
                    max: v.max_damage,
                }
            }
            if (data.type === 'shield') {
                return {
                    price: v.shield_price,
                    current: v.my_shield,
                    max: v.max_shield,
                }
            }
            return {
                price: 0,
                current: 0,
                max: 0,
            }
        },
    })
    const upgradePerkAction = useUpgradePerkAction(data.type)
    const isMaxLevel = perkQuery.data.current >= perkQuery.data.max
    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <MotionModalOverlay
                        onOpenChange={(v) => !v && close()}
                        initial={{
                            opacity: 0,
                            backdropFilter: 'blur(0px)',
                        }}
                        animate={{
                            opacity: 1,
                            backdropFilter: 'blur(5px)',
                        }}
                        exit={{
                            opacity: 0,
                            backdropFilter: 'blur(0px)',
                            transition: {
                                duration: 0.5,
                                ease: 'easeInOut',
                            },
                        }}
                        isOpen={isOpen}
                        isDismissable
                        className='bg-dark/40 fixed inset-x-0 top-0 z-50 h-dvh overflow-hidden'
                    >
                        <div className='h-dvh w-full overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4'>
                                <MotionModal
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1.1,
                                        transition: {
                                            duration: 0.25,
                                            ease: 'easeInOut',
                                        },
                                    }}
                                    className='w-full max-lg:flex-1 lg:max-w-lg'
                                >
                                    <Dialog className='bg-dark-elevated flex w-full flex-col items-stretch gap-4 rounded-xl p-6 ring-[#292929] ring-offset-0 transition-shadow outline-none focus:ring-2'>
                                        {({ close }) => (
                                            <>
                                                <div className='relative'>
                                                    <div className='flex items-center gap-4'>
                                                        <img
                                                            src={data.previewImg}
                                                            className='size-12.5 shrink-0 grow-0 rounded-lg object-cover object-center'
                                                            alt=''
                                                        />
                                                        <h2 className='text-xl font-semibold'>{data.title}</h2>
                                                    </div>
                                                    <button className='absolute -top-4 -right-4 p-4' type='button' onClick={close}>
                                                        <CrossIcon className='h-4' />
                                                    </button>
                                                </div>

                                                <p className='opacity-30'>{data.details}</p>

                                                <div>
                                                    <div className='relative mb-2'>
                                                        <div
                                                            className='relative z-10 h-1.5 transition-all'
                                                            style={{
                                                                backgroundColor: data.color,
                                                                width: (perkQuery.data.current / perkQuery.data.max) * 100 + '%',
                                                            }}
                                                        ></div>
                                                        <div
                                                            className='absolute top-0 left-0 h-1.5 blur-md transition-all'
                                                            style={{
                                                                backgroundColor: data.color,
                                                                width: (perkQuery.data.current / perkQuery.data.max) * 100 + '%',
                                                            }}
                                                        ></div>
                                                        <div className='absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-white/30'></div>
                                                    </div>
                                                    <p>
                                                        <span className='font-semibold' style={{ color: data.color }}>
                                                            {perkQuery.data.current}
                                                        </span>{' '}
                                                        <span className='opacity-30'>points out of {perkQuery.data.max}</span>
                                                    </p>
                                                </div>

                                                <Button
                                                    type='button'
                                                    className='relative flex items-center justify-center rounded-lg bg-white px-4 py-2 leading-none font-semibold text-black'
                                                    onClick={() => upgradePerkAction.mutation.mutate()}
                                                    disabled={upgradePerkAction.isMutating || isMaxLevel}
                                                >
                                                    {isMaxLevel ? (
                                                        <div className='flex min-h-[1.5em] items-center justify-center'>MAX</div>
                                                    ) : (
                                                        <>
                                                            <div
                                                                className={cn(
                                                                    'absolute top-1/2 left-1/2 size-[1em] -translate-x-1/2 -translate-y-1/2 scale-50 animate-spin rounded-full border-2 border-t-transparent opacity-0 transition-all',
                                                                    upgradePerkAction.isMutating && 'scale-100 opacity-100',
                                                                )}
                                                            ></div>
                                                            <div
                                                                className={cn(
                                                                    'flex scale-100 items-center gap-2 transition-all',
                                                                    upgradePerkAction.isMutating && 'scale-50 opacity-0',
                                                                )}
                                                            >
                                                                <GloveIcon className='h-[1.5em]' />
                                                                {perkQuery.data.price}
                                                            </div>
                                                        </>
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                    </Dialog>
                                </MotionModal>
                            </div>
                        </div>
                    </MotionModalOverlay>
                )}
            </AnimatePresence>
        </>
    )
}
