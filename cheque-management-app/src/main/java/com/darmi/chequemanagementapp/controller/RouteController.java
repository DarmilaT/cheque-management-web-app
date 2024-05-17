package com.darmi.chequemanagementapp.controller;

import com.darmi.chequemanagementapp.entity.CustomerEntity;
import com.darmi.chequemanagementapp.entity.RouteEntity;
import com.darmi.chequemanagementapp.repo.RouteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RouteController {
    @Autowired
    private RouteRepo routeRepo;

    @GetMapping("routes")
    public List<RouteEntity> getAllRoutes() {
        return routeRepo.findAll();
    }

    @GetMapping("routes/{routeId}")
    public RouteEntity getRoutesById(@PathVariable long routeId){
        return routeRepo.findById(routeId).get();
    }
}
