import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SuccessPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 50000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container">
            <div className="form">
                <h2>Success!</h2>
                <p> <span>    </span>Your task has been marked as completed.</p>
            </div>
        </div>
    );
};

export default SuccessPage;
