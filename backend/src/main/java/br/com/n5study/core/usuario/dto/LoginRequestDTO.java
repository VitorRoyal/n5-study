package br.com.n5study.core.usuario.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(

        @NotBlank(message = "O nome de usuario e obrigatorio")
        String nomeUsuario,

        @NotBlank(message = "A senha e obrigatoria")
        String senha
) {
}
