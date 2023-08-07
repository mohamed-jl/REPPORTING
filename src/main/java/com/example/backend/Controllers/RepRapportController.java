package com.example.backend.Controllers;

import com.example.backend.dao.RepRapportRepository;
import com.example.backend.entities.RepRapport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/rapport")
public class RepRapportController {
    @Autowired
    RepRapportRepository repRepo;

    @RequestMapping(value = "/list")
    public List<RepRapport> getList() {
        return repRepo.findAll();
    }
}
