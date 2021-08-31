
import axios from "axios";
import Routes from "../Routes";

export const storeData = async (data) => {
    return await axios.post(Routes.api.admin.description, data).then((res) => {
        return res.data;
    });
};

export const Update = async (id, data) => {
    return await axios.put(Routes.api.admin.description + `/${id}`, data).then((res) => {
        return res.data;
    });
};

//status enabled and desabled
export const StEaD = async (id) => {
    return await axios.get(Routes.api.admin.description + `/${id}`).then((res) => {
        return res;
    });
};

export const delData = async (id) => {
    return await axios.delete(Routes.api.admin.description + `/${id} `).then((res) => {
        return res;
    });
};

