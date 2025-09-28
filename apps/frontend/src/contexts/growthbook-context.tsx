import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

interface GrowthBookContextProviderProps {
    children: ReactNode;
}

export function GrowthBookContextProvider({ children }: GrowthBookContextProviderProps) {
    const [growthBook, setGrowthBook] = useState<GrowthBook>();
    const { _ } = useLingui();

    useEffect(() => {
        const initGrowthBook = async () => {
            try {
                const response = await fetch('/feature-flags.json');

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const features = await response.json();

                const gb = new GrowthBook({
                    features,
                });

                setGrowthBook(gb);
            } catch (error) {
                console.error('Failed to load feature flags:', error);
                toast.error(_(t`Failed to load feature flags. Using default values.`));

                // Initialize with empty features as fallback
                const gb = new GrowthBook({
                    features: {},
                });
                setGrowthBook(gb);
            }
        };

        initGrowthBook();
    }, []);

    // Always render children even if GrowthBook isn't loaded yet
    // GrowthBook will use default values for feature flags
    if (!growthBook) {
        const fallbackGb = new GrowthBook({
            features: {},
        });
        return <GrowthBookProvider growthbook={fallbackGb}>{children}</GrowthBookProvider>;
    }

    return <GrowthBookProvider growthbook={growthBook}>{children}</GrowthBookProvider>;
}
