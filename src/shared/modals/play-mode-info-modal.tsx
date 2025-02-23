import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/shared/components/ui'

import { useModalInstance } from '@/lib/ayarayarovich-modals'
import { CrossIcon, FlashIcon, GloveIcon, TonIcon } from '@/lib/icons'

const MotionModal = motion.create(Modal)
const MotionModalOverlay = motion.create(ModalOverlay)

export interface Data {
    type: 'high-stake' | 'low-stake'
}

export default function PlayModeInfoModalComponent() {
    const { isOpen, close } = useModalInstance<Data>()
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
                                    <Dialog className='bg-dark-elevated flex w-full flex-col items-stretch rounded-xl p-6 ring-[#292929] ring-offset-0 transition-shadow outline-none focus:ring-2'>
                                        {({ close }) => (
                                            <>
                                                <div className='relative mb-8'>
                                                    <h2 className='text-center text-xl font-semibold'>High Stake</h2>
                                                    <button className='absolute -top-4 -right-4 p-4' type='button' onClick={close}>
                                                        <CrossIcon className='h-4' />
                                                    </button>
                                                </div>

                                                <div className='mb-8 grid grid-cols-3 gap-x-6 gap-y-2'>
                                                    <div className='text-end opacity-30'>Your bet:</div>
                                                    <div className='flex items-center gap-2'>
                                                        <TonIcon className='h-[1.5em]' />
                                                        <span className='font-semibold'>1.5</span>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <FlashIcon className='text-yellow h-[1.5em]' />
                                                        <span className='font-semibold'>1</span>
                                                    </div>

                                                    <div className='text-end opacity-30'>You can get:</div>
                                                    <div className='flex items-center gap-2'>
                                                        <TonIcon className='h-[1.5em]' />
                                                        <span className='font-semibold'>1.5M</span>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <GloveIcon className='h-[1.5em]' />
                                                        <span className='font-semibold'>1.4M</span>
                                                    </div>
                                                </div>

                                                <Button type='button' className='rounded-lg bg-white px-4 py-2 font-semibold text-black'>
                                                    Play
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
