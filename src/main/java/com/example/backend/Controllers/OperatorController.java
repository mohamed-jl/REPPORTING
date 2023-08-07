package com.example.backend.Controllers;

import com.example.backend.entities.operator_ref_id;
import com.example.backend.services.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/operators")
public class OperatorController {

    @Autowired
    OperatorService operatorService;

    @RequestMapping(value = "/")
    public List<operator_ref_id> getOperators(){
        return operatorService.getListOperator();
    }
}
