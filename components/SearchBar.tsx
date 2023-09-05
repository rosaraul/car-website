"use client";
import {useState} from "react";
import React from 'react';
import {SearchManufacturer} from "@/components/index";
import Image from "next/image";
import {useRouter} from "next/navigation";
const SearchButton=({ otherClasses}: {otherClasses : string})=>{

    return(
        <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
            <Image src="/magnifying-glass.svg" alt="mag glass" width={40} height={40} className="object-contain" />
        </button>
        )

}

const SearchBar = () => {
    const [model, setModel] = useState('')
    const [manuFacturer, setManuFacturer] = useState('');
    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(manuFacturer === ' ' && model === ' ' ){
            return alert('Please fill in search bar')
        }
        updateSearchParams(model.toLowerCase(),manuFacturer.toLowerCase())
    }
    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if(model) {
            searchParams.set('model', model);

        }else {
            searchParams.delete('model');
        }
        if(manufacturer) {
            searchParams.set('manufacturer', manufacturer);

        }else {
            searchParams.delete('manufacturer');
        }
        const newPathname= `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathname);
    }
    return (
        <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer
                manufacturer={manuFacturer}
                setManufacturer={setManuFacturer}

            />
            <SearchButton otherClasses="sm:hidden"/>

        </div>
            <div className="searchbar__item">
                <Image src="/model-icon.png" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" alt="car model" />
                <input
                type="text"
                name="model"
                value={model}
                onChange={(e)=>setModel(e.target.value)}
                placeholder="Tiguan"
                className="searchbar__input"
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    );
};

export default SearchBar;