import Search from './Search'

// Static export needs one enumerated shell for /search/{anything};
// the Worker maps every /search/* URL onto this shell (URL bar unchanged,
// useParams() in the client reads the real path)
export function generateStaticParams() {
  return [{ search: 'app' }]
}

export default function SearchPage() {
  return <Search />
}
