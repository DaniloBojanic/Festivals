const getPlacesReducers = function (places = [], action) {
    switch(action.type) {
        case "GET_PLACES":
            return action.payload;
        default:
            return places;
    }
};

export default getPlacesReducers;