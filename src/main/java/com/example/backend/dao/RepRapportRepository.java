package com.example.backend.dao;

import com.example.backend.entities.RepRapport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RepRapportRepository extends JpaRepository<RepRapport,Long> {
    @Query(value = "SELECT DISTINCT * FROM etl.rep_rapports WHERE id = :id LIMIT 1", nativeQuery = true)
    RepRapport findFirstById(@Param("id") Long id);
}
