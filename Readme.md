# System-Spezifikation `Person Manager For Pepper`

## 1. Ausgangslage und Zielsetzung

### 1.1. Ist-Situation

- Siehe Projektantrag

### 1.2. Verbesserungspotenziale

- Siehe Projektantrag

### 1.3. Zielsetzung

- Siehe Projektantrag

## 2. Funktionale Anforderungen


### 2.1. Use Case Überblick

<img src="USE-CASE-DIAGRAM.PNG">

### Startseite der Webseite
<img src="Index.PNG">

### 2.2. Use Case Ansicht von Personen

#### 2.2.1 GUI-Design

<img src="./USE-CASE-1.PNG">

#### 2.2.2 Workflow

Der User oder Roboter kann auf der Index Seite auf "All Users" klicken und sieht dann eine Liste mit allen angelegten Personen.

### 2.3. Use Case View Person

#### 2.3.1 GUI-Design

<img src="./USE-CASE-4.PNG">

#### 2.3.2 Workflow

Nach dem ersten Use Case kann man dann auf verschieden Personen klicken und kommt dann auf deren Profil. Auf dieser Seite sieht man dann verschieden Daten der Person inklusive Bild und abspielbaren Audio-File.

### 2.4. Use Case Edit Person

#### 2.4.1 GUI-Design

<img src="./USE-CASE-2.PNG">

#### 2.4.2 Workflow

Nur der User kann Personen editieren. Dazu muss er sich einloggen. Er kann nur sich selber editieren aber trotzdem alle anderen sehen. 

### 2.5. Use Case Create Person

#### 2.5.1 GUI-Design

<img src="./USE-CASE-3.PNG">

#### 2.5.2 Workflow

Ein User kann nur eine Person erstellen die dann zu seinem Profil hinzugefügt wird. Der User kann dann keine neue Person erstellen und nur sich selber editieren.



## 3. Nicht-funktionale Anforderungen

### `Usability`: Benutzbarkeitsanforderung

- Wie muss die Software beschaffen sein, damit die Zielgruppe gerne damit arbeitet?
  - Es muss eine leicht zu bedinende Webseite sein wo man sich leicht auskennt und nicht lange nach dem gewünschten Feature suchen muss. 
  - Es sollten nicht zu viele unterschiedliche grelle Farben vorkommen. Es sollte eine gute Mischung aus aus beiden sein um ein angenehmes Ansehen für das Auge zu schaffen.

### `Efficiency`: Effizienzanforderung

- Hier geht es sowohl um Laufzeit- als auch um Speichereffizienz. Was wird unter dem sparsamen Einsatz dieser Ressourcen verstanden?
  - Die Webseite sollte natürlich so schnell wie möglich laufen. Um das zu ermöglichen holen wir von der Datenbank wirklich immer nur die Daten die wir brauchen um nicht immer unnötig Daten downzuloaden.

### `Maintenance`: Wartbarkeits- und Portierbarkeitsanforderung

- Welcher Grad an Änderbarkeit wird gefordert? Hier werden, soweit wie möglich, kommende Anpassungen und Erweiterungen vorhergesehen.
  - Wir wollen dass unsere Webseite auf allen Geräten zugänglich ist. Egal ob großer oder kleiner Bildschirm es sollte auf allen Geräten funktionieren. 
  - Unsere Webseite ist grundsätzlich in English geschrieben um sie für jeden User lesbar und verständlich zu machen.

### `Security`: Sicherheitsanforderung

- Zu den Sicherheitsanforderungen gehören die Aspekte Vertraulichkeit, Datenintegrität und Verfügbarkeit.
  - Wie sehr müssen die Daten vor dem Zugriff durch Dritte geschützt werden?
  - Ist es entscheidend, die Korrektheit der erfassten Daten und ihre Konsistenz zu gewährleisten?<br><br>

- Grundsätzlich kann jeder User ohne erstellten Account die Daten betrachten. Einen eigenen User erstellen oder bearbeiten geht dann nur mit Anmeldung.
- Wir gewährleisten nicht die Korrektheit der Daten der User. Wenn ein User einen Account erstellt und seine Daten eingibt überprüfen wir nicht die richtigkeit der Daten.

### `Legal`: Gesetzliche Anforderung

- Welche Standards und Gesetze müssen beachtet werden?
  - //

## 4. Mengengerüst

- Wieviele User werden erwartet?
  - Es werden nicht allzu viele User erwartet, da es eher eine schulinterne Webseite ist. Wir rechnen mit 5 - 50 Usern.
- Wieviele Daten pro User werden erwartet?
  - Ein User hat 6 Daten. Einmal Vorname, Nachname, Geburtsdatum, Geschlecht, ein Bild der Person und ein Audiofile. Ein User kann aber einen Account nur erstellen wenn er Vorname, Nachname, Geburtsdatum, Geschlecht und Bild angibt. Das Audiofile ist optional.
- Mit welcher Anfrage-Frequenz wird gerechnet?
  - Wir rechnen mit einer sehr geringen Anfrage-Frequenz, da es eher eine kleingehaltene Webseite ist.

## 5. Systemarchitektur

<img src="./Systemarchitektur.PNG">
