package br.com.n5study.core.usuario.dto;

public record LoginResponseDTO(
        String token,
        String tipoToken,
        long expiraEmSegundos,
        UsuarioResponseDTO usuario
) {
}
