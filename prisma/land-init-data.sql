-- INSERT IGNORE INTO User (id, race, profession, hp_actual, hp_max, xp_actual, xp_max)
-- VALUES ('clxxohayg000c141wxuz8p4hv' /* id by database id*/, 'DWARF', 'SAMURAI', 100, 100, 0, 100)
-- ON DUPLICATE KEY UPDATE
-- race = VALUES(race),
-- profession = VALUES(profession),
-- hp_actual = VALUES(hp_actual),
-- hp_max = VALUES(hp_max),
-- xp_actual = VALUES(xp_actual),
-- xp_max = VALUES(xp_max);

-- UPDATE `User`
-- SET role = 'ADMIN'
-- WHERE id = 'clxxohayg000c141wxuz8p4hv'  /* id by database id*/;

INSERT IGNORE INTO Enemy (id, name, hp_from, hp_to, damage_from, damage_to)
VALUES 
('1', 'Troll', 234, 284, 10, 20),
('2', 'Orc', 162, 233, 15, 25),
('3', 'Elf', 54, 125, 5, 15),
('4', 'Barbar', 235, 305, 20, 30),
('5', 'Zloděj', 197, 265, 12, 22),
('6', 'Goblin', 131, 201, 8, 18),
('7', 'Upír', 273, 336, 25, 35),
('8', 'Démon', 282, 342, 30, 40),
('9', 'Ohnivý elementál', 172, 247, 20, 35),
('10', 'Ledový elementál', 248, 313, 15, 25),
('11', 'Kostlivec', 258, 327, 18, 28),
('12', 'Skřet', 107, 176, 12, 22),
('13', 'Banshee', 396, 481, 22, 32),
('14', 'Minotaur', 150, 226, 28, 38),
('15', 'Drak', 435, 490, 35, 45),
('16', 'Medúza', 310, 398, 25, 35),
('17', 'Čaroděj', 423, 500, 30, 40),
('18', 'Harpyje', 234, 298, 18, 28),
('19', 'Vlkodlak', 256, 332, 20, 30),
('20', 'Golem', 337, 405, 40, 50),
('21', 'Faun', 41, 101, 10, 20),
('22', 'Succubus', 349, 425, 25, 35),
('23', 'Kraken', 383, 465, 30, 40),
('24', 'Siren', 300, 399, 22, 32),
('25', 'Chiméra', 276, 346, 35, 45),
('26', 'Dračí jezdec', 256, 345, 40, 50),
('27', 'Pegas', 418, 498, 30, 40),
('28', 'Gryf', 368, 441, 35, 45),
('29', 'Ondina', 384, 453, 25, 35),
('30', 'Fénix', 371, 459, 45, 55),
('31', 'Cerberus', 308, 391, 38, 48),
('32', 'Vampýr', 163, 249, 30, 40),
('33', 'Gargoyl', 197, 278, 25, 35),
('34', 'Harpie', 376, 457, 20, 30),
('35', 'Gorgona', 155, 226, 35, 45),
('36', 'Jednorožec', 451, 482, 40, 50),
('37', 'Kikimora', 262, 361, 15, 25),
('38', 'Hydra', 409, 487, 45, 55),
('39', 'Kentauros', 332, 402, 30, 40),
('40', 'Škorpión', 379, 447, 25, 35),
('41', 'Basilisk', 229, 305, 40, 50),
('42', 'Imp', 31, 120, 10, 20),
('43', 'Lamia', 257, 335, 22, 32),
('44', 'Ent', 258, 338, 30, 40),
('45', 'Vodník', 292, 386, 18, 28),
('46', 'Nosferatu', 382, 460, 25, 35),
('47', 'Gigant', 424, 485, 45, 55),
('48', 'Ettin', 343, 419, 38, 48),
('49', 'Cikáda', 118, 195, 15, 25)
ON DUPLICATE KEY UPDATE name = VALUES(name), hp_from = VALUES(hp_from), hp_to = VALUES(hp_to), damage_from = VALUES(damage_from), damage_to = VALUES(damage_to);

CREATE TEMPORARY TABLE TempMaxScore AS
SELECT MAX((hp_from + hp_to) / 2 + (damage_from + damage_to) / 2) AS max_score
FROM Enemy;

UPDATE Enemy, TempMaxScore SET 
  Enemy.xp_from = LEAST(
    ROUND(
      ((Enemy.hp_from + Enemy.hp_to) / 2 + (Enemy.damage_from + Enemy.damage_to) / 2) / TempMaxScore.max_score * 100 * 0.8
    ),
    100
  ),
  Enemy.xp_to = LEAST(
    ROUND(
      ((Enemy.hp_from + Enemy.hp_to) / 2 + (Enemy.damage_from + Enemy.damage_to) / 2) / TempMaxScore.max_score * 100 * 1.2
    ),
    100
  );

UPDATE Enemy, TempMaxScore SET 
  Enemy.money_from = LEAST(
    ROUND(
      ((Enemy.hp_from + Enemy.hp_to) / 2 + (Enemy.damage_from + Enemy.damage_to) / 2) / TempMaxScore.max_score * 100 * 0.25
    ),
    100
  ),
  Enemy.money_to = LEAST(
    ROUND(
      ((Enemy.hp_from + Enemy.hp_to) / 2 + (Enemy.damage_from + Enemy.damage_to) / 2) / TempMaxScore.max_score * 100 * 0.5
    ),
    100
  );

DROP TEMPORARY TABLE TempMaxScore;
  
INSERT IGNORE INTO Weapon (id, name, damage_from, damage_to)
VALUES 
(1, 'Dýka', 5, 10),
(2, 'Meč', 10, 20),
(3, 'Šíp', 7, 15),
(4, 'Luk', 15, 25),
(5, 'Kladivo', 12, 22),
(6, 'Kopí', 14, 28),
(7, 'Sekera', 18, 30),
(8, 'Palcát', 20, 35),
(9, 'Kyj', 25, 40),
(10, 'Mace', 22, 38),
(11, 'Kuše', 30, 50),
(12, 'Kama', 8, 16),
(13, 'Katar', 6, 12),
(14, 'Krakolej', 35, 60),
(15, 'Kůsátko', 3, 8),
(16, 'Obušek', 15, 28),
(17, 'Sekyra', 24, 42),
(18, 'Šavle', 16, 32),
(19, 'Trhač', 28, 48),
(20, 'Zbraň', 10, 18),
(21, 'Rapír', 14, 26),
(22, 'Tuláč', 5, 15),
(23, 'Závěsná klínka', 12, 24),
(24, 'Klub', 18, 34),
(25, 'Palice', 20, 36),
(26, 'Krut', 22, 40),
(27, 'Nožnice', 9, 18),
(28, 'Bodák', 7, 14),
(29, 'Jatagan', 32, 55),
(30, 'Látka', 4, 12),
(31, 'Pěstní zbraň', 15, 30),
(32, 'Čepel', 19, 38),
(33, 'Šindle', 17, 34),
(34, 'Bodná zbraň', 26, 45),
(35, 'Tupilka', 11, 22),
(36, 'Střelecká zbraň', 20, 40),
(37, 'Zbraň k útoku', 13, 26),
(38, 'Parát', 21, 42),
(39, 'Flajška', 8, 16),
(40, 'Sodná láhev', 6, 12),
(41, 'Facka', 14, 28),
(42, 'Dýka k boji', 24, 48),
(43, 'Meč k boji', 28, 56),
(44, 'Palicová zbraň', 32, 64),
(45, 'Vlečka', 30, 60),
(46, 'Šestka', 19, 38),
(47, 'Zbraně k potyčce', 27, 54),
(48, 'Zbraň k výstřelu', 22, 44),
(49, 'Kotva', 23, 46),
(50, 'Oštěp', 18, 36),
(51, 'Ráže', 25, 50);

INSERT IGNORE INTO Place (id, name, description, pos_x, pos_y, hospital_id, armory_id, bank_id)
VALUES 
(1, 'Královský palác', 'Elegantní palác s rozlehlými zahradami a bohatou historií.', 0, 0, 1, 1, 1),
(2, 'Lesní oltář', 'Starobylý oltář obklopený mystickými stromy a tajemnou atmosférou.', -30, 25, NULL, NULL, NULL),
(3, 'Havraní věž', 'Vysoká věž s výhledem na okolní krajinu, obývaná havrany a čarodějnicemi.', 15, -40, NULL, NULL, NULL),
(4, 'Ztracená jeskyně', 'Tajemná jeskyně plná starověkých artefaktů a nebezpečných pastí.', 40, 10, NULL, NULL, NULL),
(5, 'Jezerní útočiště', 'Klidné útočiště u jezera s pozoruhodným výhledem na hladinu vody a okolní lesy.', -20, 35, NULL, NULL, NULL)
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description), pos_x = VALUES(pos_x), pos_y = VALUES(pos_y), hospital_id = VALUES(hospital_id), armory_id = VALUES(armory_id), armory_id = VALUES(armory_id), bank_id = VALUES(bank_id);

INSERT IGNORE INTO Hospital (id, name, description, subdescription, price)
VALUES 
(1, 'Nemocnice Sv. Lukáše', 'Oprava rozbitých kosti a rozbité srdcovky', 'Buď zdráv, dobrodruhu! U nás společně s dobrým pivem poléčíme všechny tvoje starosti!', 250);

INSERT IGNORE INTO Potion (id, name, hp_gain)
VALUES 
(1, 'Slabý lék', 50),
(2, 'Středně silný lék', 100),
(3, 'Silný lék', 200);

INSERT IGNORE INTO PotionInHospital (id, price, potion_id, hospital_id)
VALUES 
(1, 100, 1, 1),
(2, 250, 2, 1),
(3, 500, 3, 1);

INSERT IGNORE INTO WeaponInArmory (id, weapon_id, armory_id, price)
VALUES 
(1, 7, 1, 2200),
(2, 42, 1, 2500),
(3, 19, 1, 2900),
(4, 31, 1, 1700),
(5, 5, 1, 1500),
(6, 14, 1, 9500),
(7, 25, 1, 2100),
(8, 38, 1, 2100),
(9, 10, 1, 2300),
(10, 3, 1, 1000),
(11, 50, 1, 2000),
(12, 12, 1, 800),
(13, 28, 1, 800),
(14, 6, 1, 1800),
(15, 21, 1, 1400);

INSERT IGNORE INTO ArmorInArmory (id, armor_id, armory_id, price)
VALUES 
(1, 30, 1, 10500),
(2, 8, 1, 9000),
(3, 15, 1, 8800),
(4, 36, 1, 8600),
(5, 41, 1, 8800),
(6, 34, 1, 7000),
(7, 24, 1, 8800),
(8, 45, 1, 9800),
(9, 18, 1, 9000),
(10, 4, 1, 7300),
(11, 20, 1, 7800),
(12, 13, 1, 7600),
(13, 37, 1, 9000),
(14, 22, 1, 7700),
(15, 47, 1, 8900);
 
INSERT IGNORE INTO Armory (id, name, description, subdescription)
VALUES 
(1, 'Kovárna Dračí hřebíky', 'Exkluzivní kovárna, kde se vyrábějí zbroje s ochrannými kouzly.', 'Ahoy! Vítej v mým skromném doupěti železa a síly. Co tě přivedlo k mým mistrovským zbrojím?');

INSERT IGNORE INTO Bank (id, name, description, subdescription)
VALUES 
(1, 'Banka U dvou přátel', 'Místo, kde jsou tvoje cennosti v bezpečí.', 'Vítej v naší bance! Co si přeješ, dobrý příteli? Uložit své cennosti nebo si vybrat nějaké zlaté mince?');

INSERT IGNORE INTO Armor (id, type, name, armor, strength, agility, intelligency)
VALUES 
-- Head items
(1, 'HEAD', 'Helma Obránce', 9, 8, 3, 1),
(2, 'HEAD', 'Čapka Věštce', 4, 2, 5, 10),
(3, 'HEAD', 'Přilba Rytíře', 10, 9, 2, 1),
(4, 'HEAD', 'Kukla Stínu', 6, 3, 8, 4),
(5, 'HEAD', 'Koruna Arcimága', 7, 1, 3, 10),
(6, 'HEAD', 'Čelenka Síl', 5, 8, 4, 2),
(7, 'HEAD', 'Maska Záhad', 4, 2, 7, 8),
(8, 'HEAD', 'Kapuce Lovce', 8, 5, 9, 3),
(9, 'HEAD', 'Helmice Ochránce', 9, 7, 3, 2),
(10, 'HEAD', 'Přilbice Gladiátora', 8, 10, 2, 1),

-- Shoulder items
(11, 'SHOULDER', 'Ramena Drtitele', 7, 9, 6, 1),
(12, 'SHOULDER', 'Ramena Mystika', 5, 2, 4, 9),
(13, 'SHOULDER', 'Ramena Sprintera', 6, 3, 10, 2),
(14, 'SHOULDER', 'Ramena Tichého Stínu', 4, 1, 9, 5),
(15, 'SHOULDER', 'Ramena Čaroděje', 8, 1, 5, 10),
(16, 'SHOULDER', 'Náplečníky Odvahy', 9, 7, 3, 2),
(17, 'SHOULDER', 'Nárameníky Hbitosti', 7, 3, 10, 1),
(18, 'SHOULDER', 'Lopatky Pevnosti', 8, 8, 2, 3),
(19, 'SHOULDER', 'Ramenní Křídla Moudrosti', 5, 2, 4, 9),
(20, 'SHOULDER', 'Plátové Ramena Hraničáře', 6, 6, 8, 2),

-- Chest items
(21, 'CHEST', 'Brnění Hrdiny', 9, 10, 3, 1),
(22, 'CHEST', 'Plášť Záhad', 6, 2, 5, 10),
(23, 'CHEST', 'Kroužková Zbroj Lovce', 8, 7, 10, 3),
(24, 'CHEST', 'Kožená Tělesná Zbroj', 7, 5, 9, 2),
(25, 'CHEST', 'Magický Plášť', 10, 1, 4, 10),
(26, 'CHEST', 'Hrudní Plát Válečníka', 9, 9, 3, 1),
(27, 'CHEST', 'Vyztužená Vesta', 5, 6, 7, 3),
(28, 'CHEST', 'Ochranná Tunika', 8, 4, 6, 8),
(29, 'CHEST', 'Ohnivá Tunika', 7, 5, 8, 4),
(30, 'CHEST', 'Dračí Brnění', 10, 8, 4, 2),

-- Hand items
(31, 'HAND', 'Rukavice Síly', 4, 10, 7, 1),
(32, 'HAND', 'Rukavice Mystika', 3, 2, 5, 9),
(33, 'HAND', 'Rukavice Sprintera', 5, 3, 10, 2),
(34, 'HAND', 'Rukavice Stínového Mistra', 2, 1, 9, 6),
(35, 'HAND', 'Rukavice Čaroděje', 6, 1, 4, 10),
(36, 'HAND', 'Nátepníky Vytrvalosti', 7, 8, 6, 3),
(37, 'HAND', 'Prsteníky Hbitosti', 8, 2, 10, 1),
(38, 'HAND', 'Pažníky Pevnosti', 5, 7, 4, 6),
(39, 'HAND', 'Kroužkové Rukavice', 6, 5, 3, 8),
(40, 'HAND', 'Kožené Rukavice', 7, 6, 4, 7),

-- Pants items
(41, 'PANTS', 'Kalhoty Síly', 7, 10, 6, 2),
(42, 'PANTS', 'Kalhoty Mystika', 4, 2, 5, 9),
(43, 'PANTS', 'Kalhoty Sprintera', 6, 3, 10, 2),
(44, 'PANTS', 'Kalhoty Tichého Stínu', 5, 1, 9, 5),
(45, 'PANTS', 'Kalhoty Čaroděje', 8, 1, 4, 10),
(46, 'PANTS', 'Kráčedla Odvahy', 9, 9, 6, 3),
(47, 'PANTS', 'Nohavice Hbitosti', 7, 2, 10, 1),
(48, 'PANTS', 'Nohavice Pevnosti', 6, 8, 3, 4),
(49, 'PANTS', 'Kožené Kalhoty Lovce', 5, 6, 4, 7),
(50, 'PANTS', 'Plátové Nohavice Válečníka', 8, 10, 2, 3),

-- Boots items
(51, 'BOOTS', 'Boty Síly', 3, 10, 7, 2),
(52, 'BOOTS', 'Boty Mystika', 4, 2, 5, 10),
(53, 'BOOTS', 'Boty Rychlosti', 5, 3, 10, 2),
(54, 'BOOTS', 'Boty Stealthu', 2, 1, 9, 6),
(55, 'BOOTS', 'Boty Čaroděje', 6, 1, 4, 10),
(56, 'BOOTS', 'Střevíce Vytrvalosti', 7, 9, 6, 3),
(57, 'BOOTS', 'Sandály Hbitosti', 8, 2, 10, 1),
(58, 'BOOTS', 'Kotníkové Boty', 5, 7, 3, 4),
(59, 'BOOTS', 'Kožené Boty Lovce', 6, 5, 4, 8),
(60, 'BOOTS', 'Plátové Boty Ochránce', 7, 8, 3, 5);

DROP PROCEDURE IF EXISTS GetWeaponsSortedByStats;
CREATE PROCEDURE GetWeaponsSortedByStats()
BEGIN
    CREATE TEMPORARY TABLE WeaponTemp AS
    SELECT *, (damage_from + damage_to) AS stats_sum
    FROM Weapon;
    
    SELECT *
    FROM WeaponTemp
    ORDER BY stats_sum ASC;

    DROP TEMPORARY TABLE IF EXISTS WeaponTemp;
END;

DROP PROCEDURE IF EXISTS GetArmorsSortedByStats;
CREATE PROCEDURE GetArmorsSortedByStats()
BEGIN
    CREATE TEMPORARY TABLE ArmorTemp AS
    SELECT *, (armor + strength + agility + intelligency) AS stats_sum
      FROM Armor;
    
    SELECT *
    FROM ArmorTemp
    ORDER BY stats_sum ASC;

    DROP TEMPORARY TABLE IF EXISTS ArmorTemp;
END;