package com.darmi.chequemanagementapp.controller;

import com.darmi.chequemanagementapp.entity.CustomerEntity;
import com.darmi.chequemanagementapp.model.Customer;
import com.darmi.chequemanagementapp.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("customers")
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @PostMapping("customers")
    public Customer addCustomer(@RequestBody Customer customer){
        System.out.println(customer);
        return customerService.addCustomer(customer);
    }

    @GetMapping("customers/name/{name}")
    public List<Customer> searchByName(@PathVariable String name){
        return customerService.searchByName(name);
    }

    @GetMapping("customers/route/{routeId}")
    public List<Customer> fetchByRouteId(@PathVariable Long routeId){
        return customerService.fetchByRouteId(routeId);
    }

    @GetMapping("customers/{customerId}")
    public Customer fetchCustomersById(@PathVariable long customerId){
        return customerService.fetchCustomersById(customerId);
    }
}
