import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import Queries from '@/shared/queries'

export const Route = createFileRoute('/_layout/profile/referrals')({
    component: RouteComponent,
    loader: async ({ context }) => {
        await Promise.all([context.qc.prefetchQuery(Queries.me.products)])
    },
})

function RouteComponent() {
    const productsQuery = useSuspenseQuery(Queries.me.products)
    return <div className='px-5'>{JSON.stringify(productsQuery.data)}</div>
}
