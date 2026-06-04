package Grammys.service;
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import Grammys.iservice.AtaqueIService; 
import Grammys.entidades.Ataque; 
import Grammys.repository.AtaqueRepository; 
 
@Service 
public class AtaqueService implements AtaqueIService { 
 @Autowired 
    private AtaqueRepository atRepository; 
    public List<Ataque> findAllAtaques() { 
        return atRepository.findAll(); 
    } 
    public Ataque saveAtaque(Ataque ataque) { 
        return atRepository.save(ataque); 
    } 
} 