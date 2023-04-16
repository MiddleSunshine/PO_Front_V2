import Index from '../pages/index'
import WhiteBord from '../pages/WhiteBord'
import Login from '../pages/Login'
import DrawPage from '../pages/Draw.js'
type route={
    path:string,
    component:any
}

const routes:route[]=[
    {
        path:"/",
        component:Index
    },
    {
        path:"/draw/:id",
        component:DrawPage
    },
    {
        path:"/whiteboard/:id",
        component:WhiteBord
    },
    {
        path:"/login",
        component:Login
    }
]

export default routes