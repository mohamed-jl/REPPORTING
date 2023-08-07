package com.example.backend.dao;

import com.example.backend.entities.Function;
import com.example.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
}
