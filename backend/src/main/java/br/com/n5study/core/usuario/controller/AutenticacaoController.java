package br.com.n5study.core.usuario.controller;

import br.com.n5study.core.usuario.dto.CadastroRequestDTO;
import br.com.n5study.core.usuario.dto.LoginRequestDTO;
import br.com.n5study.core.usuario.dto.LoginResponseDTO;
import br.com.n5study.core.usuario.service.AutenticacaoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/autenticacao")
public class AutenticacaoController {

    private final AutenticacaoService autenticacaoService;

    public AutenticacaoController(AutenticacaoService autenticacaoService) {
        this.autenticacaoService = autenticacaoService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        return ResponseEntity.ok(autenticacaoService.autenticar(loginRequestDTO));
    }

    @PostMapping("/cadastro")
    public ResponseEntity<LoginResponseDTO> cadastro(@Valid @RequestBody CadastroRequestDTO cadastroRequestDTO) {
        return ResponseEntity.ok(autenticacaoService.cadastrar(cadastroRequestDTO));
    }
}
