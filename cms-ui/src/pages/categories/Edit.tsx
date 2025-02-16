import {useFormik} from "formik";
import { UserFormData} from "@/lib/interfaces.ts";
import * as Yup from "yup";
import {Col, Container, Form, Row} from "react-bootstrap";
import {InputField, SubmitBtn} from "@/components";
import {UserType} from "@/lib/types.ts";
import http from "@/http";
import {validationError} from "@/lib/functions.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {StatusSelect} from "@/components/StatusSelect.tsx";

export const Edit = ():JSX.Element => {
   const [user, setUser] = useState<UserType>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const params = useParams()
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
            http.patch(`/cms/categories/${params.id}`, data)
                .then(() => navigate('/categories'))
                .catch(({response}) => validationError(response, formik))
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)
        http.get(`/cms/categories/${params.id}`)
            .then(({data})=> setUser(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if(user != null){
            for(let k in user){
                formik.setFieldValue(k, user[k])
            }
        }
    }, [user]);

    return <Container>
        <Row>
            <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Edit Categories</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={formik.handleSubmit}>
                            <InputField formik={formik} name="name" label="Name" type="text"/>

                            <StatusSelect formik={formik} />



                            <SubmitBtn disabled={formik.isSubmitting}></SubmitBtn>

                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}