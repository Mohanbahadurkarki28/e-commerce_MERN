import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import http from "@/http";
import { Loading } from "@/components";
import { Link } from "react-router-dom";
import { dtFormat, imgUrl } from "@/lib/functions.ts";
import { confirmAlert } from "react-confirm-alert";
import { DataTable } from "@/components/DataTable.tsx";
import { ProductData } from "@/lib/interfaces.ts";

export const List = (): JSX.Element => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        http.get("/cms/products")
            .then(({ data }) => setProducts(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id: string) => {
        confirmAlert({
            title: "Delete",
            message: "Are you sure you want to delete this item?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        setLoading(true);
                        http.delete(`/cms/products/${id}`)
                            .then(() => http.get("/cms/products"))
                            .then(({ data }) => setProducts(data))
                            .catch(() => {})
                            .finally(() => setLoading(false));
                    },
                    className: "text-bg-danger",
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    return loading ? (
        <Loading />
    ) : (
        <Container>
            <Row>
                <Col className="bg-white py-3 my-3 rounded-2 shadow-sm">
                    <Row>
                        <Col>
                            <h1>Products</h1>
                        </Col>
                        <Col xs="auto">
                            <Link to="/products/create" className="btn btn-dark">
                                <i className="fa-solid fa-plus me-2"></i> Add
                            </Link>
                        </Col>
                    </Row>
                </Col>

                <Row>
                    <Col>
                        <DataTable
                            searchable={["Name"]}
                            data={products.map((product) => ({
                                Name: product.name,
                                Category: product.category?.name || "N/A",
                                Brand: product.brand?.name || "N/A",
                                Price: `Rs. ${product.price}`,
                                "Dis. Price": `Rs. ${product.discountedPrice}`,
                                Image: product.images?.length ? (
                                    <img
                                        src={imgUrl(product.images[0])}
                                        className="img-sm"
                                        alt={product.name}
                                    />
                                ) : (
                                    "No Image"
                                ),
                                Status: product.status ? "Active" : "Inactive",
                                Featured: product.featured ? "Yes" : "No",
                                "Created At": dtFormat(product.createdAt),
                                "Updated At": dtFormat(product.updatedAt),
                                Actions: (
                                    <>
                                        <Link
                                            to={`/products/${product._id}`}
                                            className="btn btn-dark btn-sm me-2"
                                        >
                                            <i className="fa-solid fa-edit me-2"></i>Edit
                                        </Link>
                                        <Button
                                            type="button"
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <i className="fa-solid fa-times me-2"></i>Delete
                                        </Button>
                                    </>
                                ),
                            }))}
                        />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};
