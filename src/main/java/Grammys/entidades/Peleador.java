package Grammys.entidades;
import java.util.*;
import jakarta.persistence.*;

@Entity
public class Peleador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private int puntosVida;
    private int energia;
    private float defensaBase;
    @ManyToMany
    @JoinTable(
            // Nombre de la tabla intermedia en SQL
            name = "Arma_Peleador",
            // FK de esta entidad
            joinColumns = @JoinColumn(name = "Peleador_id"),
            // FK de la otra entidad
            inverseJoinColumns = @JoinColumn(name = "Arma_id"))
    private List<Arma> ArmaDelPeleador;

    @ManyToMany
    @JoinTable(
            // Nombre de la tabla intermedia en SQL
            name = "Ataque_Peleador",
            // FK de esta entidad
            joinColumns = @JoinColumn(name = "Peleador_id"),
            // FK de la otra entidad
            inverseJoinColumns = @JoinColumn(name = "Ataque_id"))
    private List<Ataque> AtaqueDelPeleador;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getPuntosVida() {
        return puntosVida;
    }

    public void setPuntosVida(int puntosVida) {
        this.puntosVida = puntosVida;
    }

    public int getEnergia() {
        return energia;
    }

    public void setEnergia(int energia) {
        this.energia = energia;
    }

    public float getDefensaBase() {
        return defensaBase;
    }

    public void setDefensaBase(float defensaBase) {
        this.defensaBase = defensaBase;
    }

    public Peleador() {
    }
    public Peleador (String nombre, int puntosVida, int energia, float defensaBase) {
        this.nombre = nombre;
        this.puntosVida = puntosVida;
        this.energia = energia;
        this.defensaBase = defensaBase;
    }

    public List<Arma> getArmaDelPeleador() {
        return ArmaDelPeleador;
    }

    public void setArmaDelPeleador(List<Arma> armaDelPeleador) {
        ArmaDelPeleador = armaDelPeleador;
    }

    public List<Ataque> getAtaqueDelPeleador() {
        return AtaqueDelPeleador;
    }

    public void setAtaqueDelPeleador(List<Ataque> ataqueDelPeleador) {
        AtaqueDelPeleador = ataqueDelPeleador;
    }


    
}
