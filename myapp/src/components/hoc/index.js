import React from 'react';
import Header from './header';

const Layout = (props) => {
    return (
        <div>
            <Header />
            <div className="page_container" style={{marginTop:"20px"}}>
                    {props.children}
            </div>
        </div>
    );
};

export default Layout;