import React from 'react'

const GenderCheckbox = () => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className={`label gap-2 cursour-pointer`}>
                    <span className='label-text  text-gray-200'>Male</span>
                    <input type='checkbox' className='checkbox' border-slate-900></input>
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursour-pointer`}>
                    <span className='label-text  text-gray-200'>Female</span>
                    <input type='checkbox' className='checkbox' border-slate-900></input>
                </label>
            </div>
        </div>
    )
}


export default GenderCheckbox