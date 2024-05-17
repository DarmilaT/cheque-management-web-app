package com.darmi.chequemanagementapp.entity;

import com.darmi.chequemanagementapp.model.Customer;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "tbl_cheque")
public class ChequeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cheque_id;
    private LocalDate date;
    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "customer_id",
            referencedColumnName = "customer_id"
    )
    private CustomerEntity customer;
    private String bank;
    private String branch;
    private long chequeNumber;
    private Double amount;
    private LocalDate clearingDate;
    private Status status;

    public enum Status{
        Pending,
        Deposited,
        Cleared,
        Returned,
        Stopped,
        Cancelled
    }
}
