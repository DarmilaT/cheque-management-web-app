package com.darmi.chequemanagementapp.repo;

import com.darmi.chequemanagementapp.entity.ChequeEntity;
import com.darmi.chequemanagementapp.model.Cheque;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ChequeRepo extends JpaRepository<ChequeEntity, Long> {
    @Query("SELECT c FROM ChequeEntity c JOIN c.customer cu WHERE (LOWER(cu.customerName) LIKE %:keyword% OR LOWER(c.bank) LIKE %:keyword% OR LOWER(c.branch) LIKE %:keyword%)")
    List<ChequeEntity> searchByCustomerDetailsContainingKeyword(String keyword);

    List<ChequeEntity> findByStatus(ChequeEntity.Status status);

    List<ChequeEntity> findByClearingDateBetween(LocalDate today, LocalDate weekEndFromToday);

    List<ChequeEntity> findByClearingDate(LocalDate today);

    List<ChequeEntity> findByClearingDateBetweenAndStatus(LocalDate startDate, LocalDate endDate, ChequeEntity.Status status);

    @Modifying
    @Query(value = "DELETE FROM tbl_cheque WHERE cheque_id = :chequeId", nativeQuery = true)
    void deleteChequeByIdNativeQuery(@Param("chequeId") Long chequeId);
}
