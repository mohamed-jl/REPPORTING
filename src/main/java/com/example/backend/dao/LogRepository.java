package com.example.backend.dao;

import com.example.backend.entities.Logs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Logs, Long> {
}

