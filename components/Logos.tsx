export default function Logos() {
  return (
    <section className="py-7 px-4 bg-off-white">
      <ul className="flex items-center justify-center gap-12 max-[767px]:gap-6">
        {/* ABC */}
        <li className="flex items-center">
          <svg viewBox="0 0 50 50" width="50" height="50" className="h-11 w-auto max-[767px]:h-8" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="23" fill="#888" />
            <text x="25" y="32" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="16" fill="#fff">
              abc
            </text>
          </svg>
        </li>

        {/* CNN */}
        <li className="flex items-center">
          <svg viewBox="0 0 100 44" width="100" height="44" className="h-11 w-auto max-[767px]:h-8" xmlns="http://www.w3.org/2000/svg">
            <text x="50" y="34" textAnchor="middle" fontFamily="'Times New Roman',Georgia,serif" fontWeight="900" fontStyle="italic" fontSize="36" fill="#999" letterSpacing="1">
              CNN
            </text>
          </svg>
        </li>

        {/* NBC */}
        <li className="flex items-center">
          <svg viewBox="0 0 70 50" width="70" height="50" className="h-11 w-auto max-[767px]:h-8" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(35,4)">
              <path d="M0,0 L-3,-12 L3,-12Z" fill="#aaa" />
              <path d="M0,0 L-8,-10 L-2,-13Z" fill="#aaa" opacity=".85" />
              <path d="M0,0 L8,-10 L2,-13Z" fill="#aaa" opacity=".85" />
              <path d="M0,0 L-11,-6 L-7,-12Z" fill="#aaa" opacity=".7" />
              <path d="M0,0 L11,-6 L7,-12Z" fill="#aaa" opacity=".7" />
              <path d="M0,0 L-12,0 L-10,-7Z" fill="#aaa" opacity=".55" />
              <path d="M0,0 L12,0 L10,-7Z" fill="#aaa" opacity=".55" />
            </g>
            <text x="35" y="44" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="16" fill="#999">
              NBC
            </text>
          </svg>
        </li>

        {/* CBS eye */}
        <li className="flex items-center">
          <svg viewBox="0 0 50 50" width="50" height="50" className="h-11 w-auto max-[767px]:h-8" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="25" cy="25" rx="22" ry="14" fill="none" stroke="#999" strokeWidth="3" />
            <circle cx="25" cy="25" r="8" fill="#999" />
            <circle cx="25" cy="25" r="4" fill="#fff" />
          </svg>
        </li>
      </ul>
    </section>
  )
}
