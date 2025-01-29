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
                phone: '',
                address: '',
                email: '',
                status: true,
                password: '',
                confirmPassword: '',

            }as UserFormData,
            validationSchema: Yup.object({
                name: Yup.string().required(),
                phone: Yup.string().required(),
                address: Yup.string().required(),
                email: Yup.string().required(),
                status: Yup.boolean().required(),
                password: Yup.string().required().min(6).max(16).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1),
                confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'password not confirmed'),

            }),
            onSubmit:(data: UserFormData, {setSubmitting}) => {
                http.post('/cms/customers', data)
                    .then(() => navigate('/customers'))
                    .catch(({response}) => validationError(response, formik))
                    .finally(() => setSubmitting(false))
            }
        })
        return <Container>
            <Row>
                <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                    <Row>
                        <Col>
                            <h1>Add Customer</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={formik.handleSubmit}>
                                <InputField formik={formik} name="name" label="Name"/>
                                <InputField formik={formik} name="email" label="Email" type="email"/>
                                <InputField formik={formik} name="password" label="Password"/>
                                <InputField formik={formik} name="confirmPassword" label="Confirm Password"/>
                                <InputField formik={formik} name="phone" label="Phone"/>
                                <InputField formik={formik} name="address" label="Address" as="textarea"/>

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