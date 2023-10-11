import React from "react";
import './Register.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {

    const nav = useNavigate();
   
    const [details, setDetails] = React.useState({
        id: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""

    });

    function handleChange(event) {

        const { name, value } = event.target

        setDetails(
            (prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            }

        )
    }

    const number = details.phone;

    function handleOnSubmit(event) {
        event.preventDefault()

        if (details.id === "" || details.email === "" || details.phone === "" || details.password === "" || details.confirmPassword === "") {
                    
            toast.error('Fill All The Fields', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });


        }else { axios.get(`http://localhost:8000/api/v1/task/${details.id}`).then((response) => {

           if(response.data.id === details.id){
            toast.error('User Name Already taken', {
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
            
        
        
        
        }).catch((res) => {
    
          
           if(res.response.status === 404){

            if((details.password === details.confirmPassword) &&  number.length === 10){

                axios.post('http://localhost:8000/api/v1/task', details).then((response) => {
                 

                    toast.success('Registered Successful', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        
                
                
                })

            }else if((details.password != details.confirmPassword) )
            {
                toast.error('Password Doesnt Match', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else if(number.length != 10){

                toast.error('Check the Number Field', {
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
        
           }else{

            toast.error('Fill All The Fields', {
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
        
           
            });
        }


    }
    function handleClick(){

        nav('/')
     }


    return (

        <div className="register-header">




            <form className="register-form" onSubmit={handleOnSubmit}>
                <h1>Sign In</h1>

                
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
                        value={details.id}
                        name="id"
                        placeholder='User Name'
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="email"
                        value={details.email}
                        name="email"
                        placeholder='Email'
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        name="phone"
                        placeholder='Phone Number'
                        value={details.phone}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={details.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={details.confirmPassword}
                        onChange={handleChange}
                    />
                </label>
                <div className="flex">
                <button className='register-button'>Submit</button>
                
              <button className='register-button'  onClick={handleClick}>Login</button>
              </div>
            </form>

           
           
        </div>
    )
}




