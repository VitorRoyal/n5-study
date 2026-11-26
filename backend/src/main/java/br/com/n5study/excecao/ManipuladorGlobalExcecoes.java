package br.com.n5study.excecao;

import br.com.n5study.excecao.dto.ErroResponseDTO;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ManipuladorGlobalExcecoes {

    @ExceptionHandler(CredenciaisInvalidasException.class)
    public ResponseEntity<ErroResponseDTO> tratarCredenciaisInvalidas(
            CredenciaisInvalidasException credenciaisInvalidasException
    ) {
        return montarResposta(HttpStatus.UNAUTHORIZED, credenciaisInvalidasException.getMessage(), List.of());
    }

    @ExceptionHandler(UsuarioJaCadastradoException.class)
    public ResponseEntity<ErroResponseDTO> tratarUsuarioJaCadastrado(
            UsuarioJaCadastradoException usuarioJaCadastradoException
    ) {
        return montarResposta(HttpStatus.CONFLICT, usuarioJaCadastradoException.getMessage(), List.of());
    }

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ErroResponseDTO> tratarRecursoNaoEncontrado(
            RecursoNaoEncontradoException recursoNaoEncontradoException
    ) {
        return montarResposta(HttpStatus.NOT_FOUND, recursoNaoEncontradoException.getMessage(), List.of());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroResponseDTO> tratarCorpoIlegivel(
            HttpMessageNotReadableException httpMessageNotReadableException
    ) {
        return montarResposta(HttpStatus.BAD_REQUEST, "Corpo da requisicao invalido", List.of());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResponseDTO> tratarValidacao(
            MethodArgumentNotValidException methodArgumentNotValidException
    ) {
        List<String> detalhes = methodArgumentNotValidException
                .getBindingResult()
                .getFieldErrors()
                .stream()
                .map(erro -> erro.getDefaultMessage())
                .toList();

        return montarResposta(HttpStatus.BAD_REQUEST, "Dados invalidos", detalhes);
    }

    private ResponseEntity<ErroResponseDTO> montarResposta(
            HttpStatus httpStatus,
            String mensagem,
            List<String> detalhes
    ) {
        ErroResponseDTO erroResponseDTO = new ErroResponseDTO(
                httpStatus.value(),
                mensagem,
                detalhes,
                LocalDateTime.now()
        );

        return ResponseEntity.status(httpStatus).body(erroResponseDTO);
    }
}
