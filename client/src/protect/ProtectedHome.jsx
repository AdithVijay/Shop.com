import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

 function ProtecHome({children}){

    const user = useSelector((state) => state.user.users)
    if(!user){
        return <Navigate to={"/"}/>
    }
    return children
}

export default ProtecHome;