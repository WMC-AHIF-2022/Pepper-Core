# System-Spezifikation `Person Manager For Pepper`

## 1. Ausgangslage und Zielsetzung

### 1.1. Ist-Situation

An der Schule der HTL Leonding gibt es einen selbstdesignedn Roboter names "Pepper". Der Roboter steht den ganzen Tag nur herum.
Um genauer zu sein steht in einer Ecke in einem Programmiersaal. 
Und wir wollen das ändern. Wir wollen dem Roboter ein neues Feature hinzufügen, damit er öfter genutzt wird.
Wir wollen eine Personenverwaltung über den Roboter ausgeben. Der Hauptteil geschieht auf er Webseite und die Ausgabe der Daten soll über den Roboter geschiehen. Das Program hat auch ein eher lustiges Feature, da man bei der Personenverwaltung ein Audiofile mitgeben kann, dass dann über den Roboter ausgegeben werden kann.

### 1.2. Zielsetzung

Unser Ziel ist es, dass wir eine gut funktionelle, aber doch auch an manchen Stellen eine witzige Webseite programmieren, damit der Roboter attraktiver für die Schüler der HTL-Leonding wird und nicht nur im Programmiersaal in der Ecke steht.

Wenn der Benutzer auf die Webseite kommt sieht man eine Liste von aller vorhandene Personen. Man kann dann vorhandene Personen auswählen oder neue Personen erstellen. Wenn man eine neue Person erstellt kommt eine Eingabe mit Vorname, Nachname, Geschlecht und Geburtsdatum. Dazu kann man Bilder der Person oder Audiofiles wie zum Beispiel den Lieblingssong der Person hinzufügen. Diese Informationen werden per POST-Befehl auf die REST-API hochgeladen. Wenn eine schon vorhandene Person ausgewählt wird, kann man sich die Person anzeigen lassen indem man mit dem GET-Befehl die Daten von der REST-API bekommt. Um neue Bilder oder Audio-Files hinzuzufügen muss man diese mit dem PUT-Befehl ändern.

Die REST-API speichert die Daten auf eine Datenbank. Von dortaus bekommt sie auch die Daten wieder. Die REST-API ist nur die Schnittstelle zwischen Benutzer,Roboter und Datenbank.

<img src="./Person-Manager-for-Pepper/MindMap.PNG" alt="Mind Map" title="Mind Map" />

## 2. Funktionale Anforderungen


### 2.1. Use Case Überblick

<img src="./Person Manager For Pepper/USE-CASE-DIAGRAM.PNG">

### Startseite der Webseite
<img src="./Person Manager For Pepper/Index.PNG">

### 2.2. Use Case Ansicht von Personen

#### 2.2.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-1.PNG">

#### 2.2.2 Workflow

Der User oder Roboter kann auf der Index Seite auf "All Users" klicken und sieht dann eine Liste mit allen angelegten Personen.

### 2.3. Use Case View Person

#### 2.3.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-4.PNG">

#### 2.3.2 Workflow

Nach dem ersten Use Case kann man dann auf verschieden Personen klicken und kommt dann auf deren Profil. Auf dieser Seite sieht man dann verschieden Daten der Person inklusive Bild und abspielbaren Audio-File.

### 2.4. Use Case Edit Person

#### 2.4.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-2.PNG">

#### 2.4.2 Workflow

Nur der User kann Personen editieren. Dazu muss er sich einloggen. Er kann nur sich selber editieren aber trotzdem alle anderen sehen. 

### 2.5. Use Case Create Person

#### 2.5.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-3.PNG">

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

<img src="./Person Manager For Pepper/Systemarchitektur.PNG">
