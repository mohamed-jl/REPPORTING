package com.example.backend.Controllers;

import com.example.backend.dao.FunctionRepository;
import com.example.backend.entities.Function;
import com.example.backend.entities.RepRapport;
import com.example.backend.services.FunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/function")
public class FunctionController {

    @Autowired
    private FunctionService funcService;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private FunctionRepository functionRepository;

    @RequestMapping(value="/add",method= RequestMethod.POST,consumes =  MediaType.APPLICATION_JSON_VALUE)
    public void addFunction(@RequestBody Function function) {
        funcService.addFunction(function);
    }

    @RequestMapping(value = "/list")
    public List<Function> allFunctions(){
        return funcService.getListFunction();
    }

    @RequestMapping(value = "/find/{id}",method = RequestMethod.GET)
    public Optional<Function> getFunctionById(@PathVariable Long id){
        return funcService.getFunctionById(id);
    }
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        funcService.deleteFunc(id);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Function> updateFunction(@PathVariable("id") long id, @RequestBody Function function) {

        Function updatedFunction=funcService.updateFunction(id, function);

        return ResponseEntity.ok(updatedFunction);
    }
    @PutMapping("/{functionId}/reprapports/{repRapportId}")
    public ResponseEntity<?> assignRepRapportToFunction(@PathVariable Long functionId, @PathVariable Long repRapportId) {
        funcService.assignRepRapportToFunction(functionId, repRapportId);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/rapports")
    public List<RepRapport> getListRapport(){
        return funcService.getListRapport();
    }

    @GetMapping("/{functionId}/reprapports")
    public ResponseEntity<List<RepRapport>> getRepRapportsByFunctionId(@PathVariable Long functionId) {
        List<RepRapport> repRapports = funcService.getRepRapportsByFunctionId(functionId);
        return ResponseEntity.ok(repRapports);
    }

    @DeleteMapping("/{functionId}/reprapports/{repRapportId}")
    public ResponseEntity<?> removeRepRapportFromFunction(@PathVariable Long functionId, @PathVariable Long repRapportId) {
        funcService.removeRepRapportFromFunction(functionId, repRapportId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{functionId}/reports")
    public List<RepRapport> getRepRapportsByFunctionIdOrdered(@PathVariable Long functionId) {
        System.out.println(funcService.findReportsByFunctionId(functionId));
        List<BigInteger>RepRaportIds=funcService.findReportsByFunctionId(functionId);
        List<RepRapport> repRapports = new ArrayList<>();
        for (BigInteger reprapportId:RepRaportIds){
            RepRapport rapport=entityManager.find(RepRapport.class,reprapportId.longValue());
            if (rapport!=null){
                repRapports.add(rapport);
            }
        }
        return repRapports;
    }

    @PutMapping("/{functionId}/reports/{repId}/order")
    public ResponseEntity<?> updateReportOrderForFunction(@PathVariable Long functionId,@PathVariable Long repId ,@RequestParam Long newOrder){
        Optional<Function> optionalFunction =functionRepository.findById(functionId);
        if (optionalFunction.isPresent()){
            Function  function=optionalFunction.get();
            List<RepRapport> rapports = function.getListreprapport();
            for (RepRapport rapport:rapports) {
                if (rapport.getId().equals(repId)){
                    functionRepository.updateReportOrderForFunction(newOrder,functionId,repId);
                    return ResponseEntity.ok().build();
                }
            }
            return ResponseEntity.notFound().build();
        }else {
            return ResponseEntity.notFound().build();
        }

    }

}
