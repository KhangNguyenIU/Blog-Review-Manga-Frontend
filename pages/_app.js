import '../styles/style.scss'
import Head from 'next/head'
export default function MyApp({ Component, pageProps }) {
    <Head>
        <title>Manga Review</title>
        <meta name="viewport" content="minimum-scale=1, initital-scale=1, width =device-width" />
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    </Head>
    return <Component {...pageProps} />

}