"use client"
import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import ThemeToggle from '@/components/theme-toggle'
import Modal from '@/components/modal'
import React from 'react'
import Loader from '@/components/loader'
import Card from '@/components/card'
import useDebounce from '@/hooks/useDebounce'

export default function Home() {
  const [modalData, setModalData] = useState();
  const [wallet, setWallet] = useState("");
  const debouncedWallet = useDebounce<string>(wallet, 500)
  const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(["nft", debouncedWallet], async ({pageParam = ""}) => {
    const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${debouncedWallet}&cursor=${pageParam}`)
    return response.json()
  }, {
    getNextPageParam: (lastPage) => lastPage.next,
    enabled: debouncedWallet.length > 0, 
    staleTime: 600 * 1000, refetchOnWindowFocus: false,
    retry: false
  })

  return (
    <main className="flex flex-col items-center gap-8 py-10 px-6 sm:px-24 min-h-screen font-airbnb">
      <div className="flex justify-center lg:justify-between items-center text-xl w-full z-2">
        <a href="/" className='bg-black p-4 rounded-lg dark:bg-white'>
          <h2 className='font-black text-white dark:text-black'>
            NFT Gallery
          </h2>
        </a>

        <div className='fixed lg:relative flex items-end justify-center w-full lg:w-auto h-48 lg:h-auto top-auto inset-x-0 bottom-0 p-8	z-10 bg-gradient-to-b from-transparent via-white to-white dark:via-black dark:to-black lg:bg-none'>
          <ThemeToggle/>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="absolute w-6 top-3 left-3"
        >
          <path
            stroke="#757575"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m20 20-4.05-4.05m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9z"
          />
        </svg>
        <input className="bg-slate-200 rounded-3xl text-base border-0 py-3.5 pr-3.5 pl-14 outline-0" type="text" placeholder='Wallet Address' value={wallet} onChange={(e) => setWallet(e.target.value)}/>
      </div>
      {
        wallet.length ? (
          isLoading ? (
              <Loader/>
          ) : data?.pages[0].owner ? (
            <div style={{color: "#ff3636"}} className="text-xl">Ops! It looks like you typed a Invalid wallet</div>
          ) : data?.pages[0].assets.length ? (
            <>
              <div className="w-full max-w-[400px] sm:max-w-[800px] lg:max-w-[1200px] grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-center gap-4">
                {
                  data.pages.map((group: any, i: any) => (
                    <React.Fragment key={i}>
                      {
                        group?.assets.map((asset: any) => (
                          <Card key={asset.id} data={asset} onClick={() => setModalData(asset)}/>
                        ))
                      }
                    </React.Fragment>
                  ))
                }
              </div>
              {
                isFetchingNextPage ? (
                    <Loader/>
                ) : hasNextPage ? (
                  <button onClick={() => fetchNextPage()} className='py-2 px-4 bg-slate-200 rounded-3xl'>Load more</button>
                ) : null
              }
            </>
          ) : (
            <div className='text-xl dark:text-white'>{"No items found for this wallet :("}</div>
          )
        ) : null
      }
      <Modal wallet={wallet} modalData={modalData} setModalData={setModalData}/>
    </main>
  )
}
