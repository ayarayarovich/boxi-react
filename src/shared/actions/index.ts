import { useIsMutating, useMutation } from '@tanstack/react-query'

import { queryClient } from '@/shared/queries'
import { UserService } from '@/shared/services'

import { ErrorModal } from '../modals'

export const useUpgradePerkAction = (type: 'health' | 'shield' | 'damage') => {
    const mutationKey = ['action', 'upgrade-perk', type]
    const errorModal = ErrorModal.use()

    const mutation = useMutation({
        mutationKey,
        mutationFn: () =>
            UserService.upgradePerk({
                type,
            }),
        onSettled: () => queryClient.invalidateQueries(),
        onError: (error) => {
            errorModal.open({ traceId: error.message })
        },
    })
    const isMutating = !!useIsMutating({ mutationKey })

    return {
        mutation,
        isMutating,
    }
}
