import React, { useState, useEffect } from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import HotItems from './products/HotItems'
import Menus from './products/Menus'


const HomePage = () => {
    const [endpoint, setEndpoint] = useState("products");
    // const { data, loading } = useFetch(`/${endpoint}`);
    return (
        <div className='homePage'>
            <HeroBanner />
            <HotItems />
            <Menus />
        </div>
    )
}

export default HomePage