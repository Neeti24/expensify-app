import React from 'react';
import ReactDOM from 'react-dom'; 


// another component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This info is: {props.info}</p>
    </div>
);

// a function that will generate the HOC
const withAdminwarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin &&  <p>This is private info. Please don't share!</p> }
            <WrappedComponent {...props} />
        </div>
    )
};

// requireAuthentication
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? (
             <WrappedComponent {...props} /> 
            ) : (
                <p>Please login</p>
            ) }
        </div>
    );
};

const AdminInfo = withAdminwarning(Info);
const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details!" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} />, document.getElementById('app'));

