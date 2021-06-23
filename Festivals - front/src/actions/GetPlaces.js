import { getPlaces } from './../apis/Axios';


let getPlacesAction = function () {

    return async function (dispatch, getState ) {
        try{
            let places = await getPlaces();
            dispatch({ type: "GET_PLACES", payload: places})
        }catch(error){
            dispatch({ type: "GET_PLACES", payload: [] });
        }
    }
}

export default getPlacesAction;