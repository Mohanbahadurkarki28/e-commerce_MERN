import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"


import {Container, Navbar, Nav, NavDropdown, Button, Dropdown} from "react-bootstrap";
import {Link, NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {UserType} from "@/lib/types.ts";
import {useEffect, useState} from "react";
import {clearStorage, fromStorage} from "@/lib/functions.ts";
import http from "@/http";
import {clearUser, setUser} from "@/store";
import {Loading} from "./Loading.tsx"



export const Layout= ()=> {
    const user: UserType = useSelector((state: any) => state.user.value)

    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        if(user == null){
            const token = fromStorage('m130ctoken')

            if(token != null){
                http.get('/profile//details')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(() => {
                        clearStorage('m130ctoken')
                    })
                    .finally(() => setLoading(false))

            }else{
                setLoading(false)
            }
        }else {
            setLoading(false)
        }
    }, [user])

    const handleLogout = () => {
        clearStorage('m130ctoken')
            dispatch(clearUser())
    }

    return loading? <Loading/> : <>
        { user != null && <Navbar bg="dark" expand="lg" data-bs-theme="dark">
            <Container>
                <Link to="/" className="navbar-brand">
                    MERN 1:30 CMS
                </Link>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Item className="d-flex align-items-center">
                            <NavLink to="/staffs" className="nav-link">
                                <i className="fa-solid fa-users me-2">  </i>Staffs
                            </NavLink>

                            <NavLink to="/customers" className="nav-link">
                                <i className="fa-solid fa-user-group me-2">  </i>Customers
                            </NavLink>

                            <NavLink to="/brands" className="nav-link">
                                <i className="fa-solid fa-box me-2">  </i>Brands
                            </NavLink>

                            <NavLink to="/categories" className="nav-link">
                                <i className="fa-solid fa-list me-2">  </i>Categories
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={<>
                        <i className="fa-solid fa-user-circle me-2" ></i>
                            {user?.name}
                        </>} align="end">
                            <Link to="/edit-profile" className="dropdown-item">
                                <i className="fa-solid fa-user-edit me-2"> </i>Edit Profile
                            </Link>
                            <Link to="/change-password" className="dropdown-item">
                                <i className="fa-solid fa-asterisk me-2"> </i>Change Password
                            </Link>

                            <Dropdown.Divider/>

                            <Button variant="link" className="dropdown-item" onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout
                            </Button>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>}
        <Outlet/>
    </>
}