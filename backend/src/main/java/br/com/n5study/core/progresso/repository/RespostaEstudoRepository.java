package br.com.n5study.core.progresso.repository;

import br.com.n5study.core.progresso.dto.ResumoPorTipoResponseDTO;
import br.com.n5study.core.progresso.entity.RespostaEstudo;
import br.com.n5study.core.usuario.entity.Usuario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RespostaEstudoRepository extends JpaRepository<RespostaEstudo, Long> {

    long countByUsuarioAndAcertou(Usuario usuario, boolean acertou);

    @Query("select count(distinct r.itemId) from RespostaEstudo r where r.usuario = :usuario")
    long contarItensDistintos(@Param("usuario") Usuario usuario);

    @Query("select r.acertou from RespostaEstudo r where r.usuario = :usuario order by r.respondidoEm asc, r.id asc")
    List<Boolean> listarAcertosEmOrdem(@Param("usuario") Usuario usuario);

    @Query("""
            select new br.com.n5study.core.progresso.dto.ResumoPorTipoResponseDTO(
                r.tipoConteudo,
                sum(case when r.acertou = true then 1L else 0L end),
                sum(case when r.acertou = false then 1L else 0L end),
                count(distinct r.itemId))
            from RespostaEstudo r
            where r.usuario = :usuario
            group by r.tipoConteudo
            order by r.tipoConteudo asc
            """)
    List<ResumoPorTipoResponseDTO> resumirPorTipo(@Param("usuario") Usuario usuario);
}
