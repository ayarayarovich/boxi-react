import { S_PRIVATE_AXIOS, S_PUBLIC_AXIOS } from '@/axios'
import { z } from 'zod'

const store = {
    token: '',
    telegramId: '',
}

export const login = async (payload: { initData: string }) => {
    const response = await S_PUBLIC_AXIOS.post('/api/token', {
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
    const response = await S_PRIVATE_AXIOS.post('/api/wallet', payload)
    return response.data
}

export const getMe = async () => {
    const response = await S_PRIVATE_AXIOS.get('/api/me')
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
