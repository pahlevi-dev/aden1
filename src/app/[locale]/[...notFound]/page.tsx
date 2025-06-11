'use client';
import BgNotFound from '@/app/assets/image/notfound.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (secondsRemaining === 0) router.push('/');

    const timer = setTimeout(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
      }
      if (secondsRemaining === 1) router.push('/');
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [router, secondsRemaining]);

  return (
    <div className="relative">
      <Image
        src={BgNotFound}
        alt=""
        className="w-full bg-no-repeat object-cover"
      />
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="text-center space-y-5">
          <h1>404 Page not Found.</h1>
          <p>
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>
          <Button variant="outline">Go home in {secondsRemaining}</Button>
        </div>
      </div>
    </div>
  );
}
