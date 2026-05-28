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
		Peleador p1 = new Peleador();
        p1.setNombre("Wos");
        p1.setPuntosVida(100);
        p1.setEnergia(80);
        p1.setDefensaBase(10);

        Peleador p2 = new Peleador();
        p2.setNombre("Taylor Swift");
        p2.setPuntosVida(90);
        p2.setEnergia(85);
        p2.setDefensaBase(12);

        System.out.println(p1.getNombre() + " tiene " + p1.getPuntosVida() + " de vida.");
        System.out.println(p2.getNombre() + " tiene " + p2.getPuntosVida() + " de vida.");

        Ataque at1 = new Ataque();
        at1.setNombre("Contando ovejas");
        at1.setCostoEnergia(20);
        at1.setDanioBase(30);

        Ataque at2 = new Ataque();
        at2.setNombre("Shake It Off");
        at2.setCostoEnergia(15);
        at2.setDanioBase(25);

        Ataque at3 = new Ataque();
        at3.setNombre("Tití Me Preguntó");
        at3.setCostoEnergia(18);
        at3.setDanioBase(28);

        System.out.println(at1.getNombre() + " daño: " + at1.getDanioBase());
        System.out.println(at2.getNombre() + " daño: " + at2.getDanioBase());
        System.out.println(at3.getNombre() + " daño: " + at3.getDanioBase());

        Arma a1 = new Arma();
        a1.setNombre("Micrófono");
        a1.setBonificadorDanio(15);
        a1.setPeso(1);

        Arma a2 = new Arma();
        a2.setNombre("Guitarra");
        a2.setBonificadorDanio(20);
        a2.setPeso(3);

        System.out.println(a1.getNombre() + " daño: " + a1.getBonificadorDanio());
        System.out.println(a2.getNombre() + " daño: " + a2.getBonificadorDanio());

        p1.setArmaDelPeleador(List.of(a1, a2));
        p2.setArmaDelPeleador(List.of(a1, a2));

        if (a1.getBonificadorDanio() > a2.getBonificadorDanio()) {
            System.out.println(p1.getNombre() + " tiene el arma más fuerte.");
        } else if (a1.getBonificadorDanio() < a2.getBonificadorDanio()) {
            System.out.println(p2.getNombre() + " tiene el arma más fuerte.");
        } else {
            System.out.println("Ambos peleadores tienen armas igualmente poderosas.");
        }

        Arma a3 = new Arma();
        a3.setNombre("Espada");
        a3.setBonificadorDanio(25);
        a3.setPeso(5);

        Arma a4 = new Arma();
        a4.setNombre("Hacha");
        a4.setBonificadorDanio(30);
        a4.setPeso(7);

        Arma a5 = new Arma();
        a5.setNombre("Daga");
        a5.setBonificadorDanio(28);
        a5.setPeso(6);

        p1.setAtaqueDelPeleador(List.of(at1, at2, at3));
        p2.setAtaqueDelPeleador(List.of(at2, at3));
        Arma[] armas = { a1, a2, a3, a4, a5 };
        java.util.List<Arma> inventario = new java.util.ArrayList<>();
        for (int i = 0; i < armas.length; i++) {
            inventario.add(armas[i]);
        }
        p1.setArmaDelPeleador(inventario);

        Ataque[] ataques = { at1, at2, at3 };
        Ataque ataqueMasFuerte = ataques[0];

        for (int i = 0; i < ataques.length; i++) {
            if (ataques[i].getDanioBase() > ataqueMasFuerte.getDanioBase()) {
                ataqueMasFuerte = ataques[i];
            }
        }
        System.out.println("El ataque más fuerte es: " + ataqueMasFuerte.getNombre() + " con daño base de "
                + ataqueMasFuerte.getDanioBase());

        int sumaEnergia = 0;
        for (int i = 0; i < ataques.length; i++) {
            sumaEnergia += ataques[i].getCostoEnergia();
        }
        int promedio = sumaEnergia / ataques.length;
        System.out.println("promedio de costo de energia: " + promedio);

        if (promedio > 50) {
            System.out.println("Los ataques son muy costosos en energía.");
        } else {
            System.out.println("Los ataques tienen un costo normal de energia.");
        }

        primerGolpe(p1, p2, at1);
        descansoTactico(p1);

        for (Ataque ataque : p1.getAtaqueDelPeleador()) {

            if (ataque.getCostoEnergia() <= p1.getEnergia()) {

                System.out.println("Ataque disponible: " + ataque.getNombre());
            }

        }

    }

    public static void primerGolpe(Peleador atacante, Peleador defensor, Ataque ataque) {
        if (atacante.getEnergia() >= ataque.getCostoEnergia()) {
            Arma arma = atacante.getArmaDelPeleador().get(0);

            int danioTotal = ataque.getDanioBase() + arma.getBonificadorDanio();

            defensor.setPuntosVida(defensor.getPuntosVida() - danioTotal);

            atacante.setEnergia(atacante.getEnergia() - ataque.getCostoEnergia());
            System.out.println(atacante.getNombre() + " ataca con " + ataque.getNombre() + " y causa " + danioTotal + " de daño a " + defensor.getNombre());
            System.out.println(defensor.getNombre() + " tiene ahora " + defensor.getPuntosVida() + " puntos de vida y "+ atacante.getEnergia() + " de energía restante.");
        } else {
            System.out.println(atacante.getNombre() + " está demasiado cansado para atacar " + ataque.getNombre());
        }

    }

    public static void descansoTactico(Peleador peleador) {
        if (peleador.getPuntosVida() < 200) {
            peleador.setPuntosVida(peleador.getPuntosVida() + 500);

            peleador.setEnergia(0);
            System.out.println(peleador.getNombre() + " recibió curación pesada ");
        } else {
            peleador.setEnergia(peleador.getEnergia() + 100);
            System.out.println(peleador.getNombre() + " se recuperó energía ");
        }
    }
}
