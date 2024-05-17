package com.darmi.chequemanagementapp.model;

import com.darmi.chequemanagementapp.entity.RouteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.RouteMatcher;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    private long customer_id;
    private String customerName;
    private long routeId;
    private String address;
    private List<String> telephoneNum;
}
