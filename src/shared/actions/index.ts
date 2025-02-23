import { useIsMutating, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorModal, MessageModal } from '@/shared/modals'
import { queryClient } from '@/shared/queries'
import { UserService } from '@/shared/services'

export const useUpgradePerkAction = (type: 'health' | 'shield' | 'damage') => {
    const mutationKey = ['action', 'upgrade-perk', type]
    const errorModal = ErrorModal.use()
    const messageModal = MessageModal.use()

    const mutation = useMutation({
        mutationKey,
        mutationFn: () => UserService.upgradePerk({ type }),
        onSettled: () => queryClient.invalidateQueries(),
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.data.error === 'Not enough boxi') {
                    messageModal.open({
                        title: 'Not enough $BOXI',
                        message: "You don't have required amount of $BOXI to buy this upgrade.",
                    })
                    return
                }
            }
            errorModal.open({ traceId: error.message })
        },
    })
    const isMutating = !!useIsMutating({ mutationKey })

    return {
        mutation,
        isMutating,
    }
}
