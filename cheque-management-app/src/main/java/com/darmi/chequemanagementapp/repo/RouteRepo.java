package com.darmi.chequemanagementapp.repo;

import com.darmi.chequemanagementapp.entity.CustomerEntity;
import com.darmi.chequemanagementapp.entity.RouteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepo extends JpaRepository<RouteEntity, Long> {
}
