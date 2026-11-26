package br.com.n5study.core.progresso.dto;

import br.com.n5study.core.progresso.progressoEnum.TipoConteudo;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SessaoRequestDTO(

        @NotNull(message = "O tipo de conteudo e obrigatorio")
        TipoConteudo tipoConteudo,

        @NotBlank(message = "O item atual e obrigatorio")
        @Size(max = 60, message = "O item atual deve ter no maximo 60 caracteres")
        String itemId,

        @NotNull(message = "A posicao e obrigatoria")
        @Min(value = 0, message = "A posicao nao pode ser negativa")
        Integer posicao,

        @NotNull(message = "O total de itens e obrigatorio")
        @Min(value = 1, message = "O total de itens deve ser maior que zero")
        Integer totalItens
) {
}
