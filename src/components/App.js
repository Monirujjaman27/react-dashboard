import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Category from './pages/category/Category'
import Mainsidebar from './inc/Mainsidebar'
import Nav from './inc/Nav'
import Footer from './inc/Footer'
import CategoryCreate from './pages/category/CategoryCreate'
import EditeCategory from './pages/category/EditeCategory'
import './partials/Custom.css'
import Routes from './Routes'
import Blogs from './pages/Blogs/blogs'
import BlogCreate from './pages/Blogs/BlogCreate'
import BlogEdit from './pages/Blogs/BlogEdit'
export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Mainsidebar />
                    <Nav />
                    <Switch>
                        <Route exact={true} path={Routes.web.admin.dashboard} component={Dashboard} />
                        {/* Category */}
                        <Route exact={true} path={Routes.web.admin.category} component={Category} />
                        <Route exact={true} path={Routes.web.admin.categoryCreate} component={CategoryCreate} />
                        <Route exact={true} path={Routes.web.admin.categoryEdit} component={EditeCategory} />
                        {/* post */}
                        <Route exact={true} path={Routes.web.admin.blog} component={Blogs} />
                        <Route exact={true} path={Routes.web.admin.blogCreate} component={BlogCreate} />
                        <Route exact={true} path={Routes.web.admin.blogEdit} component={BlogEdit} />
                    </Switch>
                </BrowserRouter>
                <Footer />
            </div>
        )
    }
}
