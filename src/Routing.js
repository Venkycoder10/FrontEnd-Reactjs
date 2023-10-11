import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login1 from './Login';
import Profile from './Profile';

export default function Login(){

    return(

        <Routes>
        <Route path='/' element={<Login1 /> } />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>

    )
}