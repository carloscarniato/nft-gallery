import { useState } from "react"
import Loader from "./loader";
import Image from 'next/image'

type ImageWithLoaderProps = {
    src: string;
    alt: string;
}
export default function ImageWithLoader({src, alt}: ImageWithLoaderProps) {
    const [loading, setIsLoading] = useState(true);

    return (
        <div className="w-full h-full">
            {loading ? <Loader className="relative flex items-center justify-center bg-slate-200 dark:bg-neutral-600 rounded-3xl w-full h-full z-20"/> : null}
            <Image
                src={src}
                fill
                className="w-full object-cover rounded-3xl"
                alt={alt}
                onLoadingComplete={() => setIsLoading(false)}
            />
        </div>
    )
  }
  