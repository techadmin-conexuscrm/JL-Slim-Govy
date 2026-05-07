'use client'
import React, { useId, ReactNode, InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  placeholder: string
  error?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const Input = ({ placeholder, error, type = 'text', startIcon, endIcon, className: _cls, ...props }: InputProps) => {
  const id = useId()
  return (
    <div className="w-full font-dm-sans relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        className={`peer w-full h-[50px] rounded-[4px] border text-[14px] outline-none transition-colors bg-white
          ${startIcon ? 'pl-10' : 'pl-3'} ${endIcon ? 'pr-10' : 'pr-3'} pt-4 pb-1
          ${error ? 'border-[#D32F2F] text-[#D32F2F] focus:border-[#D32F2F]' : 'border-black text-[#111111] focus:border-blue-900 focus:border-2'}`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute transition-all duration-150 pointer-events-none bg-white px-1
          top-1/2 -translate-y-1/2 text-[14px]
          peer-focus:top-0 peer-focus:text-[11px] peer-focus:-translate-y-1/2 peer-focus:font-medium
          peer-[:not(:placeholder-shown)]:top-0
          peer-[:not(:placeholder-shown)]:text-[11px]
          peer-[:not(:placeholder-shown)]:-translate-y-1/2
          ${startIcon ? 'left-9' : 'left-3'}
          ${error ? 'text-[#D32F2F] peer-focus:text-[#D32F2F]' : 'text-black peer-focus:text-blue-900'}`}
      >
        {placeholder}
      </label>
      {startIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{startIcon}</div>}
      {endIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">{endIcon}</div>}
      {error && <p className="text-[#D32F2F] text-[12px] mt-1 text-left font-medium">{error}</p>}
    </div>
  )
}

export default Input
