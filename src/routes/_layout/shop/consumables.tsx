import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/shop/consumables')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className='px-5'>consumables</div>
}
