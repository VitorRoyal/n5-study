package br.com.n5study.core.usuario.service;

import br.com.n5study.core.usuario.dto.CadastroRequestDTO;
import br.com.n5study.core.usuario.dto.UsuarioResponseDTO;
import br.com.n5study.core.usuario.entity.Usuario;
import br.com.n5study.core.usuario.mapper.UsuarioMapper;
import br.com.n5study.core.usuario.repository.UsuarioRepository;
import br.com.n5study.core.usuario.usuarioEnum.PapelUsuario;
import br.com.n5study.excecao.RecursoNaoEncontradoException;
import br.com.n5study.excecao.UsuarioJaCadastradoException;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioMapper usuarioMapper;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            UsuarioMapper usuarioMapper
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuarioMapper = usuarioMapper;
    }

    public Usuario cadastrar(CadastroRequestDTO cadastroRequestDTO, PapelUsuario papel) {
        String nomeUsuario = normalizarNomeUsuario(cadastroRequestDTO.nomeUsuario());

        if (usuarioRepository.existsByNomeUsuario(nomeUsuario)) {
            throw new UsuarioJaCadastradoException("Ja existe um usuario com o nome: " + nomeUsuario);
        }

        Usuario usuario = montarUsuario(nomeUsuario, cadastroRequestDTO.senha(), papel);
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        logger.info("Usuario cadastrado: {}", usuarioSalvo.getNomeUsuario());

        return usuarioSalvo;
    }

    public Usuario buscarPorNomeUsuario(String nomeUsuario) {
        return usuarioRepository
                .findByNomeUsuario(normalizarNomeUsuario(nomeUsuario))
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuario nao encontrado: " + nomeUsuario));
    }

    public UsuarioResponseDTO buscarDadosPorNomeUsuario(String nomeUsuario) {
        return usuarioMapper.toDTO(buscarPorNomeUsuario(nomeUsuario));
    }

    public boolean existePorNomeUsuario(String nomeUsuario) {
        return usuarioRepository.existsByNomeUsuario(normalizarNomeUsuario(nomeUsuario));
    }

    private Usuario montarUsuario(String nomeUsuario, String senha, PapelUsuario papel) {
        Usuario usuario = new Usuario();
        usuario.setNomeUsuario(nomeUsuario);
        usuario.setSenhaHash(passwordEncoder.encode(senha));
        usuario.setPapel(papel);
        usuario.setCriadoEm(LocalDateTime.now());

        return usuario;
    }

    private String normalizarNomeUsuario(String nomeUsuario) {
        return nomeUsuario.trim().toLowerCase();
    }
}
