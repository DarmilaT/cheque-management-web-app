package com.darmi.chequemanagementapp.model;

import com.darmi.chequemanagementapp.entity.ChequeEntity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cheque {
    private long cheque_id;
    private String date;
    private long customerId;
    private String bank;
    private String branch;
    private long chequeNumber;
    private Double amount;
    private String clearingDate;
    private ChequeEntity.Status status;

}
