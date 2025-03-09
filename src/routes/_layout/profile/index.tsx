import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/shared/components/ui'
import { MessageModal } from '@/shared/modals'
import Queries from '@/shared/queries'

export const Route = createFileRoute('/_layout/profile/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        await Promise.all([context.qc.prefetchQuery(Queries.me.self)])
    },
})

function RouteComponent() {
    const messageModal = MessageModal.use()

    const onClick = async () => {
        for (let i = 1; i <= 5; ++i) {
            messageModal.open({ title: `message ${i}`, message: `text ${i}` })
        }
    }

    return (
        <div className='relative flex h-full flex-col items-stretch gap-4 px-5'>
            <Button className='text-dark rounded-lg bg-white px-4 py-2' onClick={onClick}>
                много подалок подряд (проверяем очередь)
            </Button>
        </div>
    )
}
