package com.example.backend.dao;

import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

    @Query(value = "SELECT r.* FROM etl.rep_rapports r inner join management.repports_users f ON r.id = f.list_rep_id WHERE f.user_id = ?1 ORDER BY f.order_rep asc", nativeQuery = true)
    List<BigInteger> findReportsByUserId(@PathVariable("functionId") Long functionId);


    @Modifying
    @Transactional
    @Query(value = "UPDATE management.repports_users SET order_rep = ?1 WHERE user_id = ?2 AND list_rep_id = ?3", nativeQuery = true)
    void updateReportOrderForUser(Long newOrder, Long userId, Long repId);

    @Query(value = "SELECT u FROM user u WHERE u.uMail = :mail")
    List<User> getUserByMail(@Param("mail") String mail);

    @Query(value = "SELECT u FROM user u WHERE u.uMail = :mail")
    User getUserByEmail(@Param("mail") String mail);

    @Query(value = "SELECT u FROM user u where u.uId=(SELECT p.user.id FROM PasswordResetToken p where p.token=:token)")
    //@Query(value = "SELECT u FROM user u JOIN PasswordResetToken t ON u.uId = t.uId WHERE t.token = :token")

    Optional<User> getUserByResetToken(String token);

}
