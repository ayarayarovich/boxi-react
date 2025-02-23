import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { animate, useMotionValue } from 'motion/react'

import { useUpgradePerkAction } from '@/shared/actions'
import { Button, MotionButton } from '@/shared/components/ui'
import { ShopPerkInfoModal } from '@/shared/modals'
import Queries from '@/shared/queries'

import { GloveIcon, InfoIcon } from '@/lib/icons'
import { cn, preloadImage } from '@/lib/utils'

export const Route = createFileRoute('/_layout/shop/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        const imagesToPreload = ['/damage.png', '/health.png', '/armour.png']
        await Promise.all([
            imagesToPreload.map((v) => preloadImage(v)),
            context.qc.prefetchQuery(Queries.me.perks),
            context.qc.prefetchQuery(Queries.me.self),
        ])
    },
})

interface PerkProps {
    previewImg: string
    name: string
    type: 'damage' | 'health' | 'shield'
    progress: {
        current: number
        max: number
    }
    details: string
    price: number
    currency: 'boxi'
    color: string
}

function Perk(props: PerkProps) {
    const shopPerkInfoModal = ShopPerkInfoModal.use()
    const upgradePerkAction = useUpgradePerkAction(props.type)

    const isMaxLevel = props.progress.current >= props.progress.max

    return (
        <div className='rounded-lg border border-[#292929] p-4' key={props.type}>
            <div className='mb-4 flex items-center gap-4'>
                <div className='relative shrink-0 grow-0'>
                    <img src={props.previewImg} className='w-13 rounded-lg' alt='' />
                    <Button
                        type='button'
                        className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 p-2'
                        onClick={() =>
                            shopPerkInfoModal.open({
                                title: props.name,
                                currency: props.currency,
                                details: props.details,
                                previewImg: props.previewImg,
                                price: props.price,
                                type: props.type,
                                progress: {
                                    current: props.progress.current,
                                    max: props.progress.max,
                                },
                                color: props.color,
                            })
                        }
                    >
                        <InfoIcon className='size-5' />
                    </Button>
                </div>
                <div className='flex grow items-center gap-2'>
                    <div>{props.name}</div>
                    <div>
                        <span className='font-semibold' style={{ color: props.color }}>
                            {props.progress.current}{' '}
                        </span>
                        <span className='text-white/30'>/ {props.progress.max}</span>
                    </div>
                </div>
                <Button
                    type='button'
                    className='relative rounded-lg bg-white px-4 py-2 leading-none font-semibold text-black'
                    onClick={() => upgradePerkAction.mutation.mutate()}
                    disabled={upgradePerkAction.isMutating || isMaxLevel}
                >
                    {isMaxLevel ? (
                        <div className='flex min-h-[1.5em] items-center justify-center'>MAX</div>
                    ) : (
                        <>
                            <div
                                className={cn(
                                    'absolute top-1/2 left-1/2 size-[1em] -translate-x-1/2 -translate-y-1/2 scale-50 animate-spin rounded-full border-2 border-t-transparent opacity-0 transition-all',
                                    upgradePerkAction.isMutating && 'scale-100 opacity-100',
                                )}
                            ></div>
                            <div
                                className={cn(
                                    'flex scale-100 items-center gap-2 transition-all',
                                    upgradePerkAction.isMutating && 'scale-50 opacity-0',
                                )}
                            >
                                <GloveIcon className='h-[1.5em]' />
                                {props.price}
                            </div>
                        </>
                    )}
                </Button>
            </div>
            <div className='relative'>
                <div
                    className='relative h-1 transition-all'
                    style={{ backgroundColor: props.color, width: (props.progress.current / props.progress.max) * 100 + '%' }}
                ></div>
                <div
                    className='absolute top-0 left-0 h-1 blur-md transition-all'
                    style={{ backgroundColor: props.color, width: (props.progress.current / props.progress.max) * 100 + '%' }}
                ></div>
                <div className='absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-white/30'></div>
            </div>
        </div>
    )
}

function RouteComponent() {
    const perksQuery = useSuspenseQuery(Queries.me.perks)
    const meQuery = useSuspenseQuery(Queries.me.self)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const items = [
        {
            previewImg: '/damage.png',
            name: 'Attack',
            type: 'damage' as const,
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
            type: 'health' as const,
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
                <Perk {...v} key={v.type} />
            ))}

            <MotionButton
                style={{
                    x,
                    y,
                }}
                whileTap={{
                    scale: 0.95,
                }}
                whileDrag={{
                    scale: 0.95,
                }}
                onDragEnd={() => {
                    animate(y, 0)
                    animate(x, 0)
                }}
                dragConstraints={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                }}
                dragElastic={{
                    bottom: 0,
                    left: 0.1,
                    right: 0.1,
                    top: 0.1,
                }}
                drag
                className='absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-[#292929] px-6 py-4'
            >
                <GloveIcon className='mr-3 size-5 shrink-0 grow-0' />
                <div className='mr-2 font-semibold'>{meQuery.data.boxi}</div>
                <div className='text-white/30'>$BOXI</div>
            </MotionButton>
        </div>
    )
}
