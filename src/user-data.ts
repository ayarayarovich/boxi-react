import { parseInitDataQuery, requestContentSafeAreaInsets, requestSafeAreaInsets, retrieveRawInitData } from '@telegram-apps/sdk-react'

let INIT_DATA = ''
let USER_DATA: ReturnType<typeof parseInitDataQuery> | null = null
const SAFE_AREA = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
}

const init = () => {
    INIT_DATA = retrieveRawInitData() || ''
    if (!INIT_DATA) {
        alert('Init data is missing')
        throw new Error('init data is missing')
    }
    USER_DATA = parseInitDataQuery(INIT_DATA) as never
}

const computeSafeArea = async () => {
    const sa = await requestSafeAreaInsets()
    const csa = await requestContentSafeAreaInsets()
    SAFE_AREA.top = sa.top + csa.top
    SAFE_AREA.bottom = sa.bottom + csa.bottom
    SAFE_AREA.left = sa.left + csa.left
    SAFE_AREA.right = sa.right + csa.right
}

const getSafeArea = () => {
    return SAFE_AREA
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
    computeSafeArea,
    getSafeArea,
}

export default UserData
