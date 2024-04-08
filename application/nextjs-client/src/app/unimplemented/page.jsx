import NavigationBar from "@/components/NavigationBar";
import Link from 'next/link';

const Unimplemented = () => {
    return (
        <>
            <NavigationBar />
            <div>Sorry, this page has not been implemented yet.</div>
            <Link href="/home">
                <div style={{ color: "blue", textDecoration: "underline" }}>Click here to return home.</div>
            </Link>
        </>
    )
}

export default Unimplemented;