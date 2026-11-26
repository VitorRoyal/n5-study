package br.com.n5study.core.progresso.dto;

import br.com.n5study.core.progresso.progressoEnum.TipoConteudo;
import java.time.LocalDateTime;

public record SessaoResponseDTO(
        TipoConteudo tipoConteudo,
        String itemId,
        int posicao,
        int totalItens,
        LocalDateTime atualizadoEm
) {
}
