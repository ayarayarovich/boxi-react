import { ComponentType } from 'react'

import { useModal } from '@/lib/ayarayarovich-modals'

import { default as ErrorModalComponent, type Data as ErrorModalData } from './error-modal'
import { default as MessageModalComponent, type Data as MessageModalData } from './message-modal'
import { default as PlayModeInfoModalComponent, type Data as PlayModeInfoModalData } from './play-mode-info-modal'
import { default as ShopPerkInfoModalComponent, type Data as ShopPerkInfoModalData } from './shop-perk-info-modal'

const createModalHook = <TData>(component: ComponentType) => {
    return () => {
        const modal = useModal(component)
        return {
            open: modal.open<TData>,
            close: modal.close,
        }
    }
}

export const PlayModeInfoModal = {
    Component: PlayModeInfoModalComponent,
    use: createModalHook<PlayModeInfoModalData>(PlayModeInfoModalComponent),
}
export const ShopPerkInfoModal = {
    Component: ShopPerkInfoModalComponent,
    use: createModalHook<ShopPerkInfoModalData>(ShopPerkInfoModalComponent),
}

export const ErrorModal = {
    Component: ErrorModalComponent,
    use: createModalHook<ErrorModalData>(ErrorModalComponent),
}

export const MessageModal = {
    Component: MessageModalComponent,
    use: createModalHook<MessageModalData>(MessageModalComponent),
}
