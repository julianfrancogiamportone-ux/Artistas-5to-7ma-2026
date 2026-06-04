package Grammys.controller;
import java.util.List; 
 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController; 
import Grammys.iservice.ArmaIService; 
import Grammys.entidades.Arma; 
 
@RestController 
@RequestMapping("/api/arms") 
public class ArmaController { 
 
    @Autowired 
    private ArmaIService aService; 
 
    @GetMapping 
    public List<Arma> getAllCharacters() { 
    return aService.findAllArmas(); 
    } 
 
    @PostMapping 
    public Arma createCharacter(@RequestBody Arma arma) { 
    return aService.saveArma(arma); 
    } 
}
