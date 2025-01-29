import {AxiosResponse} from "axios";
import  dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)


export const env = (key:string): string =>  import.meta.env["VITE_" + key]

export const validationError = (response: AxiosResponse,
                               formik: any) => {
    if ('validation' in response.data) {

        for (let k in response.data.validation) {
            formik.setFieldError(k, response.data.validation[k])
        }
    }
}

export const inStorage = (key:string, value:string, remember:boolean = false ): void => {
    remember? localStorage.setItem(key, value): sessionStorage.setItem(key, value)
}

export const fromStorage = (key:string): string|null => {
    return localStorage.getItem(key) || sessionStorage.getItem(key)
}

export const clearStorage = (key:string)=>{
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
}

export const dtFormat = (dt:string, format:string = 'lll'):
    string => dayjs(dt).format(format)