import MainHeader from "../MainHeader/MainHeader"
import Footer from "../MainHeader/Footer"
const Layout = (props)=>{

 return (
    <>
 <header>
    <MainHeader />
</header>
    <main>
    {props.children}
    </main>
    <footer>
    <Footer />
    </footer> 
    <div id="overlays"></div>
    </>

 )


}   

export default Layout;