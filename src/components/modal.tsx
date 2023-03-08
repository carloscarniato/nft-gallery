import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction } from 'react'
import Image from 'next/image'

type ModalProps = {
    wallet: string;
    modalData: any;
    setModalData: Dispatch<SetStateAction<undefined>>;
}

export default function Modal({wallet, modalData, setModalData}: ModalProps) {
    if (!modalData) {
        return null;
    }
    return (
        <>
        <Transition appear show={!!modalData} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setModalData(undefined)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex w-full min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-[500px] lg:max-w-[1000px] lg:max-h-[500px] flex flex-col lg:flex-row rounded-3xl bg-white shadow-xl transition-all font-airbnb dark:bg-black dark:text-white" style={{wordBreak: "break-word"}}>
                        <button type='button' onClick={() => setModalData(undefined)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 128 128"
                                width={64}
                                height={64}
                                className="absolute top-2 right-2 w-8 h-8 stroke-slate-400 fill-slate-400"
                            >
                                <path d="M64 6c-15.5 0-30.1 6-41 17C12 33.9 6 48.5 6 64s6 30.1 17 41c11 11 25.5 17 41 17s30.1-6 41-17c11-11 17-25.5 17-41s-6-30.1-17-41C94.1 12 79.5 6 64 6zm0 6c13.9 0 26.9 5.4 36.8 15.2C110.7 37 116 50.1 116 64c0 13.9-5.4 26.9-15.2 36.8C90.9 110.6 77.9 116 64 116c-13.9 0-26.9-5.4-36.8-15.2C17.3 91 12 77.9 12 64c0-13.9 5.4-26.9 15.2-36.8C37 17.3 50.1 12 64 12zM50.562 47.5c-.762 0-1.512.3-2.062.9-1.2 1.2-1.2 3.1 0 4.2L59.8 64 48.4 75.3c-1.2 1.2-1.2 3.1 0 4.2.6.6 1.4.9 2.1.9.7 0 1.5-.3 2.1-.9L64 68.2l11.3 11.3c.6.6 1.4.9 2.1.9.7 0 1.5-.3 2.1-.9 1.2-1.2 1.2-3.1 0-4.2L68.2 64l11.3-11.3c1.2-1.2 1.2-3.1.1-4.3-1.2-1.2-3.1-1.2-4.2 0L64 59.8 52.7 48.4c-.6-.6-1.375-.9-2.138-.9z" />
                            </svg>
                        </button>

                        {
                            modalData.image_url ? (
                                <Image
                                    src={modalData.image_url}
                                    width={500}
                                    height={500}
                                    className="w-full max-h-[500px] object-contain lg:object-cover lg:w-1/2 rounded-t-3xl lg:rounded-tr-none lg:rounded-bl-3xl"
                                    alt={`${modalData.name} Image`}
                                    style={{objectPosition: "top"}}
                                />
                            ) : (
                                <div className='flex items-center justify-center bg-slate-200 w-full max-w-[500px] m-auto min-h-[500px] rounded-t-3xl lg:rounded-tr-none lg:rounded-bl-3xl text-sm dark:text-white dark:bg-neutral-600'>Image not available</div>
                            )
                        }
                        <div className='w-full lg:w-1/2 flex flex-col items-center text-center p-5 justify-between gap-6'>
                            <div className='flex flex-col gap-6'>
                                <h2 className='font-bold'>{modalData.name ? modalData.name : `#${modalData.token_id}`}</h2>
                                <div className='flex flex-col'>
                                    <p className='font-bold'>Description</p>
                                    <p className='max-h-[245px] overflow-auto'>{modalData.description ?? "..."}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p className='font-bold'>Owner</p>
                                    <p className='text-sm'>{wallet}</p>
                                </div>
                                <a href={modalData.permalink} target="_blank" className='py-2 bg-[#76ffb3] rounded-3xl dark:text-black'>BUY</a>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
    )
}