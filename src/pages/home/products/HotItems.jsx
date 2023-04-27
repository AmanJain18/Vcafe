import React, { useState, useEffect } from 'react'
import { Carousel, ContentWrapper } from '../../../components'
import useFetch from '../../../hooks/useFetch'



const HotItems = () => {
    const [endpoint, setEndpoint] = useState("products");
    const { data } = useFetch(`/${endpoint}?category=Juice`);
    return (
        <ContentWrapper className={"relative"}>
            <div className="font-medium text-headingColor text-2xl mb-5 capitalize">Our fresh & healthy juices</div>
            {data && data.length > 0 && (
                <Carousel data={data} />
            )}
        </ContentWrapper>
    )
}

export default HotItems