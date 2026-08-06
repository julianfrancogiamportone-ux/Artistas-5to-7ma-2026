package Grammys.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Grammys.iservice.PeleadorIService;
import Grammys.entidades.Peleador;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "http://localhost:8080")

public class PeleadorController {

   @Autowired
   private PeleadorIService peleadorService;

   @GetMapping
   public List<Peleador> getAllCharacters() {
      return peleadorService.findAllCharacters();
    }

   @PostMapping
   public Peleador createCharacter(@RequestBody Peleador personage) {
      return peleadorService.saveCharacter(personage);
    }
}  
