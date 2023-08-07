package com.example.backend.Controllers;

import com.example.backend.dao.SubModuleRepository;
import com.example.backend.entities.Module;
import com.example.backend.entities.SubModule;
import com.example.backend.services.ModuleService;
import com.example.backend.services.SubModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/submodule")
public class SubModuleController {

    @Autowired
    private SubModuleService subModuleService;
    SubModuleRepository subModuleRepository;

    public SubModuleController(SubModuleRepository subModuleRepository) {
        this.subModuleRepository = subModuleRepository;
    }

    @RequestMapping(value="/add",method= RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addsubModule(@RequestBody SubModule subModule) {
        List<SubModule> subModuleList = subModuleRepository.findAll();
        int newOrder = subModuleList.size() + 1;
        subModule.setOrder(newOrder);
        subModuleService.addSubModule(subModule);
    }

    @RequestMapping(value = "/list")
    public List<SubModule> getSubModule(){
        return subModuleService.getListSubModule();
    }

    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        subModuleService.deleteSubModule(id);
    }

    @RequestMapping(value = "/{id}",method=RequestMethod.GET)
    public SubModule findById(@PathVariable Long id){
        return subModuleService.findById(id);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<SubModule> updateSubModule(@PathVariable("id") long id, @RequestBody SubModule subModule) {
        SubModule updatedSubmodule=subModuleService.editSubModule(id, subModule);
        return ResponseEntity.ok(updatedSubmodule);
    }
}
