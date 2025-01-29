import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { UserType } from "@/lib/types.ts";
import http from "@/http";
import { Loading, NoData } from "@/components";
import { Link } from "react-router-dom";
import { dtFormat } from "@/lib/functions.ts";
import { confirmAlert } from "react-confirm-alert";
import { DataTable } from "@/components/DataTable.tsx";

export const List = (): JSX.Element => {
  const [brands, setbrands] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    http
      .get("/cms/brands")
      .then(({ data }) => setbrands(data))
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
            http
              .delete(`cms/brands/${id}`)
              .then(() => http.get("cms/brands"))
              .then(({ data }) => setbrands(data))
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
        <Col clasName="bg-white py-3 my-3 rounded-2 shadow-sm">
          <Row>
            <Col>
              <h1>Brands</h1>
            </Col>

            <Col xs="auto">
              <Link to="/brands/create" className="btn btn-dark">
                <i className="fa-solid fa-plus me-2"></i> Add
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <DataTable
                searchable={["Name"]}
                data={brands.map((brand) => {
                  return {
                    Name: brand?.name,
                    Status: brand?.status ? "Active" : "Inactive",
                    "Created At": dtFormat(brand?.createdAt),
                    "Updated At": dtFormat(brand?.updatedAt),
                    Actions: (
                      <>
                        <Link
                          to={`/brands/${brand?._id}`}
                          className="btn btn-dark btn-sm me-2"
                        >
                          <i className="fa-solid fa-edit me-2"></i>Edit
                        </Link>
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(brand!._id)}
                        >
                          <i className="fa-solid fa-times me-2"></i>Delete
                        </Button>
                      </>
                    ),
                  };
                })}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
