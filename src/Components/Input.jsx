import React, {useId} from 'react'
const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    error,
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-100'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
          
            <input
            type={type}
            className={`w-100 d-block ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
           {error && <p 
            className='inline-block mt-1 mb-0 text-danger' 
            htmlFor={id}>
                {error}
            </p>
            }
        </div>
    )
})

export default Input