package com.example.main.modules.person;

import com.example.main.shared.enums.SexoEnum;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") //usado para tirar o loop infinito na hora de converter para json, pois a pessoa tem um relacionamento com o veiculo e o veiculo tem um relacionamento com a pessoa, e assim por diante

@Entity
@Table(name = "person")
public class PersonEntity {
    @Id
    private int id;

    private String name;
    private String cpf;
    private LocalDate birthDate;
    private SexoEnum sexo;
    private String phone;
    private LocalDateTime createdAt;

}
