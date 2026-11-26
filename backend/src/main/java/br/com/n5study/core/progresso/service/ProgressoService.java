package br.com.n5study.core.progresso.service;

import br.com.n5study.core.progresso.dto.RespostaRequestDTO;
import br.com.n5study.core.progresso.dto.RespostaResponseDTO;
import br.com.n5study.core.progresso.dto.ResumoPorTipoResponseDTO;
import br.com.n5study.core.progresso.dto.ResumoProgressoResponseDTO;
import br.com.n5study.core.progresso.dto.SessaoRequestDTO;
import br.com.n5study.core.progresso.dto.SessaoResponseDTO;
import br.com.n5study.core.progresso.entity.RespostaEstudo;
import br.com.n5study.core.progresso.entity.SessaoEstudo;
import br.com.n5study.core.progresso.mapper.ProgressoMapper;
import br.com.n5study.core.progresso.repository.RespostaEstudoRepository;
import br.com.n5study.core.progresso.repository.SessaoEstudoRepository;
import br.com.n5study.core.usuario.entity.Usuario;
import br.com.n5study.core.usuario.service.UsuarioService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProgressoService {

    private static final Logger logger = LoggerFactory.getLogger(ProgressoService.class);

    private final RespostaEstudoRepository respostaEstudoRepository;
    private final SessaoEstudoRepository sessaoEstudoRepository;
    private final UsuarioService usuarioService;
    private final ProgressoMapper progressoMapper;

    public ProgressoService(
            RespostaEstudoRepository respostaEstudoRepository,
            SessaoEstudoRepository sessaoEstudoRepository,
            UsuarioService usuarioService,
            ProgressoMapper progressoMapper
    ) {
        this.respostaEstudoRepository = respostaEstudoRepository;
        this.sessaoEstudoRepository = sessaoEstudoRepository;
        this.usuarioService = usuarioService;
        this.progressoMapper = progressoMapper;
    }

    public RespostaResponseDTO registrarResposta(String nomeUsuario, RespostaRequestDTO respostaRequestDTO) {
        Usuario usuario = usuarioService.buscarPorNomeUsuario(nomeUsuario);

        RespostaEstudo respostaEstudo = new RespostaEstudo();
        respostaEstudo.setUsuario(usuario);
        respostaEstudo.setTipoConteudo(respostaRequestDTO.tipoConteudo());
        respostaEstudo.setItemId(respostaRequestDTO.itemId());
        respostaEstudo.setAcertou(respostaRequestDTO.acertou());
        respostaEstudo.setRespondidoEm(LocalDateTime.now());

        RespostaEstudo respostaSalva = respostaEstudoRepository.save(respostaEstudo);

        return progressoMapper.toDTO(respostaSalva);
    }

    @Transactional(readOnly = true)
    public ResumoProgressoResponseDTO buscarResumo(String nomeUsuario) {
        Usuario usuario = usuarioService.buscarPorNomeUsuario(nomeUsuario);

        long totalAcertos = respostaEstudoRepository.countByUsuarioAndAcertou(usuario, true);
        long totalErros = respostaEstudoRepository.countByUsuarioAndAcertou(usuario, false);
        long palavrasRevisadas = respostaEstudoRepository.contarItensDistintos(usuario);

        Sequencias sequencias = calcularSequencias(respostaEstudoRepository.listarAcertosEmOrdem(usuario));
        List<ResumoPorTipoResponseDTO> porTipo = respostaEstudoRepository.resumirPorTipo(usuario);

        return new ResumoProgressoResponseDTO(
                totalAcertos,
                totalErros,
                palavrasRevisadas,
                sequencias.atual(),
                sequencias.melhor(),
                porTipo
        );
    }

    @Transactional(readOnly = true)
    public Optional<SessaoResponseDTO> buscarSessao(String nomeUsuario) {
        Usuario usuario = usuarioService.buscarPorNomeUsuario(nomeUsuario);

        return sessaoEstudoRepository
                .findByUsuario(usuario)
                .map(progressoMapper::toDTO);
    }

    @Transactional
    public SessaoResponseDTO salvarSessao(String nomeUsuario, SessaoRequestDTO sessaoRequestDTO) {
        Usuario usuario = usuarioService.buscarPorNomeUsuario(nomeUsuario);

        SessaoEstudo sessaoEstudo = sessaoEstudoRepository
                .findByUsuario(usuario)
                .orElseGet(() -> criarSessao(usuario));

        sessaoEstudo.setTipoConteudo(sessaoRequestDTO.tipoConteudo());
        sessaoEstudo.setItemId(sessaoRequestDTO.itemId());
        sessaoEstudo.setPosicao(sessaoRequestDTO.posicao());
        sessaoEstudo.setTotalItens(sessaoRequestDTO.totalItens());
        sessaoEstudo.setAtualizadoEm(LocalDateTime.now());

        SessaoEstudo sessaoSalva = sessaoEstudoRepository.save(sessaoEstudo);

        logger.info("Sessao de estudo atualizada para o usuario {}", usuario.getNomeUsuario());

        return progressoMapper.toDTO(sessaoSalva);
    }

    private SessaoEstudo criarSessao(Usuario usuario) {
        SessaoEstudo sessaoEstudo = new SessaoEstudo();
        sessaoEstudo.setUsuario(usuario);

        return sessaoEstudo;
    }

    private Sequencias calcularSequencias(List<Boolean> acertosEmOrdem) {
        int atual = 0;
        int melhor = 0;

        for (Boolean acerto : acertosEmOrdem) {
            if (Boolean.TRUE.equals(acerto)) {
                atual = atual + 1;

                if (atual > melhor) {
                    melhor = atual;
                }
            } else {
                atual = 0;
            }
        }

        return new Sequencias(atual, melhor);
    }

    private record Sequencias(int atual, int melhor) {
    }
}
