import Index from '../pages/index'
import WhiteBord from '../pages/WhiteBord'

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
        path:"/whitebord/:id",
        component:WhiteBord
    }
]

export default routes