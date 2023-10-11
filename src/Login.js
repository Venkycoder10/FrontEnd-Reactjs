import React from "react";
import './Register.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login1(){

    const [Login, setLogin] = React.useState({

        id: "",
        password:""
       
      });
      
    

      const nav = useNavigate();

      
      function handleChange(event){

        const{ name , value } = event.target 
           
           setLogin(
               (prev)=>{
                   return{
                   ...prev,
                   [name]: value
           }}
   
           )
         }
         
         function handleOnSubmit(event){

            event.preventDefault()
            if(Login.id === "" && Login.password === "" ){
                toast.error('Enter UserName and Password', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else if(Login.password == ""){

                toast.error('Enter Password', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });



            }else if(Login.id == ""){

                toast.error('Enter UserName', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });


            }else{

                axios.get(`http://localhost:8000/api/v1/task/${Login.id}`).then((response) => {

                
                if(response.data.tasks.password === Login.password ){
                    localStorage.setItem('id',Login.id);
                    localStorage.setItem('boo',true);
                    nav('/profile')
                }else{
                    toast.error('Wrong Password', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });

                }
                
    
                   
                  }).catch((error) => {
    
                    toast.error('Wrong UserName or Password', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                
                   
                    });
                
            }
           
         }

         function handleClick(){

            nav('/register')
         }


    return(
        
        <div>
        
        <div  className="login-header">
            <form className="register-form"  onSubmit={handleOnSubmit}>
             <h1>Log In</h1>
             <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
               
                <ToastContainer />
<label>

    <input
        type="text"
        value={Login.id}
        name="id"
        placeholder='UserName'
        onChange={handleChange}
    />
</label>


<label>
    <input
        type="password"
        name="password"
        placeholder='Password'
        value={Login.password}
        onChange={handleChange}
    />
    
</label>

<div className="flex">
<button className='login-button'>Submit</button>
<button className='login-button'  onClick={handleClick}>Register</button>
</div>
</form>
    
        </div>
        </div>
    )
}