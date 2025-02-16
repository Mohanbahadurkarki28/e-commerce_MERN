import {UserType} from "@/lib/types.ts";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
export const PrivateRoute: React.FC<{ element: JSX.Element}> = ({element}): JSX.Element => {
    const user: UserType = useSelector((state: any) => state.user.value)

    const navigate = useNavigate()

    useEffect(() => {
        if(user == null){
            toast.error('Please log in to continue')

            navigate('/login')
        }
    }, [user])

    return element
}