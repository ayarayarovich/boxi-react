import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

import { AnimatePresence, motion } from 'motion/react'

import { useModalInstance } from '@/lib/ayarayarovich-modals'
import { CrossIcon, GloveIcon } from '@/lib/icons'

const MotionModal = motion.create(Modal)
const MotionModalOverlay = motion.create(ModalOverlay)

export interface Data {
    type: 'attack' | 'max-health' | 'shield'
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
                                                            className='relative z-10 h-1.5'
                                                            style={{
                                                                backgroundColor: data.color,
                                                                width: (data.progress.current / data.progress.max) * 100 + '%',
                                                            }}
                                                        ></div>
                                                        <div
                                                            className='absolute top-0 left-0 h-1.5 blur-md'
                                                            style={{
                                                                backgroundColor: data.color,
                                                                width: (data.progress.current / data.progress.max) * 100 + '%',
                                                            }}
                                                        ></div>
                                                        <div className='absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-white/30'></div>
                                                    </div>
                                                    <p>
                                                        <span className='font-semibold' style={{ color: data.color }}>
                                                            {data.progress.current}
                                                        </span>{' '}
                                                        <span className='opacity-30'>points out of {data.progress.max}</span>
                                                    </p>
                                                </div>

                                                <button
                                                    type='button'
                                                    className='flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-black'
                                                >
                                                    {data.currency === 'boxi' && <GloveIcon className='h-[1.5em]' />}
                                                    {data.price}
                                                </button>
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
