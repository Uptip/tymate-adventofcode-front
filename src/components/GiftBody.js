import React from 'react';

const SvgComponent = props => (
  <svg width={164} height={90} {...props}>
    <title>{'gift-body'}</title>
    <defs>
      <path id="prefix__a" d="M17-74h143V90H17z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M138.852 8.971L123.4 3.29c-.477-.193-1.05-.289-1.622-.289H22.77C20.1 3 18 5.118 18 7.815v67.739C18 83.547 24.39 90 32.308 90h95.384C135.61 90 142 83.547 142 75.554V13.497c0-2.022-1.24-3.852-3.148-4.526"
        fill="#D42E52"
      />
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <path
        d="M142 3.289v72.265C142 83.547 135.61 90 127.692 90H80V3h56.851C140.716 3 142 4.755 142 9.282"
        fill="#B31244"
        mask="url(#prefix__b)"
      />
      <path fill="#F0AA3D" mask="url(#prefix__b)" d="M66 90h29V3H66z" />
      <path fill="#E9823D" mask="url(#prefix__b)" d="M80 90h14V3H80z" />
    </g>
  </svg>
);

export default SvgComponent;
