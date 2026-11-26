package br.com.n5study.core.progresso.dto;

import br.com.n5study.core.progresso.progressoEnum.TipoConteudo;
import java.time.LocalDateTime;

public record RespostaResponseDTO(
        Long id,
        TipoConteudo tipoConteudo,
        String itemId,
        boolean acertou,
        LocalDateTime respondidoEm
) {
}
