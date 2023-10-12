import Link from "next/link";

function Dashnav() {
    return ( 
        <nav className="nav nav-pills flex-column flex-sm-row">
        <Link className=" btn btn-primary flex-sm-fill text-sm-center nav-link active" aria-current="page" href="/">Active</Link>
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">Longer nav link</Link>
        <Link className="flex-sm-fill text-sm-center nav-link" href="#">Link</Link>
      </nav>
     );
}

export default Dashnav;