//Variables

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input');
const jobResultTag = document.querySelector('#job-result-tag')
const searchBtn = document.querySelector('#search-button');

//Functions

async function searchJobs () {
    const API_URL="https://api.adzuna.com/v1/api/jobs/us/search/2?app_id=26e3f636&app_key=2af4ca62123cb424f88a3711c969c25a&results_per_page=10&what=Software%20Engineering&where=Massachusetts%20"

    const result = await fetch(API_URL)
    const data = await result.json()
    //console.log(data)

    return data
}

//Event Listener
searchForm.addEventListener('submit', async function (event) {
    event.preventDefault()
//set variables here
        const jobTitle = searchInput.value
        const jobSearchResults = await searchJobs(jobTitle)
        const jobData = jobSearchResults.results

// this will appear in the html file/job search result output:
    jobResultTag.innerHTML =
        `<h1 class="text-4xl">Results found for ${jobTitle} in Massachusetts</h1>
</div>`
    jobData.forEach(function (job) {
        const div = document.createElement('div')
        div.innerHTML =
           `<p class=" text-3xl text-yellow-600  p-2 flex"${job.title} <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4z"/><path d="M0 0h48v48H0z" fill="none"/></svg></p> 
            <p class="text-2xl "${job.company.display_name}</p> 
            <p>${job.location.display_name}</p>
            <p> <strong>Job description:</strong> description : ${job.description}</p> 
            <p ${job.created}</p>`

    jobResultTag.appendChild(div)
    })
})


