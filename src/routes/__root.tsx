import { useEffect } from 'react'

import { createRootRouteWithContext } from '@tanstack/react-router'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { AnimatePresence } from 'motion/react'

import AnimatedOutlet from '@/shared/components/animated-outlet'
import { PlayModeInfoModal, ShopPerkInfoModal } from '@/shared/modals'
import { MyRouterContext } from '@/shared/router'

import { ModalProvider, ModalRenderer } from '@/lib/ayarayarovich-modals'

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootComponent,
})

function AnimatedPresence({ children }: React.PropsWithChildren) {
    return <AnimatePresence mode='wait'>{children}</AnimatePresence>
}

function RootComponent() {
    const [tonConnectUI] = useTonConnectUI()
    useEffect(() => {
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            console.log(wallet)
        })
        return () => unsubscribe()
    }, [])

    return (
        <>
            <ModalProvider>
                <AnimatedOutlet />
                <ModalRenderer
                    key='PlayModeInfoModal.Component'
                    Component={PlayModeInfoModal.Component}
                    ComponentWrapper={AnimatedPresence}
                />
                <ModalRenderer
                    key='ShopPerkInfoModal.Component'
                    Component={ShopPerkInfoModal.Component}
                    ComponentWrapper={AnimatedPresence}
                />
            </ModalProvider>
        </>
    )
}
