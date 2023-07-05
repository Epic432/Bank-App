package com.example.bank.dao;

import com.example.bank.model.Account;
import java.util.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends MongoRepository<Account, ObjectId> {

    Optional<Account> getAccountByAccountID(int accountID);

    List<Account> getAccountsByUserID(String userID);

    void deleteAllAccountsByUserID(String userID);

}
