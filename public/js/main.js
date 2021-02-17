// Chargez les infos
const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// Conditions de victoire 
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


// Messages

const gagne = () => `Le joueur ${joueurActif} a gagné`
const egalite = () => "Match nul !"
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`

// Afficher le joueur qui commence

statut.innerHTML = tourJoueur()

// Event

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#recommencer").addEventListener("click", recommencer)


// fonctions du clic sur les cases du jeu

function gestionClicCase() {
    // Récuperer l'index de la case cliquée
    const indexCase = parseInt(this.id)
    console.log(indexCase);
    // Vérification : Case remplie ou jeu terminé
    if (etatJeu[indexCase] !== "" || !jeuActif) {
        return
    }
    // Symbole du joueur dans le tableau "etatJeu" et la case
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif
    console.log(etatJeu);
    // Vérification si le joueur a gagné
    verifGagne()
}

// // Fonction si le joueur a gagné ou non
function verifGagne() {
    let tourGagnant = false

    //     // Toute les conditions de victoire
    for (let conditionVictoire of conditionsVictoire) {
        // 3 cases pour gagner
        let valeur1 = etatJeu[conditionVictoire[0]]
        let valeur2 = etatJeu[conditionVictoire[1]]
        let valeur3 = etatJeu[conditionVictoire[2]]
        // Si une case est vide

        if (valeur1 === "" || valeur2 === "" || valeur3 === "") {
            continue
        }

        // Si les 3 cases sont identiques
        if (valeur1 === valeur2 && valeur2 === valeur3) {
            // On gagne
            tourGagnant = true
            break
        }
    }
    if (tourGagnant) {
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }
    if (!etatJeu.includes("")) {
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }
    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

// Recommencer le jeu
function recommencer() {
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}







