package br.com.n5study.core.progresso.controller;

import br.com.n5study.core.progresso.dto.RespostaRequestDTO;
import br.com.n5study.core.progresso.dto.RespostaResponseDTO;
import br.com.n5study.core.progresso.dto.ResumoProgressoResponseDTO;
import br.com.n5study.core.progresso.dto.SessaoRequestDTO;
import br.com.n5study.core.progresso.dto.SessaoResponseDTO;
import br.com.n5study.core.progresso.service.ProgressoService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/progresso")
public class ProgressoController {

    private final ProgressoService progressoService;

    public ProgressoController(ProgressoService progressoService) {
        this.progressoService = progressoService;
    }

    @PostMapping("/respostas")
    public ResponseEntity<RespostaResponseDTO> registrarResposta(
            Principal principal,
            @Valid @RequestBody RespostaRequestDTO respostaRequestDTO
    ) {
        return ResponseEntity.ok(progressoService.registrarResposta(principal.getName(), respostaRequestDTO));
    }

    @GetMapping("/resumo")
    public ResponseEntity<ResumoProgressoResponseDTO> buscarResumo(Principal principal) {
        return ResponseEntity.ok(progressoService.buscarResumo(principal.getName()));
    }

    @GetMapping("/sessao")
    public ResponseEntity<SessaoResponseDTO> buscarSessao(Principal principal) {
        Optional<SessaoResponseDTO> sessao = progressoService.buscarSessao(principal.getName());

        if (sessao.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(sessao.get());
    }

    @PutMapping("/sessao")
    public ResponseEntity<SessaoResponseDTO> salvarSessao(
            Principal principal,
            @Valid @RequestBody SessaoRequestDTO sessaoRequestDTO
    ) {
        return ResponseEntity.ok(progressoService.salvarSessao(principal.getName(), sessaoRequestDTO));
    }
}
