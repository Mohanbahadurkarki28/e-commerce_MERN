import {Form} from "react-bootstrap";
import {InputFieldProps} from "@/lib/interfaces.ts";


export const InputField: React.FC<InputFieldProps> =({formik, name, label, type='text',as}): JSX.Element => {
   return <div className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
            name={name}
            id={name}
            type={type}
            as={as}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={type!= 'password'?formik.values[name]: undefined}
            isInvalid={formik.touched[name] && (formik.errors[name]?.length || 0) > 0}
            isValid={(formik[name]?.length || 0) == 0 &&
                (formik.values[name]?.length || 0) > 0}
        />
        {formik.touched[name] && (formik.errors[name]?.length || 0) > 0
            && <Form.Control.Feedback type="invalid">
                {formik.errors[name]}
            </Form.Control.Feedback>}
    </div>
}