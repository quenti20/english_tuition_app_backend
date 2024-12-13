import UserNavbar from '../../Components/UserPage/UserNavbar/UserNavbar'
import Footer from '../../Components/HomePage/Footer'

const ChangePassword = () => {
  return (
    <div className='flex flex-col miin-h-screen'>
        <UserNavbar />
        <div className='pt-[100px] flex-grow p-6'>
        <h1 className="text-3xl font-semibold text-center mb-8">ChangePassword</h1>
        </div>
        
        <Footer/>
    </div>
     
  )
}

export default ChangePassword