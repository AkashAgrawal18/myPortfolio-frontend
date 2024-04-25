import React, {useId} from 'react'
const InputCheck = React.forwardRef( function Input({
    label,
    type = "checkbox",
    className = "",
    error,
    ...props
}, ref){
    const id = useId()
    return (
        <div className='d-flex'>
           
            <input
            type={type}
            className={`me-2 d-block ${className}`}
            ref={ref}
            {...props}
            id={id}
            style={{width:"18px"}}
            />
             {label && <label 
            className='inline-block' 
            htmlFor={id}>
                {label}
            </label>
            }
           {error && <p 
            className='inline-block mt-1 mb-0 text-danger' 
            htmlFor={id}>
                {error}
            </p>
            }
        </div>
    )
})

export default InputCheck