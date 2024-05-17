package com.darmi.chequemanagementapp.service;

import com.darmi.chequemanagementapp.entity.CustomerEntity;
import com.darmi.chequemanagementapp.model.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomers();

    Customer addCustomer(Customer customer);

    List<Customer> searchByName(String name);

    List<Customer> fetchByRouteId(Long routeId);

    Customer fetchCustomersById(long customerId);
}
