import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hook/useAuth';

const PrivateRoute = ({ children, ...rest }) => {

    const { user, isLoading } = useAuth();


    if (isLoading) {
        return <div className="text-center"><Spinner animation="border" className="mt-5 my-5 mx-auto text-center" variant="success"></Spinner></div>

    }

    return (
        <div>

            <Route
                {...rest}
                render={({location})=> user?.email ? children: <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }}></Redirect>}
            >

            </Route>

        </div>
    );
};

export default PrivateRoute;