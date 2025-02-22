import { parseInitDataQuery, retrieveRawInitData } from '@telegram-apps/sdk-react'

let INIT_DATA = ''
let USER_DATA: ReturnType<typeof parseInitDataQuery> | null = null

const init = () => {
    INIT_DATA = retrieveRawInitData() || ''
    if (!INIT_DATA) {
        alert('Init data is missing')
        throw new Error('init data is missing')
    }
    USER_DATA = parseInitDataQuery(INIT_DATA) as never
}

const getUser = () => {
    if (!USER_DATA) {
        throw new Error('USER DATA IS MISSING')
    }
    return USER_DATA
}

const getInitData = () => {
    if (!INIT_DATA) {
        throw new Error('INIT DATA IS MISSING')
    }
    return INIT_DATA
}

const UserData = {
    init,
    getUser,
    getInitData,
}

export default UserData
