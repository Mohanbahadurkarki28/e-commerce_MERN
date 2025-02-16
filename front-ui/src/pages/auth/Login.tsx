import {Col, Container, Form, Row} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {LoginData} from "@/lib/interfaces.ts";
import {InputField, SubmitBtn} from "@/components";
import {useState} from "react";
import http from "@/http";
import {inStorage, validationError} from "@/lib/functions.ts";
import {setUser} from "@/store";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


export const Login =(): JSX.Element => {
    const [remember, setRemember] = useState<boolean>(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            email: '',
            password:'',
        } as LoginData,
        validationSchema:Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        }),
        onSubmit:(data:LoginData, {setSubmitting}) => {
            http.post('/auth/login', data)
                .then(({data}) => {
                    inStorage('m130ctoken',data.token, remember)

                  return http.get('/profile/details')

                })
                .then(({data} ) => {
                    dispatch(setUser(data))
                    navigate('/')
                })
                .catch(({response}) => {
                    validationError(response, formik)
                })
                .finally(() => setSubmitting(false))
        }
    })
    return <Container>
        <Row>
            <Col md="4" className = "bg-white py-3 my-5 mx-auto rounded-2 shadow-sm">
                <Row>
                    <Col className= "text-center">
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputField formik={formik} name="email" label="email" type="email" />
                            <InputField formik={formik} name="password" label="password" type="password" />

                            <Form.Check className="mb-3">
                                <Form.Check.Input name="remember" id="remember"
                                                  checked={remember} onClick={() => setRemember(!remember)}
                                />
                                <Form.Check.Label htmlFor="remember"> Remember Me</Form.Check.Label>
                            </Form.Check>

                                <div className="d-grid">
                                    <SubmitBtn disabled={formik.isSubmitting}
                                               icon="fa-arrow-right-to-bracket" label="Log In" />
                                </div>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}