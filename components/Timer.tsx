'use client'

import { useEffect, useState } from 'react'

interface TimerProps {
  initialSeconds: number
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

export default function Timer({ initialSeconds }: TimerProps) {
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    const end = Date.now() + initialSeconds * 1000

    const id = setInterval(() => {
      const secs = Math.max(0, Math.ceil((end - Date.now()) / 1000))
      setRemaining(secs)
      if (secs === 0) clearInterval(id)
    }, 1000)

    return () => clearInterval(id)
  }, [initialSeconds])

  const minutes = pad(Math.floor(remaining / 60))
  const seconds = pad(remaining % 60)

  const digitClass =
    'inline-flex items-center justify-center w-[42px] h-[50px] bg-white/15 rounded-md text-white font-outfit text-[32px] font-bold tabular-nums max-[767px]:w-8 max-[767px]:h-10 max-[767px]:text-2xl'

  const sepClass = 'text-white text-[32px] font-bold px-1.5 max-[767px]:text-2xl max-[767px]:px-1'

  return (
    <div className="bg-timer-red rounded-[10px] p-2.5 px-3 inline-flex items-center gap-1">
      <span className={digitClass}>{minutes[0]}</span>
      <span className={digitClass}>{minutes[1]}</span>
      <span className={sepClass}>:</span>
      <span className={digitClass}>{seconds[0]}</span>
      <span className={digitClass}>{seconds[1]}</span>
    </div>
  )
}
