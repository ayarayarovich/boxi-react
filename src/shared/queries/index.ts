import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { QueryClient } from '@tanstack/react-query'
import { ZodError } from 'zod'

import { UserService } from '@/shared/services'

const me = createQueryKeys('me', {
    self: {
        queryKey: null,
        queryFn: UserService.getMe,
    },
    perks: {
        queryKey: null,
        queryFn: UserService.getPerks,
    },
})

const Queries = mergeQueryKeys(me)

export default Queries

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 60 * 1000, // 1 hour
            retry(failureCount, error) {
                if (error instanceof ZodError) {
                    console.error('ОШИБКА ВАЛИДАЦИИ', error.errors)
                    return false
                }
                return failureCount < 2
            },
        },
    },
})
