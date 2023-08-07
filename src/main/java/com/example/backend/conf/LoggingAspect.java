package com.example.backend.conf;

import com.example.backend.dao.LogRepository;
import com.example.backend.dao.UserRepository;
import com.example.backend.entities.Logs;
import com.example.backend.entities.Module;
import com.example.backend.entities.User;
import com.example.backend.entities.*;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

@Aspect
@Component
public class LoggingAspect {
    private final LogRepository logsRepository;

    @Autowired
    private JwtTokenUtil utils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public LoggingAspect(LogRepository logsRepository) {
        this.logsRepository = logsRepository;
    }

    @After("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public void logEndpointAccess(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String url = request.getRequestURL().toString();
        String method = request.getMethod();
        Long user_id = getUserIdFromToken(request.getHeader("Authorization"));

        if (joinPoint.getTarget() instanceof BasicErrorController) {
            return; // Skip logging for this endpoint
        }
        // Save logs only for POST, PUT, and DELETE methods
        if (RequestMethod.POST.name().equalsIgnoreCase(method)
                || RequestMethod.PUT.name().equalsIgnoreCase(method)
                || RequestMethod.DELETE.name().equalsIgnoreCase(method)) {

            String tableName = getAffectedTableName(joinPoint);
            Long entityId = getEntityId(joinPoint);
            //System.out.println(entityId.longValue());
            Logs log = new Logs();
            log.setUserId(user_id);
            log.setAction(method);
            log.setTableAffected(tableName);
            log.setDate(LocalDateTime.now());
            log.setRowId(entityId);

            logsRepository.save(log);
        }
    }

    private Long getUserIdFromToken(String token) {
        // Logic to extract the user ID from the token
        // Implement your token decoding/validation logic here
        // Example: If your token is JWT, you can use a library like 'jjwt' to extract the user ID
        // Return the user ID extracted from the token
        if(token!=null){
            User user = utils.extractUser(token);
            if (user!=null){
                System.out.println(user.getUsername());
                Optional<User> u = userRepository.findByUsername(user.getUsername());
                return u.get().getuId();
            }else{
                return null;
            }
        }else{
            return null;
        }

    }

    private String getAffectedTableName(JoinPoint joinPoint) {
        // Get the target method's signature
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();

        // Get the class name of the target object
        String className = methodSignature.getDeclaringTypeName();

        // Get the method name
        String methodName = methodSignature.getName();

        // Extract the affected table name based on class and method name (you can modify this logic as per your naming conventions)
        String tableName = "";

        // Example: Assuming the class name follows the convention "com.example.backend.controllers.UserController"
        // and the method name is "createUser", we can extract the table name as "user"
        if (className.endsWith("Controller")) {
            String entityName = className.substring(0, className.lastIndexOf("Controller")).toLowerCase();

            // Exclude the value "basicerror"
            if (!entityName.equals("basicerror")) {
                tableName = entityName;
            }
        }

        return tableName;
    }

    private Long getEntityId(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        System.out.println("Method arguments: " + Arrays.toString(args));

        for (Object arg : args) {
            if (arg instanceof Module) {
                // Check if the module object has an ID
                Module module = (Module) arg;
                System.out.println("Module ID: " + module.getId());
                if (module.getId() != null && module.getId() > 0) {
                    return module.getId();
                }
            } else if (arg instanceof SubModule) {
                // Check if the submodule object has an ID
                SubModule subModule = (SubModule) arg;
                System.out.println("SubModule ID: " + subModule.getId());
                if (subModule.getId() != null) {
                    return subModule.getId();
                }
                else if (arg instanceof RepRapport) {
                    // Check if the repRapport object has an ID
                    RepRapport repRapport = (RepRapport) arg;
                    System.out.println("RepRapport ID: " + repRapport.getId());
                    if (repRapport.getId() != null) {
                        return repRapport.getId();
                    }
                }
            } else if (arg instanceof Function) {
                // Check if the function object has an ID
                Function function = (Function) arg;
                System.out.println("Function ID: " + function.getId());
                if (function.getId() != null) {
                    return function.getId();
                }
            } else if (arg instanceof Group) {
                // Check if the group object has an ID
                Group group = (Group) arg;
                System.out.println("Group ID: " + group.getgId());
                if (group.getgId() != null) {
                    return group.getgId();
                }
            } else if (arg instanceof User) {
                // Check if the user object has an ID
                User user = (User) arg;
                System.out.println("User ID: " + user.getuId());
                if (user.getuId() != null) {
                    return user.getuId();
                }
            } else if (arg instanceof Long) {
                // Check if the argument itself is the ID (for delete requests)
                Long entityId = (Long) arg;
                System.out.println("Entity ID: " + entityId);
                return entityId;
            }
        }

        return null;
    }





}
