import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { Providers } from '@/providers'
import { init, miniApp, postEvent, swipeBehavior, viewport } from '@telegram-apps/sdk-react'

import { stopOverscroll } from '@/lib/utils'

stopOverscroll()

const run = async () => {
    init()
    if (viewport.mount.isAvailable()) {
        await viewport.mount()
    }
    if (miniApp.mount.isAvailable()) {
        miniApp.mount()
    }
    if (swipeBehavior.mount.isAvailable()) {
        swipeBehavior.mount()
    }

    postEvent('web_app_toggle_orientation_lock', { locked: true })

    miniApp.setBackgroundColor.ifAvailable('#000000')

    viewport.expand.ifAvailable()
    if (viewport.requestFullscreen.isAvailable()) {
        await viewport.requestFullscreen()
    }
    if (viewport.bindCssVars.isAvailable()) {
        viewport.bindCssVars()
    }

    if (swipeBehavior.disableVertical.isAvailable()) {
        swipeBehavior.disableVertical()
    }

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Providers />
        </StrictMode>,
    )
}

run()
