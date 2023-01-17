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

<img src="./Person Manager For Pepper/MindMap.PNG" alt="Mind Map" title="Mind Map" />

## 2. Funktionale Anforderungen


### 2.1. Use Case Überblick

<img src="./Person Manager For Pepper/USE-CASE-DIAGRAM.PNG">

### Startseite der Webseite
<img src="./Person Manager For Pepper/Index.PNG">

Auf unserer Startseite hat man in der Navigation-Bar 3 verschieden Buttons. Einmal Home-Page um immer auf die Startseite zurückzulangen.
Daneben About-Us um mehr über die Ersteller dieser Webseite zu erfahren. Und abschließend ein Login/Sign up um sich anzumelden oder neu registrieren.
Darunter ist ein kleiner Einführungstext über die Webseite und 3 größe Buttons. Der Buttons All Users führt einen zu einer neuen Seite wo im alle vorhandenen User angezeigt werden.
Der Button Edit User führt in zu einer Seite wo er seine eigenen Daten ändern kann, sofern er schon einen hat.
Der letzte Button Create User lässt den User einen ganz neuen User erstellen.

### 2.2. Use Case Ansicht von Personen

#### 2.2.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-1.PNG">

#### 2.2.2 Workflow

Der User oder Roboter kann auf der Index Seite auf "All Users" klicken und sieht dann eine Liste mit allen angelegten Personen.
Durch einen Klick auf eine Person erhält er die Daten und Informationen des jeweiligen Users. Jeder User kann die Daten der anderen User sehen, aber nicht verändern.

### 2.3. Use Case View Person

#### 2.3.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-4.PNG">

#### 2.3.2 Workflow

Diese Seite erscheint wenn der User auf einen anderen User geklickt hat um sich seine Daten anzuschauen. 
Der User sieht unter anderen seinen Namen, ein optionales Bild, das Geburtsdatum, das Geschlecht und vielleicht noch ein Audio file des Users.

### 2.4. Use Case Edit Person

#### 2.4.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-2.PNG">

#### 2.4.2 Workflow

Es gibt auch noch die Möglichkeit, um seine eigenen Daten zu bearbeiten. Nur der User kann sich selbst editieren und sonst kein anderer.
Dazu muss er sich einloggen. Er hat nur die Berechtigung für sich selbst, kann aber die Daten und Informationen der anderen User sehen.
Der Sinn dahinter ist, dass man zum Beispiel ein neues Audio file hinzufügt, oder das Bild statt einem aktuellem Bild austauscht.

### 2.5. Use Case Create Person

#### 2.5.1 GUI-Design

<img src="./Person Manager For Pepper/USE-CASE-3.PNG">

#### 2.5.2 Workflow

Wenn der User auf der Home-Page create User gedrückt hat und sich davor noch eingologt hat kann er auch eine neue Person mit seinen eigenen Daten anlegen. 
Er muss Vorname, Nachname, Geburtsdatum und Gender eintragen. Er kann optional auch noch ein Bild von sich einfügen und auch noch ein Audio file.

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
