package Grammys.controller;
import java.util.List; 
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController; 
import Grammys.iservice.AtaqueIService; 
import Grammys.entidades.Ataque; 
 
@RestController 
@RequestMapping("/api/attacks") 

@CrossOrigin(origins = "http://localhost:8080")
public class AtaqueController { 
 
    @Autowired 
    private AtaqueIService atService; 
 
    @GetMapping 
    public List<Ataque> getAllCharacters() { 
    return atService.findAllAtaques(); 
    } 
 
    @PostMapping 
    public Ataque createCharacter(@RequestBody Ataque ataque) { 
    return atService.saveAtaque(ataque); 
    } 
}
