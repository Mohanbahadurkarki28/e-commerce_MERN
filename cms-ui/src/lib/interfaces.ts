import {UserType} from "./types.ts";
import {ElementType} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export interface LoginData{
    email: string,
    password:string,
}
export interface UserFormData{
    name: string,
    email?: string,
    password?:string,
    confirmPassword?: string,
    phone:string,
    address: string,
    status?: boolean
}

export interface PasswordData {
    oldPassword: string,
    password: string,
    confirmPassword:string,
}


export interface InputFieldProps {
    formik: any,
    name: string,
    label: string,
    type?: string,
    as?: ElementType<any, keyof IntrinsicElements> | undefined,
    accept?: string,
    multiple?: boolean
}

export interface SubmitBtnProps {
    disabled?: boolean,
    icon?: string,
    label?: string,
}

export interface UserData{
    __v: number,
    _id: string,
    address: string,
    email:string,
    name:string,
    phone: string,
    role: string,
    status: boolean,
    updatedAt: string,
    createdAt: string,

}
export interface CategoryData{
    __v: number,
    _id: string,
    name:string,
    status: boolean,
    createdAt:string,
    updatedAt: string,
}
export interface ProductData{
    __v: number,
    _id: string,
    name:string,
    summary:string,
    description:string,
    price:number,
    discountedPrice:number,
    categoryId:string,
    brandId:string,
    images:string[],
    category:CategoryData,
    brand:CategoryData,
    status: boolean,
    featured:boolean,
    createdAt:string,
    updatedAt: string,
}
export interface ProductFormData{
    name:string,
    summary:string,
    description:string,
    price:number,
    discountedPrice:number,
    categoryId:string,
    brandId:string,
    images?:File[]|null,
    status: boolean,
    featured:boolean,
}

export interface UserState {
    value: UserType,

}

export interface DataTableProps {
    data: any[],
    searchable?: string[],
}
export interface SelectOption {
    label: string
    value:string
}

export interface SelectFieldProps{
    formik: any,
    data: SelectOption[],
    name: string,
    label: string
}

export interface ReviewData{
    __v: number,
    _id: string,
    user:UserData,
    product: ProductData,
    comment: string,
    rating: number,
    createdAt:string,
    status:boolean,
    updatedAt: string,
}
interface DetailData{
    __v: number,
    _id: string,
    product: ProductData,
    qty: string,
    price: number,
    total: number,
    createdAt:string,
    updatedAt: string,

}
export interface OrderData{
    __v: number,
    _id: string,
    user:UserData,
    details: DetailData[],
    createdAt:string,
    status: string,
    updatedAt: string,
}



