document.addEventListener("DOMContentLoaded", function() {
    const ageFilter = document.getElementById('age-filter');
    const genderFilter = document.querySelectorAll('input[name="gender"]');
    const startsWithFilter = document.getElementById('starts-with-filter');
    const peopleList = document.getElementById('people-list');
    let peopleData = [];

    // Load JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            peopleData = data;
            displayPeople(peopleData);
        });

    // Event listeners for filters
    ageFilter.addEventListener('change', filterPeople);
    genderFilter.forEach(input => input.addEventListener('change', filterPeople));
    startsWithFilter.addEventListener('change', filterPeople);

    function displayPeople(people) {
        peopleList.innerHTML = '';
        people.forEach(person => {
            const personElement = document.createElement('div');
            personElement.classList.add('person');
            personElement.textContent = `${person.name} - ${person.gender}, ${person.age} years old`;
            peopleList.appendChild(personElement);
        });
    }

    function filterPeople() {
        const selectedLetters = Array.from(startsWithFilter.selectedOptions).map(option => option.value);
        const filteredPeople = peopleData.filter(person => {
            const passAgeFilter = !ageFilter.value || parseInt(person.age) > parseInt(ageFilter.value);
            const passGenderFilter = Array.from(genderFilter).every(input => !input.checked || input.value === person.gender);
            const passStartsWithFilter = selectedLetters.length === 0 || selectedLetters.some(letter => person.name.toUpperCase().startsWith(letter.toUpperCase()));
            return passAgeFilter && passGenderFilter && passStartsWithFilter;
        });

        displayPeople(filteredPeople);
    }
});
