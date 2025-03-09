import { createModal } from '@ayarayarovich/react-modals'

import { default as ErrorModalComponent, type Data as ErrorModalData } from './error-modal'
import { default as MessageModalComponent, type Data as MessageModalData } from './message-modal'
import { default as PlayModeInfoModalComponent, type Data as PlayModeInfoModalData } from './play-mode-info-modal'
import { default as ShopPerkInfoModalComponent, type Data as ShopPerkInfoModalData } from './shop-perk-info-modal'

export const PlayModeInfoModal = createModal<PlayModeInfoModalData>(PlayModeInfoModalComponent)
export const ShopPerkInfoModal = createModal<ShopPerkInfoModalData>(ShopPerkInfoModalComponent)
export const ErrorModal = createModal<ErrorModalData>(ErrorModalComponent)
export const MessageModal = createModal<MessageModalData>(MessageModalComponent)
