import axios from "axios";
import preconfig from '../../../public/config.json'

const defaultState = {
    config: preconfig,
};

const getters = {
    config: state => state.config,
    token: state => state.token,
    userId: state => state.userId
};

const mutations = {
    SET_CONFIG: (state, con) => {
        state.config = con;
    },
    SET_TOKEN: (state, tok) => {
        state.token = tok;
    },
    SET_USERID : (state, id) => {
        state.userId = Number(id);
    },
};

const actions = {
    setConfig({ commit }) {
        return axios
            .get("/config.json")
            .then(c => {                
                commit("SET_CONFIG", c.data);
                return Promise.resolve();
            })
            .catch(() => {
                return Promise.resolve();
            });
    }
};

export default {
    state: defaultState,
    getters,
    actions,
    mutations
};
