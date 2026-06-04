package Grammys.service;
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import Grammys.iservice.ArmaIService; 
import Grammys.entidades.Arma; 
import Grammys.repository.ArmaRepository; 
 
@Service 
public class ArmaService implements ArmaIService { 
 @Autowired 
    private ArmaRepository aRepository; 
    public List<Arma> findAllArmas() { 
        return aRepository.findAll(); 
    } 
    public Arma saveArma(Arma arma) { 
        return aRepository.save(arma); 
    } 
} 