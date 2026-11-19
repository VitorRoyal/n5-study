package br.com.n5study.core.usuario.mapper;

import br.com.n5study.core.usuario.dto.UsuarioResponseDTO;
import br.com.n5study.core.usuario.entity.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioResponseDTO toDTO(Usuario usuario);
}
