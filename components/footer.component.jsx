import React from "react";
import Link from "next/link"

const Footer =() => (
    <nav className="navbar fixed-bottom navbar-dark bg-dark">
      <div className="container">
      <ol className='breadcrumb justify-content-center'>
          <li className="breadcrumb-item active" aria-current="page">&copy; {new Date().getFullYear()}</li>
          <li className="breadcrumb-item"><Link href="/">Mojkuran.com</Link></li>
          <li className="breadcrumb-item"><a href="https://vaktija.ba" target="_blank" rel="noreferrer">Vaktija.ba</a></li>
        </ol>
      </div>
    </nav>
  );

export default Footer;
