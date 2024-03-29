# System-Spezifikation `Person Manager For Pepper`

## 1. Ausgangslage und Zielsetzung

### 1.1. Ist-Situation

An der Schule der HTL Leonding gibt es einen Roboter namens "Pepper". Dieser besitzt einige Features und
wir wollen ein neues Features entwickeln, um den Menschen im Altersheim eine neue Beschäftigung zu bieten.

### 1.2. Zielsetzung

Unser Ziel ist es ein weiteres Feature für den Roboter zu entwickeln. Diese Idee sollte eine Memory sein, damit zum Beispiel die Menschen im Altersheim sich an ihre alten Fotos auf spielerische Art erinnern können.

Wenn der Benutzer auf die Webseite kommt sieht man eine Liste von aller vorhandene Personen. Man kann dann vorhandene Personen auswählen oder neue Personen erstellen. Wenn man eine neue Person erstellt kommt eine Eingabe mit Vorname, Nachname, Geschlecht und Geburtsdatum. Dazu kann man Bilder der Person hinzufügen. Diese Informationen werden per POST-Befehl auf die REST-API hochgeladen. Wenn eine schon vorhandene Person ausgewählt wird, kann man sich die Person anzeigen lassen indem man mit dem GET-Befehl die Daten von der REST-API bekommt. Um neue Bilder hinzuzufügen muss man diese mit dem PUT-Befehl ändern.

Die REST-API speichert die Daten auf eine Datenbank. Von dortaus bekommt sie auch die Daten wieder. Die REST-API ist nur die Schnittstelle zwischen Benutzer,Roboter und Datenbank.

<img src="./Diagramme/MindMap.PNG" alt="Mind Map" title="Mind Map" />

## 2. Funktionale Anforderungen


### 2.1. Use Case Überblick

<img src="./Diagramme/USE-CASE-DIAGRAM.PNG">


### 2.2. Use Case Ansicht von allen Personen

#### 2.2.1 GUI-Design

<img src="./Diagramme/USE-CASE-1.PNG">

#### 2.2.2 Workflow

Auf unserer Startseite gibt es ganz oben eine Navigationsbar mit einer About Us Section und 
es gibt die Möglichkeit sich einzuloggen. Ebenso werden auch alle registrierten Personen angezeigt
und mit dem Plus Button kann man Personen hinzufügen. Wenn man auf den Button Details neben einer
Person klickt, dann kommt man zu den Daten der einzelnen Personen.

### 2.3. Use Case Create User

#### 2.3.1 GUI-Design

<img src="./Diagramme/USE-CASE-4.PNG">

#### 2.3.2 Workflow

Wenn der User auf der Startseite auf das Plus gedrückt hat kann er einen neuen User erstellen wenn er sich davor eingeloggt hat. Er muss Vorname, Nachname, Geburtsdatum und Gender eintragen. Er muss auch ein Profilbild von sich einfügen und noch weitere Bilder für die Memory. Das Profilbild und die Bilder für die Memory werden per Drag&Drop Box hinzugefügt.

### 2.4. Use Case View, Edit & Delete Person

#### 2.4.1 GUI-Design

<img src="./Diagramme/USE-CASE-2.PNG">

#### 2.4.2 Workflow

Durch das Klicken auf den Details Button auf der Startseite kommt man zu den Daten der ausgewählten Person.
Mann kann unteranderem den Namen der Person sehen, das Profilbild, das Geburtsadtum, das Geschlecht und ihre Bilder für die Memory.
Mithilfe des Edit Buttons kann die Person bearbeitet werden um zum Beispiel ein neues Bild zur Memory hinzufügen. Das Profilbild und die Bilder für die Memory werden per Drag&Drop Box hinzugefügt oder geändert.
Durch den Delete Button kann die ausgewählte Person gelöscht werden und die Person kann nur ihren eigenen User löschen und editieren. 

### 2.5. Use Case Login/Sign up

#### 2.5.1 GUI-Design

<img src="./Diagramme/USE-CASE-3.PNG">

#### 2.5.2 Workflow

Um einen eigenen User zu erstellen muss man sich einen Account erstellen. Man muss Benutzername und Passwort angeben. Man muss sich dann jedesmal neu einloggen um seinen bestehenden User zu editen.


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

## 4. Mengengerüst

- Wieviele User werden erwartet?
  - Es werden nicht allzu viele User erwartet, da es eher eine interne Webseite ist. Wir rechnen mit 5 - 50 Usern.
- Wieviele Daten pro User werden erwartet?
  - Ein User hat 5 Daten. Einmal Vorname, Nachname, Geburtsdatum, Geschlecht, ein Bild der Person. Ein User kann aber einen Account nur erstellen wenn er Vorname, Nachname, Geburtsdatum, Geschlecht und Bild angibt.
- Mit welcher Anfrage-Frequenz wird gerechnet?
  - Wir rechnen mit einer sehr geringen Anfrage-Frequenz, da es eher eine kleingehaltene Webseite ist.

## 5. Systemarchitektur

<img src="./Diagramme/Systemarchitektur.PNG">

## 6. Datenmodell

<img src="./Diagramme/Datenmodell.PNG">
