import {useFormik} from "formik";
import {CategoryData, ProductData, ProductFormData, SelectOption} from "@/lib/interfaces.ts";
import * as Yup from "yup";
import http from "@/http";
import {imgUrl, validationError} from "@/lib/functions.ts";
import YupPassword from "yup-password";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {InputField, Loading, SubmitBtn} from "@/components";
import {StatusSelect} from "@/components/StatusSelect.tsx";
import  {useEffect, useState} from "react";
import {SelectField} from "@/components/SelectField.tsx";
import {FeaturedSelect} from "@/components/FeaturedSelect.tsx";
import {confirmAlert} from "react-confirm-alert";

YupPassword(Yup)



export const Edit = (): JSX.Element => {
    const [categories, setCategories] = useState<CategoryData[]>([])
    const [brands, setBrands] = useState<CategoryData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<ProductData | null>(null)


    const navigate = useNavigate()
    const params = useParams()

    const formik = useFormik({
        initialValues: {
            name: '',
            summary: '',
            description: '',
            price: 0,
            discountedPrice: 0,
            categoryId: '',
            brandId: '',
            images: null,
            status: true,
            featured: false,

        } as ProductFormData,
        validationSchema: Yup.object({
            name: Yup.string().required(),
            summary: Yup.string().required(),
            description: Yup.string().required(),
            categoryId: Yup.string().required(),
            brandId: Yup.string().required(),
            price: Yup.number().required(),
            discountedPrice: Yup.number().required(),
            status: Yup.boolean().required(),
            featured: Yup.boolean().required(),
            images: Yup.mixed().nullable()
                .test('imgType', 'all files must be valid images', (list: any) => {
                    if (list != null) {
                        for (let img of list) {
                            if (!img.type.startsWith('images')) {
                                return false
                            }
                        }
                    }
                    return true
                })

        }),
        onSubmit: (data: ProductFormData, {setSubmitting}) => {

            const fd = new FormData
            for (let k in data) {
                if (k == 'images' && data.images != null) {
                    // @ts-ignore
                    for (let img of data[k]) {
                        fd.append(k, img)
                    }
                } else {
                    // @ts-ignore
                    fd.append(k, data[k])
                }
            }

            http.patch(`/cms/products/${params.id}`, fd, {
                headers: {
                    'content-Type': 'multipart/form-data',
                },
            })
                .then(() => navigate('/products'))
                .catch(({response}) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })
    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get('/cms/categories'),
            http.get('cms/brands'),
            http.get(`/cms/products/${params._id}`)
        ])
            .then(([{data: cData}, {data: bData}, {data: pdata}]) => {
                setCategories(cData)
                setBrands(bData)
                setProduct(pdata)
            })
            .catch()
            .finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        if(product != null){
            for(let k in formik.values){
                if(k != 'images'){
                    //@ts-ignore
                    formik.setFieldValue(k, product[k])
                }
            }
        }

    }, [product]);

    const handleDelete=(image: string) => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons:[
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`/cms/products/${params.id}/image/${image}`)
                            .then(() => http.get(`/cms/products/${params.id}`))
                            .then(({data}) => setProduct(data))
                            .catch(() => {})
                            .finally(() => setLoading(false))
                    },
                    className: 'text-bg-danger'
                },
                {
                    label: 'No',
                    onClick:() => {}
                }
            ],
        })

    }

    return loading?<Loading/> : <Container>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Edit Product</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputField formik={formik} name="name" label="Name" type="text"/>
                            <InputField formik={formik} name="summary" label="Summary" type="text" as="textarea"/>
                            <InputField formik={formik} name="description" label="Description" type="text" as="textarea"/>
                            <InputField formik={formik} name="price" label="Price" type="number"/>
                            <InputField formik={formik} name="discountedPrice" label="DiscountedPrice"
                                        type="number"/>
                            <InputField formik={formik} name="images" label="Images"
                                        type="file" accept="image/*" multiple/>

                            {formik.values.images?.length > 0 && <Row>
                                {formik.values.images?.map(file => <Col md="3"
                                                                        className="mb-3">
                                    <img src={URL.createObjectURL(file)} className="img-fluid" />
                                </Col>)}
                            </Row>}

                            <Row>
                                {product?.images.map(images => <Col md="3"
                                    className="mb-3" >
                                    <Row>
                                        <Col xs="12">
                                            <img src={imgUrl(images)} className="img=fluid"/>
                                        </Col>
                                        <Col className="mt-3 text-center">
                                            <Button variant="danger" type="button" onClick={() => handleDelete(images)}>
                                            <i className="fa-solid fa-times
                                            me-2">Delete</i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>)}
                            </Row>

                            <SelectField formik={formik} data={categories.map(category => {
                                return{
                                    label: category.name,
                                    value: category._id,
                                }as SelectOption
                            })} name="categoryId" label="Category"/>

                            <SelectField formik={formik} data={brands.map(brand => {
                                return{
                                    label: brand.name,
                                    value: brand._id,
                                }as SelectOption
                            })} name="brandId" label="Brands"/>

                            <StatusSelect formik={formik}/>
                            <FeaturedSelect formik={formik}/>
                            <SubmitBtn disabled={formik.isSubmitting}></SubmitBtn>


                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}