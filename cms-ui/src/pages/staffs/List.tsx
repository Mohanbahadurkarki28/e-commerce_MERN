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

    const [staffs, setStaffs] = useState<UserType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/staffs')
            .then(({data}) => setStaffs(data))
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
                        http.delete(`cms/staffs/${id}`)
                            .then(() => http.get('cms/staffs'))
                            .then(({data}) => setStaffs(data))
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
                        <h1>Staffs</h1>
                    </Col>

            <Col xs="auto">
                <Link to= "/staffs/create" className="btn btn-dark">
                    <i className="fa-solid fa-plus me-2"></i> Add
                </Link>
            </Col>
                </Row>
            </Col>
                <Row>
                    <Col>
                        <DataTable searchable={['Name', "Email", "Address"]} data={staffs.map(staff => {
                            return{
                                'Name': staff?.name,
                                'Email': staff?.email,
                                'Phone': staff?.phone,
                                'Address': staff?.address,
                                'Status': staff?.status? 'Active': 'Inactive',
                                'Created At': dtFormat(staff?.createdAt),
                                'Updated At': dtFormat(staff?.updatedAt),
                                'Actions': <>
                                    <Link to={`/staffs/${staff?._id}`} className="btn btn-dark btn-sm me-2">
                                        <i className="fa-solid fa-edit me-2"></i>Edit
                                    </Link>
                                    <Button type = "button" variant = "danger" size="sm"
                                            onClick={() => handleDelete(staff!._id)}>
                                        <i className="fa-solid fa-times me-2"></i>Delete
                                    </Button>
                                </>
                            }
                        })} />
                    </Col>
                </Row>
        </Row>

    </Container>
}