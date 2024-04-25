import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    error,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-100'>
        {label && <label htmlFor={id} className=''>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg w-100 ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <p 
            className='inline-block mt-1 mb-0 text-danger' 
            htmlFor={id}>
                {error}
            </p>
            }
    </div>
  )
}

export default React.forwardRef(Select)