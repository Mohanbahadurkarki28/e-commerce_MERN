import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import {Layout} from "@/components";
import * as pages from "@/pages"
import {PrivateRoute} from "./PrivateRoute.tsx";
export const AppRouter =():JSX.Element => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>

                <Route index element ={<PrivateRoute element={<pages.Dashboard.Home />} />}/>

                <Route path="edit-profile" element ={<PrivateRoute element={<pages.Profile.Edit />} />}/>

                <Route path="change-password" element ={<PrivateRoute element={<pages.Profile.Password />} />}/>



                <Route path= "staffs" element={<Outlet/>} >
                    <Route index element ={<PrivateRoute element={<pages.Staffs.List />} />}/>
                    <Route path="create" element ={<PrivateRoute element={<pages.Staffs.Create />} />}/>
                    <Route path=":id" element ={<PrivateRoute element={<pages.Staffs.Edit />} />}/>
                </Route>

                <Route path= "customers" element={<Outlet/>} >
                    <Route index element ={<PrivateRoute element={<pages.Customers.List />} />}/>
                    <Route path="create" element ={<PrivateRoute element={<pages.Customers.Create />} />}/>
                    <Route path=":id" element ={<PrivateRoute element={<pages.Customers.Edit />} />}/>
                </Route>

                <Route path= "brands" element={<Outlet/>} >
                    <Route index element ={<PrivateRoute element={<pages.Brands.List />} />}/>
                    <Route path="create" element ={<PrivateRoute element={<pages.Brands.Create />} />}/>
                    <Route path=":id" element ={<PrivateRoute element={<pages.Brands.Edit />} />}/>
                </Route>

                <Route path= "categories" element={<Outlet/>} >
                    <Route index element ={<PrivateRoute element={<pages.Categories.List />} />}/>
                    <Route path="create" element ={<PrivateRoute element={<pages.Categories.Create />} />}/>
                    <Route path=":id" element ={<PrivateRoute element={<pages.Categories.Edit />} />}/>
                </Route>

                <Route path= "products" element={<Outlet/>} >
                    <Route index element ={<PrivateRoute element={<pages.Products.List />} />}/>
                    <Route path="create" element ={<PrivateRoute element={<pages.Products.Create />} />}/>
                    <Route path=":id" element ={<PrivateRoute element={<pages.Products.Edit />} />}/>
                </Route>
                


                <Route path="login" element={<pages.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}