import {useFormik} from "formik";
import {PasswordData} from "@/lib/interfaces.ts";
import * as Yup from 'yup'
import http from "@/http";
import {validationError} from "@/lib/functions.ts";
import YupPassword from "yup-password"
import {Col, Container, Form, Row} from "react-bootstrap";
import {InputField, SubmitBtn} from "@/components";

YupPassword(Yup)

export const Password = (): JSX.Element => {
    const formik = useFormik({
        initialValues:{
            oldPassword: '',
            password: '',
            confirmPassword: '',
        }as PasswordData,
        validationSchema: Yup.object({
            oldPassword: Yup.string().required(),
            password: Yup.string().required().min(6).max(16).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')], 'password not confirmed'),
        }),
        onSubmit:(data, {setSubmitting}) => {
            http.patch('/profile/password', data)
                .then(() => {})
                .catch(({response}) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    return <Container>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Change Password</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputField formik={formik} name="oldPassword" label="Old Password"/>
                            <InputField formik={formik} name="password" label="New Password"/>
                            <InputField formik={formik} name="confirmPassword" label="Confirm Password"/>


                            <SubmitBtn disabled={formik.isSubmitting}></SubmitBtn>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
    return <></>
}