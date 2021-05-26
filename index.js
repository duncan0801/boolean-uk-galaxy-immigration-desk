const infoSection = document.querySelector(".info-section");
const listSection = document.querySelector(".list-section");
const actionSection = document.querySelector(".action-section");

let state = {
    "applicants": [],
    "acceptedApplicants": [],
    "viewApplicant": {}
}

function getApplicants() {
    //This will fetch the applicants from the API and addd them to state
    fetch(`https://swapi.dev/api/people`)
    .then(function(response) {
        console.log(response)
        return response.json()
    })
    .then(function(people) {
        console.log(people)
        state.applicants = people.results
        renderApplicants()
    })
}
getApplicants()

function renderApplicants() {
    const listEl = document.querySelector(".applicantList")

    for (applicant of state.applicants) {
        const applicantEL = document.createElement("li")
        applicantEL.setAttribute("class", "applicant")

        const nameEl =  document.createElement("span")
        nameEl.setAttribute("class", "name")
        nameEl.innerText = applicant.name

        const viewButtonEl =  document.createElement("span")
        viewButtonEl.setAttribute("class", "viewButton")
        viewButtonEl.innerText = "View"

        applicantEL.append(nameEl, viewButtonEl)
        listEl.append(applicantEL)
    }
    listSection.append(listEl)
}

/*
1. Get the people from the API then put them into state.applicants
2.Create a render applicants list function
3.Create a render view applicant function
4.Create a render form function
5. Add event Listeners:
*/