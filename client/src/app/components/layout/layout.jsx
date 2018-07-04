import React from 'react';
import Sidebar from '../navigation/sidebar';
import Topbar from '../navigation/topbar';

export default class Layout extends React.Component {
    render() {
        return (
            <main id="wrapper">
                <Sidebar />
                <div id="page-wrapper" className="">
                    <Topbar />
                    <div id="content-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </main>
        );
    }
}