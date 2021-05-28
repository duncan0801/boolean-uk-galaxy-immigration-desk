/*
1.✔ Get the people from the API then put them into state.applicants
2.✔ Create a render applicants list function
3.✔ Get the world names into state an array using conditional fetches on event listener in the view 
    (e.g if applicant.homeworld is in the planets array already, then get the name from state
    If the applicant.homewrold is NOT in state already, fetch the homewrold from the server and pull the name (functionise- fetchWorldName())
    )
4.✔ Create a render view applicant function
5.Create a render form function
6. Add event Listeners:
*/

const infoSection = document.querySelector(".info-section");
const listSection = document.querySelector(".list-section");
const actionSection = document.querySelector(".action-section");

function setState(objectWithKeystoUpdate) {
    state = {...state, ...objectWithKeystoUpdate}
}
function createEl(tag) {
    return document.createElement(tag)
}

let state = {
    "applicants": [],
    "acceptedApplicants": [],
    "rejectedApplicants": [],
    "planets": [],
    "viewApplicant": {}
}

function getApplicants() {
    //This will fetch the applicants from the API and addd them to state
    fetch(`https://swapi.dev/api/people`)
    .then(function(response) {
        return response.json()
    })
    .then(function(people) {
        console.log(people.results)
        state.applicants = people.results
    })
    .then(function() {
        renderApplicants()
    })
}
getApplicants()
function checkHomeworldData(applicant) {
    //if applicant.homewrold is not in state.planets then fetch, store the planet data in state
    
    return fetch(applicant.homeworld)
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    // state = [...state, ]
                    state = {...state, ...state.planets.push(data)}
                    return data
                })
}

function renderApplicants() {
    const listEl = document.querySelector(".applicantList")

    listEl.innerHTML = ""

    for (const applicant of state.applicants) {
        const applicantEL = document.createElement("li")
        applicantEL.setAttribute("class", "applicant")

        let isApplicantAccepted = state.acceptedApplicants.some(function (acceptedApplicant) {
            return acceptedApplicant === applicant.name
        })
        console.log(isApplicantAccepted)
        if(isApplicantAccepted) {
            applicantEL.classList.add("accepted")
        }

        const nameEl =  document.createElement("span")
        nameEl.setAttribute("class", "name")
        nameEl.innerText = applicant.name

        const viewButtonEl =  document.createElement("span")
        viewButtonEl.setAttribute("class", "viewButton")
        viewButtonEl.innerText = "View"

        viewButtonEl.addEventListener("click", function(){
            //1.Check that all data that is needed is there
            //2.Get data if needed
            //2. function to get all of the data into the viewApplicant state?
            //3.Call render function that will render from state e.g renderApplicantInfo()
            state = {...state, viewApplicant: applicant} 
            
            renderApplicantData(applicant)

            if (checkImmigarationStatus(applicant) === "isAccepted") {
                // TODO: renderAcceptedView()

                actionSection.innerText=""

                const acceptedEl = createEl("h2")
                acceptedEl.setAttribute("class", "accepted")
                acceptedEl.innerText = "Accepted"

                actionSection.append(acceptedEl)
            }
            // if (checkImmigarationStatus() === "isRejected") {
            //     renderRejectedView()          
            // }
            if(checkImmigarationStatus(applicant) === null) {
                renderImmigrationForm(applicant)
            }
            
        })

        applicantEL.append(nameEl, viewButtonEl)
        listEl.append(applicantEL)
    }
    listSection.append(listEl)
}
function renderViewApplicant(applicant) {
    infoSection.innerHTML = ""

    const viewApplicantEl = document.createElement("article")
    viewApplicantEl.setAttribute("class", "viewApplicantSection")

    const viewApplicantSectionHeadingEl = document.createElement("h2")
    viewApplicantSectionHeadingEl.innerText = state.viewApplicant.name

    const lineBreakEl = document.createElement("hr")

    const viewApplicantList = document.createElement("ul")
    viewApplicantList.setAttribute("class", "applicantInfoList")

    const genderliEl = document.createElement("li")
    genderliEl.setAttribute("class", "applicantInfo")
    const genderSubHeading = document.createElement("h3")
    genderSubHeading.setAttribute("class", "subheading gender")
    genderSubHeading.innerText = "Gender"
    const genderPEl = document.createElement("p")
    genderPEl.innerText = state.viewApplicant.gender
    
    const DOBliEl = document.createElement("li")
    DOBliEl.setAttribute("class", "applicantInfo")
    const DOBSubHeading = document.createElement("h3")
    DOBSubHeading.setAttribute("class", "subheading DOB")
    DOBSubHeading.innerText = "DOB"
    const DOBPEl = document.createElement("p")
    DOBPEl.innerText = state.viewApplicant["birth_year"]

    const heightliEl = document.createElement("li")
    heightliEl.setAttribute("class", "applicantInfo")
    const heightSubHeading = document.createElement("h3")
    heightSubHeading.setAttribute("class", "subheading height")
    heightSubHeading.innerText = "Height"
    const heightPEl = document.createElement("p")
    heightPEl.innerText = state.viewApplicant.height

    const massliEl = document.createElement("li")
    massliEl.setAttribute("class", "applicantInfo")
    const massSubHeading = document.createElement("h3")
    massSubHeading.setAttribute("class", "subheading mass")
    massSubHeading.innerText = "Mass"
    const massPEl = document.createElement("p")
    massPEl.innerText = state.viewApplicant.mass

    const homeworldliEl = document.createElement("li")
    homeworldliEl.setAttribute("class", "applicantInfo")
    const homeworldSubHeading = document.createElement("h3")
    homeworldSubHeading.setAttribute("class", "subheading homeworld")
    homeworldSubHeading.innerText = "Homeworld"
    const homeworldPEl = document.createElement("p")

    let homeworldData = state.planets.find(function(planet) {
        
        return planet.url === applicant.homeworld
    })
    console.log(homeworldData.name)
    homeworldPEl.innerText = homeworldData.name


    genderliEl.append(genderSubHeading, genderPEl)
    DOBliEl.append(DOBSubHeading, DOBPEl)
    heightliEl.append(heightSubHeading, heightPEl)
    massliEl.append(massSubHeading, massPEl)
    homeworldliEl.append(homeworldSubHeading, homeworldPEl)
    viewApplicantList.append(genderliEl, DOBliEl, heightliEl, massliEl, homeworldliEl)
    infoSection.append(viewApplicantSectionHeadingEl, lineBreakEl, viewApplicantList)
}
function renderImmigrationForm(applicant) {
    /*
    1. Applicant name
    2. Destination input 
    3. Purpose of travel select
    4. terrorist activit y or n? radio
    5. Accept Button

     */
    actionSection.innerHTML = ""

    const headingEL = createEl("h2")
    headingEL.innerText = "Immigration Form"

    const subheadingEl = createEl("h3")
    subheadingEl.setAttribute("class", "subheading")
    subheadingEl.innerText = "Applicant Name: " + applicant.name

    const formEl = createEl("form")
    formEl.setAttribute("class", "immigrationForm")

    const destinationLabelEl = createEl("label")
    destinationLabelEl.setAttribute("for", "destination")
    destinationLabelEl.innerText = "Destination:"
    const destinationInputEl = createEl("input")
    destinationInputEl.setAttribute("type", "text")
    destinationInputEl.setAttribute("name", "destination")

    const purposeOfTravelLabelEl = createEl("label")
    purposeOfTravelLabelEl.setAttribute("for", "purposeOfTravel")
    purposeOfTravelLabelEl.innerText = "Purpose Of Travel:"
    const purposeOfTravelSelectEl = createEl("select")
    purposeOfTravelSelectEl.setAttribute("id", "purposeOfTravel")
    purposeOfTravelSelectEl.setAttribute("name", "purposeOfTravel")

    let purposes = ["Sith Lord Matters", "Jedi Training", "These Aren't The Droids  You Are Looking For"]

    for(const purpose of purposes) {
        const optionEl = createEl("option")
        optionEl.innerText = purpose

        purposeOfTravelSelectEl.append(optionEl)
    }

    const terroristActivityLabelEl = createEl("label")
    terroristActivityLabelEl.setAttribute("for", "terroristActivity")
    terroristActivityLabelEl.innerText = "Terrorist Activity?"

    const terroristActivityFieldsetlEl = createEl("fieldset")
    terroristActivityFieldsetlEl.setAttribute("id", "terroristActivity")

    const yesLabelEl = createEl("label")
    yesLabelEl.setAttribute("for", "yes")
    yesLabelEl.innerText = "yes"
    const yesInputEl = createEl("input")
    yesInputEl.setAttribute("type", "radio")
    yesInputEl.setAttribute("name", "terroristActivity")
    yesInputEl.setAttribute("value", "yes")
    yesInputEl.setAttribute("id", "yes")
    
    const noLabelEl = createEl("label")
    noLabelEl.setAttribute("for", "no")
    noLabelEl.innerText = "no"
    const noInputEl = createEl("input")
    noInputEl.setAttribute("type", "radio")
    noInputEl.setAttribute("name", "terroristActivity")
    noInputEl.setAttribute("value", "no")
    noInputEl.setAttribute("id", "no")

    const acceptButtonEl = createEl("button")
    acceptButtonEl.setAttribute("class", "accept")
    acceptButtonEl.setAttribute("type", "submit")
    acceptButtonEl.innerText = "Accept"

    // const rejectButtonEl = createEl("button")
    // rejectButtonEl.setAttribute("class", "reject")
    // rejectButtonEl.setAttribute("type", "button")
    // rejectButtonEl.innerText = "Reject"

    acceptButtonEl.addEventListener("click", accepted)
    // TODO acceptButtonEl.addEventListener("submit", function(e) {
    //     e.preventDefault()

    //     accepted()


    // })

    function accepted() {
        infoSection.innerHTML = ""
        // let newAcceptedApplicants = [...state.acceptedApplicants.push(applicant.name)]

        //TODO
        // let acceptedApplicant = {
        //     name: applicant.name,
        //     distination: destinationInputEl.value,
        //     purposeOfTravel: purposeOfTravelSelectEl.value,
        //     terroristActivity: terroristActivityFieldsetlEl.value
        // }
        setState({"acceptedApplicants": [...state.acceptedApplicants, applicant.name]})
        acceptButtonEl.setAttribute("disabled", "")
        acceptButtonEl.setAttribute("class", "accepted")

        renderApplicants()
        
    }
    
    terroristActivityFieldsetlEl.append(
        yesLabelEl,
        yesInputEl,
        noLabelEl,
        noInputEl
        )
    formEl.append(
        destinationLabelEl, 
        destinationInputEl,
        purposeOfTravelLabelEl,
        purposeOfTravelSelectEl,
        terroristActivityLabelEl,
        acceptButtonEl
        )
    actionSection.append(headingEL, subheadingEl, formEl)
}

function renderApplicantData(applicant) {
    let checkForPlanet = state.planets.some(function(planet) {
        return planet.url === applicant.homeworld
    })
    console.log("Is planet in state?:", checkForPlanet)

    if(!checkForPlanet) {
        checkHomeworldData(applicant)
        .then(function() {
            renderViewApplicant(applicant)
        })
        
    }
    else{
        renderViewApplicant(applicant)
    }
}
function checkImmigarationStatus(applicant) {
    let isAccepted = state.acceptedApplicants.some(function(acceptedApplicant) {
        return acceptedApplicant === applicant.name
    })

    let isRejected = state.rejectedApplicants.some(function(acceptedApplicant) {
        return acceptedApplicant === applicant.name
    })

    if(isAccepted) {
        return "isAccepted"
    }
    if(isRejected) {
        return "isRejected"
    }
    else {
        return null
    }
    // console.log("Accepted?:", isAccepted)
    // console.log("Rejected?:", isRejected)

    // if(isAccepted) {
    //     renderAcceptedView()
    // }
    // if(isRejected) {
    //     renderRejectedView()
    // }
    // else {
    //     renderImmigrationForm()
    // }
    
}



