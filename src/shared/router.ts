// Import the generated route tree
import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createMemoryHistory, createRouter } from '@tanstack/react-router'

import ErrorComponent from '@/shared/components/error-component'
import PendingComponent from '@/shared/components/pending-component'
import { queryClient } from '@/shared/queries'

const history = createMemoryHistory({ initialEntries: ['/'] })

export interface MyRouterContext {
    qc: QueryClient
}

// Create a new router instance
export const router = createRouter({
    routeTree,
    history,
    context: {
        qc: queryClient,
    },
    defaultPendingComponent: PendingComponent,
    defaultErrorComponent: ErrorComponent,
    defaultPendingMs: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
