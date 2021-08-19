
import axios from "axios";
import Routes from "../Routes";

export const storeData = async (data) => {
    return await axios.post(Routes.api.admin.blog, data).then((res) => {
        return res.data;
    });
};

export const Update = async (id, data) => {
    return await axios.put(Routes.api.admin.blog + `/${id}`, data).then((res) => {
        return res.data;
    });
};

//status enabled and desabled
export const StEaD = async (id) => {
    return await axios.get(Routes.api.admin.blog + `/${id}`).then((res) => {
        return res;
    });
};

export const delData = async (id) => {
    return await axios.delete(Routes.api.admin.blog + `/${id} `).then((res) => {
        return res;
    });
};

