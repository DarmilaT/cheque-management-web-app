package com.darmi.chequemanagementapp.service;

import com.darmi.chequemanagementapp.entity.ChequeEntity;
import com.darmi.chequemanagementapp.model.Cheque;
import com.darmi.chequemanagementapp.model.Customer;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.List;

public interface ChequeService {
    Cheque addCheque(Cheque cheque) throws ParseException;

    List<Cheque> getAllCheques();

    @Transactional
    Boolean deleteCheque(long id);

    Cheque editCheque(long id, Cheque cheque);

    Cheque getChequeById(long id);

    List<Cheque> search(String keyword);

    List<Cheque> filterByStatus(ChequeEntity.Status status);

    double getTotalAmountOfPendingCheques();

    List<Cheque> getWeekCheques();

    double getTotalAmountByClearingDateRange(LocalDate startDate, LocalDate endDate);

    List<Cheque> filterByClearingDate(LocalDate startDate, LocalDate endDate);
}
