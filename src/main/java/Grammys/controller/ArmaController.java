package Grammys.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Grammys.iservice.ArmaIService;
import Grammys.entidades.Arma;

@RestController
@RequestMapping("/armas")


@CrossOrigin(origins = "http://localhost:8080")
public class ArmaController {
    @Autowired
    private ArmaIService armaService;

    @GetMapping("/all")
    public List<Arma> getAllCharacters() {
        return armaService.findAllCharacters();
    }
    @PostMapping("/save")
    public Arma saveCharacter(@RequestBody Arma arma) {
        return armaService.saveCharacter(arma);
    }


}
