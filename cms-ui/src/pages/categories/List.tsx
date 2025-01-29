import {Container, Row, Col, Table, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {UserType} from "@/lib/types.ts";
import http from "@/http";
import {Loading, NoData} from "@/components";
import {Link} from "react-router-dom";
import {dtFormat} from "@/lib/functions.ts";
import {confirmAlert} from "react-confirm-alert"
import {DataTable} from "@/components/DataTable.tsx";


export const List = (): JSX.Element => {

    const [categories, setcategories] = useState<UserType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/categories')
            .then(({data}) => setcategories(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete =(id:string)  => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons:[
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`cms/categories/${id}`)
                            .then(() => http.get('cms/categories'))
                            .then(({data}) => setcategories(data))
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



    return loading? <Loading/> : <Container>
        <Row>
            <Col clasName = "bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Categories</h1>
                    </Col>

            <Col xs="auto">
                <Link to= "/categories/create" className="btn btn-dark">
                    <i className="fa-solid fa-plus me-2"></i> Add
                </Link>
            </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['Name']} data={categories.map(category => {
                            return{
                                'Name': category?.name,
                                'Status': category?.status?'Active': 'Inactive' ,
                                'Created At': dtFormat(category!.createdAt),
                                'Updated At': dtFormat(category!.updatedAt),
                                'Actions': <>
                                    <Link to={`/categories/${category?._id}`} className="btn btn-dark btn-sm me-2">
                                        <i className="fa-solid fa-edit me-2"></i>Edit
                                    </Link>
                                    <Button type = "button" variant = "danger" size="sm"
                                            onClick={() => handleDelete(category!._id)}>
                                        <i className="fa-solid fa-times me-2"></i>Delete
                                    </Button>
                                </>
                            }
                        })} />
                    </Col>
                </Row>
            </Col>
        </Row>

    </Container>
}