const infoSection = document.querySelector(".info-section");
const listSection = document.querySelector(".list-section");
const actionSection = document.querySelector(".action-section");

let state = {
    "applicants": [],
    "acceptedApplicants": [],
    "planets": [],
    "viewApplicant": { 
        name: "luke",
        gender: "male",
        DOB: "23/12/unkown",
        height: 6,
        mass: 123,
        homeworld: "bla"

    }
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

function renderApplicants() {
    const listEl = document.querySelector(".applicantList")

    for (const applicant of state.applicants) {
        const applicantEL = document.createElement("li")
        applicantEL.setAttribute("class", "applicant")

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

    console.log(applicant)
    // This will be undefined if it doesn't find anything 
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
    //Write the render function for view applicant
}

function getWorldData(worldURL) {
    return fetch(worldURL)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                console.log(data)
                return data
            })

}
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

/*
1.✔ Get the people from the API then put them into state.applicants
2.✔ Create a render applicants list function
3. Get the world names into state an array using conditional fetches on event listener in the view 
    (e.g if applicant.homeworld is in the planets array already, then get the name from state
    If the applicant.homewrold is NOT in state already, fetch the homewrold from the server and pull the name (functionise- fetchWorldName())
    )
3.Create a render view applicant function
4.Create a render form function
5. Add event Listeners:
*/