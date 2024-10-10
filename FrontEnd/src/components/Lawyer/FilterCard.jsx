/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

import { useDispatch } from 'react-redux'
import { setFilterQuery } from '../../redux/lawyerslice'

const filterData = [
    {
        filterType: 'Location',
        array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: 'Specialization',
        array: ["Family Lawyer", "Criminal Lawyer", "Corporate Lawyers"]
    },
    {
        filterType: 'Rating',
        array: [">4", ">3", ">2"]
    },
]


function FilterCard() {
    const [selectedValue , setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect( () => {
        // console.log(selectedValue)
        dispatch(setFilterQuery(selectedValue));
    },[selectedValue , dispatch])

    return (
        <div
        className="m-5 p-5 border border-gray-200 rounded-xl shadow-xl bg-white"
        >
            <h1>Filter Lawyers</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div className="mt-5" key={index}>
                            <h1 className="text-lg font-bold">{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className="mt-2 flex items-center space-x-2" key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label className="ml-2" htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard