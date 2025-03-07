import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { GameManager } from '@/game'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/')({
    component: RouteComponent,
    beforeLoad: async () => {
        const game = new GameManager({
            height: window.innerHeight,
            width: window.innerWidth,
        })
        await game.init()
        game.start()
        return {
            game,
        }
    },
})

function RouteComponent() {
    const gameContainerRef = useRef<HTMLDivElement>(null)
    const ctx = Route.useRouteContext()
    const [message, setMessage] = useState('')

    useLayoutEffect(() => {
        if (gameContainerRef.current) {
            ctx.game.render(gameContainerRef.current)
        }
    }, [ctx.game])

    useEffect(() => {
        const callback = (v: { oldSceneName: string; newSceneName: string }) => setMessage(`${v.oldSceneName} -> ${v.newSceneName}`)
        ctx.game.eventBus.on('sceneChanged', callback)
        return () => ctx.game.eventBus.off('sceneChanged', callback)
    }, [ctx.game.eventBus])

    return (
        <div className='relative'>
            <div ref={gameContainerRef}></div>

            <div className='absolute inset-x-0 bottom-1/5 text-center'>React: {message}</div>
        </div>
    )
}
