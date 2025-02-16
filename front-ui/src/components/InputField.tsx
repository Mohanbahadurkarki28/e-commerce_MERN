import {Form} from "react-bootstrap";
import {InputFieldProps} from "@/lib/interfaces.ts";


export const InputField: React.FC<InputFieldProps> =({formik, name, label, type='file',as, accept, multiple}): JSX.Element => {
   return <div className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
            name={name}
            id={name}
            type={type}
            as={as}
            accept={accept}
            multiple={multiple}
            onChange={type == 'file'? ({target}) =>
                    formik.setFieldValue(name, Array.from(target.files)) : (formik.handleChange)}
            onBlur={formik.handleBlur}
            // @ts-ignore
            value={type!= 'password'&& type != 'file' ? formik.values[name]: undefined}
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