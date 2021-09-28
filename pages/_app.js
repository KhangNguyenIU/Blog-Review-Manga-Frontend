import '../styles/style.scss'
import Head from 'next/head'
export default function MyApp({ Component, pageProps }) {
    <Head>
        <title>Manga Review</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
        <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
        <link rel="shortcut icon" href="../public/favico.png" />
    </Head>
    return <Component {...pageProps} />

}