package com.darmi.chequemanagementapp.entity;

import com.darmi.chequemanagementapp.model.Customer;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "tbl_route")
public class RouteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long route_id;
    private String routeName;
}
