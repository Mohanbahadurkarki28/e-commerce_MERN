import {Carousel} from "react-bootstrap"
import slider1 from "/slider-1.jpg"
import slider2 from "/slider-2.jpg"
import slider3 from "/slider-3.jpg"
import {ProductSection} from "@/components";
import {useEffect, useState} from "react"
import {ProductData} from "@/lib/interfaces.ts";
import http from "@/http";
import { Loading } from "@/components";



export const Home =():JSX.Element => {
    const [featured, setFeatured] = useState <ProductData[]>([])
    const [latest, setLatest] = useState <ProductData[]>([])
    const [topselling, setTopSelling] = useState <ProductData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get('/products/featured'),
            http.get('/products/latest'),
            http.get('/products/top-selling'),
        ])
            .then(([{data: fData}, {data: lData}, {data: tData}]) => {
                setFeatured(fData)
                setLoading(lData)
                setTopSelling(tData)
            })
            .catch(()=> {})
            .finally(() => setLoading(false))
    }, [])

    return loading? <Loading/> : <>
<div className="col-12">
    <main className="row">
        <div className="col-12 px-0">
            <Carousel>
                <Carousel.Item>
                    <img src={slider1} className="w-100"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={slider2} className="w-100"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={slider3} className="w-100"/>
                </Carousel.Item>
            </Carousel>
        </div>

        <ProductSection title="Featured Product" products={featured} />
        <div className="col-12 mb-3">
            <span className="product-price">
             </span>
        </div>

        <ProductSection title="Latest Product" products={latest}/>
        <div className="col-12 mb-3">
            <span className="product-price">
                </span>
        </div>

        <ProductSection title="Top Selling Product" products={topselling}/>
        <div className="col-12 mb-3">
            <span className="product-price">
             </span>
        </div>

        <div className="col-12 py-3 bg-light d-sm-block d-none">
            <div className="row">
                <div className="col-lg-3 col ms-auto large-holder">
                    <div className="row">
                        <div className="col-auto ms-auto large-icon">
                            <i className="fas fa-money-bill"></i>
                        </div>
                        <div className="col-auto me-auto large-text">
                            Best Price
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col large-holder">
                    <div className="row">
                        <div className="col-auto ms-auto large-icon">
                            <i className="fas fa-truck-moving"></i>
                        </div>
                        <div className="col-auto me-auto large-text">
                            Fast Delivery
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col me-auto large-holder">
                    <div className="row">
                        <div className="col-auto ms-auto large-icon">
                            <i className="fas fa-check"></i>
                        </div>
                        <div className="col-auto me-auto large-text">
                            Genuine Products
                        </div>
                    </div>
                </div>
            </div>
        </div>

</main>
</div>
</>
}