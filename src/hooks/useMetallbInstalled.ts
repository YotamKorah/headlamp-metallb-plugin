import { useEffect, useState } from 'react';
import { isMetallbInstalled } from '../utils/isMetallbInstalled';

export function useMetallbInstalled() {
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkMetallbInstalled() {
      const installed = await isMetallbInstalled();
      setIsInstalled(installed);
    }
    checkMetallbInstalled();
  }, []);

  return {
    isInstalled,
    isMetallbCheckLoading: isInstalled === null,
  };
}
