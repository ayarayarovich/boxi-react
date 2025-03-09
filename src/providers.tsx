import { ModalProvider } from '@ayarayarovich/react-modals'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

import { router } from '@/shared/router'

import { queryClient } from './shared/queries'

export function Providers() {
    return (
        <TonConnectUIProvider manifestUrl='https://boxi.ayarayarovich.ru/tonconnect-manifest.json'>
            <ModalProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ModalProvider>
        </TonConnectUIProvider>
    )
}
