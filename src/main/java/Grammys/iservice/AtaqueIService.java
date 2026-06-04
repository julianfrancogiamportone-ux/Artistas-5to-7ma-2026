package Grammys.iservice;
import java.util.List; 
import Grammys.entidades.Ataque; 
 
public interface AtaqueIService { 
public List<Ataque> findAllAtaques(); 
public Ataque saveAtaque(Ataque ataque); 
}