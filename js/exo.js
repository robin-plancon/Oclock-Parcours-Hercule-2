console.log("test 1...2...1...2");

const Hercule = {
    name: "Hercule",
    job: "Demi-dieu",
    age: 35,
    departement: 75,
    arm: 60.5,
    inRelationship: true,
    friends: ["Jupiter", "Junon", "Alcmène", "Déjanire"],
};

const app = {
    createTitle: () => {
        const titleNode = document.createElement("h1");
        titleNode.classList.add("banner__title");
        titleNode.textContent = "Vous consultez le profil de Hercule";
        document.getElementById("header-banner").appendChild(titleNode);
    },

    displayWorks: () => {
        for (let work = 0; work < 12; work++) {
            base.displayWork(work);
        }
    },

    isAvailable: (availabilityDebut, availabilityEnd) => {
        const currentHour = base.getHour();
        const availabilityNode = document.getElementById("availability");
        if (currentHour <= availabilityDebut || currentHour >= availabilityEnd) {
            availabilityNode.textContent = "Non disponible";
            availabilityNode.classList.add("off");
            return;
        }
        if (availabilityNode.classList.contains("off")) {
            availabilityNode.classList.remove("off");
        }
        availabilityNode.textContent = "Disponible";
        
    },

    createPseudo: (firstname, departement) => {
        return `${firstname}-du-${departement}`;
    },

    displayPseudo: (pseudo) => {
        const profilNameNode = document.getElementById("profil-name");
        profilNameNode.textContent = pseudo; 
    },

    diplayVote: (name) => {
        if (!base.vote[name]) {
            return;
        }
        let totalVotes = 0;
        for (const key in base.vote) {
            totalVotes += base.vote[key];
        }
        const percentage = Math.round(base.vote[name] / totalVotes * 100);
        const trendsNode = document.getElementById(`trends-${name}`);
        trendsNode.querySelector(".people__popularity").textContent = `${percentage}%`;
        trendsNode.querySelector(".people__bar").style.width = `${percentage}%`;
    },

    displayActivities: (name) => {
        const activitiesNode = document.getElementById("activities");
        for (let activity of base.activities) {
            if(activity.author === name && activity.finished === true) {
                const activityNode = document.createElement("li");
                activityNode.textContent = activity.title;
                activityNode.classList.add("tags__item");
                activitiesNode.querySelector(".tasks").appendChild(activityNode);
            }
        }
        if (activitiesNode.childElementCount > 0){
            activitiesNode.classList.remove("hidden");
        }
    },

    menuClickListener: () => {
        const menuNode = document.getElementById("menu-toggler");
        menuNode.addEventListener("click", () => {
            const headerBannerNode = document.getElementById("header-banner");
            if (headerBannerNode.classList.contains("banner--open")) {
                headerBannerNode.classList.remove("banner--open");
                return;
            }
            headerBannerNode.classList.add("banner--open");
        });
    },

    formSubmitListener: () => {
        const formNode = document.getElementById("contact");
        formNode.addEventListener("submit", (Event) => {
            Event.preventDefault();
            alert("Hercule ne souhaite pas être dérangé");
        });
    },

    init: () => {
        app.createTitle();
        app.menuClickListener();
        app.formSubmitListener();
        app.displayWorks();
        app.isAvailable(8, 20);
        base.fillProfil(Hercule);
        base.printFriends(Hercule.friends);
        base.setBestFriend(Hercule.friends[0]);
        app.displayPseudo(app.createPseudo(Hercule.name, Hercule.departement));
        app.diplayVote("hercule");
        app.diplayVote("cesar");
        app.displayActivities("Hercule");
    },
};

app.init();
