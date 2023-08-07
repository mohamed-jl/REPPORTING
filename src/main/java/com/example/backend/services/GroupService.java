package com.example.backend.services;

import com.example.backend.entities.Function;
import com.example.backend.entities.Group;
import com.example.backend.entities.Module;

import java.util.List;
import java.util.Optional;


public interface GroupService {

    Group addGroup(Group group) ;
    Group editGroup(Group group,Long id);

    List<Group> getListGroup() ;
    void deleteGroup(Long gId) ;
    Optional<Group> FindGroupByFunc(Long gId) ;

    Group findById(Long gId);

    List<Group> findGroupByModule(Long Id);
    void removeModuleFromGroup(Long groupId, Long moduleId);

    void removeFunctionFromGroup(Long groupId, Long functionId);


    List<Module> getModulesByGroup(Long groupId);

    List<Function> getFunctionsByGroup(Long groupId);

    void assignModuleToGroup(Long groupId, Long moduleId);

    void assignFunctionToGroup(Long groupId, Long functionId);
}
