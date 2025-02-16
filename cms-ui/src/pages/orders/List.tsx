import {Container, Row, Col, Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import http from "@/http";
import {Loading} from "@/components";
import {dtFormat} from "@/lib/functions.ts";
import {confirmAlert} from "react-confirm-alert"
import {DataTable} from "@/components/DataTable.tsx";
import {OrderData} from "@/lib/interfaces.ts";


export const List = (): JSX.Element => {

    const [orders, setOrders] = useState<OrderData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/orders')
            .then(({data}) => setOrders(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete =(id: string)  => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons:[
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`cms/orders/${id}`)
                            .then(() => http.get('cms/orders'))
                            .then(({data}) => setOrders(data))
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

const handleUpdate = (target:any, id:string) => {
        setLoading(true)

    http.patch(`/cms/orders/${id}`, {status: target.value})
        .then(() => http.get(`/cms/orders`))
        .then(({data}) => setOrders(data))
        .catch(() => {})
        .finally(() => setLoading(false))
}

    return loading? <Loading/> : <Container>
        <Row>
            <Col className = "bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Orders</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable searchable={['User']} data={orders.map(order => {
                            return{
                                'Details': <ul>
                                    {order.details.map(detail => <li>
                                    {detail.qty} x {detail.product.name} @ Rs.{detail.price} = Rs.{detail.total}
                                        </li>)}
                                </ul>,
                                'User': order.user?.name,
                                'Status':
                            <Form.Select value={order.status} onChange={({target}) => handleUpdate
                                (target, order._id)}>
                                <option value="processing">Processing</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipping">Shipping</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Select>,
                            'Created At': dtFormat(order!.createdAt),
                                'Updated At': dtFormat(order!.updatedAt),
                                'Actions': <>
                                    <Button type = "button" variant = "danger" size="sm"
                                            onClick={() => handleDelete(order!._id)}>
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