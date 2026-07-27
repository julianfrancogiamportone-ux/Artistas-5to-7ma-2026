package Grammys.iservice;
import java.util.List;

import Grammys.entidades.Peleador;


public interface PeleadorIService {
   public List<Peleador> findAllCharacters();
   public Peleador saveCharacter(Peleador personage);
}