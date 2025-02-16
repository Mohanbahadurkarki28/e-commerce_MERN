import { NoData } from "@/components/NoData.tsx";
import {Col, Row, Table, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {DataTableProps} from "@/lib/interfaces.ts";


export const DataTable: React.FC<DataTableProps> = ({data = [], searchable = [] }):
    JSX.Element => {

    const [term, setTerm] = useState<string>('')
    const [filtered, setFiltered] = useState<any[]>([])

    useEffect(() => {
        if(term.length > 0){
            let temp = [...data].filter(item => {
                for(let k of searchable){
                    if(item[k]?.toLowerCase().includes(term.toLowerCase())){
                        return true
                    }
                }
                return false
            })
            setFiltered(temp)
        } else {
            setFiltered(data)
        }
    },[term])

    return <Row>
        {searchable.length > 0 && <Col md="4" className="ms-auto mb-3">
            <Form.Control
                placeholder="search..."
                value={term}
                onChange={({target}) => setTerm(target.value)}
            />

        </Col>}
        <Col xs="12">
            {filtered.length > 0 ? (
                <Table hover striped bordered>
                    <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((k, i) => (
                            <th key={i}>{k}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map(item => (
                        <tr key={item._id}>
                            {Object.values(item).map((value, j) => (
                                <td key={j}>{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : <NoData />}

        </Col>
    </Row>
}
