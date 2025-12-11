import { Link } from '@/components/Link'

export const Footer = () => (
  <nav className="py-4 bg-gray-700 text-slate-300">
    <ol className="container mx-auto w-lg flex">
      <li className="active mr-6" aria-current="page">
        &copy; {new Date().getFullYear()}
      </li>
      <li className="mr-6">
        <Link href="/">Mojkuran.com</Link>
      </li>
      <li>
        <a href="https://vaktija.ba" target="_blank" rel="noreferrer">
          Vaktija.ba
        </a>
      </li>
    </ol>
  </nav>
)
