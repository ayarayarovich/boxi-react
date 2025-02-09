import { Dialog, Modal, ModalOverlay } from 'react-aria-components'
import { useModal, useModalInstance } from 'react-modal-state'

import { motion } from 'motion/react'

const MotionModal = motion.create(Modal)
const MotionModalOverlay = motion.create(ModalOverlay)

interface Data {
    name: string
}

const PlayModeInfoModal = () => {
    const { isOpen, close, data } = useModalInstance<Data>()
    console.log(isOpen)
    return (
        <MotionModalOverlay
            onOpenChange={(v) => !v && close()}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            isOpen={isOpen}
            isDismissable
            className='bg-m1/40 fixed inset-x-0 top-0 z-50 h-dvh overflow-x-hidden'
        >
            <div className='h-dvh w-full overflow-y-auto'>
                <div className='flex min-h-full items-stretch justify-center lg:items-center lg:p-4'>
                    <MotionModal
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                        }}
                        className='w-full max-lg:flex-1 lg:max-w-lg'
                    >
                        <Dialog className='bg-dark-elevated ring-red flex h-full w-full flex-col items-stretch p-6 ring-offset-0 transition-shadow outline-none focus:ring-2 lg:rounded-xl'>
                            {({ close }) => (
                                <div className='bg-amber-200 p-16' onClick={close}>
                                    salam, {data.name}
                                </div>
                            )}
                        </Dialog>
                    </MotionModal>
                </div>
            </div>
        </MotionModalOverlay>
    )
}

export const usePlayModeInfoModal = () => {
    const modal = useModal(PlayModeInfoModal)
    return {
        open: modal.open<Data>,
        close: modal.close,
    }
}

export default PlayModeInfoModal
