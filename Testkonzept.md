# Testkonzept und Vorgehen

## Ziel des Features

Im Rahmen dieser Aufgabe wurde das Feature umgesetzt, dass Items zusätzlich zu einem Titel auch eine Beschreibung und einen Status besitzen. Beschreibung und Status können nachträglich geändert werden. Zusätzlich können zu einem Item Kommentare hinzugefügt werden, die anschliessend in den Item-Details sichtbar sind.

Das Ziel der Umsetzung war nicht nur die funktionale Erweiterung der Applikation, sondern auch ein sauberes und nachvollziehbares Vorgehen nach dem TDD-Prinzip. Jede grössere Änderung wurde deshalb schrittweise entwickelt, mit Tests abgesichert und regelmässig mit SonarQube analysiert.

---

## Vorgehen

Die Umsetzung erfolgte bewusst iterativ in kleinen Schritten. Zu Beginn wurde der bestehende Zustand des Projekts überprüft. Dazu wurden die vorhandenen Tests ausgeführt und eine erste SonarQube-Analyse durchgeführt, damit eine saubere Ausgangslage vorhanden war.

Danach wurde das neue Feature in mehreren Teilschritten umgesetzt. Zuerst wurde das Datenmodell erweitert, damit ein Item neben dem Titel auch eine Beschreibung, einen Status und Kommentare speichern kann. Anschliessend wurden die Backend-Endpunkte ergänzt, um diese Daten zu erstellen, auszulesen und zu ändern. Erst nachdem diese Funktionen im Backend abgesichert waren, wurde das Frontend erweitert. Dort wurden ein Formular zum Erstellen eines Items mit Titel, Beschreibung und Status sowie eine Detailansicht für das Bearbeiten und Kommentieren von Items implementiert.

Nach jedem Schritt wurden Tests ausgeführt, Probleme behoben und die Änderungen mit kleinen, nachvollziehbaren Commits versioniert. Dieses Vorgehen entspricht der Aufgabenstellung, Änderungen klein zu halten, häufig zu testen und den Code laufend zu analysieren.

---

## TDD-Ansatz

Die Entwicklung orientierte sich am Test-Driven-Development-Ansatz. Das bedeutet, dass neue Funktionalität möglichst zuerst durch einen Test beschrieben und erst danach implementiert wurde. Ziel davon war, die Anforderungen präzise umzusetzen und gleichzeitig sicherzustellen, dass jede Funktion direkt verifiziert werden kann.

Durch dieses Vorgehen wurde das Risiko reduziert, dass neue Änderungen bestehende Teile der Applikation unbeabsichtigt beeinflussen. Gleichzeitig entstand eine nachvollziehbare Testbasis, die sowohl die fachliche Logik als auch das Benutzerverhalten absichert.

---

## Automatisiert geprüfte Bereiche

### Backend-Tests

Im Backend wurden Unit-Tests und Controller-Tests mit JUnit und Mockito verwendet. Diese prüfen automatisiert, ob die zentrale Logik korrekt funktioniert.

Automatisch geprüft wurden unter anderem folgende Punkte:

- Ein Item besitzt Titel, Beschreibung und Status.
- Ein Item erhält sinnvolle Standardwerte.
- Die Beschreibung eines Items kann geändert werden.
- Der Status eines Items kann geändert werden.
- Zu einem Item können Kommentare hinzugefügt werden.
- Ein Item kann über die Detailansicht anhand seiner ID geladen werden.
- Die Controller-Endpunkte speichern und liefern die erwarteten Daten.

Das Ziel dieser Tests war, die fachliche Logik unabhängig von der Benutzeroberfläche abzusichern und Fehler frühzeitig zu erkennen.

### Frontend-Tests

Im Frontend wurden Komponententests mit Vitest und React Testing Library erstellt. Diese prüfen automatisiert, ob die Benutzeroberfläche auf Eingaben korrekt reagiert und die richtigen Requests an das Backend sendet.

Automatisch geprüft wurden unter anderem:

- Das Formular zum Erstellen eines Items sendet Titel, Beschreibung und Status korrekt an das Backend.
- Die Item-Details werden in der Oberfläche dargestellt.
- Der Status eines Items kann in der Oberfläche geändert werden.
- Kommentare werden in der Detailansicht angezeigt.
- Das Hinzufügen eines Kommentars löst den erwarteten Request aus.

Das Ziel dieser Tests war, die Kerninteraktionen der Benutzeroberfläche zuverlässig abzusichern.

### End-to-End-Tests

Zusätzlich wurden End-to-End-Tests mit Playwright erstellt. Diese simulieren die Anwendung aus Sicht eines Benutzers und prüfen das Zusammenspiel mehrerer Komponenten.

Automatisiert geprüft wurden dabei folgende Anwendungsfälle:

- Ein Benutzer kann die Item-Details öffnen.
- Ein Benutzer kann den Status eines Items ändern.
- Ein Benutzer kann einen Kommentar hinzufügen.
- Kommentare und Details werden in der Oberfläche sichtbar dargestellt.

Das Ziel dieser Tests war, sicherzustellen, dass die gesamte Benutzerinteraktion vom Frontend bis zur API logisch und konsistent funktioniert.

---

## Manuell geprüfte Bereiche

Neben den automatisierten Tests wurden auch manuelle Tests durchgeführt. Diese waren besonders wichtig für Bereiche, die sich nicht oder nur eingeschränkt automatisiert prüfen lassen.

Manuell getestet wurden insbesondere:

- die Übersichtlichkeit und Verständlichkeit der Detailansicht
- die Lesbarkeit von Beschreibung und Kommentaren
- die Anordnung und Beschriftung der Eingabefelder
- die Benutzerfreundlichkeit beim Bearbeiten eines Items
- das Verhalten bei mehrfachen Änderungen hintereinander
- die Darstellung bei mehreren Kommentaren
- die Nachvollziehbarkeit der Änderungen aus Sicht des Benutzers

Zusätzlich wurden typische und untypische Nutzungssituationen manuell durchgespielt, zum Beispiel:

- leere oder sehr kurze Eingaben
- mehrfache Statuswechsel
- mehrere Kommentare nacheinander
- Wechsel zwischen verschiedenen Items in der Detailansicht

Das Ziel dieser manuellen Tests war es, nicht nur die technische Funktion, sondern auch die tatsächliche Nutzbarkeit des Features zu beurteilen.

---

## Testziele

Mit den Tests wurden mehrere Ziele verfolgt.

Erstens sollte sichergestellt werden, dass das Feature fachlich korrekt funktioniert. Ein Item soll korrekt mit Titel, Beschreibung und Status angelegt werden können. Beschreibung und Status sollen nachträglich bearbeitbar sein. Kommentare sollen gespeichert und in den Item-Details sichtbar werden.

Zweitens sollte gewährleistet werden, dass bestehende Funktionen durch die Erweiterung nicht unbeabsichtigt beschädigt werden.

Drittens sollte die Qualität des Codes durchgehend hoch gehalten werden. Deshalb wurden Tests nicht nur am Ende, sondern fortlaufend während der Entwicklung durchgeführt. Unterstützt wurde dies durch wiederholte SonarQube-Analysen.

---

## SonarQube und Codequalität

Während der gesamten Umsetzung wurde SonarQube regelmässig eingesetzt. Nach grösseren Änderungen wurde der aktuelle Stand analysiert und erkannte Probleme wurden direkt behoben.

Dabei wurden insbesondere folgende Ziele verfolgt:

- 0 Bugs
- 0 Vulnerabilities
- 0 Security Hotspots
- Maintainability A
- Reliability A
- Security A
- möglichst hohe Testabdeckung
- möglichst geringe Duplications
- Quality Gate Status Passed

SonarQube wurde somit nicht nur als Abschlusskontrolle verwendet, sondern als laufendes Werkzeug zur Qualitätssicherung.

---

## Testumgebung

Für die Umsetzung und Prüfung wurden folgende Werkzeuge verwendet:

### Backend
- Java
- Spring Boot
- JUnit
- Mockito
- Maven

### Frontend
- React
- Vitest
- React Testing Library
- Vite

### End-to-End
- Playwright

### Codeanalyse
- SonarQube
- Docker

Die Entwicklung und Ausführung erfolgte lokal auf dem eigenen Gerät.

---

## Dokumentation des Entwicklungsablaufs

Die Umsetzung des Features wurde in kleine, nachvollziehbare Schritte aufgeteilt. Nach jedem abgeschlossenen Teilbereich wurden die zugehörigen Tests ausgeführt, die Ergebnisse geprüft und die Änderungen in Git commitet und gepusht.

Dadurch ist im Git-Verlauf klar ersichtlich, wie sich das Feature schrittweise entwickelt hat. Dieses Vorgehen reduziert das Risiko grosser Fehlerquellen und macht die Entwicklung nachvollziehbar.

Typische Schritte waren:

1. Datenmodell erweitern
2. Backend-Endpunkte ergänzen
3. Backend-Tests ausführen
4. Frontend-Komponenten anpassen
5. Frontend-Tests ausführen
6. End-to-End-Tests ergänzen
7. SonarQube ausführen
8. Probleme bereinigen
9. Änderungen committen und pushen

---

## Fazit

Das Feature wurde systematisch, testorientiert und in kleinen Schritten umgesetzt. Die Kombination aus TDD, Backend-Tests, Frontend-Tests, End-to-End-Tests, manuellen Prüfungen und SonarQube-Analysen sorgte dafür, dass das Ergebnis nicht nur funktional korrekt, sondern auch nachvollziehbar und wartbar ist.

Das Vorgehen spiegelt die Anforderungen der Aufgabe wider: kleine Commits, häufiges Testen, kontinuierliche Analyse und eine saubere Dokumentation des gesamten Entwicklungs- und Testprozesses.