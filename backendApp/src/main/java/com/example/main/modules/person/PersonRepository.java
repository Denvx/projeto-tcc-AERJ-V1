package com.example.main.modules.person;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<PersonEntity, Integer> {

    Optional<PersonEntity> findByCpf_Cpf(String cpf);
    boolean existsByCpf_Cpf(String cpf);
    Page<PersonEntity> findByNameContainingIgnoreCase(String name, Pageable pageable);
}