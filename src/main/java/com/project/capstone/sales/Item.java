package com.project.capstone.sales;

import com.fasterxml.jackson.annotation.*;
import com.project.capstone.EntityIdResolver;
import com.project.capstone.category.Category;
import com.project.capstone.user.User;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "item")
@RequiredArgsConstructor
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "itemId", resolver = EntityIdResolver.class, scope = Item.class)
public class Item implements Serializable {
    @Id
    @Column(name = "item_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIdentityReference(alwaysAsId = true)
    private Integer itemId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    @ToString.Exclude
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    @ToString.Exclude
    private Category category;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "lot_num", nullable = false)
    private Integer lotNum;

    @Column(name = "description", nullable = false, length = 120)
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "picture_id", nullable = false)
    private Integer pictureId;

    @Column(name = "create_time")
    private LocalDate createTime;

    @Column(name = "renter_id", nullable = false)
    private Integer renterId;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    public Item(@JsonProperty("item_id") Integer itemId,
                @JsonProperty("owner_id")User owner,
                @JsonProperty("category_id")Category category,
                @JsonProperty("name")String name,
                @JsonProperty("lot_num") Integer lotNum,
                @JsonProperty("description")String description,
                @JsonProperty("price")Double price,
                @JsonProperty("picture_id")Integer pictureId,
                @JsonProperty("create_time")LocalDate createTime,
                @JsonProperty("renter_id") Integer renterId,
                @JsonProperty("status")String status) {
        this.itemId = itemId;
        this.owner = owner;
        this.category = category;
        this.name = name;
        this.lotNum = lotNum;
        this.description = description;
        this.price = price;
        this.pictureId = pictureId;
        this.createTime = createTime;
        this.renterId = renterId;
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getRenterId() {
        return renterId;
    }

    public void setRenterId(Integer renterId) {
        this.renterId = renterId;
    }

    public LocalDate getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDate createTime) {
        this.createTime = createTime;
    }

    public Integer getPictureId() {
        return pictureId;
    }

    public void setPictureId(Integer pictureId) {
        this.pictureId = pictureId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLotNum() {
        return lotNum;
    }

    public void setLotNum(Integer lotNum) {
        this.lotNum = lotNum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer id) {
        this.itemId = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }


}