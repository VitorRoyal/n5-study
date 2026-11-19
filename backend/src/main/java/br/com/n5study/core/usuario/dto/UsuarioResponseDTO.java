package br.com.n5study.core.usuario.dto;

import br.com.n5study.core.usuario.usuarioEnum.PapelUsuario;
import java.time.LocalDateTime;

public record UsuarioResponseDTO(
        Long id,
        String nomeUsuario,
        PapelUsuario papel,
        LocalDateTime criadoEm
) {
}
