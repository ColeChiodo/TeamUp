import { Link } from "react-router-dom";

function UnimplementedPage() {
    return (
        <div>
            This page has not been implemented yet.{" "}
            <Link to="/home">
                <div style={{ color: "blue", textDecoration: "underline" }}>Click here to return home.</div>
            </Link>
        </div>
    );
}

export default UnimplementedPage;
