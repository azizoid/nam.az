export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export const pageview = (url:string) => {
  (window as any).dataLayer.push({
    event: 'pageview',
    page: url,
  })
}