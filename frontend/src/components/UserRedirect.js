import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loaders from './Loader';

const UserRedirect = () => {
    const [count,setCount ] = useState(5);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(cur => setCount(--cur))
        }, 1000);

        count === 0 && history.push('/');

        return () => clearInterval(interval);
    },[count, history]);
    return (
        <div className="container p-5 text-center">
            <h4>Redirecting you in {count} second.</h4>
            <Loaders />
        </div>
    )
}

export default UserRedirect
