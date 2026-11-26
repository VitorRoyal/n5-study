package br.com.n5study.core.progresso.dto;

import br.com.n5study.core.progresso.progressoEnum.TipoConteudo;

public record ResumoPorTipoResponseDTO(
        TipoConteudo tipoConteudo,
        Long acertos,
        Long erros,
        Long revisados
) {
}
