import {useFormik} from "formik";
import {UserFormData} from "@/lib/interfaces.ts";
import * as Yup from "yup";
import http from "@/http";
import {validationError} from "@/lib/functions.ts";
import YupPassword from "yup-password";
import {useNavigate} from "react-router-dom";
import {Col, Container, Form, Row} from "react-bootstrap";
import {InputField, SubmitBtn} from "@/components";
import {StatusSelect} from "@/components/StatusSelect.tsx";

YupPassword(Yup)



    export const Create = (): JSX.Element => {

    const navigate = useNavigate()
        const formik = useFormik({
            initialValues:{
                name: '',
                status: true,
            }as UserFormData,
            validationSchema: Yup.object({
                name: Yup.string().required(),
                status: Yup.boolean().required(),
            }),
            onSubmit:(data: UserFormData, {setSubmitting}) => {
                http.post('/cms/brands', data)
                    .then(() => navigate('/brands'))
                    .catch(({response}) => validationError(response, formik))
                    .finally(() => setSubmitting(false))
            }
        })
        return <Container>
            <Row>
                <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                    <Row>
                        <Col>
                            <h1>Add Brands</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={formik.handleSubmit}>
                                <InputField formik={formik} name="name" label="Name"/>

                                <StatusSelect formik={formik}/>
                                <SubmitBtn disabled={formik.isSubmitting}></SubmitBtn>


                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

        return<></>
}