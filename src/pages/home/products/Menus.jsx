import React, { useState, useEffect } from 'react'
import { Carousel, ContentWrapper } from '../../../components'
import "./menu.scss"
import useFetch from '../../../hooks/useFetch'
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { fetchData } from '../../../utils/api';
import NotFound from "../../../assets/NotFound.svg";

const animatedComponents = makeAnimated();

const Menus = () => {
    const [data, setData] = useState(null);
    const { data: categories } = useFetch(`/category`);
    const [cat, setCat] = useState("");
    // const [endpointCat, setEndpointCat] = useState("category");
    // const [selectedCategories, setSelectedCategories] = useState([]);
    const category = categories?.map((item) => ({ value: item.name, label: item.name }));
    const onChange = (selectedItems, action) => {
        if (action.action !== "clear") {
            setCat(selectedItems.value);
        } else {
            setCat("");
        }
        fetchInitialData();
    };
    const fetchInitialData = () => {
        if (!cat) {
            fetchData(`/products`).then((res) => {
                if (res && res.length > 0)
                    setData(res);
            });
        } else {
            fetchData(`/products?category=${cat}`).then((res) => {
                if (res && res.length > 0)
                    setData(res);
                else
                    setData(null);
            });
        }
    };
    useEffect(() => {
        fetchInitialData();
    }, [cat]);

    return (
        <ContentWrapper className="relative">
            <div className="header flex justify-between mb-5 flex-col md:flex-row">
                <div className="font-medium text-headingColor text-2xl mb-5 capitalize md:mb-0">Our Dishes</div>
                <div className='filters flex'>
                    <Select
                        name='categories'
                        placeholder="Select Categories"
                        options={category}
                        closeMenuOnSelect={true}
                        isSearchable
                        // value={category?.filter((obj) => obj.value === cat)}
                        isClearable={true}
                        components={animatedComponents}
                        noOptionsMessage={() => "No Categories Found"}
                        onChange={onChange}
                        className="react-select-container genresDD"
                        classNamePrefix="select"
                    />
                </div>
            </div>
            {data && data.length > 0 ? (
                <Carousel data={data} />
            ) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={NotFound} className="h-52" />
                    <p className="text-xl text-headingColor font-semibold my-2">
                        Items Not Available
                    </p>
                </div>
            )}
        </ContentWrapper>
    )
}

export default Menus