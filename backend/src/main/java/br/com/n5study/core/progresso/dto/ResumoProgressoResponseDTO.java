package br.com.n5study.core.progresso.dto;

import java.util.List;

public record ResumoProgressoResponseDTO(
        long totalAcertos,
        long totalErros,
        long palavrasRevisadas,
        int sequenciaAtual,
        int melhorSequencia,
        List<ResumoPorTipoResponseDTO> porTipo
) {
}
