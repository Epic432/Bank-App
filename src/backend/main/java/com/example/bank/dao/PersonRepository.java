package com.example.bank.dao;

import java.util.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.bank.model.Person;

@Repository
public interface PersonRepository extends MongoRepository<Person, ObjectId> {

    Optional<Person> getUserByUserID(String userID);

}