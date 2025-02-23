import { useCallback } from 'react'

import { ErrorRouteComponent } from '@tanstack/react-router'

const ErrorComponent: ErrorRouteComponent = (props) => {
    const sendTraceId = useCallback(() => {
        const message = `Hello! Please, check this error. Trace ID: ${props.error.message}`
        window.open(encodeURI(`https://t.me/eriko_kijay?text=${message}`), '_blank')
    }, [props.error])

    return (
        <div className='flex h-screen max-h-full flex-col items-center justify-center p-16'>
            <div className='mb-2 text-center leading-tight'>Something went wrong. Contact with administrator.</div>
            <div className='text-center text-sm opacity-50'>Trace ID: {props.error.message}</div>

            <button type='button' onClick={sendTraceId} className='mt-8 rounded-lg bg-white px-4 py-2 font-semibold text-black'>
                Contact
            </button>
        </div>
    )
}

export default ErrorComponent
