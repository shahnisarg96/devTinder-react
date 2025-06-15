import React from 'react'

const Toast = ({ message, type='success' }) => {
    return (
        <div className="toast toast-top toast-center">
            {type === 'success' && (
                <div className="alert alert-success">
                    <span>{message}</span>
                </div>
            )}
            {type === 'error' && (
                <div className='alert alert-error'>
                    <span>{message}</span>
                </div>
            )}
        </div>
    )
}

export default Toast