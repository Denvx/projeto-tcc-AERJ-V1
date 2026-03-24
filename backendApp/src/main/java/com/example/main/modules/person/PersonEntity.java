package com.example.main.modules.person;

import com.example.main.shared.enums.SexoEnum;
import com.example.main.shared.value_objects.CPFValue;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"cpf", "phone"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") //usado para tirar o loop infinito na hora de converter para json, pois a pessoa tem um relacionamento com o veiculo e o veiculo tem um relacionamento com a pessoa, e assim por diante

@Entity
@Table(name = "person")
public class PersonEntity {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Embedded // usado onde tem objetos ja prontos
    private CPFValue cpf; //aqui usamos o cpf value

    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private SexoEnum sexo;

    @Column(length = 20)
    private String phone;

    @Column(name = "created_at", updatable = false)
    @Setter(AccessLevel.NONE)
    private LocalDateTime createdAt;

    @PrePersist
    private void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}