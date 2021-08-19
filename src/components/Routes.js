import axios from "axios";
window.onload = (event) => {
    axios.get('http://127.0.0.1:8000/api/prefix').then((res) => {
        var pref = res.data.data;
    });
};

const ADMIN_PREFIX = "/admin/";
const API_PREFIX = "http://127.0.0.1:8000/api/admin/";
const web = {
    admin: {
        dashboard: ADMIN_PREFIX,
        //category Route
        category: ADMIN_PREFIX + 'category',
        categoryCreate: ADMIN_PREFIX + 'category/create',
        categoryEdit: ADMIN_PREFIX + 'category/edit/:id',
        // blog route 
        blog: ADMIN_PREFIX + 'blogs',
        blogCreate: ADMIN_PREFIX + 'blog/create',
        blogEdit: ADMIN_PREFIX + 'blog/edit/:id',
    }
}
const api = {
    admin: {
        //category api
        category: API_PREFIX + 'category',
        enabledCategory: API_PREFIX + 'category/create',
        // blog api 
        blog: API_PREFIX + 'post',
    }
}

const Routes = {
    web,
    api
};

export default Routes;