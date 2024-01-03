import React, { useState, useEffect, useRef } from 'react'
import InputBarSearch from './InputBarSearch';
import InputBarStyleSheet from '../styles/InputBar.css'

const InputBar = ({ sortedUIList }) => {
    const [searchString, setSearchString] = useState("");
    const [checkString, setCheckString] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const searchInputRef = useRef(null);

    // searchString değiştiğinde, checkString'i güncelle
    useEffect(() => {
        if (searchString !== "") {
            setCheckString(true);
            const searchArray = sortedUIList.filter(eachone => eachone.name.includes(searchString) || eachone.surname.includes(searchString))
            setSearchResult(searchArray);
        }
        else {
            setCheckString(false);
            setSearchResult([]);
        }
    }, [searchString]);

    const catchInputString = (e) => {
        let adjustedInputString = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        setSearchString(adjustedInputString);
        // İşlevselliği useEffect'e taşıdık, burada ekstra bir şey yapmamıza gerek yok
    }

    const handleRefreshButton = (e) => {
        e.preventDefault();
        if (searchString !== "") {
            setSearchString("");
            searchInputRef.current.focus();
        }
    }

    const handleFavList = (e) => {
        e.preventDefault();
        const favArray = sortedUIList.filter(eachone => eachone.favStatus.toString() === "true")
        setSearchResult(favArray)
    }

    return (
        <div className='input-overall'>
            <div className='input-top-side'>
                <label htmlFor="">Search</label>
                <br />
                <div className='input-container'>
                    <input ref={searchInputRef} icon="search" value={searchString} onChange={catchInputString}></input>
                    {searchString && <button onClick={handleRefreshButton} className="cancel-button">
                                    <img src="https://cdn-icons-png.flaticon.com/512/107/107260.png" 
                                    width="10px" height="10px" border="0" />
                                    </button>}   
                    <button onClick={handleFavList}>
                        FavList
                    </button> 
                </div>

            </div>
            <div className='input-bottom-side'>
                {
                    <InputBarSearch searchResult={searchResult} />
                }
            </div>

        </div>
    )
}

export default InputBar;