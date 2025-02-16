import {Container, Row, Col, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import http from "@/http";
import {Loading} from "@/components";
import {dtFormat} from "@/lib/functions.ts";
import {confirmAlert} from "react-confirm-alert"
import {DataTable} from "@/components/DataTable.tsx";
import {ReviewData} from "@/lib/interfaces.ts";


export const List = (): JSX.Element => {

    const [reviews, setReviews] = useState<ReviewData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        http.get('/cms/reviews')
            .then(({data}) => setReviews(data))
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
                        http.delete(`/cms/reviews/${id}`)
                            .then(() => http.get('/cms/reviews'))
                            .then(({data}) => setReviews(data))
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
            <Col className = "bg-white py-3 my-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>Reviews</h1>
                    </Col>


                </Row>

                <Row>
                    <Col>
                        <DataTable searchable={['Name']} data={reviews.map(review => {
                            return{
                                'User': review.user.name,
                                'Product': review.product.name,
                                'Comment': review.comment,
                                'Rating': review?.rating,
                                'Status': review.status ? 'Active': 'Inactive',
                                'Created At': dtFormat(review!.createdAt),
                                'Updated At': dtFormat(review!.updatedAt),
                                'Actions': <>
                                    <Button type = "button" variant = "danger" size="sm"
                                            onClick={() => handleDelete(review!._id)}>
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