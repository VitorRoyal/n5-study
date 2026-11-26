package br.com.n5study.core.progresso.mapper;

import br.com.n5study.core.progresso.dto.RespostaResponseDTO;
import br.com.n5study.core.progresso.dto.SessaoResponseDTO;
import br.com.n5study.core.progresso.entity.RespostaEstudo;
import br.com.n5study.core.progresso.entity.SessaoEstudo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProgressoMapper {

    RespostaResponseDTO toDTO(RespostaEstudo respostaEstudo);

    SessaoResponseDTO toDTO(SessaoEstudo sessaoEstudo);
}
