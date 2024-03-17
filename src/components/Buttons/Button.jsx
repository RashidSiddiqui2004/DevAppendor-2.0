
import React from 'react'

const Button = ({message}) => {
    return (
        <div className="hidden lg:ml-8 lg:flex">
            <div className="flex items-center bg-slate-900 px-3 py-2 rounded-md shadow-md shadow-purple-200">
                <span>
                    {message}
                </span>
            </div>
        </div>
    )
}

export default Button