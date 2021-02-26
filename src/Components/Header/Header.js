import React from 'react';
import { useDataLayerValue } from '../../global-state/DataLayer';
import './Header.css';

export function Header() {
    const [{ user }] = useDataLayerValue();

    return (
        <nav className="header">
            {user ? <div className="profile">
                <h2 className="user-name">{user?.display_name}</h2>
                <img className="user-image" src={user?.images[0]?.url} alt="profile"></img>
            </div> :
            <div></div>}      
        </nav>
    )
}