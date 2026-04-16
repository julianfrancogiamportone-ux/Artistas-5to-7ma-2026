package Grammys.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class Peleador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private int puntosVida;
    private int energia;
    private float defensaBase;
    private Arma armaEquipada;
    private List inventario;
    private List habilidades;

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

    public Arma getArmaEquipada() {
        return armaEquipada;
    }

    public void setArmaEquipada(Arma armaEquipada) {
        this.armaEquipada = armaEquipada;
    }

    public list getInventario() {
        return inventario;
    }

    public void setInventario(list inventario) {
        this.inventario = inventario;
    }

    public list getHabilidades() {
        return habilidades;
    }

    public void setHabilidades(list habilidades) {
        this.habilidades = habilidades;
    }

    @ManyToMany
@JoinTable(
// Nombre de la tabla intermedia en SQL
name = "Arma_Peleador",
// FK de esta entidad
joinColumns = @JoinColumn(name = "Peleador_id"),
// FK de la otra entidad
inverseJoinColumns = @JoinColumn(name = "Arma_id")
)
private List<Arma> ArmaDelPeleador;

@ManyToMany
@JoinTable(
// Nombre de la tabla intermedia en SQL
name = "Ataque_Peleador",
// FK de esta entidad
joinColumns = @JoinColumn(name = "Peleador_id"),
// FK de la otra entidad
inverseJoinColumns = @JoinColumn(name = "Ataque_id")
)
private List<Ataque> AtaqueDelPeleador;
}

    



}
