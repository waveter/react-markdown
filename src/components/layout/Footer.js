import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Footer.css';

export default () => {
    return (
        <Navbar toggleable="lg" type="dark" variant="info">
            <div className="info">©2020 OnlineTool247</div>
        </Navbar>);
}