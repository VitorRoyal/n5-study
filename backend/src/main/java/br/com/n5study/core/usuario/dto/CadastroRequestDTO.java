package br.com.n5study.core.usuario.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CadastroRequestDTO(

        @NotBlank(message = "O nome de usuario e obrigatorio")
        @Size(min = 3, max = 60, message = "O nome de usuario deve ter entre 3 e 60 caracteres")
        String nomeUsuario,

        @NotBlank(message = "A senha e obrigatoria")
        @Size(min = 6, max = 72, message = "A senha deve ter entre 6 e 72 caracteres")
        String senha
) {
}
