package br.com.n5study.core.progresso.dto;

import br.com.n5study.core.progresso.progressoEnum.TipoConteudo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RespostaRequestDTO(

        @NotNull(message = "O tipo de conteudo e obrigatorio")
        TipoConteudo tipoConteudo,

        @NotBlank(message = "O item respondido e obrigatorio")
        @Size(max = 60, message = "O item respondido deve ter no maximo 60 caracteres")
        String itemId,

        @NotNull(message = "E obrigatorio informar se o usuario acertou")
        Boolean acertou
) {
}
