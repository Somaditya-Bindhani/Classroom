import Head from 'next/head'
import Banner from "../components/Home/Banner"

export default function Home() {
  return (
    <>
    <Head>
      <title>Home | Classroom</title>
      <meta  name="description" content="Join Us !Keep track of all your attendance" />
    </Head>
   <Banner />
   </>

  )
}
