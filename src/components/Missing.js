import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <div className="p-10">
            <h1 className="font-bold text-3xl p-5">Oops!</h1>
            <p className="px-5 py-2">Page Not Found</p>
            <div className="font-medium text-blue-500 px-5">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </div>
    )
}

export default Missing