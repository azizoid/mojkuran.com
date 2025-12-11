import localFont from 'next/font/local'
import '../styles/globals.css'
import { Link } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { TiSocialFacebookCircular, TiSocialInstagram } from 'react-icons/ti'
import { Footer } from '@/components/Footer/Footer'
import { MainMetadata, MainViewport } from './metadata'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Form } from '@/components/Form/Form'
import { Suspense } from 'react'
import { PrayerWidget } from '@/components/Sidebar/prayer.widget'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = MainMetadata
export const viewport = MainViewport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ba">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col h-screen justify-between">
          <div className="bg-[url('/img/ornament.gif')] bg-gray-50 bg-repeat-x bg-bottom pb-[33px] px-3">
            <nav className="h-12 container mx-auto flex justify-between">
              <Link
                href="/"
                className="py-3 flex items-center content-start text-gray-500 hover:opacity-75"
                prefetch={false}
              >
                <Logo />
                Mojkur&apos;an.com
              </Link>

              <ul className="flex items-center space-x-2">
                <li>
                  <a href="https://facebook.com/mojkuran" target="_blank" rel="noreferrer">
                    <TiSocialFacebookCircular color="#4267B2" size="24" />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/mojkuran" target="_blank" rel="noreferrer">
                    <TiSocialInstagram color="#E1306C" size="24" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="container mx-auto mt-10 grow pb-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <Suspense>
                <div className="md:col-span-8">
                  <Form />
                </div>

                <div className="hidden md:col-span-4 md:block">
                  <PrayerWidget />
                </div>
              </Suspense>
            </div>

            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}
