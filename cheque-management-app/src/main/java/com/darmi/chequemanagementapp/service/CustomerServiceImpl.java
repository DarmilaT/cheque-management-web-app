package com.darmi.chequemanagementapp.service;

import com.darmi.chequemanagementapp.entity.CustomerEntity;
import com.darmi.chequemanagementapp.entity.RouteEntity;
import com.darmi.chequemanagementapp.model.Customer;
import com.darmi.chequemanagementapp.repo.CustomerRepo;
import com.darmi.chequemanagementapp.repo.RouteRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private RouteRepo routeRepo;

    private Customer convertToCustomer(CustomerEntity customerEntity){
        Customer customer = new Customer(
                customerEntity.getCustomer_id(),
                customerEntity.getCustomerName(),
                customerEntity.getRoute().getRoute_id(),
                customerEntity.getAddress(),
                customerEntity.getTelephoneNum());
        BeanUtils.copyProperties(customerEntity, customer);
        return customer;
    }

    private CustomerEntity convertToCustomerEntity(Customer customer) {
        CustomerEntity customerEntity = new CustomerEntity();
        customerEntity.setCustomerName(customer.getCustomerName());
        customerEntity.setAddress(customer.getAddress());
        System.out.println(customer.toString());
        customerEntity.setRoute(routeRepo.findById(customer.getRouteId()).get());
        customerEntity.setTelephoneNum(customer.getTelephoneNum());

        return customerEntity;
    }
    @Override
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll().stream().map(this::convertToCustomer).toList();
    }

    @Override
    public Customer addCustomer(Customer customer) {
        System.out.println(customer);
        CustomerEntity customerEntity = convertToCustomerEntity(customer);
        customerRepo.save(customerEntity);
        return customer;
    }

    @Override
    public List<Customer> searchByName(String name) {
        return customerRepo.findByCustomerNameContaining(name)
                .stream().map(this::convertToCustomer).toList();
    }

    @Override
    public List<Customer> fetchByRouteId(Long routeId) {
        return customerRepo.findByRouteId(routeId)
                .stream().map(this::convertToCustomer).toList();
    }

    @Override
    public Customer fetchCustomersById(long customerId) {
        return convertToCustomer(customerRepo.findById(customerId).get());
    }
}
