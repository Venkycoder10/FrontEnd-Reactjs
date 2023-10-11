import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './ProfilePage.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Profile(){
  const nav = useNavigate();
  const id =  localStorage.getItem('id');
      if(!id){
        nav('/')
      }
      
      let [isEditing,setIsEditing] = React.useState(false)
      const [checked, setChecked] = React.useState(false)
      
      let lock = localStorage.getItem('boo')
      React.useEffect(() => {
       setChecked(lock ? lock : false)
    
    },[]);
    
      const [info, setInfo] = React.useState({
        id: "",
        email: "",
        age:"",
        dob:"",
        gender:"",
        phone: "",
        password: "",
        confirmPassword: ""

});

function handleChange(event) {
  const { name, value } = event.target

  setInfo(preInfo => {
    return {
      ...preInfo,
      [name]: value
    }
  })
}

  let handleEditClick = () => {
    

        setIsEditing(true)
      };
    
      let handleSaveClick = () => {
    
        axios.patch(`http://localhost:8000/api/v1/task/${info._id}`,

        info

      ).then(() => {
        axios.get(`http://localhost:8000/api/v1/task/${id}`).then((response) => {
          
        })
        setIsEditing(false)
      })
    }
    
      React.useEffect(() => {
      if(id){
        axios.get(`http://localhost:8000/api/v1/task/${id}`).then((response) => {
        
            setInfo(response.data.tasks)
        })
      }
     

},[]);
function logout(){
  localStorage.removeItem('id')
  nav('/')
}


let date = info.dob

    return(

        <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h2>Profile Page</h2>
              </div>
              <div className="card-body">
                {isEditing ? (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={info.id}
                        name="id"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email:</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={info.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Age:</label>
                      <input
                        type="number"
                        name="age"
                        className="form-control"
                        value={info.age}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Gender:</label>
                      <input 
                        type="text"
                        name="gender"
                        className="form-control"
                        value={info.gender}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label ">Date of Birth:</label>
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={info.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile Number:</label>
                      <input 
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={info.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="mb-3">
                      <label className="form-label">Name:</label>
                      <p className="form-control-static">{info.id}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email:</label>
                      <p className="form-control-static">{info.email}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Age:</label>
                      <p className="form-control-static">{info.age}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Gender:</label>
                      <p className="form-control-static">{info.gender}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date of Birth:</label>
                      <p className="form-control-static">{  date ? date.slice(0,10) : date}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile Number:</label>
                      <p className="form-control-static">{info.phone}</p>
                    </div>
                    <div className='profile-buttons'>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={logout}
                    >
                      Logout
                    </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}
