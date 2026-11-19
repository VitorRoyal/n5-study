package br.com.n5study.seguranca;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final SecretKey chaveAssinatura;
    private final long expiracaoEmSegundos;

    public JwtService(
            @Value("${n5study.jwt.segredo}") String segredo,
            @Value("${n5study.jwt.expiracao-em-segundos}") long expiracaoEmSegundos
    ) {
        this.chaveAssinatura = io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                segredo.getBytes(StandardCharsets.UTF_8)
        );
        this.expiracaoEmSegundos = expiracaoEmSegundos;
    }

    public String gerarToken(String nomeUsuario, String papel) {
        Instant agora = Instant.now();
        Instant expiracao = agora.plusSeconds(expiracaoEmSegundos);

        return Jwts.builder()
                .subject(nomeUsuario)
                .claim("papel", papel)
                .issuedAt(Date.from(agora))
                .expiration(Date.from(expiracao))
                .signWith(chaveAssinatura)
                .compact();
    }

    public String extrairNomeUsuario(String token) {
        return lerClaims(token).getSubject();
    }

    public boolean tokenValido(String token) {
        try {
            lerClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException excecao) {
            return false;
        }
    }

    public long getExpiracaoEmSegundos() {
        return expiracaoEmSegundos;
    }

    private Claims lerClaims(String token) {
        return Jwts.parser()
                .verifyWith(chaveAssinatura)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
