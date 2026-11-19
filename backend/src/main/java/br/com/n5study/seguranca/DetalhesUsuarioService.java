package br.com.n5study.seguranca;

import br.com.n5study.core.usuario.entity.Usuario;
import br.com.n5study.core.usuario.repository.UsuarioRepository;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DetalhesUsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public DetalhesUsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String nomeUsuario) {
        Usuario usuario = usuarioRepository
                .findByNomeUsuario(nomeUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario nao encontrado: " + nomeUsuario));

        return new User(
                usuario.getNomeUsuario(),
                usuario.getSenhaHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getPapel().name()))
        );
    }
}
