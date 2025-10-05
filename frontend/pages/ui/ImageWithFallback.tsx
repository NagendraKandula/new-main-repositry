import React, { useState } from 'react'
import type { StaticImageData } from 'next/image'

const ERROR_IMG_SRC = 'data:image/svg+xml;base64,...'

interface ImageWithFallbackProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | StaticImageData
}

export function ImageWithFallback({ src, alt, style, className, ...rest }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => setDidError(true)

  const resolvedSrc = typeof src === 'string' ? src : src.src

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={resolvedSrc} />
      </div>
    </div>
  ) : (
    <img src={resolvedSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
