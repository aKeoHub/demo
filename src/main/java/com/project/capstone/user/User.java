package com.project.capstone.user;

import com.fasterxml.jackson.annotation.*;
import com.project.capstone.EntityIdResolver;
import com.project.capstone.event.Event;
import com.project.capstone.forum.Forum;
import com.project.capstone.sales.Item;
import com.project.capstone.role.Role;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "user")
@RequiredArgsConstructor
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "userId", resolver = EntityIdResolver.class, scope = User.class)
public class User implements Serializable {

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIdentityReference(alwaysAsId = true)
    private Integer userId;

    @Column(name = "username", nullable = false, length = 30)
    private String username;

    @Column(name = "firstname", nullable = false, length = 30)
    private String firstname;

    @Column(name = "lastname", nullable = false, length = 30)
    private String lastname;

    @Column(name = "password", nullable = false, length = 30)
    private String password;

    @Column(name = "email", nullable = false, length = 72)
    private String email;

    @Column(name = "picture_id")
    private Integer pictureId;

    @Column(name = "create_date")
    private LocalDate createDate;

    @OneToMany(fetch = FetchType.LAZY) //mappedBy - indicate the given column is owned by another entity
    @JoinColumn(name = "event_id")
    @ToString.Exclude
    private Collection<Event> events = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    @ToString.Exclude
    private Collection<Item> items = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "users")
    @ToString.Exclude
    private Collection<Role> roles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "creator")
    @ToString.Exclude
    private Set<Forum> forums = new LinkedHashSet<>();

    public User(@JsonProperty("user_id") Integer userId,
                @JsonProperty("username") String username,
                @JsonProperty("password") String password,
                @JsonProperty("firstname") String firstname,
                @JsonProperty("lastname") String lastname,
                @JsonProperty("email") String email,
                @JsonProperty("picture_id") Integer picture_id,
                @JsonProperty("create_date") LocalDate create_date) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.pictureId = picture_id;
        this.createDate = create_date;
    }
    @JsonIgnore
    public Set<Forum> getForums() {
        return forums;
    }

    public void setForums(Set<Forum> forums) {
        this.forums = forums;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    @JsonIgnore
    public Collection<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }
    @JsonIgnore
    public Collection<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public LocalDate getCreateDate() {return createDate;}

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public Integer getPictureId() {
        return pictureId;
    }

    public void setPictureId(Integer pictureId) {
        this.pictureId = pictureId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer id) {
        this.userId = id;
    }
}