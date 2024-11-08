import { Metadata } from 'next'

const metadataTitle = {
  template: '%s | Mojkuran.com | Čitaj svoju knjigu',
  default: 'Mojkuran.com | Čitaj svoju knjigu',
}
const metadataUrl = new URL('https://mojkuran.com')

export const MainMetadata: Metadata = {
  icons: '/static/favicon.ico',
  title: metadataTitle,
  // description: metadataDescription,
  keywords: [

  ],
  metadataBase: metadataUrl,
  openGraph: {
    title: metadataTitle,
    // description: metadataDescription,
    images: 'https://mojkuran.com/img/kuran.jpg',
    type: 'website',
    url: metadataUrl,
  },
  twitter: {
    ...metadataTitle,
    // description: metadataDescription,
    creator: '@azizoid',
    images: 'https://mojkuran.com/img/kuran.jpg',
    card: 'summary_large_image',
  },
}

export const MainViewport = {
  themeColor: '#155724',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}
