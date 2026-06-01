package Grammys.iservice;
import java.util.List;
import Grammys.entidades.Arma;
public interface ArmaIService {
    List<Arma> findAllCharacters();
    Arma saveCharacter(Arma arma);
}
