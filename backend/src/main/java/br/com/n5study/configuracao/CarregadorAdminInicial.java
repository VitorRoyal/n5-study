package br.com.n5study.configuracao;

import br.com.n5study.core.usuario.dto.CadastroRequestDTO;
import br.com.n5study.core.usuario.service.UsuarioService;
import br.com.n5study.core.usuario.usuarioEnum.PapelUsuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CarregadorAdminInicial implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(CarregadorAdminInicial.class);

    private final UsuarioService usuarioService;
    private final String nomeUsuarioAdmin;
    private final String senhaAdmin;

    public CarregadorAdminInicial(
            UsuarioService usuarioService,
            @Value("${n5study.admin.nome-usuario}") String nomeUsuarioAdmin,
            @Value("${n5study.admin.senha}") String senhaAdmin
    ) {
        this.usuarioService = usuarioService;
        this.nomeUsuarioAdmin = nomeUsuarioAdmin;
        this.senhaAdmin = senhaAdmin;
    }

    @Override
    public void run(String... args) {
        if (usuarioService.existePorNomeUsuario(nomeUsuarioAdmin)) {
            logger.info("Usuario admin ja existe, nenhuma acao necessaria");
            return;
        }

        CadastroRequestDTO cadastroRequestDTO = new CadastroRequestDTO(nomeUsuarioAdmin, senhaAdmin);
        usuarioService.cadastrar(cadastroRequestDTO, PapelUsuario.ADMIN);

        logger.info("Usuario admin criado com o nome: {}", nomeUsuarioAdmin);
    }
}
