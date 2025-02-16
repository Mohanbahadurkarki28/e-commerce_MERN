import {Form} from "react-bootstrap";
import * as React from "react"
import {SelectFieldProps, SelectOption} from "@/lib/interfaces.ts";

export const SelectField:React.FC<SelectFieldProps> = ({formik, data, name, label}): JSX.Element => {



    return <div className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Select
            name={name}
            id={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched[name] && (formik.errors[name]?.length || 0) == 0}
            isInvalid={formik.touched[name] && (formik.errors[name]?.length || 0) > 0}>

            <option value="">Select an options</option>
            {data.map((item: SelectOption) => <option value={item.value} key={item.value}>{item.value}</option>)}
        </Form.Select>
        {formik.touched[name] && (formik.errors[name]?.length || 0) >
            0 && <Form.Control.Feedback type="invalid">
                {formik.errors[name]}
            </Form.Control.Feedback>}
    </div>

}