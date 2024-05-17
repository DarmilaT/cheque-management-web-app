package com.darmi.chequemanagementapp.service;

import com.darmi.chequemanagementapp.entity.ChequeEntity;
import com.darmi.chequemanagementapp.entity.CustomerEntity;
import com.darmi.chequemanagementapp.model.Cheque;
import com.darmi.chequemanagementapp.model.Customer;
import com.darmi.chequemanagementapp.repo.ChequeRepo;
import com.darmi.chequemanagementapp.repo.CustomerRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ChequeServiceImpl implements ChequeService {
    @Autowired
    private ChequeRepo chequeRepo;
    @Autowired
    private CustomerRepo customerRepo;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // Method to parse string date to Date object
    private LocalDate parseDate(String dateString) {
        return LocalDate.parse(dateString, DateTimeFormatter.BASIC_ISO_DATE);
    }

    // chequeEntity -> cheque
    private Cheque convertToChequeModel(ChequeEntity chequeEntity){
        Cheque cheque = new Cheque();
        BeanUtils.copyProperties(chequeEntity, cheque);
        cheque.setDate(chequeEntity.getDate().format(formatter));
        cheque.setClearingDate(chequeEntity.getClearingDate().format(formatter));
        cheque.setCustomerId(chequeEntity.getCustomer().getCustomer_id());
        return cheque;
    }

    // cheque -> chequeEntity
    private ChequeEntity convertToChequeEntity(Cheque cheque){
        ChequeEntity chequeEntity = new ChequeEntity();

        chequeEntity.setAmount(cheque.getAmount());
        chequeEntity.setBank(cheque.getBank());
        chequeEntity.setBranch(cheque.getBranch());
        chequeEntity.setChequeNumber(cheque.getChequeNumber());
        System.out.println(cheque);
        Optional<CustomerEntity> ce = customerRepo.findById(cheque.getCustomerId());
        chequeEntity.setCustomer(ce.get());
        chequeEntity.setDate(LocalDate.parse(cheque.getDate(), formatter)); // Convert string to LocalDate
        chequeEntity.setStatus(cheque.getStatus());
        chequeEntity.setClearingDate(LocalDate.parse(cheque.getClearingDate(), formatter)); // Convert string to LocalDate

        return chequeEntity;
    }

    @Override
    public Cheque addCheque(Cheque cheque){
        ChequeEntity chequeEntity = convertToChequeEntity(cheque);
        chequeRepo.save(chequeEntity);
        return cheque;
    }

    @Override
    public List<Cheque> getAllCheques() {
        List<ChequeEntity> chequeEntities = chequeRepo.findAll();
        return chequeEntities.stream().map(this::convertToChequeModel).toList();
    }

    @Override
    public Boolean deleteCheque(long id) {
        chequeRepo.deleteChequeByIdNativeQuery(id);
        return true;
    }

    @Override
    public Cheque editCheque(long id, Cheque cheque) {
        ChequeEntity chequeEntity = chequeRepo.findById(id).get();
        chequeEntity.setAmount(cheque.getAmount());
        chequeEntity.setBank(cheque.getBank());
        chequeEntity.setBranch(cheque.getBranch());
        chequeEntity.setChequeNumber(cheque.getChequeNumber());
        Optional<CustomerEntity> ce = customerRepo.findById(cheque.getCustomerId());
        chequeEntity.setCustomer(ce.get());
        chequeEntity.setDate(LocalDate.parse(cheque.getDate(), formatter)); // Convert string to Date
        chequeEntity.setStatus(cheque.getStatus());
        chequeEntity.setClearingDate(LocalDate.parse(cheque.getClearingDate(), formatter)); // Convert string to Date

        chequeRepo.save(chequeEntity);
        return cheque;
    }

    @Override
    public Cheque getChequeById(long id) {
        ChequeEntity chequeEntity = chequeRepo.findById(id).get();
        return convertToChequeModel(chequeEntity);
    }

    @Override
    public List<Cheque> search(String keyword) {
        List<ChequeEntity> chequeEntities = chequeRepo.searchByCustomerDetailsContainingKeyword(keyword);
        return chequeEntities.stream().map(this::convertToChequeModel).toList();
    }

    @Override
    public List<Cheque> filterByStatus(ChequeEntity.Status status) {
        List<ChequeEntity> chequeEntities = chequeRepo.findByStatus(status);
        return chequeEntities.stream().map(this::convertToChequeModel).toList();
    }

    @Override
    public double getTotalAmountOfPendingCheques() {
        List<Cheque> chequeEntities = filterByStatus(ChequeEntity.Status.Pending);
        return chequeEntities.stream()
                .mapToDouble(Cheque::getAmount)
                .sum();
    }

    @Override
    public List<Cheque> getWeekCheques() {
        LocalDate today = LocalDate.now();
        LocalDate weekEndFromToday = today.plusDays(6);
        List<ChequeEntity> WeekChequeEntities  = chequeRepo.findByClearingDateBetween(today, weekEndFromToday);
        return WeekChequeEntities.stream()
                .map(this::convertToChequeModel)
                .toList();
    }

    @Override
    public double getTotalAmountByClearingDateRange(LocalDate startDate, LocalDate endDate) {
        List<Cheque> cheques = filterByClearingDate(startDate, endDate);
        return cheques.stream()
                .mapToDouble(Cheque::getAmount)
                .sum();
    }

    @Override
    public List<Cheque> filterByClearingDate(LocalDate startDate, LocalDate endDate) {
        List<ChequeEntity> chequeEntities = chequeRepo.findByClearingDateBetweenAndStatus(startDate, endDate, ChequeEntity.Status.Pending);
        return chequeEntities.stream()
                .map(this::convertToChequeModel)
                .toList();
    }


}
