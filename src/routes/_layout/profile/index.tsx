import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import Queries from '@/shared/queries'

export const Route = createFileRoute('/_layout/profile/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        await Promise.all([context.qc.prefetchQuery(Queries.me.self)])
    },
})

function RouteComponent() {
    const meQuery = useSuspenseQuery(Queries.me.self)

    return <div className='relative flex h-full flex-col items-stretch gap-4 px-5'>{JSON.stringify(meQuery.data)}</div>
}
