INSERT INTO arma (nombre, bonificadorDanio, peso) VALUES
('Microfono Dorado', 10, 1.2),
('Guitarra Electrica', 15, 3.5),
('Bajo Vintage', 12, 4.0),
('Teclado MIDI', 9, 2.8),
('Bateria Pro', 18, 6.5),
('Violin Clasico', 14, 1.0),
('Saxofon Jazz', 16, 3.2),
('Flauta de Oro', 8, 0.4),
('Consola DJ', 20, 5.0),
('Auriculares Pro', 6, 0.3),
('Microfono Basico', 5, 0.8),
('Guitarra Acustica', 11, 2.5),
('Bajo Moderno', 13, 3.8),
('Piano Digital', 17, 7.0),
('Controlador MIDI', 9, 1.5),
('Tambor Afro', 10, 2.2),
('Guitarra Flamenca', 14, 2.7),
('Sampler Beat', 15, 3.0),
('Amplificador Pro', 12, 6.0),
('Microfono Studio', 18, 1.1);

INSERT INTO ataque (nombre, costoEnergia, danioBase) VALUES
('Golpe Rapido', 5, 8),
('Patada Giratoria', 7, 12),
('Disparo Sonico', 10, 15),
('Rayo Musical', 12, 18),
('Combo Basico', 6, 10),
('Explosion de Beat', 15, 20),
('Ataque Preciso', 8, 14),
('Corte de Ritmo', 9, 16),
('Onda Sonora', 11, 17),
('Golpe Pesado', 10, 13),
('Ataque Rapido', 5, 9),
('Pulso Musical', 7, 11),
('Impacto Sonico', 13, 19),
('Ritmo Mortal', 14, 20),
('Combo Avanzado', 12, 15),
('Golpe Circular', 9, 14),
('Explosion Ritmica', 15, 18),
('Disparo de Notas', 10, 16),
('Ataque Fuerte', 8, 12),
('Final Beat', 15, 20);

INSERT INTO peleador (nombre, puntosVida, energia, defensaBase) VALUES
('Taylor Swift', 100, 80, 12.5),
('Wos', 90, 85, 10.0),
('Duki', 120, 70, 15.0),
('Bizarrap', 110, 90, 13.0),
('Nicki Nicole', 95, 75, 11.5),
('Trueno', 130, 60, 16.0),
('Maria Becerra', 105, 88, 12.0),
('Paulo Londra', 115, 78, 14.0),
('Lali Espósito', 85, 92, 9.5),
('Cazzu', 140, 65, 18.0),
('Bad Bunny', 125, 72, 15.5),
('Feid', 100, 80, 12.8),
('Shakira', 108, 83, 13.5),
('Drake', 112, 77, 14.2),
('The Weeknd', 98, 86, 11.0),
('Ariana Grande', 135, 68, 17.0),
('Billie Eilish', 102, 81, 12.3),
('Emilia', 118, 74, 15.0),
('Khea', 145, 60, 19.0),
('Tini Stoessel', 150, 55, 20.0);

ALTER TABLE peleador ADD COLUMN url_imagen VARCHAR(255);

SET SQL_SAFE_UPDATES = 0;

UPDATE peleador SET url_imagen = 'images/taylor-swift.webp'  WHERE nombre = 'Taylor Swift';
UPDATE peleador SET url_imagen = 'images/bad-bunny.webp'     WHERE nombre = 'Bad Bunny';
UPDATE peleador SET url_imagen = 'images/shakira.jpg'        WHERE nombre = 'Shakira';
UPDATE peleador SET url_imagen = 'images/duki.png'           WHERE nombre = 'Duki';
UPDATE peleador SET url_imagen = 'images/ariana-grande.webp' WHERE nombre = 'Ariana Grande';
UPDATE peleador SET url_imagen = 'images/feid.webp'          WHERE nombre = 'Feid';
UPDATE peleador SET url_imagen = 'images/tini-stoessel.jpg'  WHERE nombre = 'Tini Stoessel';
UPDATE peleador SET url_imagen = 'images/maria-becerra.jpg'  WHERE nombre = 'Maria Becerra';
UPDATE peleador SET url_imagen = 'images/nicki-nicole.jpg'   WHERE nombre = 'Nicki Nicole';
UPDATE peleador SET url_imagen = 'images/lali.jpg'           WHERE nombre = 'Lali Espósito';
UPDATE peleador SET url_imagen = 'images/drake.webp'         WHERE nombre = 'Drake';
UPDATE peleador SET url_imagen = 'images/paulo-londra.webp'  WHERE nombre = 'Paulo Londra';
UPDATE peleador SET url_imagen = 'images/the-weeknd.jpg'     WHERE nombre = 'The Weeknd';
UPDATE peleador SET url_imagen = 'images/bizarrap.webp'      WHERE nombre = 'Bizarrap';
UPDATE peleador SET url_imagen = 'images/cazzu.jpg'          WHERE nombre = 'Cazzu';
UPDATE peleador SET url_imagen = 'images/trueno.webp'        WHERE nombre = 'Trueno';
UPDATE peleador SET url_imagen = 'images/billie-eilish.webp' WHERE nombre = 'Billie Eilish';
UPDATE peleador SET url_imagen = "images/wos.jpeg"           WHERE nombre= "Wos" ;
UPDATE peleador SET url_imagen = "images/emilia.jpg"         WHERE nombre= "Emilia" ;
UPDATE peleador SET url_imagen = "images/khea.jpg"           WHERE nombre= "Khea" ;

INSERT INTO arma_peleador (Peleador_id, Arma_id)
SELECT id, id FROM peleador WHERE id BETWEEN 1 AND 20;

INSERT INTO ataque_peleador (Peleador_id, Ataque_id)
SELECT id, id FROM peleador WHERE id BETWEEN 1 AND 20;
