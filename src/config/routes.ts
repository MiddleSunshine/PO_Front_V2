import Index from '../pages/index'
import WhiteBord from '../pages/WhiteBord'
import Login from '../pages/Login'
import DrawPage from '../pages/Draw.js'
import EditSheetNode from '../pages/Sheet'
import  CalendarPage from '../pages/CalendarPage'
type route = {
    path: string,
    component: any
}

const routes: route[] = [
    {
        path: "/",
        component: Index
    },
    {
        path:"/calendar/:id/:mode",
        component:CalendarPage
    },
    {
        path: "/sheet/:id",
        component: EditSheetNode
    },
    {
        path: "/draw/:id",
        component: DrawPage
    },
    {
        path: "/whiteboard/:id",
        component: WhiteBord
    },
    {
        path: "/login",
        component: Login
    }
]

export default routes
