package Grammys.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Grammys.iservice.PeleadorIService;
import Grammys.entidades.Peleador;
import Grammys.repository.PeleadorRepository;

@Service
   public class PeleadorService implements PeleadorIService {
   @Autowired
   private PeleadorRepository pRepository;
   public List<Peleador> findAllCharacters() {
      return pRepository.findAll();
    }
   public Peleador saveCharacter(Peleador personage) {
      return pRepository.save(personage);
    }
}