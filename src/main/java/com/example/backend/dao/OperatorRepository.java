package com.example.backend.dao;

import com.example.backend.entities.operator_ref_id;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperatorRepository extends JpaRepository<operator_ref_id, Integer> {

}
