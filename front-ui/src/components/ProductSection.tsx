import {ProductSectionProps} from "@/lib/interfaces.ts";
import {ProductCard} from "@/components/ProductCard.tsx";

export const ProductSection: React.FC<ProductSectionProps> =({title, products, small = false}):JSX.Element => {
    return <>
        <div className="col-12">
            <div className="row">
                <div className="col-12 py-3">
                    <div className="row">
                        <div className="col-12 text-center text-uppercase">
                            <h2>{title}</h2>
                        </div>
                    </div>
                    <div className={`row justify-content-center ${small ?  'row-cols-lg-6 row-cols-md-4' : 'row-cols-lg-4'} row-cols-sm-2`}>
                        {products.map(product => <ProductCard product={product} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}