import * as React from 'react'
import { ModalProvider, ModalRenderer } from 'react-modal-state'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'

import PlayModeInfoModal from '@/shared/modals/play-mode-info-modal'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            <ModalProvider>
                <Outlet />
                <AnimatePresence mode='wait'>
                    <ModalRenderer key='PlayModeInfoModal' Component={PlayModeInfoModal} />
                </AnimatePresence>
            </ModalProvider>
        </React.Fragment>
    )
}
