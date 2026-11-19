package br.com.n5study.excecao.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ErroResponseDTO(
        int status,
        String mensagem,
        List<String> detalhes,
        LocalDateTime momento
) {
}
