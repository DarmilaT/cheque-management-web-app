import axios from "axios";

const BASE_URL = "http://localhost:8080/customers";

class CustomerService {
  saveCustomer(customer) {
    return axios.post(BASE_URL, customer);
  }
  getAllCustomers() {
    return axios.get(BASE_URL);
  }
  searchByName(name) {
    return axios.get(BASE_URL + "/name/" + name);
  }
  getCustomersByRoute(routeId){
    return axios.get(BASE_URL + "/route/" + routeId)
  }
  getCustomerById(customerId){
    return axios.get(BASE_URL+"/"+customerId)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CustomerService();
