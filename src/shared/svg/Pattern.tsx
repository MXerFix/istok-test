
type Props = {
  fill?: string
  className?: string
}

export const Pattern = ({ fill = "#ebebeb", className }: Props) => {
  return (
    <svg
      className={className}
      width='663'
      height='663'
      viewBox='0 0 663 663'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0 220.423L0 412.904C0 446.641 32.8565 470.585 64.9404 460.229L497.38 320.623L101.442 663L419.063 663C430.862 663 442.276 658.798 451.262 651.145L641.141 489.447C655.009 477.639 663 460.334 663 442.11V217.298C663 180.434 624.326 156.388 591.303 172.717L45.0285 442.864L555.864 0H243.899C232.123 0 220.729 4.18683 211.75 11.8113L21.9214 173.031C8.01588 184.841 0 202.17 0 220.423Z'
        fill={fill}
      />
    </svg>
  )
}
