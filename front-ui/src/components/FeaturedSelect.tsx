import {Form} from "react-bootstrap";
import * as React from "react"
import {ChangeEvent} from "react";

export const FeaturedSelect:React.FC<{formik: any}> = ({formik}): JSX.Element => {

    const handleChange = ({target}:ChangeEvent<HTMLSelectElement>) => formik
        .setFieldValue('featured', target.value == 'true')
    return <div className="mb-3">
        <Form.Label htmlFor="featured">Featured</Form.Label>
        <Form.Select
            name="featured"
            id="featured"
            value={formik.values.featured ? 'true' : 'false'}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            isValid={(formik.errors.featured?.length || 0) == 0}
            isInvalid={formik.touched.featured && (formik.errors.featured?.length || 0) > 0}>

            <option value="true">Yes</option>
            <option value="false">No</option>
        </Form.Select>
        {formik.touched.featured && (formik.errors.featured?.length || 0) >
            0 && <Form.Control.Feedback type="invalid">
                {formik.errors.featured}
            </Form.Control.Feedback>}
    </div>


}