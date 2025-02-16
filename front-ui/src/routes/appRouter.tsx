import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout} from "@/components";
import * as Pages from "@/pages"
export const AppRouter =():JSX.Element => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
            <Route index element={<Pages.Front.Home />} />


                <Route path="login" element={<Pages.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}