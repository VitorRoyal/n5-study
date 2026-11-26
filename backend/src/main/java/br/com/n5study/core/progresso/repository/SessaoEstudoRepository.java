package br.com.n5study.core.progresso.repository;

import br.com.n5study.core.progresso.entity.SessaoEstudo;
import br.com.n5study.core.usuario.entity.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessaoEstudoRepository extends JpaRepository<SessaoEstudo, Long> {

    Optional<SessaoEstudo> findByUsuario(Usuario usuario);
}
