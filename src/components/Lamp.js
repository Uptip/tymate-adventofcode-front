import React from 'react';

const Lamp = props => (
  <svg
    width={22}
    height={50}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <title>{`Artboard`}</title>
    <defs>
      <path
        d="M24.663 3.607l-2.857-1.694L18.95.218S-3.757 5.665 1.717 34.16a1.094 1.094 0 0 0 1.424.846c27.63-8.86 21.522-31.399 21.522-31.399"
        id="a"
      />
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
        <stop stopColor="#F5515F" offset="0%" />
        <stop stopColor="#9F041B" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="rotate(-31 33.277 26.196)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <use fill="#EAEAEA" xlinkHref="#a" />
        <g mask="url(#b)" fill="url(#c)" fillRule="nonzero">
          <path d="M-6-4h42v42H-6z" />
        </g>
      </g>
      <path
        d="M14.259 11.27l-2.242.013c3.71 6.13 7.785 18.464-5.236 33.533a47.219 47.219 0 0 0 3.545 4.461c.451.504 1.212.5 1.656-.009C31.102 27.443 14.26 11.27 14.26 11.27"
        fillOpacity={0.05}
        fill="#000"
      />
      <path
        d="M7.725 14.144c-2.602 4.075-5.788 11.533-2.828 20.952l2.828-20.952z"
        fillOpacity={0.4}
        fill="#FFF"
      />
      <path
        d="M6.772 4.987l-.019-3.249A1.17 1.17 0 0 1 7.913.565l6.34-.037a1.17 1.17 0 0 1 1.172 1.16l.02 3.355h.08c.913.007 1.67.768 1.688 1.69l.1 5.576a1.626 1.626 0 0 1-1.628 1.67l-9.003-.06c-.91-.006-1.67-.767-1.686-1.69l-.1-5.576a1.624 1.624 0 0 1 1.628-1.668l.248.002z"
        fill="#000"
      />
    </g>
  </svg>
)

export default SvgComponent
)
