// Layout.js
import React from 'react';
import HeaderBar from './HeaderBar';

export default function Layout({ children, isAuthenticated, role }) {
    return (
        <>
            {isAuthenticated && <HeaderBar role={role} />}
            {children}
        </>
    );
}
