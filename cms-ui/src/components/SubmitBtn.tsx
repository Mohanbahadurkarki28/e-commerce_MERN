import {Button} from "react-bootstrap";
import * as React from "react";
import {SubmitBtnProps} from "@/lib/interfaces.ts";


export const SubmitBtn: React.FC<SubmitBtnProps> = ({disabled = false, icon='fa-save', label=
        'Save'}): JSX.Element => {
    return <Button type="submit" variant="dark" disabled={disabled}>
        <i className={`fa-solid ${disabled ? 'fa-spinner fa-spin': icon} me-2`}> </i>
        {label}
    </Button>
}