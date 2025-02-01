import { RouterProvider } from '@tanstack/react-router'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

import { router } from '@/shared/router'

export function Providers() {
    return (
        <TonConnectUIProvider manifestUrl='https://boxi.ayarayarovich.ru/tonconnect-manifest.json'>
            <RouterProvider router={router} />
        </TonConnectUIProvider>
    )
}
