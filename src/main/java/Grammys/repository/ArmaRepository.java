package Grammys.repository;
import org.springframework.data.jpa.repository.JpaRepository; 
import Grammys.entidades.Arma; 
 
public interface ArmaRepository extends JpaRepository<Arma, Long> { 
} 