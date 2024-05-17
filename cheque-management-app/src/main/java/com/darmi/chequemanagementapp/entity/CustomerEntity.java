package com.darmi.chequemanagementapp.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "tbl_customer")
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long customer_id;
    private String customerName;
    // Assuming one route can have multiple customers
    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "route_id",
            referencedColumnName = "route_id"
    ) // Foreign key column in Customer table
    private RouteEntity route;
    private String address;
    @ElementCollection
    private List<String> telephoneNum;
}
