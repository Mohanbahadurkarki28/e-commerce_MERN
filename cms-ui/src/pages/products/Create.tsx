import {useFormik} from "formik";
import {CategoryData, ProductFormData, SelectOption} from "@/lib/interfaces.ts";
import * as Yup from "yup";
import http from "@/http";
import {validationError} from "@/lib/functions.ts";
import YupPassword from "yup-password";
import {useNavigate} from "react-router-dom";
import {Col, Container, Form, Row} from "react-bootstrap";
import {InputField, Loading, SubmitBtn} from "@/components";
import {StatusSelect} from "@/components/StatusSelect.tsx";
import {useEffect, useState} from "react";
import {SelectField} from "@/components/SelectField.tsx";
import {FeaturedSelect} from "@/components/FeaturedSelect.tsx";

YupPassword(Yup)



    export const Create = (): JSX.Element => {
        const [categories, setCategories] = useState<CategoryData[]>([])
        const [brands, setBrands] = useState<CategoryData[]>([])
        const [loading, setLoading] = useState<boolean>(true)


        const navigate = useNavigate()
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
                images: Yup.mixed()
                    .test('imgCount', 'choose at least one  image', (list: any) =>
                       /* list != null && list.length > 0)*/
                    list && list.length >0)
                    .test('imgType', 'all files must be valid image', (list: any) => {
                        if (list != null) {
                            for (let img of list) {
                                if (!img.type.startsWith('image')) {
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
                    if (k == 'images') {
                        // @ts-ignore
                        for (let img of data[k]) {
                            fd.append(k, img)
                        }
                    } else {
                        // @ts-ignore
                        fd.append(k, data[k])
                    }
                }

                http.post('/cms/products', fd, {
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
            ])
                .then(([{data: cData}, {data: bData}]) => {
                    setCategories(cData)
                    setBrands(bData)
                })
                .catch()
                .finally(() => setLoading(false))
        }, []);
        return loading ? <Loading/>: <Container>
            <Row>
                <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                    <Row>
                        <Col>
                            <h1>Add Product</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={formik.handleSubmit}>
                                <InputField formik={formik} name="name" label="Name"/>
                                <InputField formik={formik} name="summary" label="Summary" as="textarea"/>
                                <InputField formik={formik} name="description" label="Description" as="textarea"/>
                                <InputField formik={formik} name="price" label="Price" type="number"/>
                                <InputField formik={formik} name="discountedPrice" label="DiscountedPrice"
                                            type="number"/>
                                <InputField formik={formik} name="images" label="Images"
                                            type="file" accept="image/*" multiple/>

                                {formik.values.images?.length>0 && <Row>
                                    {formik.values.images?.map(file=><Col md="3" className="mb-3">
                                        <img src={URL.createObjectURL(file)} className="img-fluid"/>
                                    </Col>)}
                                </Row>}
                                <SelectField formik={formik} data={categories.map(category=>{
                                    return {
                                        label:category.name,
                                        value:category._id,
                                    } as SelectOption
                                })} name="categoryId" label="Category"/>

                                <SelectField formik={formik} data={brands.map(brand=>{
                                    return {
                                        label:brand.name,
                                        value:brand._id,
                                    } as SelectOption
                                })} name="brandId" label="Brand"/>
                                
                                <FeaturedSelect formik={formik}/>
                                <StatusSelect formik={formik}/>
                                <SubmitBtn disabled={formik.isSubmitting}></SubmitBtn>


                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    }