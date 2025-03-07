import { S_PRIVATE_AXIOS, S_PUBLIC_AXIOS } from '@/axios'
import { z } from 'zod'

const store = {
    token: '',
    telegramId: '',
}

export const login = async (payload: { initData: string }) => {
    const response = await S_PUBLIC_AXIOS.post<unknown>('/api/token', {
        initData: payload.initData,
    })

    const data = z
        .object({
            token: z.string(),
            telegramId: z.string(),
        })
        .parse(response.data)

    store.token = data.token
    store.telegramId = data.telegramId

    return data
}

export const getToken = () => {
    return store.token
}

export const getTelegramID = () => {
    return store.telegramId
}

interface UpdateTonWalletPayload {
    wallet: string
}
export const updateTonWallet = async (payload: UpdateTonWalletPayload) => {
    const response = await S_PRIVATE_AXIOS.post<unknown>('/api/wallet', payload)
    return response.data
}

export const getMe = async () => {
    const response = await S_PRIVATE_AXIOS.get<unknown>('/api/me')
    const data = z
        .object({
            balance: z.string(),
            boxi: z.string(),
            boxi_to_ton: z.string(),
            boxi_to_usdt: z.string(),
            convert_name: z.string(),
            energy: z.string(),
            modes: z
                .object({
                    id: z.number(),
                    energy: z.number(),
                    get_boxi: z.string(),
                    get_stake: z.string(),
                    name: z.string(),
                    stake: z.string(),
                })
                .array()
                .nullish()
                .transform((v) => v ?? []),
            skin_id: z.number(),
            telegram_dd: z.string(),
            ton_adres: z.string(),
            username: z.string(),
        })
        .parse(response.data)
    return data
}

export const getPerks = async () => {
    const response = await S_PRIVATE_AXIOS.get<unknown>('/api/perks')
    const data = z
        .object({
            boxi: z.string(),
            damage_description: z.string(),
            damage_price: z.number(),
            health_description: z.string(),
            health_price: z.number(),
            max_damage: z.number(),
            max_health: z.number(),
            max_shield: z.number(),
            my_damage: z.number(),
            my_health: z.number(),
            my_shield: z.number(),
            shield_description: z.string(),
            shield_price: z.number(),
        })
        .parse(response.data)
    return data
}

interface UpgradePerkPayload {
    type: 'health' | 'shield' | 'damage'
}
export const upgradePerk = async (payload: UpgradePerkPayload) => {
    const response = await S_PRIVATE_AXIOS.post<unknown>('/api/perk/upgrade', payload)
    return response.data
}

export const getProducts = async () => {
    const response = await S_PRIVATE_AXIOS.get<unknown>('/api/products')
    console.log(response.data)
    return response.data
}
