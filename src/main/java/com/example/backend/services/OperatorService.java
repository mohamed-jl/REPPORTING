package com.example.backend.services;


import com.example.backend.entities.operator_ref_id;

import java.util.List;

public interface OperatorService {

    List<operator_ref_id> getListOperator();
}
