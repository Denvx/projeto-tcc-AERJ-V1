package com.example.main.shared.enums;

public enum SexoEnum {
    MASCULINO("Masculino"),
    FEMININO("Feminino"),
    OUTRO("Outro");

    private final String sexo;

    SexoEnum(String descricao) {
        this.sexo = descricao;
    }

    public String getDescricao() {
        return sexo;
    }
}