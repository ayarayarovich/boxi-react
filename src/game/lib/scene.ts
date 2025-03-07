import * as pixi from 'pixi.js'

import { GameManager } from '../manager'

export abstract class Scene {
    manager: GameManager

    width: number
    height: number

    constructor(manager: GameManager) {
        this.manager = manager
        this.width = this.manager.options.width
        this.height = this.manager.options.height
    }
    abstract onStart(container: pixi.Container): void | Promise<void>
    abstract onUpdate(ticker: pixi.Ticker): void
    abstract onFinish(): void | Promise<void>
}
