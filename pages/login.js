import LoginComponent from "../components/Auth/Login"
import Head from "next/head"
const Login = ()=>{
    return (
        <>
         <Head>
            <title>Login | Classroom</title>

            <meta  name="description" content="Login to Classroom to record attendance of all your subjects" />
        </Head>
        <LoginComponent />
        </>
    )
}

export default Login