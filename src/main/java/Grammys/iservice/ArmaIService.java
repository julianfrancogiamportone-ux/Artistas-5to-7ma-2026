package Grammys.iservice;
import java.util.List; 
import Grammys.entidades.Arma; 
 
public interface ArmaIService { 
public List<Arma> findAllArmas(); 
public Arma saveArma(Arma arma); 
}