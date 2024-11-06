import React from "react"

const AudioWave = ({ ...props }: React.HTMLAttributes<SVGSVGElement>) => {
  const styles = {
    line: {
      opacity: 0,
      animation: "soundWave 1s infinite ease-in-out",
      transformOrigin: "center",
    },
    line1: { animationDelay: "0s" },
    line2: { animationDelay: "0.1s" },
    line3: { animationDelay: "0.2s" },
    line4: { animationDelay: "0.3s" },
    line5: { animationDelay: "0.4s" },
    line6: { animationDelay: "0.5s" },
  }

  return (
    <>
      <style>
        {`
          @keyframes soundWave {
            0%, 100% {
              opacity: 0;
              transform: scaleY(0.5);
            }
            50% {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        `}
      </style>
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='audio-wave'>
        <path
          d='M2 10v3'
          style={{ ...styles.line, ...styles.line1 }}
        />
        <path
          d='M6 6v11'
          style={{ ...styles.line, ...styles.line2 }}
        />
        <path
          d='M10 3v18'
          style={{ ...styles.line, ...styles.line3 }}
        />
        <path
          d='M14 8v7'
          style={{ ...styles.line, ...styles.line4 }}
        />
        <path
          d='M18 5v13'
          style={{ ...styles.line, ...styles.line5 }}
        />
        <path
          d='M22 10v3'
          style={{ ...styles.line, ...styles.line6 }}
        />
      </svg>
    </>
  )
}

export default AudioWave
