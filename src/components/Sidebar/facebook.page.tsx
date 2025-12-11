import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'
import { Link } from '@/components/Link'
import { Card } from '../Card/Card'

export const FacebookPage = () => (
  <Card title="BİZİ BƏYƏN" className='relative bg-[url("/img/kuran.jpg")] bg-cover'>
    <div className="absolute inset-0 bg-black opacity-30" />
    <div className="relative z-10 flex h-40 w-full flex-col justify-between p-2">
      <div className="flex flex-row gap-2">
        <div className="flex grow flex-col font-semibold text-white">
          <span className="text-lg">Moj Kur&apos;an</span>
          <span className="text-xs">mojkuran.com</span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Link
          href="https://facebook.com/mojkuran"
          target="_blank"
          className="flex flex-row items-center gap-1 bg-white px-1.5 py-0.5 font-bold"
        >
          <FaFacebookSquare size="16" /> Follow on Facebook
        </Link>
        <Link
          href="https://instagram.com/mojkuran"
          target="_blank"
          className="flex flex-row items-center gap-1 bg-white px-1.5 py-0.5 font-bold"
        >
          <FaInstagramSquare size="16" /> Follow on Instagram
        </Link>
      </div>
    </div>
  </Card>
)
