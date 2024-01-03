import React from 'react'
import InputBarSearchStyle from '../styles/InputBarSearch.css'

const InputBarSearch = ({ searchResult }) => {
    return (
        <div className='results-list'>
            {
                searchResult.length !== 0 ? (
                    <div className='search-list'>
                        <h5>Results</h5>
                        <p>{searchResult.length} item bulundu.</p>
                        <ul>
                            {searchResult.map((eachone, index) => (
                                <li key={index}>
                                    {eachone.name} {eachone.surname} {eachone.number}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className='no-item-warning'>
                        <p>{searchResult.length} item bulundu.</p>
                    </div>
                )
            }
        </div>
    )
}
export default InputBarSearch;