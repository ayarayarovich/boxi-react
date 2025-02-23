import { useEffect } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { AnimatePresence } from 'motion/react'

import AnimatedOutlet from '@/shared/components/animated-outlet'
import { ErrorModal, MessageModal, PlayModeInfoModal, ShopPerkInfoModal } from '@/shared/modals'
import { MyRouterContext } from '@/shared/router'
import { UserService } from '@/shared/services'

import { ModalRenderer } from '@/lib/ayarayarovich-modals'

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootComponent,
})

function AnimatedPresence({ children }: React.PropsWithChildren) {
    return <AnimatePresence mode='wait'>{children}</AnimatePresence>
}

function RootComponent() {
    const qc = useQueryClient()
    const errorModal = ErrorModal.use()
    const [tonConnectUI] = useTonConnectUI()

    const updateTonWallet = useMutation({
        mutationFn: UserService.updateTonWallet,
        onSuccess: () => qc.invalidateQueries(),
        onError: async (err) => {
            errorModal.open({ traceId: err.message })
            await tonConnectUI.disconnect()
        },
    })

    useEffect(() => {
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                updateTonWallet.mutate({ wallet: wallet.account.address })
            }
        })
        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <AnimatedOutlet />
            <ModalRenderer key='PlayModeInfoModal.Component' Component={PlayModeInfoModal.Component} ComponentWrapper={AnimatedPresence} />
            <ModalRenderer key='ShopPerkInfoModal.Component' Component={ShopPerkInfoModal.Component} ComponentWrapper={AnimatedPresence} />
            <ModalRenderer key='ErrorModal.Component' Component={ErrorModal.Component} ComponentWrapper={AnimatedPresence} />
            <ModalRenderer key='MessageModal.Component' Component={MessageModal.Component} ComponentWrapper={AnimatedPresence} />
        </>
    )
}
