package com.darmi.chequemanagementapp.repo;

import com.darmi.chequemanagementapp.entity.CustomerEntity;
import com.darmi.chequemanagementapp.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<CustomerEntity, Long> {
    List<CustomerEntity> findByCustomerNameContaining(String name);

    @Query("SELECT c FROM CustomerEntity c WHERE c.route.route_id = :routeId")
    List<CustomerEntity> findByRouteId(Long routeId);
}
