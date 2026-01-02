'use client';

import Modal from "./Modal";
import useSearchModal, { SearchQuery } from '@/app/hooks/useSearchModal';
import SelectDistrict, {SelectDistrictValue} from "../forms/selectDistrict";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [district, setDistrict] = useState<SelectDistrictValue>();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [budgetRange, setBudgetRange] = useState<[number, number]>([5000, 25000]);
    const [numRooms, setnumRooms] = useState<string>('1');
    const [numKitchen, setnumKitchen] = useState<string>('0');
    const [numBathrooms, setnumBathrooms] = useState<string>('1');


    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            district: district?.label,
            category: selectedCategory,
            budget: JSON.stringify(budgetRange),
            rooms: parseInt(numRooms),
            kitchen: parseInt(numKitchen),
            bathroom: parseInt(numBathrooms)
        }
        
        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }


    const categories = [
        { value: 'single_room', label: 'Single Rooms', icon: 'M2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
        { value: 'flat', label: 'Flats', icon: 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819' },
        { value: 'office', label: 'Office Space', icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21' },
        { value: 'warehouse', label: 'Warehouse', icon: 'M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z' }
    ];

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl"> Where do you wanna rent?</h2>

            <SelectDistrict
                value = {district}
                onChange={(value) => setDistrict(value as SelectDistrictValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label=" Choose Category ->"
                    onClick={() => searchModal.open('category')}
                />
            </div>
        </>
    )

    const contentCategory = (
        <>
            <h2 className="mb-6 text-2xl"> What kind of rooms are you looking for?</h2>
            
            <div className="pt-3 pb-6 grid grid-cols-2 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`cursor-pointer p-4 flex flex-col items-center space-y-2 border-2 rounded-xl transition ${
                            selectedCategory === category.value 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                        </svg>
                        <span className="text-sm font-medium">{category.label}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Location"
                    onClick={() => searchModal.open('location')}
                />
                <CustomButton
                    label="Budget ->"
                    onClick={() => searchModal.open('budget')}
                />
            </div>
        </>
    )

    const contentBudget = (
        <>
            <h2 className="mb-6 text-2xl">What is your budget?</h2>

            <div className="py-8 px-2">
                {/* Category-specific info */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 text-center">
                        {selectedCategory === 'single_room' && ' Student-friendly budget range'}
                        {selectedCategory === 'flat' && ' Family accommodation budget range'}
                        {selectedCategory === 'office' && 'Office space budget range'}
                        {selectedCategory === 'warehouse' && ' Industrial space budget range'}
                        {!selectedCategory && ' General budget range'}
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Minimum</p>
                            <span className="text-2xl font-bold text-blue-600">Rs. {budgetRange[0].toLocaleString()}</span>
                        </div>
                        <div className="text-gray-400 text-2xl">-</div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Maximum</p>
                            <span className="text-2xl font-bold text-blue-600">Rs. {budgetRange[1].toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <Slider
                        range
                        min={
                            selectedCategory === 'single_room' ? 2000 :
                            selectedCategory === 'flat' ? 5000 :
                            selectedCategory === 'office' ? 15000 :
                            selectedCategory === 'warehouse' ? 25000 : 2000
                        }
                        max={
                            selectedCategory === 'single_room' ? 30000 :
                            selectedCategory === 'flat' ? 60000 :
                            selectedCategory === 'office' ? 150000 :
                            selectedCategory === 'warehouse' ? 300000 : 50000
                        }
                        step={
                            selectedCategory === 'warehouse' ? 5000 :
                            selectedCategory === 'office' ? 2500 : 1000
                        }
                        value={budgetRange}
                        onChange={(value) => setBudgetRange(value as [number, number])}
                        railStyle={{ backgroundColor: '#e5e7eb', height: 8 }}
                        trackStyle={{ backgroundColor: '#2563eb', height: 8 }}
                        handleStyle={[
                            {
                                borderColor: '#2563eb',
                                height: 24,
                                width: 24,
                                marginTop: -8,
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                opacity: 1
                            },
                            {
                                borderColor: '#2563eb',
                                height: 24,
                                width: 24,
                                marginTop: -8,
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                opacity: 1
                            }
                        ]}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-3">
                        <span>
                            Rs. {(selectedCategory === 'single_room' ? 2000 :
                                selectedCategory === 'flat' ? 5000 :
                                selectedCategory === 'office' ? 15000 :
                                selectedCategory === 'warehouse' ? 25000 : 2000).toLocaleString()}
                        </span>
                        <span>
                            Rs. {(selectedCategory === 'single_room' ? 30000 :
                                selectedCategory === 'flat' ? 60000 :
                                selectedCategory === 'office' ? 150000 :
                                selectedCategory === 'warehouse' ? 300000 : 50000).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {selectedCategory === 'single_room' && (
                        <>
                            <button onClick={() => setBudgetRange([2000, 8000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 2000 && budgetRange[1] === 8000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                2K - 8K
                            </button>
                            <button onClick={() => setBudgetRange([8000, 15000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 8000 && budgetRange[1] === 15000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                8K - 15K
                            </button>
                            <button onClick={() => setBudgetRange([15000, 30000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 15000 && budgetRange[1] === 30000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                15K - 30K
                            </button>
                        </>
                    )}
                    {selectedCategory === 'flat' && (
                        <>
                            <button onClick={() => setBudgetRange([5000, 20000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 5000 && budgetRange[1] === 20000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                5K - 20K
                            </button>
                            <button onClick={() => setBudgetRange([20000, 40000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 20000 && budgetRange[1] === 40000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                20K - 40K
                            </button>
                            <button onClick={() => setBudgetRange([40000, 60000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 40000 && budgetRange[1] === 60000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                40K - 60K
                            </button>
                        </>
                    )}
                    {selectedCategory === 'office' && (
                        <>
                            <button onClick={() => setBudgetRange([15000, 50000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 15000 && budgetRange[1] === 50000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                15K - 50K
                            </button>
                            <button onClick={() => setBudgetRange([50000, 100000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 50000 && budgetRange[1] === 100000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                50K - 100K
                            </button>
                            <button onClick={() => setBudgetRange([100000, 150000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 100000 && budgetRange[1] === 150000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                100K - 150K
                            </button>
                        </>
                    )}
                    {selectedCategory === 'warehouse' && (
                        <>
                            <button onClick={() => setBudgetRange([25000, 100000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 25000 && budgetRange[1] === 100000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                25K - 100K
                            </button>
                            <button onClick={() => setBudgetRange([100000, 200000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 100000 && budgetRange[1] === 200000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                100K - 200K
                            </button>
                            <button onClick={() => setBudgetRange([200000, 300000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 200000 && budgetRange[1] === 300000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                200K - 300K
                            </button>
                        </>
                    )}
                    {!selectedCategory && (
                        <>
                            <button onClick={() => setBudgetRange([2000, 10000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 2000 && budgetRange[1] === 10000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                2K - 10K
                            </button>
                            <button onClick={() => setBudgetRange([10000, 20000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 10000 && budgetRange[1] === 20000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                10K - 20K
                            </button>
                            <button onClick={() => setBudgetRange([20000, 35000])} className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${budgetRange[0] === 20000 && budgetRange[1] === 35000 ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'}`}>
                                20K - 35K
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Category"
                    onClick={() => searchModal.open('category')}
                />
                <CustomButton
                    label="Details ->"
                    onClick={() => {
                        console.log('District:', district);
                        console.log('Category:', selectedCategory);
                        console.log('Budget Range:', budgetRange);
                        searchModal.open('details');
                    }}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl"> Details </h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label> No of rooms:</label>
                    <input type='number' 
                        placeholder="No of rooms..."
                        min='1' 
                        value={numRooms} 
                        onChange={(e) => setnumRooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label> No of Kitchen:</label>
                    <input type='number' 
                        placeholder="No of Kitchen..."
                        min='1' 
                        value={numKitchen} 
                        onChange={(e) => setnumKitchen(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label> No of Bathrooms:</label>
                    <input type='number' 
                        placeholder="No of Bathrooms..."
                        min='1' 
                        value={numBathrooms} 
                        onChange={(e) => setnumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<- Choose Budget "
                    onClick={() => searchModal.open('budget')}
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'category') {
        content = contentCategory;
    } else if (searchModal.step == 'budget'){
        content = contentBudget;
    } else if (searchModal.step == 'details'){
        content = contentDetails;
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            close={searchModal.close}
            label = "Search"
            content = {content}
        />
    )
}

export default SearchModal;