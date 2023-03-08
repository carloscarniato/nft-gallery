import Image from 'next/image'

type CardProps = {
    onClick: () => void;
    data: any
}

export default function Card({data, onClick}: CardProps) {
    return (
        <button onClick={onClick} type='button' className="relative w-full h-96 rounded-3xl border-0 flex justify-center">
            {
                data.image_url ? (
                    <Image
                        src={data.image_url}
                        fill
                        className="w-full object-cover rounded-3xl"
                        alt={`${data.name} Image`}
                    />
                ) : (
                    <div className='flex items-center justify-center bg-slate-200 w-[400px] h-[384px] rounded-3xl text-sm dark:bg-neutral-600 dark:text-white'>Image not available</div>
                )
            }
            <p className="absolute py-1 px-2 rounded-3xl text-base m-2.5 bg-white top-0 font-bold dark:text-white dark:bg-black">{data.name ? data.name : `#${data.token_id}`}</p>
        </button>
    )
  }
  