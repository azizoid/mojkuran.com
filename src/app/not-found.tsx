import { Alert, AlertDescription } from '@/components/ui/alert'
import { Link } from '@/components/Link'

export default function NotFound() {
  return (
    <main className="max-w-3xl">
      <Alert variant="destructive">
        <div>
          <h1 className="mb-1 font-medium leading-none tracking-tight">
            404 — Stranica nije pronađena
          </h1>
          <AlertDescription>
            <p>Adresa koju ste otvorili ne postoji ili više nije dostupna.</p>
            <Link href="/" className="mt-3 inline-block underline underline-offset-4">
              Povratak na početnu stranicu
            </Link>
          </AlertDescription>
        </div>
      </Alert>
    </main>
  )
}
