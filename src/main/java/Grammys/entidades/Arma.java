package Grammys.entidades;
import jakarta.persistence.*; 
import java.util.List;
@Entity
public class Arma {
@Id 
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int bonificadorDanio;
    private float peso;
        @ManyToMany(mappedBy = "ArmaDelPeleador") 
    private List<Peleador> Peleadores;

    public Arma() {
	}
    public Long getId() {
		return id;
	}
    public void setId(Long id) {
		this.id = id;
	}
    public String getNombre() {
		return nombre;
	}
	public void setNombre (String nombre) {
        this.nombre = nombre;
    }
    public int getBonificadorDanio() {
        return bonificadorDanio;
    }
    public void setBonificadorDanio(int bonificadorDanio) {
        this.bonificadorDanio = bonificadorDanio;
    }
    public float getPeso() {
        return peso;
    }
    public void setPeso(float peso) {
        this.peso = peso;
    }
    public Arma(String nombre, int bonificadorDanio, float peso){
        this.nombre=nombre;
        this.bonificadorDanio= bonificadorDanio;
        this.peso=peso; 
    }
   


}
