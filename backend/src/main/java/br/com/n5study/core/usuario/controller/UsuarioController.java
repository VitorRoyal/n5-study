package br.com.n5study.core.usuario.controller;

import br.com.n5study.core.usuario.dto.UsuarioResponseDTO;
import br.com.n5study.core.usuario.service.UsuarioService;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/eu")
    public ResponseEntity<UsuarioResponseDTO> buscarUsuarioLogado(Principal principal) {
        return ResponseEntity.ok(usuarioService.buscarDadosPorNomeUsuario(principal.getName()));
    }
}
