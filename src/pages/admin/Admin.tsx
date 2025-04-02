import { NavLink } from "react-router"

export const Admin = () => {
    return (
        <>
        <h1>Admin</h1>
        <div id="admin-div">
            <NavLink to={"products"}><h2>Products</h2><br/><img className="admin-icons" src="https://cdn-icons-png.freepik.com/512/1370/1370329.png"/></NavLink>
            <NavLink to={"customers"}><h2>Customers</h2><br/><img className="admin-icons" src="https://cdn.iconscout.com/icon/free/png-256/free-customers-icon-download-in-svg-png-gif-file-formats--group-team-contacts-family-essential-web-1-pack-user-interface-icons-866159.png?f=webp&w=256"/></NavLink>
            <NavLink to={"orders"}><h2>Orders</h2><br/><img className="admin-icons" src="https://cdn-icons-png.flaticon.com/512/6633/6633349.png"/></NavLink>
        </div>
        </>
    )
}