package com.project.capstone.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.capstone.role.Role;
import com.project.capstone.role.RoleRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * The Controller class for the User. Includes all API endpoints.
 */
@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    /**
     * Instance for the UserService.
     */
    private final UserService userService;
    /**
     * Instance for the Role Repository.
     */
    private final RoleRepository roleRepo;

    /**
     * Fetches all the users from the database.
     *
     * @return Returns a list of all the users in the database.
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    /**
     * A Post request to get the current user.
     *
     * @param user Passing in the current users username.
     * @return Returns all that current users information.
     */
    @PostMapping("/user")
    public ResponseEntity<User> getUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.getUser(user.getUsername()));
    }

    /**
     * Delete request to delete a user by id.
     *
     * @param id The id you would like to delete.
     * @return Return an ok if deleted.
     */
    @DeleteMapping(value = "user/delete/{id}", consumes = {"application/json"})
    public ResponseEntity<User> deleteUserById(@PathVariable("id") Integer id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Post request to create a new user.
     *
     * @param user Passing in a new User.
     * @return Return a User Response Entity created.
     */
    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/user/save").toUriString());
        user.setRoles(List.of(roleRepo.findByRoleName("ROLE_USER")));
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    /**
     * Put request to edit a users info.
     *
     * @param user    Passing in a user.
     * @param usersId The users id.
     * @return A response entity ok.
     * @throws UserNotFoundException Thrown when the user is not found.
     */
    @PutMapping("/user/edit/{id}")
    public ResponseEntity<User> updateUsers(@RequestBody User user, @PathVariable("id") Integer usersId) throws UserNotFoundException {
        userService.updateUser(user, usersId);
        return ResponseEntity.ok().build();
    }

    /**
     * Post request to add a role.
     *
     * @param role The role you would like to add.
     * @return Returns a created.
     */
    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    /**
     * Post request to add a role to a user.
     *
     * @param form The form for the role name and user.
     * @return Returns an ok and build.
     */
    @PostMapping("/role/addtouser")
    public ResponseEntity<?> RoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRolename());
        return ResponseEntity.ok().build();
    }

    /**
     * Get request to refresh the token.
     *
     * @param request  Http request which includes the refresh token.
     * @param response Respond with the new tokens.
     * @throws IOException Thrown when token is invalid or expired.
     */
    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                User user = userService.getUser(username);
                String accessToken = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("accessToken", accessToken);
                tokens.put("refreshToken", refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }


    }
}

/**
 * Form for adding a role to a user.
 */
@Data
class RoleToUserForm {
    private String username;
    private String rolename;
}
