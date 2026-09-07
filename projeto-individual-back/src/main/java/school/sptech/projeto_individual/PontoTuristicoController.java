package school.sptech.projeto_individual;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/locais")
public class PontoTuristicoController {
    private final JdbcTemplate template;

    public PontoTuristicoController(JdbcTemplate template) {
        this.template = template;
    }

    @GetMapping
    public ResponseEntity<List<PontoTuristico>> listar(){
        String sql = "SELECT * FROM pontoTuristico";
        List<PontoTuristico> resultado = template.query(sql, new BeanPropertyRowMapper<>(PontoTuristico.class));
        return ResponseEntity.status(200).body(resultado);
    }

    @PostMapping
    public ResponseEntity<PontoTuristico> cadastrar(@RequestBody PontoTuristico ponto){
        String sql = "INSERT INTO pontoTuristico (nome, cidade, categoria,descricao,preco) VALUES (?,?,?,?,?)";
        KeyHolder holder = new GeneratedKeyHolder();

        template.update(con -> {
            PreparedStatement statement = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            statement.setString(1,ponto.getNome());
            statement.setString(2,ponto.getCidade());
            statement.setString(3,ponto.getCategoria());
            statement.setString(4,ponto.getNome());
            statement.setInt(5,ponto.getPreco());

            return statement;
        }, holder);
        int idGerado = holder.getKey().intValue();
        ponto.setId(idGerado);

        return ResponseEntity.status(201).body(ponto);
    }
}
