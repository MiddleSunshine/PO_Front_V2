import Index from '../pages/index'
import WhiteBord from '../pages/WhiteBord'
import Login from '../pages/Login'

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
        path:"/whiteboard/:id",
        component:WhiteBord
    },
    {
        path:"/login",
        component:Login
    }
]

export default routes