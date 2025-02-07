package com.project.capstone.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception for when the user is not found.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends Exception{
    /**
     * Constructor for the UserNotFoundException.
     * @param id The users id.
     */
    public UserNotFoundException(Integer id){
        super(String.format("No User was found for id: %s. Check your inputs.", id));
    }

}
