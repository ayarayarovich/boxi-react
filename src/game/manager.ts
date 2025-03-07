import mitt, { Emitter } from 'mitt'
import * as pixi from 'pixi.js'

import { Scene } from './lib/scene'
import { MainScene } from './scenes/main'

type Events = {
    sceneChanged: {
        oldSceneName: string
        newSceneName: string
    }
}

interface GameManagerOptions {
    width: number
    height: number
}

type GameManagerConstructorOptions = Partial<Pick<GameManagerOptions, 'height' | 'width'>>

export class GameManager {
    app: pixi.Application
    initialized: boolean
    options: GameManagerOptions
    eventBus: Emitter<Events>

    currentScene: Scene | undefined

    constructor(options: GameManagerConstructorOptions) {
        this.initialized = false
        this.options = {
            height: options.height ?? window.innerHeight,
            width: options.width ?? window.innerWidth,
        }
        this.app = new pixi.Application()
        this.eventBus = mitt<Events>()
    }

    async init() {
        await this.app.init({
            width: this.options.width,
            height: this.options.height,
            autoDensity: true,
            resolution: window.devicePixelRatio || 1,
            background: 0x0,
        })

        this.initialized = true
    }

    async start() {
        this.app.ticker.add(this.loop.bind(this))

        this.changeScene(new MainScene(this))
    }

    async changeScene(newScene: Scene) {
        if (this.currentScene != undefined) {
            await this.currentScene.onFinish()
            this.app.stage.removeChildren()
        }

        const container = new pixi.Container()
        await newScene.onStart(container)
        this.app.stage.addChild(container)
        this.currentScene = newScene
    }

    loop(ticker: pixi.Ticker) {
        if (this.currentScene != undefined) {
            this.currentScene.onUpdate(ticker)
        }
    }

    render(renderTo: HTMLElement) {
        if (!this.initialized) {
            throw new Error('pixi.Application is not initialized.')
        }
        renderTo.innerHTML = ''
        renderTo.appendChild(this.app.canvas)
    }
}
