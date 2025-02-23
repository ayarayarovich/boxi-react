import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { ShopPerkInfoModal } from '@/shared/modals'
import Queries from '@/shared/queries'

import { GloveIcon, InfoIcon } from '@/lib/icons'
import { preloadImage } from '@/lib/utils'

export const Route = createFileRoute('/_layout/shop/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        const imagesToPreload = ['/damage.png', '/health.png', '/armour.png']
        await Promise.all([imagesToPreload.map((v) => preloadImage(v)), context.qc.prefetchQuery(Queries.me.perks)])
    },
})

function RouteComponent() {
    const shopPerkInfoModal = ShopPerkInfoModal.use()
    const perksQuery = useSuspenseQuery(Queries.me.perks)

    const items = [
        {
            previewImg: '/damage.png',
            name: 'Attack',
            type: 'attack' as const,
            progress: {
                current: perksQuery.data.my_damage,
                max: perksQuery.data.max_damage,
            },
            details: perksQuery.data.damage_description,
            price: perksQuery.data.damage_price,
            currency: 'boxi' as const,
            color: '#A8212D',
        },
        {
            previewImg: '/health.png',
            name: 'Max Health',
            type: 'max-health' as const,
            progress: {
                current: perksQuery.data.my_health,
                max: perksQuery.data.max_health,
            },
            details: perksQuery.data.health_description,
            price: perksQuery.data.health_price,
            currency: 'boxi' as const,
            color: '#48A52B',
        },
        {
            previewImg: '/armour.png',
            type: 'shield' as const,
            name: 'Shield',
            progress: {
                current: perksQuery.data.my_shield,
                max: perksQuery.data.max_shield,
            },
            details: perksQuery.data.shield_description,
            price: perksQuery.data.shield_price,
            currency: 'boxi' as const,
            color: '#02BBFF',
        },
    ]
    return (
        <div className='relative flex h-full flex-col items-stretch gap-4 px-5'>
            {items.map((v) => (
                <div className='rounded-lg border border-[#292929] p-4'>
                    <div className='mb-4 flex items-center gap-4'>
                        <div className='relative shrink-0 grow-0'>
                            <img src={v.previewImg} className='w-13 rounded-lg' alt='' />
                            <button
                                type='button'
                                className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 p-2'
                                onClick={() =>
                                    shopPerkInfoModal.open({
                                        title: v.name,
                                        currency: v.currency,
                                        details: v.details,
                                        previewImg: v.previewImg,
                                        price: v.price,
                                        type: v.type,
                                        progress: {
                                            current: v.progress.current,
                                            max: v.progress.max,
                                        },
                                        color: v.color,
                                    })
                                }
                            >
                                <InfoIcon className='size-5' />
                            </button>
                        </div>
                        <div className='flex grow items-center gap-2'>
                            <div>{v.name}</div>
                            <div>
                                <span className='font-semibold' style={{ color: v.color }}>
                                    {v.progress.current}{' '}
                                </span>
                                <span className='text-white/30'>/ {v.progress.max}</span>
                            </div>
                        </div>
                        <button
                            type='button'
                            className='flex items-center gap-2 rounded-lg bg-white px-4 py-2 leading-none font-semibold text-black'
                        >
                            <GloveIcon />
                            {v.price}
                        </button>
                    </div>
                    <div className='relative'>
                        <div
                            className='relative h-1'
                            style={{ backgroundColor: v.color, width: (v.progress.current / v.progress.max) * 100 + '%' }}
                        ></div>
                        <div
                            className='absolute top-0 left-0 h-1 blur-md'
                            style={{ backgroundColor: v.color, width: (v.progress.current / v.progress.max) * 100 + '%' }}
                        ></div>
                        <div className='absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-white/30'></div>
                    </div>
                </div>
            ))}

            <div className='absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-[#292929] px-6 py-4'>
                <GloveIcon className='mr-3 size-5 shrink-0 grow-0' />
                <div className='mr-2 font-semibold'>{perksQuery.data.boxi}</div>
                <div className='text-white/30'>$BOXI</div>
            </div>
        </div>
    )
}
