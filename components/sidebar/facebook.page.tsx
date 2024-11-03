import Image from 'next/image';
import Link from 'next/link';

export const FacebookPage = () => (
  <div className="relative w-full bg-gray-900 text-white rounded-lg shadow-lg">
    <Link href="https://facebook.com/mojkuran" target="_blank">
      <div className="relative">
        <Image
          src="/img/kuran.jpg"
          alt="Quran"
          className="w-full h-40 object-cover object-top rounded-t-lg"
          width={640}
          height={160}
        />
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
          <h1 className="text-xl">Moj Kur&apos;an</h1>
          <h1 className="prose text-white text-xl">Pridruži Nam Se</h1>
        </div>
      </div>
    </Link>
  </div>
)