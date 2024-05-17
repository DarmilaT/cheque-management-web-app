import axios from "axios";

const BASE_URL = "http://localhost:8080/routes";

class RouteService {
  getAllRoutes() {
    return axios.get(BASE_URL);
  }
  getRouteById(routeId){
    return axios.get(BASE_URL+"/"+routeId)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RouteService();
