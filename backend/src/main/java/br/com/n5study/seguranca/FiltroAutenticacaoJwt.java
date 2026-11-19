package br.com.n5study.seguranca;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

public class FiltroAutenticacaoJwt extends OncePerRequestFilter {

    private static final String PREFIXO_BEARER = "Bearer ";

    private final JwtService jwtService;
    private final DetalhesUsuarioService detalhesUsuarioService;

    public FiltroAutenticacaoJwt(JwtService jwtService, DetalhesUsuarioService detalhesUsuarioService) {
        this.jwtService = jwtService;
        this.detalhesUsuarioService = detalhesUsuarioService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String token = extrairToken(request);

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        if (!jwtService.tokenValido(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        autenticarRequisicao(request, token);
        filterChain.doFilter(request, response);
    }

    private void autenticarRequisicao(HttpServletRequest request, String token) {
        String nomeUsuario = jwtService.extrairNomeUsuario(token);

        UserDetails userDetails;

        try {
            userDetails = detalhesUsuarioService.loadUserByUsername(nomeUsuario);
        } catch (UsernameNotFoundException usernameNotFoundException) {
            return;
        }

        UsernamePasswordAuthenticationToken autenticacao = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        autenticacao.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(autenticacao);
    }

    private String extrairToken(HttpServletRequest request) {
        String cabecalho = request.getHeader("Authorization");

        if (cabecalho == null) {
            return null;
        }

        if (!cabecalho.startsWith(PREFIXO_BEARER)) {
            return null;
        }

        return cabecalho.substring(PREFIXO_BEARER.length());
    }
}
