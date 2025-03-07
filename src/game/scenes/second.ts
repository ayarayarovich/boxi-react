import * as pixi from 'pixi.js'

import { Scene } from '../lib'
import { MainScene } from './main'

export class SecondScene extends Scene {
    container = new pixi.Container()

    gameState = {
        speed: 0,
    }

    async onStart(container: pixi.Container) {
        this.container = container

        const bgRect = new pixi.Graphics()
        bgRect.rect(0, 0, this.width, this.height)
        bgRect.fill(0xff0000)

        const sceneLabel = new pixi.Text({ text: 'Second Scene' })
        sceneLabel.anchor.set(0.5)
        sceneLabel.x = this.manager.options.width / 2
        sceneLabel.y = 200

        const texture = await pixi.Assets.load('https://pixijs.com/assets/bunny.png')
        const bunny = new pixi.Sprite(texture)
        bunny.label = 'bunny'
        bunny.anchor.set(0.5)
        bunny.scale.set(4, 4)
        bunny.x = this.width / 2
        bunny.y = this.height / 2

        bunny.eventMode = 'static'
        bunny.cursor = 'pointer'
        bunny.on('pointerdown', this.onClick.bind(this))

        this.container.addChild(bgRect)
        this.container.addChild(sceneLabel)
        this.container.addChild(bunny)
    }

    onClick() {
        const newScene = new MainScene(this.manager)
        this.manager.changeScene(newScene)
        this.manager.eventBus.emit('sceneChanged', {
            oldSceneName: this.constructor.name,
            newSceneName: newScene.constructor.name,
        })
    }

    onUpdate(ticker: pixi.Ticker) {
        const bunny = this.container.getChildByLabel('bunny')
        if (!bunny) {
            return
        }
        if (this.gameState.speed < 1) {
            this.gameState.speed += 0.01
        }
        bunny.rotation += (ticker.deltaTime / 10) * this.gameState.speed
    }

    onFinish() {}
}
