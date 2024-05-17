package com.darmi.chequemanagementapp.controller;

import com.darmi.chequemanagementapp.entity.ChequeEntity;
import com.darmi.chequemanagementapp.model.Cheque;
import com.darmi.chequemanagementapp.service.ChequeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ChequeController {
    @Autowired
    private ChequeService chequeService;

    @PostMapping("cheques")
    public Cheque addCheque(@RequestBody Cheque cheque) throws ParseException {
        return chequeService.addCheque(cheque);
    }

    @GetMapping("cheques")
    public List<Cheque> getAllCheques(){
        return  chequeService.getAllCheques();
    }

    @DeleteMapping("cheques/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteCheque(@PathVariable long id){
        Boolean deleted = false;
        deleted = chequeService.deleteCheque(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("cheques/{id}")
    public ResponseEntity<Cheque> editCheque(@PathVariable long id, @RequestBody Cheque cheque){
        cheque = chequeService.editCheque(id, cheque);
        return ResponseEntity.ok(cheque);
    }

    @GetMapping("cheques/{id}")
    public Cheque getChequeById(@PathVariable long id){
        return chequeService.getChequeById(id);
    }

    @GetMapping("cheques/keyword/{keyword}")
    public List<Cheque> searchByKeyword(@PathVariable("keyword") String keyword){
        return chequeService.search(keyword);
    }

    @GetMapping("cheques/status/{status}")
    public List<Cheque> filterByStatus(@PathVariable("status") ChequeEntity.Status status){
        return chequeService.filterByStatus(status);
    }

    @GetMapping("/cheques/totalPendingAmount")
    public double getTotalAmountOfPendingCheques(){
        return chequeService.getTotalAmountOfPendingCheques();
    }

    @GetMapping("/cheques/weekCheques")
    public List<Cheque> getWeekCheques(){
        return chequeService.getWeekCheques();
    }

    @GetMapping("/cheques/totalAmount/{start}/{end}")
    public double getTotalAmountByClearingDateRange(@PathVariable("start") long start, @PathVariable("end") long end){
        LocalDate startDate = Instant.ofEpochMilli(start).atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endDate = Instant.ofEpochMilli(end).atZone(ZoneId.systemDefault()).toLocalDate();
        return chequeService.getTotalAmountByClearingDateRange(startDate, endDate);
    }

    @GetMapping("/cheques/{start}/{end}")
    public List<Cheque> filterByClearingDate(@PathVariable("start") long start, @PathVariable("end") long end){
        LocalDate startDate = Instant.ofEpochMilli(start).atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endDate = Instant.ofEpochMilli(end).atZone(ZoneId.systemDefault()).toLocalDate();
        return chequeService.filterByClearingDate(startDate, endDate);
    }

}
