// shows last update timestamp because I want visitors to know that the page is being developed and isn't stale
fetch("https://api.github.com/repos/Josiah-Cooksey/my-website")
.then(response => response.json())
.then(data => {
    console.log("Last push:", data.pushed_at);
    let listedTime = new Date(data.pushed_at)
    
    document.getElementById("last-update-date").textContent = "Last updated: " + listedTime.toLocaleString()
})
.catch(error => {
    console.error("Error:", error)
    document.getElementById("last-update-date").textContent = "Could not obtain last update timestamp."
});