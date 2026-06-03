package Grammys;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import Grammys.entidades.Arma;
import Grammys.entidades.Ataque;
import Grammys.entidades.Peleador;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
    }
}
