'use client';

import useSearchModal from "@/app/hooks/useSearchModal";

const SearchFilter = () =>{
    const searchModal = useSearchModal();



    return (
        <div 
            onClick={() => searchModal.open('location')}
            className="h-[48px] lg:h-[64] flex flex-row items-center justify-between rounded-full">
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer w-[250px] h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-red-500">
                        <p className="text-xs font-semibold">District</p>
                        <p className="text-sm">Choose District</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-red-500">
                        <p className="text-xs font-semibold">Category</p>
                        <p className="text-sm">Room Type</p>
                    </div>


                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-red-500">
                        <p className="text-xs font-semibold">Max Rent</p>
                        <p className="text-sm">Set Budget</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-red-500">
                        <p className="text-xs font-semibold">Room Details</p>
                        <p className="text-sm">Select Size</p>
                    </div>
                </div>
            </div>
        
        <div className="p-2">
            <div className="cursor-pointer p-2 lg:p-4 bg-blue-800 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
        </div>
    </div>
    )
}

export default SearchFilter;