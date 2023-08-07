package com.example.backend.services;

import com.example.backend.dao.FunctionRepository;
import com.example.backend.dao.GroupRepository;
import com.example.backend.dao.RepRapportRepository;
import com.example.backend.dao.SubModuleRepository;
import com.example.backend.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service("FunctionService")

public class FunctionServiceImp implements FunctionService{
    @Autowired
    FunctionRepository funcRepo;
    @Autowired
    SubModuleRepository subRepo;

    @Autowired
    GroupService groupService;

    @Autowired
    GroupRepository grpRepo;
    @Autowired
    private RepRapportRepository repRapportRepository;
    @PersistenceContext
    private EntityManager em;

    @Override
    public Function addFunction(Function f) {
        return funcRepo.save(f);
    }

    @Override
    public List<Function> getListFunction() {
//        List<Object[]> result = new ArrayList<Object[]>();
//        result = em.createNativeQuery("select function0_.id as id1_0_, function0_.functionName as function2_0_, function0_.sub_module_id as sub_modu3_0_ from management.function function0_").getResultList();
//        return result;
        return funcRepo.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
    @Override
    public Optional<Function> getFunctionById(@PathVariable Long id){
        return funcRepo.findFunctionById(id);
    }

    @Override
    public void deleteFunc(Long id) {
        Optional<Function> optionalFunction = funcRepo.findById(id);
        if (optionalFunction.isPresent()) {
            Function function = optionalFunction.get();
            Optional<Group> grp = groupService.FindGroupByFunc(function.getId());
            if(grp.isPresent()){
                Group group = grp.get();
                List<Function> functions = group.getListe_function();
                functions.removeIf(f -> f.getId().equals(function.getId()));
                group.setListe_function(functions);
                grpRepo.save(group);
            }
            funcRepo.delete(function);
        }
    }

    @Override
    public Function updateFunction(long id, Function function) throws ResourceNotFoundException {
        Function existingFunction = funcRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("function not found for this id :: " + id));
        existingFunction.setFunctionName(function.getFunctionName());
        existingFunction.setGroup(function.getGroup());

        // Retrieve the sub-module from the database using the ID of the updated function's sub-module
        SubModule subModule = subRepo.findById(existingFunction.getSubModule().getId())
                .orElseThrow(() -> new ResourceNotFoundException("sub-module not found for this id :: " + function.getSubModule().getId()));
        existingFunction.setSubModule(subModule);

        final Function updatedFunction = funcRepo.save(existingFunction);

        return updatedFunction;
    }

    @Override
    public void assignRepRapportToFunction(Long functionId, Long repRapportId) {
        Function function = funcRepo.findById(functionId).orElseThrow(() -> new EntityNotFoundException("Function not found"));
        RepRapport repRapport = repRapportRepository.findFirstById(repRapportId);

        function.getListreprapport().add(repRapport);
        funcRepo.save(function);
    }

    @Override
    public List<RepRapport> getListRapport(){

        return repRapportRepository.findAll();
    }

    public List<RepRapport> getRepRapportsByFunctionId(Long functionId) {
        Function function = funcRepo.findById(functionId).orElseThrow(() -> new EntityNotFoundException("Function not found"));
        return function.getListreprapport();
    }

    public void removeRepRapportFromFunction(Long functionId, Long repRapportId) {
        Function function = funcRepo.findById(functionId).orElseThrow(() -> new EntityNotFoundException("Function not found"));
        RepRapport repRapport = repRapportRepository.findById(repRapportId).orElseThrow(() -> new EntityNotFoundException("RepRapport not found"));

        function.getListreprapport().remove(repRapport);
        funcRepo.save(function);
    }

    public List<BigInteger> findReportsByFunctionId(Long functionId) {
        return funcRepo.findReportsByFunctionId(functionId);
    }


}
