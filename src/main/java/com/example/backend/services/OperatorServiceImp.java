package com.example.backend.services;

import com.example.backend.dao.OperatorRepository;
import com.example.backend.entities.operator_ref_id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("operatorService")
public class OperatorServiceImp implements OperatorService{

    @Autowired
    OperatorRepository operatorRepository;

    @Override
    public List<operator_ref_id> getListOperator() {
            return operatorRepository.findAll();
    }
}
