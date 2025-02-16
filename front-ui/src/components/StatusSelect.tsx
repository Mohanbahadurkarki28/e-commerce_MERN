import {Form} from "react-bootstrap";
import * as React from "react"
import {ChangeEvent} from "react";

export const StatusSelect:React.FC<{formik: any}> = ({formik}): JSX.Element => {

    const handleChange = ({target}:ChangeEvent<HTMLSelectElement>) => formik
        .setFieldValue('status', target.value == 'true')
   return <div className="mb-3">
        <Form.Label htmlFor="status">Status</Form.Label>
        <Form.Select
            name="status"
            id="status"
            value={formik.values.status ? 'true' : 'false'}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            isValid={(formik.errors.status?.length || 0) == 0}
            isInvalid={formik.touched.status && (formik.errors.status?.length || 0) > 0}>

            <option value="true">Active</option>
            <option value="false">Inactive</option>
        </Form.Select>
        {formik.touched.status && (formik.errors.status?.length || 0) >
            0 && <Form.Control.Feedback type="invalid">
                {formik.errors.status}
            </Form.Control.Feedback>}
    </div>

}