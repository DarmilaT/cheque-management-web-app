package com.darmi.chequemanagementapp.scheduler;

import com.darmi.chequemanagementapp.entity.ChequeEntity;
import com.darmi.chequemanagementapp.repo.ChequeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ChequeStatusUpdater {
    @Autowired
    private ChequeRepo chequeRepo;

    @Scheduled(cron = "@daily")
//    @Scheduled(cron = "0 58 20 * * *")
    public void updateChequeStatus(){
        LocalDate today = LocalDate.now();
        System.out.println(today);
        List<ChequeEntity> chequeEntities = chequeRepo.findByClearingDate(today);
        for (ChequeEntity cheque: chequeEntities){
            cheque.setStatus(ChequeEntity.Status.Cleared);
            chequeRepo.save(cheque);
        }
    }
}
