'use client'

import { GoogleAnalytics } from '@next/third-parties/google'

import { NEXT_PUBLIC_GA4_ID } from '@/utilities/gtag'

export const Analytics = () => <GoogleAnalytics gaId={NEXT_PUBLIC_GA4_ID} />
