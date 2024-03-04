import Link from "next/link"

const Footer = () =>{
return(
    <header className="primary">
        <div className="container mx-auto">
        </div>
        <div className="flex justify-between"></div>
        <Link href="/">
            <h1 className="text-2xl font-bold">Footer</h1>
        </Link>
    </header>
)
}

export default Footer