
import React from 'react'
import RenderHTMLContent from './../utils/RenderHTMLContent'

const FormPreview = ({ title, description }) => {
    return (
        <div>
            <h1 className='text-2xl font-bold mt-3 '>{title}</h1>

            {/* {loading && <Loader />} */}

            <div className='mx-5'>
            {description ?
                <div className='my-4 px-3 py-2 font-semibold'>
                    <RenderHTMLContent htmlContent={description} />
                </div> : ""}
            </div>

        </div>
    )
}

export default FormPreview