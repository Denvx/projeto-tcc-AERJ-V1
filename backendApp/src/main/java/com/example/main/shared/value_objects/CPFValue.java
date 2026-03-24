package com.example.main.shared.value_objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;



@Embeddable
public class CPFValue {

    @Column(nullable = false, unique = true)
    private String cpf;

    public CPFValue() {}

    public CPFValue(String cpf) {
        setCpf(cpf);
    }

    @JsonProperty("cpf")
    public String getCpf() {
        return cpf;
    }

    @JsonProperty("cpf")
    public void setCpf(String receivedCpf) {
        if (receivedCpf == null || receivedCpf.isBlank()) {
            throw new IllegalArgumentException("CPF não pode ser nulo ou vazio");
        }

        String cleanCpf = receivedCpf.replaceAll("[^0-9]", "");

        if (!cleanCpf.matches("\\d{11}")) {
            throw new IllegalArgumentException("CPF inválido");
        }

        if (!cpfValido(cleanCpf)) {
            throw new IllegalArgumentException("CPF inválido");
        }

        this.cpf = cleanCpf;
    }

    private boolean cpfValido(String cpf) {
        if (cpf.chars().distinct().count() == 1) return false;

        int soma = 0;
        for (int i = 0; i < 9; i++) soma += (cpf.charAt(i) - '0') * (10 - i);
        int resto = soma % 11;
        int dig1 = resto < 2 ? 0 : 11 - resto;

        if (dig1 != (cpf.charAt(9) - '0')) return false;

        soma = 0;
        for (int i = 0; i < 10; i++) soma += (cpf.charAt(i) - '0') * (11 - i);
        resto = soma % 11;
        int dig2 = resto < 2 ? 0 : 11 - resto;

        return dig2 == (cpf.charAt(10) - '0');
    }
}