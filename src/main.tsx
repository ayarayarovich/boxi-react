import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { Providers } from '@/providers'
import { init, postEvent, swipeBehavior, viewport } from '@telegram-apps/sdk-react'

import { UserService } from '@/shared/services'

import { stopOverscroll } from '@/lib/utils'

import UserData from './user-data'

stopOverscroll()

const run = async () => {
    init()
    UserData.init()

    const loginPromise = UserService.login({ initData: UserData.getInitData() })

    if (viewport.mount.isAvailable()) {
        await viewport.mount()
    }
    if (swipeBehavior.mount.isAvailable()) {
        swipeBehavior.mount()
    }

    try {
        postEvent('web_app_set_background_color', { color: '#000000' })
        postEvent('web_app_set_header_color', { color: '#000000' })
        postEvent('web_app_toggle_orientation_lock', { locked: true })
    } catch (error) {
        console.log(error)
    }

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

    await loginPromise

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Providers />
        </StrictMode>,
    )
}

run()
