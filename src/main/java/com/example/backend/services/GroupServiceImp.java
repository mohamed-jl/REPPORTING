package com.example.backend.services;

import com.example.backend.dao.FunctionRepository;
import com.example.backend.dao.GroupRepository;
import com.example.backend.dao.ModuleRepository;
import com.example.backend.entities.Function;
import com.example.backend.entities.Group;
import com.example.backend.entities.Module;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service(value = "GroupService")
public class GroupServiceImp implements GroupService{

    GroupRepository groupRepository;
    FunctionRepository functionRepository;
    ModuleRepository moduleRepository;
    public GroupServiceImp(GroupRepository groupRepository, FunctionRepository functionRepository,ModuleRepository moduleRepository) {
        this.groupRepository = groupRepository;
        this.functionRepository = functionRepository;
        this.moduleRepository=moduleRepository;
    }
    @Override
    public Group addGroup(Group group) {
        System.out.println(group.getgName());
        List<Function> fun = new ArrayList<>();
        for (Function f:group.getListe_function()) {
            if (!fun.contains(f)){
                Optional<Function> ff = functionRepository.findById(f.getId());
                fun.add(ff.get());
            }
        }
        group.setListe_function(fun);

        List<Module> mod = new ArrayList<>();
        for (Module m:group.getModule_groups()) {
            Optional<Module> mm = moduleRepository.findById(m.getId());
            mod.add(mm.get());
        }
        group.setModule_groups(mod);
//        group.setDateCreation(new Date());
//
//        // Process modules and submodules
//        for (Module module : group.getModule_groups()) {
//            // Add the group to the module's group list
//            module.getGroup_module().add(group);
//
//            // Process submodules
//            for (SubModule submodule : module.getList_sub_modules()) {
//                // Set the module for each submodule
//                submodule.setModule(module);
//
//                // Process functions
//                List<Function> functions = new ArrayList<>();
//                for (Function function : submodule.getFunctions()) {
//                    // Check if the function is already present in the group's functions
//                    if (function.getId() != null && !functions.contains(function)) {
//                        functions.add(function);
//                    }
//                }
//                submodule.setFunctions(functions);
//            }
//        }
        return groupRepository.save(group);
    }



    @Override
    public Group editGroup(Group group,Long id) {
        Group g=this.findById(id);
        if(g.getgId()==id){
            g.setgName(group.getgName());
            g.setgDescription(group.getgDescription());
            g.setDateModif(group.getDateModif());
            g.setEtat(group.getEtat());
            g.setModule_groups(group.getModule_groups());
            return groupRepository.save(g);
        }
        return null;
    }

    @Override
    public List<Group> getListGroup() {
        return groupRepository.findAll(Sort.by(Sort.Direction.DESC,"dateCreation"));
    }

    @Override
    public void deleteGroup(Long gId) {
        Group group = groupRepository.getOne(gId);
        if (group != null)
        {
            groupRepository.delete(group);
        }

    }

    @Override
    public Group findById(Long gId) {
        return groupRepository.findById(gId).get();
    }

    @Override
    public List<Group> findGroupByModule(Long Id){
        return  groupRepository.findAll().stream().filter
                (x->x.getModule_groups().stream().anyMatch(t->t.getId()==Id)).collect(Collectors.toList());
    }

    @Override
    public Optional<Group> FindGroupByFunc(Long gId){
        return  groupRepository.findAll().stream().filter(
                x->x.getListe_function().stream().anyMatch(t->t.getId()==gId)).findAny();
    }

    @Transactional
    public void removeModuleFromGroup(Long groupId, Long moduleId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));
        Module module = group.getModule_groups().stream()
                .filter(m -> m.getId().equals(moduleId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Module not found"));
        group.getModule_groups().remove(module);
        groupRepository.save(group);
    }

    @Transactional
    public void removeFunctionFromGroup(Long groupId, Long functionId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));
        Function function = functionRepository.findById(functionId)
                .orElseThrow(() -> new RuntimeException("Function not found"));
        group.getListe_function().remove(function);
        groupRepository.save(group);
    }

    public List<Module> getModulesByGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));
        return group.getModule_groups();
    }


    public List<Function> getFunctionsByGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found"));
        return group.getListe_function();
    }

    @Transactional
    public void assignModuleToGroup(Long groupId, Long moduleId) {
        // Retrieve the group entity from the database
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new EntityNotFoundException("Group not found"));

        // Retrieve the module entity from the database
        Module module = moduleRepository.findById(moduleId).orElseThrow(() -> new EntityNotFoundException("Module not found"));

        // Add the module to the group's list of modules
        group.getModule_groups().add(module);
        groupRepository.save(group);

    }


    @Transactional
    public void assignFunctionToGroup(Long groupId, Long functionId) {
        // Retrieve the group entity from the database
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new EntityNotFoundException("Group not found"));

        Function fct = functionRepository.findById(functionId).orElseThrow(() -> new EntityNotFoundException("fonction not found"));

        group.getListe_function().add(fct);
        groupRepository.save(group);

    }






}
