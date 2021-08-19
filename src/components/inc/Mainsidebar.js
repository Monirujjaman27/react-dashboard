import { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import Routes from "../Routes";
export default class Mainsidebar extends Component {
    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="/asset/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/asset/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link to={Routes.web.admin.dashboard} className="nav-link">
                                    <i className="nav-icon fas fa-home" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-tags" />
                                        <p>
                                            Categorys
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview" style={{ display: 'none' }}>
                                        <li className="nav-item">
                                            <Link to={Routes.web.admin.category} className="nav-link mx-2">
                                                <p>Categorys</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={Routes.web.admin.categoryCreate} className="nav-link mx-2">
                                                <p>+ Add New</p>
                                            </Link>
                                        </li>

                                    </ul>
                            </li>
                            <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fab fa-blogger" />
                                        <p>
                                            Blogs
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview" style={{ display: 'none' }}>
                                        <li className="nav-item">
                                            <Link to={Routes.web.admin.blog} className="nav-link mx-2">
                                                <p>Blogs</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={Routes.web.admin.blogCreate} className="nav-link mx-2">
                                                <p>+ Add New</p>
                                            </Link>
                                        </li>

                                    </ul>
                            </li>

                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        )
    }
}
