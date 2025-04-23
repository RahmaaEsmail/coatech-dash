import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { configs } from '../../configs';

export default function LoginPage() {
    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();

        if(!loginData.email) {
            toast.warn("Please Enter Email First!");
            return;
        }
        if(!loginData.password) {
            toast.warn("Please Enter Password First!");
            return;
        }
        localStorage.setItem(configs.localstorageTokenName , JSON.stringify(loginData))
        toast.success("Login Successfully");
        window.location.href="/"
    }
  return (
   <div className='h-screen flex justify-center items-center '>
      <div className='w-[50%] mx-auto'>
        <img className="w-[250px] h-[100px] mx-auto object-cover" src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1744709127/logo_coatech_nv2hga.png"/>
         
         <h4 className='text-center my-4  font-bold text-3xl text-(--main-blue-color)'>Quotation System</h4>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className="input-group">
            <label>Email</label>
            <input value={loginData.email} type="email" onChange={(e) => setLoginData({...loginData , email:e.target.value})}/>
          </div>

          <div className="input-group">
             <label>Password</label>
             <input value={loginData.password} type="password" onChange={(e) => setLoginData({...loginData , password :e.target.value})}/>
          </div>

          <button className='!bg-(--main-red-color) mt-2 py-3 rounded-md text-white flex justify-center items-center'>Login</button>
        </form>
    </div>
   </div>
  )
}
