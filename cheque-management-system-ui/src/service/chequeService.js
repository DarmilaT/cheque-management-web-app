import axios from "axios";

const BASE_URL = "http://localhost:8080/cheques";

class chequeService {
  saveCheque(cheque) {
    return axios.post(BASE_URL, cheque);
  }
  getAllCheques() {
    return axios.get(BASE_URL);
  }
  deleteCheque(id) {
    return axios.delete(BASE_URL + "/" + id);
  }
  editCheque(id, cheque) {
    return axios.put(BASE_URL + "/" + id, cheque);
  }
  getChequeById(id) {
    return axios.get(BASE_URL + "/" + id);
  }
  searchByKeyword(keyword) {
    return axios.get(BASE_URL + "/keyword/" + keyword);
  }
  filterByStatus(status) {
    return axios.get(BASE_URL + "/status/" + status);
  }
  getTotalAmountOfPendingCheques() {
    return axios.get(BASE_URL + "/totalPendingAmount");
  }
  getWeekCheques() {
    return axios.get(BASE_URL + "/weekCheques");
  }
  filterByClearingDate(startDate, endDate) {
    return axios.get(BASE_URL + "/" + startDate + "/" + endDate);
  }
  getTotalAmountOfPendingByClearingDateRange(startDate, endDate) {
    return axios.get(BASE_URL + "/totalAmount/" + startDate + "/" + endDate);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new chequeService();
