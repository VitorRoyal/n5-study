package br.com.n5study.core.usuario.service;

import br.com.n5study.core.usuario.dto.CadastroRequestDTO;
import br.com.n5study.core.usuario.dto.LoginRequestDTO;
import br.com.n5study.core.usuario.dto.LoginResponseDTO;
import br.com.n5study.core.usuario.entity.Usuario;
import br.com.n5study.core.usuario.mapper.UsuarioMapper;
import br.com.n5study.core.usuario.repository.UsuarioRepository;
import br.com.n5study.core.usuario.usuarioEnum.PapelUsuario;
import br.com.n5study.excecao.CredenciaisInvalidasException;
import br.com.n5study.seguranca.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {

    private static final Logger logger = LoggerFactory.getLogger(AutenticacaoService.class);
    private static final String TIPO_TOKEN = "Bearer";
    private static final String MENSAGEM_CREDENCIAIS_INVALIDAS = "Usuario ou senha invalidos";

    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsuarioMapper usuarioMapper;

    public AutenticacaoService(
            UsuarioRepository usuarioRepository,
            UsuarioService usuarioService,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            UsuarioMapper usuarioMapper
    ) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.usuarioMapper = usuarioMapper;
    }

    public LoginResponseDTO autenticar(LoginRequestDTO loginRequestDTO) {
        Usuario usuario = buscarParaAutenticacao(loginRequestDTO.nomeUsuario());

        if (!passwordEncoder.matches(loginRequestDTO.senha(), usuario.getSenhaHash())) {
            logger.warn("Tentativa de login com senha invalida para: {}", usuario.getNomeUsuario());
            throw new CredenciaisInvalidasException(MENSAGEM_CREDENCIAIS_INVALIDAS);
        }

        return montarResposta(usuario);
    }

    public LoginResponseDTO cadastrar(CadastroRequestDTO cadastroRequestDTO) {
        Usuario usuario = usuarioService.cadastrar(cadastroRequestDTO, PapelUsuario.ESTUDANTE);

        return montarResposta(usuario);
    }

    private Usuario buscarParaAutenticacao(String nomeUsuario) {
        return usuarioRepository
                .findByNomeUsuario(nomeUsuario.trim().toLowerCase())
                .orElseThrow(() -> new CredenciaisInvalidasException(MENSAGEM_CREDENCIAIS_INVALIDAS));
    }

    private LoginResponseDTO montarResposta(Usuario usuario) {
        String token = jwtService.gerarToken(usuario.getNomeUsuario(), usuario.getPapel().name());

        return new LoginResponseDTO(
                token,
                TIPO_TOKEN,
                jwtService.getExpiracaoEmSegundos(),
                usuarioMapper.toDTO(usuario)
        );
    }
}
