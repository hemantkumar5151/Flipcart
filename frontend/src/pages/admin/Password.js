import React, { useState, } from 'react'
import { toast } from 'react-toastify';
import Loaders from '../../components/Loader';
import SidebarNav from '../../components/nav/AdminSidebar';
import { auth } from '../../firebase/firebase';
const AdminPasswordPage = () => {
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        if(password !== confirmPassword) {
            alert('Password does not match')
        }
        try {
            await auth.currentUser.updatePassword(password);
            toast.success('You have updated your password successfully')
            setLoading(false)
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
            setPassword('');
            setConfirmPassword('');
        }

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <SidebarNav />
                </div>
                <div className="offset-md-1 col-md-6  text-secondary  mx-2 my-3">
                    <h4 className="text-secondary text-uppercase "> password update</h4>
                    <hr />
                    <br />
                    {
                        loading ? <Loaders  /> : (
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label className="form-label text-uppercase" >Password</label>
                                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
                                </div>
                                
                                <div className="form-group">
                                    <label className="form-label text-uppercase">Confirm Password</label>
                                    <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}  />
                                </div>

                                <button type="submit" className="btn btn-outline" onClick={submitHandler}>Update</button>
                            </form>
                        )
                    }
                    
                </div>
            </div>
        </div>    
    )
}

export default AdminPasswordPage
