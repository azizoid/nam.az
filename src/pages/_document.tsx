import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="az">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#155724" />

        <meta name="description" content="Azərbaycan şəhərləri üzrə namaz vaxtları" />
        <meta name="keywords" content="Azərbaycan, şəhərləri, vaxtları, namaz, namaz vaxt, namaz vaxtları, namaz vaxtları namaz, namaz vaxtları namazları, namaz vaxtları namazları, namaz vaxtları namazları, təqvim" />

        <meta property="og:title" content="Nam.az - Namazını qıl" />
        <meta property="og:description" content="Azərbaycan və azərbaycanlıların yaşadığı şəhərləri üzrə namaz vaxtları" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nam.az" />
        <meta property="og:image" content="https://nam.az/img/ogimage.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@azizoid" />
        <meta name="twitter:title" content="Nam.az - Namazını qıl" />
        <meta name="twitter:description" content="Azərbaycan və azərbaycanlıların yaşadığı şəhərləri üzrə namaz vaxtları" />
        <meta name="twitter:image" content="https://nam.az/img/ogimage.png" />

        <link rel="apple-touch-icon" href="./favicon.png" />

        <link rel="manifest" href="./manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
